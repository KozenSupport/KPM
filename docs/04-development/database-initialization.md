# KPM 数据库设计与初始化

本目录保留 KPM 试点版数据库脚本，便于随时重建本地环境或迁移到正式 migration 工具。

## 文件

- `/Users/henry/Documents/KPM/infra/database/schema.sql`：建表脚本，会先删除现有 KPM 业务表，再重新创建。
- `/Users/henry/Documents/KPM/infra/database/seed.sql`：原型对齐的初始化数据，包括用户、部门、角色、权限、枚举、项目、客户、需求、任务、订单等。
- `/Users/henry/Documents/KPM/scripts/db-reset.sh`：一键重置本地 PostgreSQL 数据库。

## 本地初始化

先启动基础设施：

```bash
cd /Users/henry/Documents/KPM
./scripts/dev-infra-up.sh
```

然后重置数据库：

```bash
./scripts/db-reset.sh
```

默认连接：

- Docker 容器：`kpm-postgres`
- 数据库：`kpm`
- 用户：`kpm`
- 密码：`kpm_dev_password`

## 设计原则

1. 业务配置入库：客户状态、客户等级、订单类型、任务状态和任务状态流转都存放在表中，而不是写死在代码里。
2. 权限自动登记方向：当前 SQL 先初始化真实菜单和按钮权限；后续开发中新增菜单/按钮时，应同步加入权限注册逻辑或 migration。
3. 项目阶段可并行：阶段只记录自身状态，不强制推进到下一阶段或回退到上一阶段。
4. 客户-项目状态独立：同一客户在不同项目上可以处于不同状态，例如“样机测试”“订单冲刺”“EOL”。
5. 订单修改留痕：订单修改记录保存在 `kpm_order_histories`，包含修改人、时间、内容和原因。

