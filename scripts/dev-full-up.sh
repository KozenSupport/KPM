#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
COMPOSE_FILE="$ROOT_DIR/infra/docker-compose/dev/docker-compose.yml"
ENV_FILE="$ROOT_DIR/.env"

if [[ ! -f "$ENV_FILE" ]]; then
  echo "Missing $ENV_FILE. Copy .env.example to .env and fill required values first." >&2
  exit 1
fi

# The ad-hoc *-dev containers use the same ports as the full compose stack.
# Remove them before starting the compose-managed containers to make deployment repeatable.
dev_containers="$(docker ps -a --format '{{.Names}}' | grep -E '^kpm-.*-dev$' || true)"
if [[ -n "$dev_containers" ]]; then
  echo "$dev_containers" | xargs docker rm -f >/dev/null
fi

cd "$ROOT_DIR"
docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" up -d

env_value() {
  local key="$1"
  local fallback="$2"
  local value
  value="$(grep -E "^${key}=" "$ENV_FILE" | tail -1 | cut -d= -f2- || true)"
  if [[ -z "$value" ]]; then
    printf '%s' "$fallback"
  else
    printf '%s' "$value"
  fi
}

echo "KPM full stack is starting."
echo "Frontend: http://127.0.0.1:$(env_value KPM_FRONTEND_PORT 14173)"
echo "Gateway:  http://127.0.0.1:$(env_value KPM_GATEWAY_PORT 19080)"
echo "Nacos:    http://127.0.0.1:$(env_value KPM_NACOS_CONSOLE_PORT 18849)/"
