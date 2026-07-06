#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
COMPOSE_FILE="$ROOT_DIR/infra/docker-compose/dev/docker-compose.yml"
ENV_FILE="$ROOT_DIR/.env"

RESET_DB=false
NON_INTERACTIVE=false
WITH_OBSERVABILITY=false

usage() {
  cat <<'EOF'
Usage:
  bash scripts/uat-deploy.sh [options]

Options:
  --reset-db           Rebuild database schema and seed data. Destroys existing KPM business data.
  --non-interactive    Do not prompt. Generate/use defaults where possible.
  --observability      Start SkyWalking profile as well.
  -h, --help           Show help.

Examples:
  bash scripts/uat-deploy.sh
  bash scripts/uat-deploy.sh --non-interactive
  bash scripts/uat-deploy.sh --observability
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --reset-db) RESET_DB=true ;;
    --non-interactive) NON_INTERACTIVE=true ;;
    --observability) WITH_OBSERVABILITY=true ;;
    -h|--help) usage; exit 0 ;;
    *) echo "Unknown option: $1" >&2; usage; exit 1 ;;
  esac
  shift
done

require_command() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Missing required command: $1" >&2
    exit 1
  fi
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
  if grep -qE "^${key}=" "$ENV_FILE"; then
    python3 - "$ENV_FILE" "$key" "$value" <<'PY'
from pathlib import Path
import sys
path, key, value = Path(sys.argv[1]), sys.argv[2], sys.argv[3]
lines = path.read_text().splitlines()
for idx, line in enumerate(lines):
    if line.startswith(key + "="):
        lines[idx] = f"{key}={value}"
path.write_text("\n".join(lines) + "\n")
PY
  else
    printf '%s=%s\n' "$key" "$value" >> "$ENV_FILE"
  fi
}

random_secret() {
  if command -v openssl >/dev/null 2>&1; then
    openssl rand -base64 32 | tr -d '\n'
  else
    date +%s%N | shasum -a 256 | awk '{print $1}'
  fi
}

detect_host() {
  if command -v hostname >/dev/null 2>&1; then
    local ip
    ip="$(hostname -I 2>/dev/null | awk '{print $1}' || true)"
    if [[ -n "$ip" ]]; then
      printf '%s' "$ip"
      return
    fi
  fi
  printf '127.0.0.1'
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

wait_for_container_healthy() {
  local container="$1"
  local timeout="${2:-180}"
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
      docker logs --tail=80 "$container" 2>/dev/null || true
      return 1
    fi
    sleep 3
  done
}

wait_for_http_status() {
  local name="$1"
  local url="$2"
  local timeout="${3:-180}"
  local start
  start="$(date +%s)"
  while true; do
    if curl -fsS "$url" 2>/dev/null | grep -q '"status"[[:space:]]*:[[:space:]]*"UP"'; then
      return 0
    fi
    if (( $(date +%s) - start > timeout )); then
      echo "Timed out waiting for $name health: $url" >&2
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
    docker logs --tail=120 "$container" 2>/dev/null || true
    exit 1
  fi
}

compose() {
  local args=(--env-file "$ENV_FILE" -f "$COMPOSE_FILE")
  if [[ "$WITH_OBSERVABILITY" == "true" ]]; then
    args=(--env-file "$ENV_FILE" -f "$COMPOSE_FILE" --profile observability)
  fi
  docker compose "${args[@]}" "$@"
}

init_env_if_needed() {
  if [[ -f "$ENV_FILE" ]]; then
    echo "Using existing $ENV_FILE"
  else
    echo "Creating $ENV_FILE from .env.example"
    cp "$ROOT_DIR/.env.example" "$ENV_FILE"
  fi

  local public_host
  public_host="$(prompt_value "UAT public IP/domain for browser access" "$(detect_host)")"
  local protocol
  protocol="$(prompt_value "Public protocol" "http")"

  local gateway_port
  gateway_port="$(env_value KPM_GATEWAY_PORT 19080)"
  local frontend_port
  frontend_port="$(env_value KPM_FRONTEND_PORT 14173)"

  set_env_value VITE_KPM_API_BASE "${protocol}://${public_host}:${gateway_port}"

  if [[ "$(env_value KPM_AUTH_TOKEN_SECRET kpm-local-dev-secret-change-me)" == "kpm-local-dev-secret-change-me" ]]; then
    set_env_value KPM_AUTH_TOKEN_SECRET "$(random_secret)"
  fi
  if [[ "$(env_value KPM_DB_PASSWORD kpm_dev_password)" == "kpm_dev_password" ]]; then
    set_env_value KPM_DB_PASSWORD "kpm_$(random_secret | tr -dc 'A-Za-z0-9' | head -c 24)"
  fi

  echo
  echo "UAT browser URLs will be:"
  echo "  Internal system: ${protocol}://${public_host}:${frontend_port}/#/login"
  echo "  Customer portal: ${protocol}://${public_host}:${frontend_port}/#/customer-login"
  echo "  Gateway API:      ${protocol}://${public_host}:${gateway_port}"
  echo
}

database_has_schema() {
  local db_user db_name
  db_user="$(env_value KPM_DB_USER kpm)"
  db_name="$(env_value KPM_DB_NAME kpm)"
  docker exec kpm-postgres psql -U "$db_user" -d "$db_name" -tAc "select to_regclass('public.kpm_users') is not null" 2>/dev/null | grep -q t
}

initialize_database_if_needed() {
  local db_user db_name
  db_user="$(env_value KPM_DB_USER kpm)"
  db_name="$(env_value KPM_DB_NAME kpm)"

  if [[ "$RESET_DB" == "true" ]]; then
    if [[ "$NON_INTERACTIVE" != "true" ]]; then
      echo "WARNING: --reset-db will drop and recreate KPM tables in database '$db_name'."
      read -r -p "Type RESET to continue: " confirmation
      if [[ "$confirmation" != "RESET" ]]; then
        echo "Database reset cancelled."
        exit 1
      fi
    fi
    echo "Resetting database schema and seed data..."
    cat "$ROOT_DIR/infra/database/schema.sql" "$ROOT_DIR/infra/database/seed.sql" \
      | docker exec -i kpm-postgres psql -v ON_ERROR_STOP=1 -U "$db_user" -d "$db_name"
    return
  fi

  if database_has_schema; then
    echo "Database schema already exists; skip initialization."
    return
  fi

  echo "Initializing empty database schema and seed data..."
  cat "$ROOT_DIR/infra/database/schema.sql" "$ROOT_DIR/infra/database/seed.sql" \
    | docker exec -i kpm-postgres psql -v ON_ERROR_STOP=1 -U "$db_user" -d "$db_name"
}

health_summary() {
  local gateway_port iam_port resource_port project_port customer_port task_port order_port file_port analytics_port integration_port notification_port frontend_port nacos_console_port
  gateway_port="$(env_value KPM_GATEWAY_PORT 19080)"
  iam_port="$(env_value KPM_IAM_PORT 19101)"
  resource_port="$(env_value KPM_RESOURCE_PORT 19102)"
  project_port="$(env_value KPM_PROJECT_PORT 19103)"
  customer_port="$(env_value KPM_CUSTOMER_PORT 19104)"
  task_port="$(env_value KPM_TASK_PORT 19105)"
  order_port="$(env_value KPM_ORDER_PORT 19106)"
  file_port="$(env_value KPM_FILE_PORT 19107)"
  analytics_port="$(env_value KPM_ANALYTICS_PORT 19108)"
  integration_port="$(env_value KPM_INTEGRATION_PORT 19109)"
  notification_port="$(env_value KPM_NOTIFICATION_PORT 19110)"
  frontend_port="$(env_value KPM_FRONTEND_PORT 14173)"
  nacos_console_port="$(env_value KPM_NACOS_CONSOLE_PORT 18849)"

  echo
  echo "Health checks:"
  for item in \
    "gateway http://127.0.0.1:${gateway_port}/actuator/health" \
    "iam http://127.0.0.1:${iam_port}/actuator/health" \
    "resource http://127.0.0.1:${resource_port}/actuator/health" \
    "project http://127.0.0.1:${project_port}/actuator/health" \
    "customer http://127.0.0.1:${customer_port}/actuator/health" \
    "task http://127.0.0.1:${task_port}/actuator/health" \
    "order http://127.0.0.1:${order_port}/actuator/health" \
    "file http://127.0.0.1:${file_port}/actuator/health" \
    "analytics http://127.0.0.1:${analytics_port}/actuator/health" \
    "integration http://127.0.0.1:${integration_port}/actuator/health" \
    "notification http://127.0.0.1:${notification_port}/actuator/health"; do
    local name="${item%% *}"
    local url="${item#* }"
    printf '  %-14s ' "$name:"
    curl -fsS "$url" 2>/dev/null | python3 -c 'import sys,json; print(json.load(sys.stdin).get("status"))' 2>/dev/null || echo "N/A"
  done

  echo
  echo "KPM UAT deployment completed."
  echo "  Frontend:       http://127.0.0.1:${frontend_port}/#/login"
  echo "  Customer portal:http://127.0.0.1:${frontend_port}/#/customer-login"
  echo "  Gateway:        http://127.0.0.1:${gateway_port}"
  echo "  Nacos Console:  http://127.0.0.1:${nacos_console_port}/"
  echo
  echo "Default admin account:"
  echo "  admin@kozenmobile.com / 123456"
}

main() {
  require_command docker
  require_command curl
  require_command python3

  if ! docker compose version >/dev/null 2>&1; then
    echo "Docker Compose v2 is required: docker compose version" >&2
    exit 1
  fi

  cd "$ROOT_DIR"
  init_env_if_needed

  echo "Starting infrastructure: postgres, valkey, nacos..."
  compose up -d postgres valkey nacos
  wait_for_container_healthy kpm-postgres 180
  wait_for_container_healthy kpm-valkey 180
  wait_for_container_healthy kpm-nacos 240

  echo "Publishing Nacos configs..."
  compose up -d --force-recreate nacos-config-publisher
  wait_for_container_success kpm-nacos-config-publisher

  initialize_database_if_needed

  echo "Building backend services..."
  compose up -d --force-recreate backend-builder
  wait_for_container_success kpm-backend-builder

  echo "Starting backend services and frontend..."
  compose up -d iam-service resource-service project-service customer-service task-service order-service file-service analytics-service integration-service notification-service gateway frontend

  wait_for_http_status gateway "http://127.0.0.1:$(env_value KPM_GATEWAY_PORT 19080)/actuator/health" 240
  health_summary
}

main "$@"
