#!/usr/bin/env bash
set -euo pipefail
if [[ $# -ne 1 ]]; then
  echo "Usage: $0 <module-name>"
  echo "Example: $0 kpm-iam-service"
  exit 1
fi

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
MODULE="$1"
DOCKER_NETWORK="${KPM_DOCKER_NETWORK:-kpm-dev_default}"
PORT=""
case "$MODULE" in
  kpm-gateway) PORT=8080 ;;
  kpm-iam-service) PORT=8101 ;;
  kpm-resource-service) PORT=8102 ;;
  kpm-project-service) PORT=8103 ;;
  kpm-customer-service) PORT=8104 ;;
  kpm-task-service) PORT=8105 ;;
  kpm-order-service) PORT=8106 ;;
  kpm-file-service) PORT=8107 ;;
  kpm-analytics-service) PORT=8108 ;;
  kpm-integration-service) PORT=8109 ;;
  kpm-notification-service) PORT=8110 ;;
  *) echo "Unknown module: $MODULE"; exit 1 ;;
esac

DEFAULT_NACOS_CONFIG_ENABLED="${KPM_NACOS_CONFIG_ENABLED:-true}"

mkdir -p "$ROOT_DIR/.m2"

if ! docker network inspect "$DOCKER_NETWORK" >/dev/null 2>&1; then
  echo "Docker network '$DOCKER_NETWORK' was not found. Start infra first with: ./scripts/dev-infra-up.sh" >&2
  exit 1
fi

docker run -d --rm \
  --name "$MODULE-dev" \
  --network "$DOCKER_NETWORK" \
  -p "$PORT:$PORT" \
  -e KPM_NACOS_ADDR="${KPM_NACOS_ADDR:-kpm-nacos:8848}" \
  -e KPM_NACOS_ENABLED="${KPM_NACOS_ENABLED:-true}" \
  -e KPM_NACOS_CONFIG_ENABLED="$DEFAULT_NACOS_CONFIG_ENABLED" \
  -e KPM_NACOS_CONFIG_GROUP="${KPM_NACOS_CONFIG_GROUP:-DEFAULT_GROUP}" \
  -e KPM_NACOS_NAMESPACE="${KPM_NACOS_NAMESPACE:-public}" \
  -e KPM_AUTH_ENABLED="${KPM_AUTH_ENABLED:-true}" \
  -e KPM_AUTH_TOKEN_SECRET="${KPM_AUTH_TOKEN_SECRET:-kpm-local-dev-secret-change-me}" \
  -e JAVA_TOOL_OPTIONS="${KPM_JAVA_TOOL_OPTIONS:--Xms32m -Xmx192m -XX:+UseG1GC}" \
  -e KPM_DB_HOST="${KPM_DB_HOST:-kpm-postgres}" \
  -e KPM_DB_PORT="${KPM_DB_PORT:-5432}" \
  -e KPM_DB_NAME="${KPM_DB_NAME:-kpm}" \
  -e KPM_DB_USER="${KPM_DB_USER:-kpm}" \
  -e KPM_DB_PASSWORD="${KPM_DB_PASSWORD:-kpm_dev_password}" \
  -e KPM_IAM_URI="${KPM_IAM_URI:-http://kpm-iam-service-dev:8101}" \
  -e KPM_RESOURCE_URI="${KPM_RESOURCE_URI:-http://kpm-resource-service-dev:8102}" \
  -e KPM_PROJECT_URI="${KPM_PROJECT_URI:-http://kpm-project-service-dev:8103}" \
  -e KPM_CUSTOMER_URI="${KPM_CUSTOMER_URI:-http://kpm-customer-service-dev:8104}" \
  -e KPM_TASK_URI="${KPM_TASK_URI:-http://kpm-task-service-dev:8105}" \
  -e KPM_ORDER_URI="${KPM_ORDER_URI:-http://kpm-order-service-dev:8106}" \
  -e KPM_FILE_URI="${KPM_FILE_URI:-http://kpm-file-service-dev:8107}" \
  -e KPM_ANALYTICS_URI="${KPM_ANALYTICS_URI:-http://kpm-analytics-service-dev:8108}" \
  -e KPM_NOTIFICATION_URI="${KPM_NOTIFICATION_URI:-http://kpm-notification-service-dev:8110}" \
  -e KPM_NOTIFICATION_REFRESH_INTERVAL_SECONDS="${KPM_NOTIFICATION_REFRESH_INTERVAL_SECONDS:-120}" \
  -v "$ROOT_DIR/apps/backend:/workspace" \
  -v "$ROOT_DIR/.m2:/root/.m2" \
  -w /workspace \
  maven:3.9.11-eclipse-temurin-21 \
  sh -lc "JAR='$MODULE/target/$MODULE-0.1.0-SNAPSHOT.jar'; if [ ! -f \"\$JAR\" ]; then mvn -q -pl '$MODULE' -am -DskipTests package; fi; cp \"\$JAR\" '/tmp/$MODULE.jar' && exec /opt/java/openjdk/bin/java -jar '/tmp/$MODULE.jar'"
