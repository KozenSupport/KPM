#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

MODULES=(
  kpm-iam-service
  kpm-resource-service
  kpm-project-service
  kpm-customer-service
  kpm-task-service
  kpm-order-service
  kpm-file-service
  kpm-analytics-service
  kpm-notification-service
  kpm-gateway
)

for module in "${MODULES[@]}"; do
  docker stop "${module}-dev" >/dev/null 2>&1 || true
done

for module in "${MODULES[@]}"; do
  ./scripts/backend-run-service-docker.sh "$module"
  echo "Started ${module}"
done

cat <<MSG
KPM backend smoke services are starting.
Gateway: http://127.0.0.1:8080
File status: http://127.0.0.1:8080/api/files/oss/status
MSG
