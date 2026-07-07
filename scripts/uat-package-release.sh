#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REGISTRY="${KPM_IMAGE_REGISTRY:-ghcr.io/kozensupport}"
TAG="${KPM_IMAGE_TAG:-}"

usage() {
  cat <<'USAGE'
Usage:
  bash scripts/uat-package-release.sh [options]

Options:
  --registry <registry>    Image registry/namespace. Default: ghcr.io/kozensupport
  --tag <tag>              Image tag. Default: last built tag, current git short SHA, or timestamp.
  -h, --help               Show help.

The generated tarball contains deployment files only: compose, env template,
DB initialization SQL, Nacos config publisher and server deploy script. It does
not contain frontend or backend source code.
USAGE
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --registry) REGISTRY="$2"; shift 2 ;;
    --tag) TAG="$2"; shift 2 ;;
    -h|--help) usage; exit 0 ;;
    *) echo "Unknown option: $1" >&2; usage; exit 1 ;;
  esac
done

if [[ -z "$TAG" && -f "$ROOT_DIR/.release/last-uat-images.env" ]]; then
  # shellcheck disable=SC1091
  source "$ROOT_DIR/.release/last-uat-images.env"
  REGISTRY="${KPM_IMAGE_REGISTRY:-$REGISTRY}"
  TAG="${KPM_IMAGE_TAG:-}"
fi
if [[ -z "$TAG" ]]; then
  TAG="$(git -C "$ROOT_DIR" rev-parse --short HEAD 2>/dev/null || date +%Y%m%d%H%M%S)"
fi

RELEASE_ROOT="$ROOT_DIR/.release"
RELEASE_NAME="kpm-uat-$TAG"
RELEASE_DIR="$RELEASE_ROOT/$RELEASE_NAME"
TARBALL="$RELEASE_ROOT/$RELEASE_NAME.tar.gz"

rm -rf "$RELEASE_DIR"
mkdir -p \
  "$RELEASE_DIR/infra/docker-compose/uat" \
  "$RELEASE_DIR/infra/database" \
  "$RELEASE_DIR/scripts" \
  "$RELEASE_DIR/docs/05-delivery"

cp "$ROOT_DIR/infra/docker-compose/uat/docker-compose.yml" "$RELEASE_DIR/infra/docker-compose/uat/docker-compose.yml"
cp "$ROOT_DIR/infra/database/schema.sql" "$RELEASE_DIR/infra/database/schema.sql"
cp "$ROOT_DIR/infra/database/seed.sql" "$RELEASE_DIR/infra/database/seed.sql"
cp "$ROOT_DIR/scripts/nacos-publish-service-configs.sh" "$RELEASE_DIR/scripts/nacos-publish-service-configs.sh"
cp "$ROOT_DIR/scripts/uat-server-deploy.sh" "$RELEASE_DIR/scripts/uat-server-deploy.sh"
cp "$ROOT_DIR/docs/05-delivery/deployment.md" "$RELEASE_DIR/docs/05-delivery/deployment.md"
cp "$ROOT_DIR/.env.example" "$RELEASE_DIR/.env.example"

python3 - "$RELEASE_DIR/.env.example" "$REGISTRY" "$TAG" <<'PY'
from pathlib import Path
import sys
path = Path(sys.argv[1])
registry, tag = sys.argv[2], sys.argv[3]
lines = path.read_text().splitlines()
values = {"KPM_IMAGE_REGISTRY": registry, "KPM_IMAGE_TAG": tag}
seen = set()
out = []
for line in lines:
    key = line.split("=", 1)[0] if "=" in line and not line.lstrip().startswith("#") else None
    if key in values:
        out.append(f"{key}={values[key]}")
        seen.add(key)
    else:
        out.append(line)
if "KPM_IMAGE_REGISTRY" not in seen or "KPM_IMAGE_TAG" not in seen:
    out.extend(["", "# UAT image release", f"KPM_IMAGE_REGISTRY={registry}", f"KPM_IMAGE_TAG={tag}"])
path.write_text("\n".join(out).rstrip() + "\n")
PY

printf '%s\n' "$TAG" > "$RELEASE_DIR/VERSION"
chmod +x "$RELEASE_DIR/scripts/uat-server-deploy.sh" "$RELEASE_DIR/scripts/nacos-publish-service-configs.sh"

tar -C "$RELEASE_ROOT" -czf "$TARBALL" "$RELEASE_NAME"

echo "UAT deployment package created: $TARBALL"
echo "Package directory: $RELEASE_DIR"
echo "Registry: $REGISTRY"
echo "Tag:      $TAG"
