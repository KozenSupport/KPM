# KPM 代码质量审查记录（2026-06-03）

## 本轮审查范围

- 前端：`apps/frontend/kpm-web/src`、`apps/frontend/kpm-web/public/prototype-runtime`、`apps/frontend/prototype`
- 后端：`apps/backend` 聚合项目，重点抽查 IAM、Resource、Task、Order、Project 服务
- 验证：前端构建、原型 JS 语法、Docker Maven 后端全量测试生命周期、浏览器烟测

## 已完成优化

### 1. 订单服务去 Map 化

订单服务原先存在 `OrderRequest.toMap()`、Mapper 返回 `Map<String,Object>`、Service 拼装 Map 的问题。现在已调整为：

- `entity`：`OrderEntity`、`OrderHistoryEntity`、`ProjectSkuEntity`、`UserLookupEntity`
- `dto`：`OrderDto`、`OrderHistoryDto`、`OrderSkuSnapshotDto`、`OrderWriteCommand`
- `converter`：`OrderConverter`
- `controller/service`：返回 `OrderDto` / `List<OrderDto>`，不再向前端暴露裸 Map
- `mapper`：查询 SQL 改为显式字段 alias，降低 `snake_case/camelCase` 映射造成 `undefined` 的风险

保留接口兼容性：`OrderDto` 同时提供 `orderType` 和 `type` 字段，避免当前前端原型展示受影响。

### 2. 前端 API client 优化

`apps/frontend/kpm-web/src/api/httpClient.ts` 已优化：

- 请求失败时优先展示后端标准 `ApiResponse.message/code`
- 非 JSON 响应会明确提示“接口未返回标准 JSON 响应”
- GET/无 body 请求不再无意义附带 `Content-Type: application/json`
- FormData 请求不会被错误设置 JSON Content-Type

### 3. Maven Wrapper 与原型同步脚本

新增后端 Maven Wrapper：`apps/backend/mvnw`、`apps/backend/mvnw.cmd`、`apps/backend/.mvn/wrapper/maven-wrapper.properties`。

这让具备 JDK 的机器可以直接在 `apps/backend` 下执行 `./mvnw test`，不再强依赖全局 Maven 安装。

新增：`scripts/sync-prototype-runtime.sh`

用于把正式承载目录：

`apps/frontend/kpm-web/public/prototype-runtime`

同步到静态原型目录：

`apps/frontend/prototype`

避免以后手动复制遗漏 `api.js/index.html/app.js/styles.css`。

## 验证结果

- `npm run build`：通过
- `node --check apps/frontend/kpm-web/public/prototype-runtime/app.js`：通过
- `node --check apps/frontend/prototype/app.js`：通过
- `bash -n scripts/sync-prototype-runtime.sh`：通过
- `docker exec kpm-order-service-dev mvn test`：通过，当前后端暂无测试用例，结果为全模块编译 + surefire 生命周期成功
- `docker exec kpm-order-service-dev ./mvnw test`：通过，Maven Wrapper 可用
- in-app Browser prototype smoke：通过

## 当前仍存在的技术债

### P0/P1：应继续推进，但不建议本轮暴力改完

1. **前端 prototype-runtime 巨型文件**
   - 当前 `app.js` 超过 11000 行，真实业务交互仍集中在一个文件。
   - 建议下一阶段按页面拆成 React：`pages / components / hooks / services / types / validation`。
   - 不建议直接机械切文件，因为当前大量状态和事件依赖全局变量，盲拆风险高。

2. **Project 服务仍偏大**
   - `ProjectServiceImpl` 和 `ProjectMapper` 仍是后端最大热点。
   - 建议按领域拆：项目基础信息、成员/SKU、阶段、资料、客户关联、需求。

3. **部分服务仍存在 Map 查询投影**
   - Analytics/Notification/Project/Customer 中仍有统计型或聚合型 Map。
   - 统计型 Map 可暂留，但业务 CRUD 返回应继续 DTO 化。

4. **缺少自动化测试用例**
   - 后端目前 Maven 测试生命周期可跑，但没有业务测试。
   - 建议优先补：订单状态变更、SKU 快照、权限拦截、文件上传、任务状态流转。

5. **本机缺少 JDK 原生命令**
   - 当前本机 `javac` 不可用，但 Docker Maven 容器和 Maven Wrapper 均可完成后端构建。
   - 建议正式开发机安装 Java 21，或统一使用 compose 容器执行 `./mvnw test`。

## 本轮结论

本轮已处理最明显、收益最高且低风险的订单服务 Map 穿透问题，并补充前端 API client 与同步脚本。当前代码仍有技术债，但剩余项属于“需要计划性迁移”的结构级改造，不适合在没有测试覆盖的情况下继续无边界大改。
