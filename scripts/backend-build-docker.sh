#!/usr/bin/env bash
set -euo pipefail
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
mkdir -p "$ROOT_DIR/.m2"

docker run --rm \
  -v "$ROOT_DIR/apps/backend:/workspace" \
  -v "$ROOT_DIR/.m2:/root/.m2" \
  -w /workspace \
  maven:3.9.11-eclipse-temurin-21 \
  sh -lc "if [ \$# -gt 0 ]; then mvn -DskipTests -pl \"\$1\" -am package; else mvn -DskipTests package; fi" sh "$@"
