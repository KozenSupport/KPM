# KPM 后端分层与代码规范基线

> 目标：按阿里巴巴 Java 开发手册的工程习惯做清晰分层，避免业务逻辑堆在 Controller，方便后续重构、测试、微服务拆分与多人协作。

## 1. 包结构约定

每个业务微服务统一使用以下目录：

```text
com.kozen.kpm.<domain>
├── controller      # REST 入口、参数接收、Swagger 注解、返回 ApiResponse
├── service         # 业务接口，必须写清楚接口职责注释
├── service.impl    # 业务实现、事务控制、跨表编排、领域规则
├── mapper          # 数据访问层，集中 SQL/JdbcTemplate/MyBatis Mapper
└── legacy          # 旧实现留档，不参与编译
```

公共能力放在：

```text
com.kozen.kpm.common
├── api             # 统一响应结构
├── config          # OpenAPI/Swagger 等公共配置
├── mapper          # JdbcMapMapper 等公共 Mapper 基类
├── jdbc            # 行数据转换工具
└── util            # ID、JSON、SQL 参数等工具类
```

## 2. 分层职责

| 层 | 可以做 | 不应该做 |
| --- | --- | --- |
| Controller | REST 映射、Swagger `@Tag/@Operation`、调用 Service、包装返回 | SQL、事务、复杂 if/else 业务规则 |
| Service | 定义业务能力、方法注释、供 Controller 调用 | 直接拼接 SQL |
| ServiceImpl | 业务规则、事务边界、跨表编排、状态联动 | 处理 HTTP 细节 |
| Mapper | SQL、数据库读写、轻量数据映射 | 业务判断、状态流转规则 |
| Util | 无状态、可复用的公共工具 | 持有业务状态 |

## 3. Swagger 约定

- 每个业务 Controller 必须使用 `@Tag` 描述模块。
- 每个接口方法必须使用 `@Operation` 描述接口用途。
- Swagger UI 地址：`http://127.0.0.1:<service-port>/swagger-ui/index.html`。
- OpenAPI JSON 地址：`http://127.0.0.1:<service-port>/v3/api-docs`。

当前已验证端口：

| 服务 | 端口 | Swagger |
| --- | --- | --- |
| IAM | 8101 | `/swagger-ui/index.html` |
| Resource | 8102 | `/swagger-ui/index.html` |
| Project | 8103 | `/swagger-ui/index.html` |
| Customer | 8104 | `/swagger-ui/index.html` |
| Task | 8105 | `/swagger-ui/index.html` |
| Order | 8106 | `/swagger-ui/index.html` |
| Analytics | 8108 | `/swagger-ui/index.html` |

## 4. 当前已整改的核心服务

- `kpm-iam-service`
- `kpm-resource-service`
- `kpm-project-service`
- `kpm-customer-service`
- `kpm-task-service`
- `kpm-order-service`
- `kpm-analytics-service`

`kpm-file-service` 和 `kpm-integration-service` 目前只有健康检查接口，后续接 OSS、JIRA、钉钉时必须按同样目录结构扩展。
