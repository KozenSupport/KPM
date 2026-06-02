# KPM V1 OSS 接入后 P0 冒烟测试报告

> 执行日期：2026-06-01  
> 测试环境：本机开发环境 `/Users/henry/Documents/KPM`  
> 前端地址：`http://127.0.0.1:5175/`  
> 后端网关：`http://127.0.0.1:8080`  
> 配置中心：Nacos `http://127.0.0.1:8849/`  
> 文件存储：Aliyun OSS `oss://xc-kozen-sh-fw/KPM/`  
> 测试结论：P0 冒烟通过，OSS 上传、临时下载链接、业务元数据落库链路通过。

---

## 1. 环境状态

| 检查项 | 结果 | 说明 |
|---|---:|---|
| Nacos 状态 | Pass | Nacos healthy，`kpm-file-service.yaml` 已被文件服务加载。 |
| OSS 配置状态 | Pass | `/api/files/oss/status` 返回 `enabled=true`、`ready=true`、bucket=`xc-kozen-sh-fw`、rootPrefix=`KPM/`。 |
| 后端服务状态 | Pass | IAM、资源、项目、客户、任务、订单、文件、统计、网关均已启动。 |
| Swagger/OpenAPI | Pass | 8101-8108 服务均可访问 `/v3/api-docs`。 |
| 前端服务状态 | Pass | Vite dev server 当前运行在 `http://127.0.0.1:5175/`。 |

> 安全说明：测试报告不记录 AccessKey、AccessKeySecret、临时签名下载 URL。

---

## 2. OSS 链路验证

| 用例 | 结果 | 证据 |
|---|---:|---|
| 通用文件上传 | Pass | 文件上传到 `KPM/general/smoke-test/...`。 |
| 临时下载链接 | Pass | 后端生成短期下载链接，并成功读回上传文件内容。 |
| 客户资料上传并落库 | Pass | 文件上传到 `KPM/customer/materials/...`，客户资料记录包含 bucket/objectKey/storageUrl/storageCategory。 |
| 任务附件上传并落库 | Pass | 文件上传到 `KPM/task/attachments/...`，任务附件记录包含 bucket/objectKey/storageUrl/storageCategory。 |

---

## 3. P0 冒烟测试结果

| 编号 | 模块 | 结果 | 说明 |
|---|---|---:|---|
| SMOKE-001 | 前端页面可访问 | Pass | `http://127.0.0.1:5175/` 返回页面。 |
| SMOKE-002 | 登录接口 | Pass | `zhangmin / 123456` 登录成功并返回 token。 |
| SMOKE-003 | 当前用户/权限 | Pass | 当前用户账号为 `zhangmin`。 |
| SMOKE-004 | 资源启动数据 | Pass | 用户、部门、角色、权限数据正常返回。 |
| SMOKE-005 | 项目列表 | Pass | 返回 4 条项目数据。 |
| SMOKE-006 | 项目详情/阶段 | Pass | 项目详情返回 4 个阶段。 |
| SMOKE-007 | 客户列表 | Pass | 返回 5 条客户数据。 |
| SMOKE-008 | 客户详情 | Pass | 客户详情正常返回。 |
| SMOKE-009 | 任务列表 | Pass | 返回 7 条任务数据。 |
| SMOKE-010 | 任务详情 | Pass | 任务详情正常返回。 |
| SMOKE-011 | 订单列表 | Pass | 返回 5 条订单数据。 |
| SMOKE-012 | 订单详情/修改记录 | Pass | 订单详情包含修改记录字段。 |
| SMOKE-013 | OSS 配置状态 | Pass | OSS 已启用且 ready。 |
| SMOKE-014 | 新增客户落库 | Pass | 创建测试客户成功。 |
| SMOKE-015 | 客户资料 OSS 上传并落库 | Pass | 客户资料元数据保存成功。 |
| SMOKE-016 | 新增任务落库 | Pass | 创建测试任务成功。 |
| SMOKE-017 | 任务附件 OSS 上传并落库 | Pass | 任务附件元数据保存成功。 |
| SMOKE-018 | 统计工作台 | Pass | 工作台统计数据正常返回。 |
| SMOKE-019 | 订单统计 | Pass | 返回 5 条统计数据。 |
| SMOKE-020 | 资源分配统计 | Pass | 返回 6 条统计数据。 |
| SMOKE-021 | 技术支持统计 | Pass | 返回 5 条统计数据。 |
| SMOKE-022 | 客户活跃度统计 | Pass | 返回 6 条统计数据。 |

测试执行后已清理临时客户与临时任务。OSS 中用于验证的测试文件未自动删除，后续如需要可以通过 OSS 管理工具按 `KPM/general/smoke-test/`、`KPM/customer/materials/`、`KPM/task/attachments/` 清理。

---

## 4. 测试限制与风险

1. 本轮未做 1000 并发压测；当前只验证功能链路。
2. Browser 插件未拿到可用的 in-app browser pane，因此 UI 自动化没有截图证据。
3. 本机未安装 Playwright，且 npm registry 当前无法访问，无法临时安装 Playwright 做截图自动化。
4. 审批流、JIRA/钉钉/CRM 等三方集成暂不纳入本轮。
5. 真实 OSS 对象已产生，建议后续测试环境定期清理 `KPM/*/smoke-test` 或测试前缀文件。
