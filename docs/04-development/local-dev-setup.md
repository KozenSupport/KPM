# KPM 本地开发环境说明

本地开发推荐使用统一 Docker Compose 启动完整环境。这样能保证数据库、Valkey、Nacos、前后端端口和 UAT 环境尽量一致，避免单服务手工启动造成配置漂移。

## 1. 前置依赖

建议安装：

- Docker Desktop / Docker Engine
- Docker Compose v2
- curl

如需在宿主机直接编译或调试后端/前端，可额外安装：

- JDK 21
- Maven 3.9+
- Node.js 24+

检查环境：

```bash
cd /Users/henry/Documents/KPM
./scripts/dev-env-check.sh
```

## 2. 准备 `.env`

```bash
cd /Users/henry/Documents/KPM
cp .env.example .env
```

重点检查：

```bash
KPM_DB_PORT=15433
KPM_VALKEY_PORT=16380
KPM_NACOS_PORT=18848
KPM_NACOS_CONSOLE_PORT=18849
KPM_GATEWAY_PORT=19080
KPM_FRONTEND_PORT=14173
VITE_KPM_API_BASE=http://127.0.0.1:19080
```

OSS、邮箱等敏感配置不要提交到 Git，只能放在本机 `.env` 或 Nacos 中。

## 3. 一键启动完整本地栈

```bash
./scripts/dev-full-up.sh
```

启动内容包括：

- PostgreSQL
- Valkey
- Nacos
- Nacos 配置发布器
- 所有 KPM 后端微服务
- Gateway
- 前端预览服务

访问地址：

| 页面 | 地址 |
|---|---|
| 内部系统 | `http://127.0.0.1:14173/#/login` |
| 客户门户 | `http://127.0.0.1:14173/#/customer-login` |
| Gateway | `http://127.0.0.1:19080` |
| Nacos Console | `http://127.0.0.1:18849/` |

默认管理员：

```text
admin@kozenmobile.com / 123456
```

## 4. 停止完整本地栈

```bash
./scripts/dev-full-down.sh
```

该命令停止容器，但默认保留数据库、Nacos、Valkey 数据卷。

## 5. 重置本地数据库

危险操作，会清空业务数据并重新加载 seed：

```bash
./scripts/db-reset.sh
```

如果只想清理测试数据，仅保留管理员账号和基础配置：

```bash
./scripts/db-clear-for-manual-test.sh
```

## 6. 单独启动基础设施

如果只想启动数据库、Valkey 和 Nacos：

```bash
./scripts/dev-infra-up.sh
```

停止：

```bash
./scripts/dev-infra-down.sh
```

## 7. 后端构建

宿主机已安装 Maven 时：

```bash
./scripts/backend-build.sh
```

没有本机 Maven，或希望使用固定构建环境时：

```bash
./scripts/backend-build-docker.sh
```

## 8. Nacos 配置发布

通常 `dev-full-up.sh` 会自动发布配置。需要手工重新发布时：

```bash
./scripts/nacos-publish-service-configs.sh
```

如果需要配置 OSS，请在 `.env` 中填写：

```bash
KPM_OSS_ENABLED=true
KPM_OSS_ACCESS_KEY_ID=***
KPM_OSS_ACCESS_KEY_SECRET=***
```

然后重新发布 Nacos 配置：

```bash
./scripts/nacos-publish-service-configs.sh
```

## 9. 前端本地开发

如需使用 Vite dev server 调试前端：

```bash
cd /Users/henry/Documents/KPM/apps/frontend/kpm-web
npm install
npm run dev
```

前端 dev server 默认：

```text
http://127.0.0.1:5173
```

Vite 会把 `/api` 代理到 Gateway。

## 10. 推荐原则

- 日常验收、联调：优先使用 `dev-full-up.sh`；
- 本地调 UI：可以使用 Vite dev server；
- UAT：不要在服务器拉源码编译，使用 `docs/05-delivery/deployment.md` 中的镜像式部署；
- 敏感信息只放 `.env` 或 Nacos，不进入 Git。
