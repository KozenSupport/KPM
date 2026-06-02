#!/usr/bin/env bash
set -euo pipefail

check() {
  local label="$1"
  shift
  printf "%-18s" "$label"
  if "$@" >/tmp/kpm-check.out 2>&1; then
    echo "OK"
    sed 's/^/  /' /tmp/kpm-check.out | head -n 2
  else
    echo "MISSING"
    sed 's/^/  /' /tmp/kpm-check.out | head -n 2 || true
  fi
}

check "Java" java -version
check "Javac" javac -version
check "Maven" mvn -v
check "Node" node -v
check "NPM" npm -v
check "Docker" docker --version
check "Docker Compose" docker compose version

rm -f /tmp/kpm-check.out
