#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DB_CONTAINER="${KPM_DB_CONTAINER:-kpm-postgres}"
DB_NAME="${KPM_DB_NAME:-kpm}"
DB_USER="${KPM_DB_USER:-kpm}"

cat "$ROOT_DIR/infra/database/schema.sql" "$ROOT_DIR/infra/database/seed.sql" \
  | docker exec -i "$DB_CONTAINER" psql -U "$DB_USER" -d "$DB_NAME"

echo "KPM database reset completed: container=$DB_CONTAINER db=$DB_NAME user=$DB_USER"
