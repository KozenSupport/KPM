#!/usr/bin/env bash
set -euo pipefail
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
COMPOSE_FILE="$ROOT_DIR/infra/docker-compose/dev/docker-compose.yml"

docker compose -f "$COMPOSE_FILE" up -d postgres valkey nacos

echo "KPM dev infrastructure is starting:"
echo "- PostgreSQL: 127.0.0.1:5432 / db=kpm / user=kpm"
echo "- Valkey:     127.0.0.1:6379"
echo "- Nacos API:      http://127.0.0.1:8848"
echo "- Nacos Console:  http://127.0.0.1:8849/"
