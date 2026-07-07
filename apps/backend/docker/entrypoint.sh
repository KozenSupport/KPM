#!/bin/sh
set -eu

SERVICE_NAME="${KPM_SERVICE_NAME:-kpm-service}"
COLLECTOR_BACKEND="${KPM_SKYWALKING_COLLECTOR_BACKEND_SERVICES:-skywalking-oap:11800}"

exec java \
  -Dskywalking.agent.service_name="${SERVICE_NAME}" \
  -Dskywalking.collector.backend_service="${COLLECTOR_BACKEND}" \
  -jar /app/app.jar
