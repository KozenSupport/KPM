#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
COMPOSE_FILE="$ROOT_DIR/infra/docker-compose/uat/docker-compose.yml"
ENV_FILE="$ROOT_DIR/.env"
ENV_EXAMPLE="$ROOT_DIR/.env.example"

RESET_DB=false
PULL_IMAGES=true
NON_INTERACTIVE=false
WITH_OBSERVABILITY=false
WITH_MQ=false

usage() {
  cat <<'USAGE'
Usage:
  bash scripts/uat-server-deploy.sh [options]

Options:
  --reset-db          Drop and recreate KPM tables, then load seed data. Destroys business data.
  --no-pull           Do not pull images before startup.
  --observability     Start SkyWalking OAP/UI and enable Java agent when KPM_SKYWALKING_JAVA_AGENT_OPTIONS is set.
  --mq                Start RocketMQ profile.
  --non-interactive   Use defaults without prompts.
  -h, --help          Show help.

Typical UAT server flow:
  tar -xzf kpm-uat-<tag>.tar.gz
  cd kpm-uat-<tag>
  cp .env.example .env
  vim .env
  bash scripts/uat-server-deploy.sh
USAGE
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --reset-db) RESET_DB=true; shift ;;
    --no-pull) PULL_IMAGES=false; shift ;;
    --observability) WITH_OBSERVABILITY=true; shift ;;
    --mq) WITH_MQ=true; shift ;;
    --non-interactive) NON_INTERACTIVE=true; shift ;;
    -h|--help) usage; exit 0 ;;
    *) echo "Unknown option: $1" >&2; usage; exit 1 ;;
  esac
done

require_command() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Missing required command: $1" >&2
    exit 1
  fi
}

require_command docker
require_command curl

if ! docker compose version >/dev/null 2>&1; then
  echo "Docker Compose v2 is required. Please install/update Docker first." >&2
  exit 1
fi

if [[ ! -f "$COMPOSE_FILE" ]]; then
  echo "Missing compose file: $COMPOSE_FILE" >&2
  exit 1
fi

random_secret() {
  if command -v openssl >/dev/null 2>&1; then
    openssl rand -base64 32 | tr -d '\n'
  else
    date +%s%N | shasum -a 256 | awk '{print $1}'
  fi
}

detect_host() {
  local ip=""
  if command -v hostname >/dev/null 2>&1; then
    ip="$(hostname -I 2>/dev/null | awk '{print $1}' || true)"
  fi
  printf '%s' "${ip:-127.0.0.1}"
}

env_value() {
  local key="$1"
  local fallback="${2:-}"
  if [[ -f "$ENV_FILE" ]]; then
    local value
    value="$(grep -E "^${key}=" "$ENV_FILE" | tail -1 | cut -d= -f2- || true)"
    if [[ -n "$value" ]]; then
      printf '%s' "$value"
      return
    fi
  fi
  printf '%s' "$fallback"
}

set_env_value() {
  local key="$1"
  local value="$2"
  local tmp
  tmp="$(mktemp)"
  awk -v key="$key" -v value="$value" '
    BEGIN { updated = 0 }
    index($0, key "=") == 1 { print key "=" value; updated = 1; next }
    { print }
    END { if (!updated) print key "=" value }
  ' "$ENV_FILE" > "$tmp"
  mv "$tmp" "$ENV_FILE"
}

prompt_value() {
  local label="$1"
  local default="$2"
  if [[ "$NON_INTERACTIVE" == "true" ]]; then
    printf '%s' "$default"
    return
  fi
  local input
  read -r -p "$label [$default]: " input
  printf '%s' "${input:-$default}"
}

init_env_if_needed() {
  if [[ ! -f "$ENV_FILE" ]]; then
    if [[ ! -f "$ENV_EXAMPLE" ]]; then
      echo "Missing $ENV_FILE and $ENV_EXAMPLE" >&2
      exit 1
    fi
    cp "$ENV_EXAMPLE" "$ENV_FILE"
    echo "Created $ENV_FILE from .env.example"
  fi

  local version_tag=""
  if [[ -f "$ROOT_DIR/VERSION" ]]; then
    version_tag="$(tr -d '[:space:]' < "$ROOT_DIR/VERSION")"
  fi

  if [[ -z "$(env_value KPM_IMAGE_REGISTRY '')" ]]; then
    set_env_value KPM_IMAGE_REGISTRY "ghcr.io/kozensupport"
  fi
  if [[ -z "$(env_value KPM_IMAGE_TAG '')" || "$(env_value KPM_IMAGE_TAG '')" == "latest" ]]; then
    set_env_value KPM_IMAGE_TAG "${version_tag:-latest}"
  fi

  if [[ "$(env_value KPM_AUTH_TOKEN_SECRET kpm-local-dev-secret-change-me)" == "kpm-local-dev-secret-change-me" ]]; then
    set_env_value KPM_AUTH_TOKEN_SECRET "$(random_secret)"
  fi
  if [[ "$(env_value KPM_DB_PASSWORD kpm_dev_password)" == "kpm_dev_password" ]]; then
    set_env_value KPM_DB_PASSWORD "kpm_$(random_secret | tr -dc 'A-Za-z0-9' | head -c 24)"
  fi

  if [[ -z "$(env_value KPM_PUBLIC_HOST '')" ]]; then
    set_env_value KPM_PUBLIC_HOST "$(prompt_value 'UAT public IP/domain for browser access' "$(detect_host)")"
  fi
  if [[ -z "$(env_value KPM_PUBLIC_PROTOCOL '')" ]]; then
    set_env_value KPM_PUBLIC_PROTOCOL "$(prompt_value 'Public protocol' 'http')"
  fi
}

compose_args() {
  local args=(--env-file "$ENV_FILE" -f "$COMPOSE_FILE")
  if [[ "$WITH_OBSERVABILITY" == "true" ]]; then
    args+=(--profile observability)
  fi
  if [[ "$WITH_MQ" == "true" ]]; then
    args+=(--profile mq)
  fi
  printf '%s\n' "${args[@]}"
}

compose() {
  local args=()
  while IFS= read -r arg; do args+=("$arg"); done < <(compose_args)
  docker compose "${args[@]}" "$@"
}

wait_for_container_healthy() {
  local container="$1"
  local timeout="${2:-240}"
  local start
  start="$(date +%s)"
  while true; do
    local status
    status="$(docker inspect -f '{{if .State.Health}}{{.State.Health.Status}}{{else}}{{.State.Status}}{{end}}' "$container" 2>/dev/null || true)"
    if [[ "$status" == "healthy" || "$status" == "running" ]]; then
      return 0
    fi
    if (( $(date +%s) - start > timeout )); then
      echo "Timed out waiting for $container. Current status: ${status:-unknown}" >&2
      docker logs --tail=120 "$container" 2>/dev/null || true
      return 1
    fi
    sleep 3
  done
}

wait_for_container_success() {
  local container="$1"
  echo "Waiting for $container to complete..."
  local exit_code
  exit_code="$(docker wait "$container")"
  if [[ "$exit_code" != "0" ]]; then
    echo "$container failed with exit code $exit_code" >&2
    docker logs --tail=160 "$container" 2>/dev/null || true
    exit 1
  fi
}

wait_for_http() {
  local name="$1"
  local url="$2"
  local timeout="${3:-240}"
  local start
  start="$(date +%s)"
  while true; do
    if curl -fsS "$url" >/dev/null 2>&1; then
      return 0
    fi
    if (( $(date +%s) - start > timeout )); then
      echo "Timed out waiting for $name: $url" >&2
      return 1
    fi
    sleep 3
  done
}

database_has_schema() {
  local db_user db_name
  db_user="$(env_value KPM_DB_USER kpm)"
  db_name="$(env_value KPM_DB_NAME kpm)"
  docker exec kpm-uat-postgres psql -U "$db_user" -d "$db_name" -tAc "select to_regclass('public.kpm_users') is not null" 2>/dev/null | grep -q t
}

initialize_database_if_needed() {
  local db_user db_name
  db_user="$(env_value KPM_DB_USER kpm)"
  db_name="$(env_value KPM_DB_NAME kpm)"

  if [[ "$RESET_DB" == "true" ]]; then
    if [[ "$NON_INTERACTIVE" != "true" ]]; then
      echo "WARNING: --reset-db will drop and recreate KPM tables in database '$db_name'."
      read -r -p "Type RESET to continue: " confirm
      if [[ "$confirm" != "RESET" ]]; then
        echo "Database reset cancelled."
        exit 1
      fi
    fi
    cat "$ROOT_DIR/infra/database/schema.sql" "$ROOT_DIR/infra/database/seed.sql" \
      | docker exec -i kpm-uat-postgres psql -U "$db_user" -d "$db_name"
    echo "Database reset completed."
    return
  fi

  if ! database_has_schema; then
    cat "$ROOT_DIR/infra/database/schema.sql" "$ROOT_DIR/infra/database/seed.sql" \
      | docker exec -i kpm-uat-postgres psql -U "$db_user" -d "$db_name"
    echo "Database initialized."
  else
    echo "Database schema exists; skip initialization."
  fi
}

print_summary() {
  local protocol host frontend_port gateway_port nacos_console_port skywalking_port
  protocol="$(env_value KPM_PUBLIC_PROTOCOL http)"
  host="$(env_value KPM_PUBLIC_HOST 127.0.0.1)"
  frontend_port="$(env_value KPM_FRONTEND_PORT 14173)"
  gateway_port="$(env_value KPM_GATEWAY_PORT 19080)"
  nacos_console_port="$(env_value KPM_NACOS_CONSOLE_PORT 18849)"
  skywalking_port="$(env_value KPM_SKYWALKING_UI_PORT 19081)"

  cat <<SUMMARY

KPM UAT is running.
Internal system:  ${protocol}://${host}:${frontend_port}/#/login
Customer portal:  ${protocol}://${host}:${frontend_port}/#/customer-login
Gateway API:      ${protocol}://${host}:${gateway_port}
Nacos console:    ${protocol}://${host}:${nacos_console_port}/
SkyWalking UI:    ${protocol}://${host}:${skywalking_port}/  (when --observability is enabled)
Default admin:    admin@kozenmobile.com / 123456

Image release:
  Registry: $(env_value KPM_IMAGE_REGISTRY ghcr.io/kozensupport)
  Tag:      $(env_value KPM_IMAGE_TAG latest)
SUMMARY
}

init_env_if_needed

if [[ "$WITH_OBSERVABILITY" == "true" && -z "$(env_value KPM_SKYWALKING_JAVA_AGENT_OPTIONS '')" ]]; then
  set_env_value KPM_SKYWALKING_JAVA_AGENT_OPTIONS "-javaagent:/skywalking-agent/skywalking-agent.jar"
fi

if [[ "$PULL_IMAGES" == "true" ]]; then
  echo "Pulling UAT images..."
  compose pull
fi

echo "Starting infrastructure..."
compose up -d postgres valkey nacos
wait_for_container_healthy kpm-uat-postgres 240
wait_for_container_healthy kpm-uat-valkey 180
wait_for_container_healthy kpm-uat-nacos 360

initialize_database_if_needed

echo "Publishing Nacos service configs..."
compose up --force-recreate nacos-config-publisher
wait_for_container_success kpm-uat-nacos-config-publisher

if [[ "$WITH_OBSERVABILITY" == "true" ]]; then
  echo "Preparing SkyWalking Java agent..."
  compose up --force-recreate skywalking-agent-init
  wait_for_container_success kpm-uat-skywalking-agent-init
fi

echo "Starting KPM application services..."
compose up -d

wait_for_http "frontend" "http://127.0.0.1:$(env_value KPM_FRONTEND_PORT 14173)/" 240
wait_for_http "gateway health" "http://127.0.0.1:$(env_value KPM_GATEWAY_PORT 19080)/actuator/health" 300

print_summary
