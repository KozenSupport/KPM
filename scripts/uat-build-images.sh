#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BACKEND_DIR="$ROOT_DIR/apps/backend"
FRONTEND_DIR="$ROOT_DIR/apps/frontend/kpm-web"
BACKEND_DOCKERFILE="$BACKEND_DIR/docker/Dockerfile.service"
FRONTEND_DOCKERFILE="$FRONTEND_DIR/docker/Dockerfile.uat"

REGISTRY="${KPM_IMAGE_REGISTRY:-ghcr.io/kozensupport}"
TAG="${KPM_IMAGE_TAG:-}"
PUSH=false
NO_CACHE=false
SKIP_BACKEND_BUILD=false
FRONTEND_API_BASE="${VITE_KPM_API_BASE:-}"

MODULES=(
  kpm-gateway
  kpm-iam-service
  kpm-resource-service
  kpm-project-service
  kpm-customer-service
  kpm-task-service
  kpm-order-service
  kpm-file-service
  kpm-analytics-service
  kpm-integration-service
  kpm-notification-service
)

usage() {
  cat <<'USAGE'
Usage:
  bash scripts/uat-build-images.sh [options]

Options:
  --registry <registry>        Image registry/namespace. Default: ghcr.io/kozensupport
  --tag <tag>                  Image tag. Default: current git short SHA, or timestamp outside git.
  --push                       Push images after building.
  --no-cache                   Build images without Docker cache.
  --skip-backend-build         Do not run Maven package before building backend images.
  --frontend-api-base <url>    Optional browser API base. Leave empty to use same-origin /api via Nginx.
  -h, --help                   Show help.

Examples:
  bash scripts/uat-build-images.sh --push
  bash scripts/uat-build-images.sh --registry ghcr.io/kozensupport --tag uat-20260706 --push
USAGE
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --registry) REGISTRY="$2"; shift 2 ;;
    --tag) TAG="$2"; shift 2 ;;
    --push) PUSH=true; shift ;;
    --no-cache) NO_CACHE=true; shift ;;
    --skip-backend-build) SKIP_BACKEND_BUILD=true; shift ;;
    --frontend-api-base) FRONTEND_API_BASE="$2"; shift 2 ;;
    -h|--help) usage; exit 0 ;;
    *) echo "Unknown option: $1" >&2; usage; exit 1 ;;
  esac
done

if [[ -z "$TAG" ]]; then
  TAG="$(git -C "$ROOT_DIR" rev-parse --short HEAD 2>/dev/null || date +%Y%m%d%H%M%S)"
fi

require_command() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Missing required command: $1" >&2
    exit 1
  fi
}

require_command docker
mkdir -p "$ROOT_DIR/.m2" "$ROOT_DIR/.release"

if [[ "$SKIP_BACKEND_BUILD" != "true" ]]; then
  echo "Building backend JARs with Maven container..."
  docker run --rm \
    -v "$BACKEND_DIR:/workspace" \
    -v "$ROOT_DIR/.m2:/root/.m2" \
    -w /workspace \
    maven:3.9.11-eclipse-temurin-21 \
    mvn -q -DskipTests package
fi

build_args=()
if [[ "$NO_CACHE" == "true" ]]; then
  build_args+=(--no-cache)
fi

for module in "${MODULES[@]}"; do
  image="$REGISTRY/$module:$TAG"
  echo "Building $image"
  docker build "${build_args[@]}" \
    -f "$BACKEND_DOCKERFILE" \
    --build-arg SERVICE_NAME="$module" \
    --build-arg SERVICE_VERSION="0.1.0-SNAPSHOT" \
    -t "$image" \
    "$BACKEND_DIR"
  if [[ "$PUSH" == "true" ]]; then
    docker push "$image"
  fi
done

frontend_image="$REGISTRY/kpm-frontend:$TAG"
echo "Building $frontend_image"
docker build "${build_args[@]}" \
  -f "$FRONTEND_DOCKERFILE" \
  --build-arg VITE_KPM_API_BASE="$FRONTEND_API_BASE" \
  -t "$frontend_image" \
  "$FRONTEND_DIR"
if [[ "$PUSH" == "true" ]]; then
  docker push "$frontend_image"
fi

cat > "$ROOT_DIR/.release/last-uat-images.env" <<ENV
KPM_IMAGE_REGISTRY=$REGISTRY
KPM_IMAGE_TAG=$TAG
ENV

echo
echo "UAT images are ready."
echo "Registry: $REGISTRY"
echo "Tag:      $TAG"
echo "Image metadata saved to: $ROOT_DIR/.release/last-uat-images.env"
