# KPM Local Development Setup

> Last updated: 2026-05-26

## 1. Required local tools

- Eclipse Temurin OpenJDK 21
- Maven
- Node.js and npm
- Docker Desktop with Docker Compose

If Homebrew/JDK downloads are unstable, backend builds can temporarily use Docker image `maven:3.9.11-eclipse-temurin-21` through `./scripts/backend-build-docker.sh`.

Recommended installation on macOS:

```bash
brew install --cask temurin@21
brew install maven
```

Check local tools:

```bash
./scripts/dev-env-check.sh
```

## 2. Start local infrastructure

```bash
./scripts/dev-infra-up.sh
```

This starts:

| Component | URL / Port |
| --- | --- |
| PostgreSQL | `127.0.0.1:5432`, db `kpm`, user `kpm` |
| Valkey | `127.0.0.1:6379` |
| Nacos | `http://127.0.0.1:8849/` |

RocketMQ is defined as an optional Docker Compose profile and can be started later:

```bash
docker compose -f infra/docker-compose/dev/docker-compose.yml --profile mq up -d
```

## 3. Backend

Build all backend modules with local Maven:

```bash
./scripts/backend-build.sh
```

If local JDK/Maven is not installed yet, use the Dockerized Java 21 Maven build:

```bash
./scripts/backend-build-docker.sh
```

Run one service with local Maven:

```bash
./scripts/backend-run-service.sh kpm-iam-service
```

Run one service with Dockerized Java 21 Maven:

```bash
./scripts/backend-run-service-docker.sh kpm-iam-service
```

Current backend ports:

| Service | Port |
| --- | --- |
| `kpm-gateway` | 8080 |
| `kpm-iam-service` | 8101 |
| `kpm-resource-service` | 8102 |
| `kpm-project-service` | 8103 |
| `kpm-customer-service` | 8104 |
| `kpm-task-service` | 8105 |
| `kpm-order-service` | 8106 |
| `kpm-file-service` | 8107 |
| `kpm-analytics-service` | 8108 |
| `kpm-integration-service` | 8109 |

Example health/ping endpoint:

```bash
curl http://127.0.0.1:8101/api/iam/ping
```

## 4. Frontend

Install dependencies:

```bash
./scripts/frontend-install.sh
```

Run frontend:

```bash
./scripts/frontend-dev.sh
```

Frontend URL:

```text
http://127.0.0.1:5173
```

The Vite dev server proxies `/api` to the gateway at `http://127.0.0.1:8080`.

## 5. OSS configuration

Do not commit real OSS credentials. Local development reads OSS settings from Nacos for `kpm-file-service`.

1. Start Nacos:

   ```bash
   ./scripts/dev-infra-up.sh
   ```

2. Publish OSS config to Nacos by passing secrets through environment variables only:

   ```bash
   KPM_OSS_ACCESS_KEY_ID='***' \
   KPM_OSS_ACCESS_KEY_SECRET='***' \
   ./scripts/nacos-put-oss-config.sh
   ```

   Default OSS target:

   | Config | Value |
   | --- | --- |
   | Endpoint | `https://oss-cn-shanghai.aliyuncs.com` |
   | Bucket | `xc-kozen-sh-fw` |
   | Root prefix | `KPM/` |

3. Run `kpm-file-service` with Nacos config enabled:

   ```bash
   KPM_NACOS_CONFIG_ENABLED=true ./scripts/backend-run-service-docker.sh kpm-file-service
   ```

   Or restart all services needed for the current smoke test:

   ```bash
   ./scripts/dev-backend-smoke-up.sh
   ```

4. Verify status:

   ```bash
   curl http://127.0.0.1:8107/api/files/oss/status
   ```

The response must not expose `accessKeyId` or `accessKeySecret`.

## 6. Stop local infrastructure

```bash
./scripts/dev-infra-down.sh
```
