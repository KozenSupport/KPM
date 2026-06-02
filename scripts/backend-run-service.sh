#!/usr/bin/env bash
set -euo pipefail
if [[ $# -ne 1 ]]; then
  echo "Usage: $0 <module-name>"
  echo "Example: $0 kpm-iam-service"
  exit 1
fi
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
MODULE="$1"
cd "$ROOT_DIR/apps/backend"

mvn -q -pl "$MODULE" -am -DskipTests install
mvn -pl "$MODULE" spring-boot:run
