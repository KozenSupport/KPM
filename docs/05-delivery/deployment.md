# KPM UAT Deployment Guide

更新时间：2026-07-06

本文说明如何把 KPM 部署到一台新的 UAT 服务器。当前 UAT 方案基于 Docker Compose，适合内部试点、业务验收和功能测试；正式生产环境后续建议再拆分为镜像仓库、独立数据库、反向代理、HTTPS、备份和监控告警。

## 1. 服务器前置要求

建议配置：

- Linux 服务器，推荐 Ubuntu 22.04+ / Debian 12+ / CentOS Stream 9+
- CPU：4 核以上
- 内存：8GB 以上，最低不建议低于 6GB
- 磁盘：80GB 以上
- 已安装 Docker Engine 和 Docker Compose v2
- 能访问 Docker Hub / Maven Central / npm registry
- 如果要真实上传文件：需要可访问阿里云 OSS

需要开放的默认 UAT 端口：

| 端口 | 用途 |
|---:|---|
| `14173` | KPM 前端入口 |
| `19080` | Gateway API |
| `18849` | Nacos 控制台 |
| `15433` | PostgreSQL，建议只对运维内网开放 |
| `16380` | Valkey，建议只对运维内网开放 |
| `19081` | SkyWalking UI，可选 |

## 2. 首次部署

在 UAT 服务器上拉取代码：

```bash
git clone git@github.com:KozenSupport/KPM.git
cd KPM
```

执行交互式部署：

```bash
bash scripts/uat-deploy.sh
```

脚本会做以下事情：

1. 检查 Docker / Docker Compose / curl / python3。
2. 如果没有 `.env`，从 `.env.example` 创建。
3. 询问 UAT 对外访问 IP/域名和协议。
4. 自动生成数据库密码和 token secret。
5. 启动 PostgreSQL、Valkey、Nacos。
6. 发布各微服务 Nacos 配置。
7. 如果数据库还没有 KPM 表，则初始化 `schema.sql + seed.sql`。
8. 构建后端 jar。
9. 启动所有后端服务和前端。
10. 输出健康检查结果和访问地址。

非交互部署可使用：

```bash
bash scripts/uat-deploy.sh --non-interactive
```

如果需要同时启用 SkyWalking：

```bash
bash scripts/uat-deploy.sh --observability
```

## 3. UAT 访问地址

脚本执行完成后，默认地址如下：

| 页面/服务 | 地址 |
|---|---|
| 内部系统 | `http://<UAT服务器IP>:14173/#/login` |
| 客户门户 | `http://<UAT服务器IP>:14173/#/customer-login` |
| Gateway | `http://<UAT服务器IP>:19080` |
| Nacos Console | `http://<UAT服务器IP>:18849/` |

默认管理员：

```text
admin@kozenmobile.com
123456
```

## 4. OSS / 邮件配置

部署脚本不会把真实密钥写进 Git。UAT 如果要测试真实文件上传，需要编辑服务器上的 `.env`：

```env
KPM_OSS_ENABLED=true
KPM_OSS_ENDPOINT=https://oss-cn-shanghai.aliyuncs.com
KPM_OSS_BUCKET=xc-kozen-sh-fw
KPM_OSS_ROOT_PREFIX=KPM/
KPM_OSS_ACCESS_KEY_ID=你的AccessKeyId
KPM_OSS_ACCESS_KEY_SECRET=你的AccessKeySecret
```

修改后重新执行：

```bash
bash scripts/uat-deploy.sh
```

脚本会重新发布 Nacos 配置并重启服务。

邮件配置同理：

```env
KPM_MAIL_HOST=smtp.example.com
KPM_MAIL_PORT=587
KPM_MAIL_USERNAME=xxx
KPM_MAIL_PASSWORD=xxx
KPM_MAIL_SMTP_AUTH=true
KPM_MAIL_STARTTLS_ENABLE=true
```

## 5. 更新部署

代码更新后：

```bash
cd KPM
git pull
bash scripts/uat-deploy.sh
```

脚本默认不会重置数据库。已有业务数据会保留。

## 6. 重置 UAT 数据库

如果 UAT 环境需要清空并重新初始化：

```bash
bash scripts/uat-deploy.sh --reset-db
```

注意：该命令会重建 KPM 表，并清空现有业务数据。交互模式下需要输入 `RESET` 确认。

## 7. 停止环境

```bash
docker compose --env-file .env -f infra/docker-compose/dev/docker-compose.yml stop
```

如果需要彻底删除容器但保留数据卷：

```bash
docker compose --env-file .env -f infra/docker-compose/dev/docker-compose.yml down
```

如需删除数据库数据卷，必须额外加 `-v`，请谨慎：

```bash
docker compose --env-file .env -f infra/docker-compose/dev/docker-compose.yml down -v
```

## 8. 排查命令

查看容器：

```bash
docker ps | grep kpm
```

查看某个服务日志：

```bash
docker logs -f kpm-gateway
docker logs -f kpm-task-service
docker logs -f kpm-frontend
```

健康检查：

```bash
curl http://127.0.0.1:19080/actuator/health
curl http://127.0.0.1:19101/actuator/health
```

重新发布 Nacos 配置：

```bash
KPM_NACOS_ADDR=127.0.0.1:18848 \
KPM_DB_HOST=postgres \
KPM_DB_PORT=5432 \
KPM_VALKEY_HOST=valkey \
KPM_VALKEY_PORT=6379 \
bash scripts/nacos-publish-service-configs.sh
```

## 9. 当前 UAT 方案限制

当前脚本仍属于 UAT 便利部署方案：

- 后端在服务器上通过 Maven 容器构建 jar。
- 前端在服务器上通过 Node 容器构建 dist。
- 数据库、缓存、Nacos 与业务服务在同一 Docker Compose 栈内。
- 暂未配置 HTTPS 和反向代理。
- 暂未接入独立镜像仓库。

正式生产建议下一步演进为：

1. CI 构建后端/前端 Docker 镜像并推送镜像仓库。
2. UAT/Prod 服务器只拉镜像，不现场编译。
3. 使用 Nginx / Traefik 做域名、HTTPS 和静态资源代理。
4. PostgreSQL 独立部署并配置定时备份。
5. 接入 SkyWalking + Loki/OpenSearch 做链路追踪和日志聚合。
