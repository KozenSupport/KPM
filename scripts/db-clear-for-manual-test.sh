#!/usr/bin/env bash
set -euo pipefail
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
docker exec -i kpm-postgres psql -U kpm -d kpm < "$ROOT_DIR/infra/database/reset-manual-test.sql"
