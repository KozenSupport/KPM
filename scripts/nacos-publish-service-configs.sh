#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
LOCAL_NACOS_CONFIG_DIR="${KPM_LOCAL_NACOS_CONFIG_DIR:-$ROOT_DIR/.local/nacos/configs}"
mkdir -p "$LOCAL_NACOS_CONFIG_DIR"

NACOS_ADDR="${KPM_NACOS_ADDR:-127.0.0.1:${KPM_NACOS_PORT:-18848}}"
NAMESPACE="${KPM_NACOS_NAMESPACE:-public}"
GROUP="${KPM_NACOS_CONFIG_GROUP:-DEFAULT_GROUP}"
DB_HOST="${KPM_DB_HOST:-kpm-postgres}"
DB_PORT="${KPM_DB_PORT:-5432}"
DB_NAME="${KPM_DB_NAME:-kpm}"
DB_USER="${KPM_DB_USER:-kpm}"
DB_PASSWORD="${KPM_DB_PASSWORD:-kpm_dev_password}"
AUTH_SECRET="${KPM_AUTH_TOKEN_SECRET:-kpm-local-dev-secret-change-me}"
DB_TIMEZONE="${KPM_DB_TIMEZONE:-Asia/Shanghai}"
DB_JDBC_URL="jdbc:postgresql://${DB_HOST}:${DB_PORT}/${DB_NAME}?stringtype=unspecified&options=-c%20TimeZone%3D${DB_TIMEZONE}"

publish() {
  local data_id="$1"
  local content="$2"
  curl -fsS -X POST "http://${NACOS_ADDR}/nacos/v1/cs/configs" \
    --data-urlencode "tenant=${NAMESPACE}" \
    --data-urlencode "group=${GROUP}" \
    --data-urlencode "dataId=${data_id}" \
    --data-urlencode "content=${content}" >/dev/null
  maybe_backup_config "${data_id}" "${content}"
  echo "Published ${data_id} to namespace=${NAMESPACE}, group=${GROUP}"
}

config_backup_path() {
  local data_id="$1"
  printf '%s/%s' "$LOCAL_NACOS_CONFIG_DIR" "$data_id"
}

maybe_backup_config() {
  local data_id="$1"
  local content="$2"
  if has_non_empty_secret "${content}"; then
    local backup_path
    backup_path="$(config_backup_path "$data_id")"
    umask 077
    printf '%s
' "${content}" > "${backup_path}"
    chmod 600 "${backup_path}"
  fi
}

has_non_empty_secret() {
  local content="$1"
  printf '%s
' "${content}" | grep -Eq 'access-key-secret:[[:space:]]*[^[:space:]]+'
}

fetch_backup_config() {
  local data_id="$1"
  local backup_path
  backup_path="$(config_backup_path "$data_id")"
  if [[ -f "$backup_path" ]]; then
    cat "$backup_path"
  fi
}

fetch_config() {
  local data_id="$1"
  curl -fsS -G "http://${NACOS_ADDR}/nacos/v1/cs/configs" \
    --data-urlencode "tenant=${NAMESPACE}" \
    --data-urlencode "group=${GROUP}" \
    --data-urlencode "dataId=${data_id}" 2>/dev/null || true
}

extract_oss_block() {
  awk '
    /^  oss:/ { in_oss=1 }
    in_oss && /^  [A-Za-z0-9_-]+:/ && !/^  oss:/ { exit }
    in_oss { print }
  '
}

normalize_oss_block() {
  local content="$1"
  local enabled="${KPM_OSS_ENABLED:-true}"
  printf '%s\n' "${content}" | awk -v enabled="${enabled}" '
    BEGIN { seen_enabled=0 }
    /^[[:space:]]+enabled:/ {
      print "    enabled: " enabled
      seen_enabled=1
      next
    }
    { print }
    END {
      if (!seen_enabled) {
        print "    enabled: " enabled
      }
    }
  '
}

file_oss_config_block() {
  if [[ -n "${KPM_OSS_ACCESS_KEY_ID:-}" && -n "${KPM_OSS_ACCESS_KEY_SECRET:-}" ]]; then
    cat <<YAML
  oss:
    enabled: ${KPM_OSS_ENABLED:-true}
    endpoint: ${KPM_OSS_ENDPOINT:-https://oss-cn-shanghai.aliyuncs.com}
    bucket: ${KPM_OSS_BUCKET:-xc-kozen-sh-fw}
    root-prefix: ${KPM_OSS_ROOT_PREFIX:-KPM/}
    access-key-id: ${KPM_OSS_ACCESS_KEY_ID}
    access-key-secret: ${KPM_OSS_ACCESS_KEY_SECRET}
    download-url-expiration-seconds: ${KPM_OSS_DOWNLOAD_URL_EXPIRE_SECONDS:-900}
YAML
    return
  fi

  local existing_oss
  existing_oss="$(fetch_config kpm-file-service.yaml | extract_oss_block)"
  if [[ -n "${existing_oss}" ]] && has_non_empty_secret "${existing_oss}"; then
    normalize_oss_block "${existing_oss}"
    return
  fi

  local backup_oss
  backup_oss="$(fetch_backup_config kpm-file-service.yaml | extract_oss_block)"
  if [[ -n "${backup_oss}" ]] && has_non_empty_secret "${backup_oss}"; then
    normalize_oss_block "${backup_oss}"
    return
  fi

  cat <<YAML
  oss:
    enabled: ${KPM_OSS_ENABLED:-false}
    endpoint: ${KPM_OSS_ENDPOINT:-https://oss-cn-shanghai.aliyuncs.com}
    bucket: ${KPM_OSS_BUCKET:-xc-kozen-sh-fw}
    root-prefix: ${KPM_OSS_ROOT_PREFIX:-KPM/}
    access-key-id: ${KPM_OSS_ACCESS_KEY_ID:-}
    access-key-secret: ${KPM_OSS_ACCESS_KEY_SECRET:-}
    download-url-expiration-seconds: ${KPM_OSS_DOWNLOAD_URL_EXPIRE_SECONDS:-900}
YAML
}

logging_root_block() {
  cat <<YAML
logging:
  level:
    root: ${KPM_LOG_LEVEL_ROOT:-INFO}
    com.kozen.kpm: ${KPM_LOG_LEVEL_APP:-INFO}
YAML
}

mail_config_block() {
  cat <<YAML
  mail:
    host: ${KPM_MAIL_HOST:-}
    port: ${KPM_MAIL_PORT:-587}
    username: ${KPM_MAIL_USERNAME:-}
    password: ${KPM_MAIL_PASSWORD:-}
    properties:
      mail:
        smtp:
          auth: ${KPM_MAIL_SMTP_AUTH:-true}
          starttls:
            enable: ${KPM_MAIL_STARTTLS_ENABLE:-true}
YAML
}

mail_health_block() {
  cat <<YAML
management:
  health:
    mail:
      enabled: ${KPM_MAIL_HEALTH_ENABLED:-${KPM_ERROR_ALERT_ENABLED:-false}}
YAML
}

kpm_logging_block() {
  cat <<YAML
  logging:
    enabled: ${KPM_APP_LOGGING_ENABLED:-true}
    controller-log-enabled: ${KPM_CONTROLLER_LOG_ENABLED:-true}
    response-log-enabled: ${KPM_RESPONSE_LOG_ENABLED:-true}
    service-log-enabled: ${KPM_SERVICE_LOG_ENABLED:-true}
    max-payload-length: ${KPM_LOG_MAX_PAYLOAD_LENGTH:-2000}
    error-alert:
      enabled: ${KPM_ERROR_ALERT_ENABLED:-false}
      threshold: ${KPM_ERROR_ALERT_THRESHOLD:-5}
      window-seconds: ${KPM_ERROR_ALERT_WINDOW_SECONDS:-60}
      cooldown-seconds: ${KPM_ERROR_ALERT_COOLDOWN_SECONDS:-300}
      mail-from: ${KPM_ERROR_ALERT_MAIL_FROM:-noreply@kozen.example}
      recipients: ${KPM_ERROR_ALERT_RECIPIENTS:-[]}
YAML
}

base_config() {
  local port="$1"
  local code="$2"
  cat <<YAML
server:
  port: ${port}
$(logging_root_block)
spring:
  datasource:
    url: ${DB_JDBC_URL}
    username: ${DB_USER}
    password: ${DB_PASSWORD}
    hikari:
      maximum-pool-size: ${KPM_DB_POOL_MAX_SIZE:-5}
      minimum-idle: ${KPM_DB_POOL_MIN_IDLE:-1}
      connection-init-sql: SET TIME ZONE '${DB_TIMEZONE}'
$(mail_config_block)
$(mail_health_block)
kpm:
  service:
    code: ${code}
  auth:
    token-secret: ${AUTH_SECRET}
    token-ttl-seconds: ${KPM_AUTH_TOKEN_TTL_SECONDS:-7200}
$(kpm_logging_block)
YAML
}

redis_config_block() {
  cat <<YAML
  data:
    redis:
      host: ${KPM_VALKEY_HOST:-valkey}
      port: ${KPM_VALKEY_PORT:-6379}
YAML
}

publish kpm-iam-service.yaml "$(cat <<YAML
server:
  port: 8101
$(logging_root_block)
spring:
$(redis_config_block)
  datasource:
    url: ${DB_JDBC_URL}
    username: ${DB_USER}
    password: ${DB_PASSWORD}
    hikari:
      maximum-pool-size: ${KPM_DB_POOL_MAX_SIZE:-5}
      minimum-idle: ${KPM_DB_POOL_MIN_IDLE:-1}
      connection-init-sql: SET TIME ZONE '${DB_TIMEZONE}'
  mail:
    host: ${KPM_MAIL_HOST:-}
    port: ${KPM_MAIL_PORT:-587}
    username: ${KPM_MAIL_USERNAME:-}
    password: ${KPM_MAIL_PASSWORD:-}
    properties:
      mail:
        smtp:
          auth: ${KPM_MAIL_SMTP_AUTH:-true}
          starttls:
            enable: ${KPM_MAIL_STARTTLS_ENABLE:-true}
management:
  health:
    mail:
      enabled: ${KPM_IAM_MAIL_HEALTH_ENABLED:-${KPM_IAM_MAIL_ENABLED:-false}}
kpm:
  service:
    code: iam
  auth:
    token-secret: ${AUTH_SECRET}
    token-ttl-seconds: ${KPM_AUTH_TOKEN_TTL_SECONDS:-7200}
  iam:
    password-code-ttl-seconds: ${KPM_IAM_PASSWORD_CODE_TTL_SECONDS:-600}
    otp-debug-enabled: ${KPM_IAM_OTP_DEBUG_ENABLED:-true}
    mail-enabled: ${KPM_IAM_MAIL_ENABLED:-false}
    mail-from: ${KPM_IAM_MAIL_FROM:-noreply@kozen.example}
$(kpm_logging_block)
YAML
)"
publish kpm-resource-service.yaml "$(cat <<YAML
server:
  port: 8102
$(logging_root_block)
spring:
$(redis_config_block)
  datasource:
    url: ${DB_JDBC_URL}
    username: ${DB_USER}
    password: ${DB_PASSWORD}
    hikari:
      maximum-pool-size: ${KPM_DB_POOL_MAX_SIZE:-5}
      minimum-idle: ${KPM_DB_POOL_MIN_IDLE:-1}
      connection-init-sql: SET TIME ZONE '${DB_TIMEZONE}'
$(mail_config_block)
$(mail_health_block)
kpm:
  service:
    code: resource
  auth:
    token-secret: ${AUTH_SECRET}
    token-ttl-seconds: ${KPM_AUTH_TOKEN_TTL_SECONDS:-7200}
  cache:
    resource:
      bootstrap-ttl-seconds: ${KPM_RESOURCE_BOOTSTRAP_CACHE_TTL_SECONDS:-60}
      bootstrap-jitter-seconds: ${KPM_RESOURCE_BOOTSTRAP_CACHE_JITTER_SECONDS:-20}
$(kpm_logging_block)
YAML
)"
publish kpm-project-service.yaml "$(base_config 8103 project)"
publish kpm-customer-service.yaml "$(cat <<YAML
server:
  port: 8104
$(logging_root_block)
spring:
$(redis_config_block)
  datasource:
    url: ${DB_JDBC_URL}
    username: ${DB_USER}
    password: ${DB_PASSWORD}
    hikari:
      maximum-pool-size: ${KPM_DB_POOL_MAX_SIZE:-5}
      minimum-idle: ${KPM_DB_POOL_MIN_IDLE:-1}
      connection-init-sql: SET TIME ZONE '${DB_TIMEZONE}'
  mail:
    host: ${KPM_MAIL_HOST:-}
    port: ${KPM_MAIL_PORT:-587}
    username: ${KPM_MAIL_USERNAME:-}
    password: ${KPM_MAIL_PASSWORD:-}
    properties:
      mail:
        smtp:
          auth: ${KPM_MAIL_SMTP_AUTH:-true}
          starttls:
            enable: ${KPM_MAIL_STARTTLS_ENABLE:-true}
management:
  health:
    mail:
      enabled: ${KPM_CUSTOMER_PORTAL_MAIL_HEALTH_ENABLED:-${KPM_CUSTOMER_PORTAL_MAIL_ENABLED:-false}}
kpm:
  service:
    code: customer
  auth:
    token-secret: ${AUTH_SECRET}
  customer-portal:
    code-ttl-seconds: ${KPM_CUSTOMER_PORTAL_CODE_TTL_SECONDS:-600}
    token-ttl-seconds: ${KPM_CUSTOMER_PORTAL_TOKEN_TTL_SECONDS:-28800}
    otp-debug-enabled: ${KPM_CUSTOMER_PORTAL_OTP_DEBUG_ENABLED:-true}
    mail-enabled: ${KPM_CUSTOMER_PORTAL_MAIL_ENABLED:-false}
    mail-from: ${KPM_CUSTOMER_PORTAL_MAIL_FROM:-noreply@kozen.example}
$(kpm_logging_block)
YAML
)"
publish kpm-task-service.yaml "$(base_config 8105 task)"
publish kpm-order-service.yaml "$(base_config 8106 order)"
publish kpm-integration-service.yaml "$(cat <<YAML
server:
  port: 8109
$(logging_root_block)
spring:
$(mail_config_block)
$(mail_health_block)
kpm:
  service:
    code: integration
  auth:
    token-secret: ${AUTH_SECRET}
$(kpm_logging_block)
YAML
)"

publish kpm-file-service.yaml "$(cat <<YAML
server:
  port: 8107
$(logging_root_block)
spring:
  servlet:
    multipart:
      max-file-size: ${KPM_UPLOAD_MAX_FILE_SIZE:-500MB}
      max-request-size: ${KPM_UPLOAD_MAX_REQUEST_SIZE:-520MB}
$(mail_config_block)
$(mail_health_block)
kpm:
  service:
    code: file
  auth:
    token-secret: ${AUTH_SECRET}
$(kpm_logging_block)
$(file_oss_config_block)
YAML
)"

publish kpm-analytics-service.yaml "$(cat <<YAML
server:
  port: 8108
$(logging_root_block)
spring:
$(redis_config_block)
  datasource:
    url: ${DB_JDBC_URL}
    username: ${DB_USER}
    password: ${DB_PASSWORD}
    hikari:
      maximum-pool-size: ${KPM_DB_POOL_MAX_SIZE:-5}
      minimum-idle: ${KPM_DB_POOL_MIN_IDLE:-1}
      connection-init-sql: SET TIME ZONE '${DB_TIMEZONE}'
$(mail_config_block)
$(mail_health_block)
kpm:
  service:
    code: analytics
  auth:
    token-secret: ${AUTH_SECRET}
  cache:
    analytics:
      dashboard-ttl-seconds: ${KPM_ANALYTICS_DASHBOARD_CACHE_TTL_SECONDS:-30}
      dashboard-jitter-seconds: ${KPM_ANALYTICS_DASHBOARD_CACHE_JITTER_SECONDS:-10}
      order-stats-ttl-seconds: ${KPM_ANALYTICS_ORDER_STATS_CACHE_TTL_SECONDS:-90}
      order-stats-jitter-seconds: ${KPM_ANALYTICS_ORDER_STATS_CACHE_JITTER_SECONDS:-30}
      resource-map-ttl-seconds: ${KPM_ANALYTICS_RESOURCE_MAP_CACHE_TTL_SECONDS:-600}
      resource-map-jitter-seconds: ${KPM_ANALYTICS_RESOURCE_MAP_CACHE_JITTER_SECONDS:-120}
      support-stats-ttl-seconds: ${KPM_ANALYTICS_SUPPORT_STATS_CACHE_TTL_SECONDS:-60}
      support-stats-jitter-seconds: ${KPM_ANALYTICS_SUPPORT_STATS_CACHE_JITTER_SECONDS:-20}
      activity-ttl-seconds: ${KPM_ANALYTICS_ACTIVITY_CACHE_TTL_SECONDS:-180}
      activity-jitter-seconds: ${KPM_ANALYTICS_ACTIVITY_CACHE_JITTER_SECONDS:-45}
  geocoding:
    external-enabled: ${KPM_GEOCODING_EXTERNAL_ENABLED:-false}
    provider: ${KPM_GEOCODING_PROVIDER:-nominatim}
    nominatim-url: ${KPM_GEOCODING_NOMINATIM_URL:-https://nominatim.openstreetmap.org/search}
    user-agent: ${KPM_GEOCODING_USER_AGENT:-Kozen-KPM/0.1}
    minimum-request-interval-millis: ${KPM_GEOCODING_MIN_INTERVAL_MS:-1100}
    request-timeout-seconds: ${KPM_GEOCODING_TIMEOUT_SECONDS:-3}
$(kpm_logging_block)
YAML
)"

publish kpm-gateway.yaml "$(cat <<YAML
server:
  port: 8080
$(logging_root_block)
spring:
  cloud:
    gateway:
      server:
        webflux:
          globalcors:
            cors-configurations:
              '[/**]':
                allowedOriginPatterns:
                  - "*"
                allowedMethods:
                  - GET
                  - POST
                  - PUT
                  - DELETE
                  - OPTIONS
                allowedHeaders:
                  - "*"
                exposedHeaders:
                  - Authorization
                  - X-KPM-Refresh-Token
                allowCredentials: false
          default-filters:
            - DedupeResponseHeader=Access-Control-Allow-Origin Access-Control-Allow-Credentials Access-Control-Allow-Methods Access-Control-Allow-Headers Access-Control-Expose-Headers RETAIN_FIRST
          routes:
            - id: iam
              uri: lb://kpm-iam-service
              predicates:
                - Path=/api/iam/**
            - id: resources
              uri: lb://kpm-resource-service
              predicates:
                - Path=/api/resources/**
            - id: projects
              uri: lb://kpm-project-service
              predicates:
                - Path=/api/projects/**
            - id: customers
              uri: lb://kpm-customer-service
              predicates:
                - Path=/api/customers/**,/api/customer-portal/**,/api/knowledge/**
            - id: tasks
              uri: lb://kpm-task-service
              predicates:
                - Path=/api/tasks/**
            - id: orders
              uri: lb://kpm-order-service
              predicates:
                - Path=/api/orders/**
            - id: files
              uri: lb://kpm-file-service
              predicates:
                - Path=/api/files/**
            - id: analytics
              uri: lb://kpm-analytics-service
              predicates:
                - Path=/api/analytics/**
            - id: integrations
              uri: lb://kpm-integration-service
              predicates:
                - Path=/api/integrations/**
            - id: notifications
              uri: lb://kpm-notification-service
              predicates:
                - Path=/api/notifications/**
kpm:
  iam:
    uri: ${KPM_IAM_URI:-http://kpm-iam-service-dev:8101}
  auth:
    enabled: ${KPM_AUTH_ENABLED:-true}
    rbac-enabled: ${KPM_RBAC_ENABLED:-true}
    token-secret: ${AUTH_SECRET}
    token-ttl-seconds: ${KPM_AUTH_TOKEN_TTL_SECONDS:-7200}
$(kpm_logging_block)
YAML
)"

publish kpm-notification-service.yaml "$(cat <<YAML
server:
  port: 8110
$(logging_root_block)
spring:
  datasource:
    url: ${DB_JDBC_URL}
    username: ${DB_USER}
    password: ${DB_PASSWORD}
    hikari:
      maximum-pool-size: ${KPM_DB_POOL_MAX_SIZE:-5}
      minimum-idle: ${KPM_DB_POOL_MIN_IDLE:-1}
      connection-init-sql: SET TIME ZONE '${DB_TIMEZONE}'
  mail:
    host: ${KPM_MAIL_HOST:-}
    port: ${KPM_MAIL_PORT:-587}
    username: ${KPM_MAIL_USERNAME:-}
    password: ${KPM_MAIL_PASSWORD:-}
    properties:
      mail:
        smtp:
          auth: ${KPM_MAIL_SMTP_AUTH:-true}
          starttls:
            enable: ${KPM_MAIL_STARTTLS_ENABLE:-true}
management:
  health:
    mail:
      enabled: ${KPM_NOTIFICATION_MAIL_HEALTH_ENABLED:-${KPM_NOTIFICATION_MAIL_ENABLED:-false}}
kpm:
  service:
    code: notification
  auth:
    token-secret: ${AUTH_SECRET}
  notification:
    refresh-interval-seconds: ${KPM_NOTIFICATION_REFRESH_INTERVAL_SECONDS:-120}
    processor-interval-ms: ${KPM_NOTIFICATION_PROCESSOR_INTERVAL_MS:-15000}
    mail-enabled: ${KPM_NOTIFICATION_MAIL_ENABLED:-false}
    mail-from: ${KPM_NOTIFICATION_MAIL_FROM:-noreply@kozen.example}
$(kpm_logging_block)
YAML
)"
