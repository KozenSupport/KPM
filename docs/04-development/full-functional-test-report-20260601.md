# KPM V1 完整功能测试执行报告

> 执行时间：2026-06-02 07:33:29
> 环境：`/Users/henry/Documents/KPM`
> 前端：`http://127.0.0.1:5175/`
> 网关：`http://127.0.0.1:8080`
> 结论：**自动化可执行范围 通过**；总计 51，Pass 41，Fail 0，Skip 10。

## 1. 总览

| 指标 | 数量 |
|---|---:|
| Total | 51 |
| Pass | 41 |
| Fail | 0 |
| Skip / 需人工复测 | 10 |
| P0 Fail | 0 |

## 2. 失败项

无自动化失败项。

## 3. 需浏览器/人工复测项

| 用例 | 模块 | 标题 | 原因 |
|---|---|---|---|
| LOGIN-004 | 登录动效 | 需要真实浏览器观察四个小人/捂眼睛动效 | Browser 插件当前无可用 in-app browser pane；本机 Playwright 未安装且 npm registry 当前不可达。 |
| NAV-003 | 页面状态 | 需要浏览器多页面来回点击观察 | Browser 插件当前无可用 in-app browser pane；本机 Playwright 未安装且 npm registry 当前不可达。 |
| I18N-001/002 | 国际化 | 需要浏览器切换语言并观察布局 | Browser 插件当前无可用 in-app browser pane；本机 Playwright 未安装且 npm registry 当前不可达。 |
| PROJ-009/010 | 输入搜索 | 需要浏览器验证人员选择器输入搜索交互 | Browser 插件当前无可用 in-app browser pane；本机 Playwright 未安装且 npm registry 当前不可达。 |
| PROJ-017/018/019/021/022 | 项目弹窗与二次确认 | 需要浏览器点击弹窗与确认 | Browser 插件当前无可用 in-app browser pane；本机 Playwright 未安装且 npm registry 当前不可达。 |
| STAGE-003/005/006/008/009/012/013/014/015 | 阶段详情 UI | 需要浏览器验证留言折叠、弹窗、新建任务和卡点求助 | Browser 插件当前无可用 in-app browser pane；本机 Playwright 未安装且 npm registry 当前不可达。 |
| CUST-018/019/022/023/024/025 | 客户详情 UI | 需要浏览器验证折叠、查看全部、客户下单入口 | Browser 插件当前无可用 in-app browser pane；本机 Playwright 未安装且 npm registry 当前不可达。 |
| ORDER-005/006/018/019 | 订单 UI | 需要浏览器验证输入搜索、删除二次确认、客户详情下单入口 | Browser 插件当前无可用 in-app browser pane；本机 Playwright 未安装且 npm registry 当前不可达。 |
| RES-020 | 资源表单二次确认 | 需要浏览器验证弹窗确认 | Browser 插件当前无可用 in-app browser pane；本机 Playwright 未安装且 npm registry 当前不可达。 |
| UI-001~007 | 视觉布局 | 需要浏览器截图/人工观察 | Browser 插件当前无可用 in-app browser pane；本机 Playwright 未安装且 npm registry 当前不可达。 |

## 4. 明细

| 用例 | 模块 | 优先级 | 状态 | 标题 | 说明 |
|---|---|---|---|---|---|
| SMOKE-001 | 环境 | P0 | PASS | 前端页面可访问 | frontend ok |
| API-000 | 环境 | P0 | PASS | 网关可访问 | kpm-resource-service |
| FILE-001 | 文件 | P0 | PASS | OSS 配置状态 ready | bucket=xc-kozen-sh-fw root=KPM/ |
| DOC-001 | 接口文档 | P0 | PASS | 各服务 OpenAPI 文档可访问 | 8101:3, 8102:13, 8103:17, 8104:7, 8105:5, 8106:3, 8107:4, 8108:6 |
| LOGIN-001 | 登录 | P0 | PASS | 正确账号密码登录 | token ok |
| LOGIN-002 | 登录 | P1 | PASS | 账号或密码为空应失败 | failed as expected |
| LOGIN-003 | 登录 | P1 | PASS | 错误密码应失败 | failed as expected |
| PERM-004 | 权限 | P1 | PASS | 当前用户权限聚合 | permissions=17 |
| RES-011 | 资源管理 | P0 | PASS | 权限目录只读数据存在 | permissions=17 |
| RES-012 | 资源管理 | P1 | PASS | 菜单权限真实来源 | menu=8 |
| RES-013 | 资源管理 | P1 | PASS | 按钮权限真实来源 | button=9 |
| RES-002/007 | 资源管理 | P1 | PASS | 部门新增修改且平铺展示 | TEST-AUTO部门改-20260602073327 |
| RES-009/010 | 资源管理 | P1 | PASS | 角色新增修改与授权 | TEST-AUTO角色改-20260602073327 |
| RES-003/004/005/008 | 资源管理 | P1 | PASS | 用户部门/角色/直接权限联动与部门人数自动统计 | user=testauto20260602073327 deptUserCount=1 |
| RES-017/018 | 资源管理 | P0 | PASS | 任务状态枚举与状态流转配置联动 | enum=TEST状态-20260602073327 transition=tr-task-待处理-test状态-20260602073327-mpvuh4js |
| CUST-001/003/005/006/007 | 客户 | P0 | PASS | 客户新增修改与销售/技术支持多人负责人 | customer=cus-test-auto客户-20260602073327 sales=['张敏'] support=['王工'] |
| CUST-011/013/016 | 客户 | P0 | PASS | 联系人新增、详情数据与删除 | contact add/delete ok |
| FILE-007/008/CUST-017/020 | 客户 | P0 | PASS | 客户资料与跟进附件 OSS 上传落库 | material=KPM/customer/materials/cus-test-auto客户-20260602073327/2026/06/01/6b9bfaef-28f8-4b03-8c02-a5a05893de1e-kpm-customer-material-20260602073327.txt |
| PROJ-005/006/008/014 | 项目 | P0 | PASS | 新建项目默认未开始、可销售隐藏不可销售原因、负责人自动入成员 | project=test-auto项目-20260602073327 members=2 stages=2 |
| PROJ-014/015/STAGE-002 | 项目 | P0 | PASS | 阶段状态驱动项目状态自动计算 | status auto sync ok |
| FILE-004/006/STAGE-007/010/011 | 阶段 | P0 | PASS | 阶段资料 OSS 上传并发布到项目资料区 | published=KPM/project/stage-materials/test-auto项目-20260602073327-st-pciy0nw7jd/2026/06/01/0c34f00b-66de-43a4-83fc-4256a89c0d90-kpm-stage-material-20260602073327.txt |
| FILE-005/STAGE-004 | 阶段 | P0 | PASS | 阶段留言附件保存 | stage record with attachment ok |
| REQ-002/003/006/008/009/014 | 需求 | P0 | PASS | 项目客户关联、需求创建关联任务与纵览 | req=REQ-005 task=KPM-108 |
| REQ-010/011/012 | 需求 | P0 | PASS | 任务完成/拒绝联动需求状态与作废 | implemented/rejected/void sync ok |
| TASK-003/004/006/007/008/010/011/014/017 | 任务 | P0 | PASS | 任务新增修改、可配置状态、多人执行者/参与者、附件与评论 | task=KPM-110 status=TEST状态-20260602073327 |
| ORDER-003/007/008/010/013/014/015/016/017 | 订单 | P0 | PASS | 订单新增、金额计算、修改记录与客户项目状态联动 | order=ORD-202606-001 amount=2992.5 histories=1 |
| ORDER-011/012 | 订单 | P1 | PASS | 样品订单/预订单客户项目状态映射 | sample/pre-order mapping ok |
| PROJ-TPL-001 | 流程模板 | P1 | PASS | 流程模板 CRUD | template=tpl-test-auto模板-20260602073327 stages=3 |
| ANA-001/005/006 | 统计看板 | P1 | PASS | 订单统计 USD | rows=7 |
| ANA-007 | 统计看板 | P1 | PASS | 订单统计 CNY | rows=7 |
| ANA-008/009 | 统计看板 | P1 | PASS | 资源分配统计数据 | rows=7 |
| ANA-010/011/012 | 统计看板 | P1 | PASS | 技术支持统计数据 | rows=6 |
| ANA-013/014 | 统计看板 | P1 | PASS | 客户活跃度统计数据 | rows=7 |
| NAV-001 | 前端 | P1 | PASS | 主要菜单关键字存在 | keywords ok |
| UX-001 | 前端 | P1 | PASS | 必填校验逻辑存在 | keywords ok |
| UX-002 | 前端 | P1 | PASS | 二次确认逻辑存在 | keywords ok |
| FILE-011 | 前端 | P1 | PASS | 文件下载逻辑存在 | keywords ok |
| TASK-011 | 前端 | P1 | PASS | 任务状态使用资源配置逻辑存在 | keywords ok |
| CUST-013/014 | 前端 | P1 | PASS | 客户联系人详情/折叠展示逻辑存在 | keywords ok |
| STAGE-010 | 前端 | P1 | PASS | 阶段资料发布确认入口存在 | keywords ok |
| LOGIN-004 | 登录动效 | P2 | SKIP | 需要真实浏览器观察四个小人/捂眼睛动效 | Browser 插件当前无可用 in-app browser pane；本机 Playwright 未安装且 npm registry 当前不可达。 |
| NAV-003 | 页面状态 | P2 | SKIP | 需要浏览器多页面来回点击观察 | Browser 插件当前无可用 in-app browser pane；本机 Playwright 未安装且 npm registry 当前不可达。 |
| I18N-001/002 | 国际化 | P2 | SKIP | 需要浏览器切换语言并观察布局 | Browser 插件当前无可用 in-app browser pane；本机 Playwright 未安装且 npm registry 当前不可达。 |
| PROJ-009/010 | 输入搜索 | P2 | SKIP | 需要浏览器验证人员选择器输入搜索交互 | Browser 插件当前无可用 in-app browser pane；本机 Playwright 未安装且 npm registry 当前不可达。 |
| PROJ-017/018/019/021/022 | 项目弹窗与二次确认 | P2 | SKIP | 需要浏览器点击弹窗与确认 | Browser 插件当前无可用 in-app browser pane；本机 Playwright 未安装且 npm registry 当前不可达。 |
| STAGE-003/005/006/008/009/012/013/014/015 | 阶段详情 UI | P2 | SKIP | 需要浏览器验证留言折叠、弹窗、新建任务和卡点求助 | Browser 插件当前无可用 in-app browser pane；本机 Playwright 未安装且 npm registry 当前不可达。 |
| CUST-018/019/022/023/024/025 | 客户详情 UI | P2 | SKIP | 需要浏览器验证折叠、查看全部、客户下单入口 | Browser 插件当前无可用 in-app browser pane；本机 Playwright 未安装且 npm registry 当前不可达。 |
| ORDER-005/006/018/019 | 订单 UI | P2 | SKIP | 需要浏览器验证输入搜索、删除二次确认、客户详情下单入口 | Browser 插件当前无可用 in-app browser pane；本机 Playwright 未安装且 npm registry 当前不可达。 |
| RES-020 | 资源表单二次确认 | P2 | SKIP | 需要浏览器验证弹窗确认 | Browser 插件当前无可用 in-app browser pane；本机 Playwright 未安装且 npm registry 当前不可达。 |
| UI-001~007 | 视觉布局 | P2 | SKIP | 需要浏览器截图/人工观察 | Browser 插件当前无可用 in-app browser pane；本机 Playwright 未安装且 npm registry 当前不可达。 |
| API-002/003/004/005/006 | 联调 | P0 | PASS | 新增修改数据刷新后仍能从后端读取 | backend persisted test data ok |

## 5. 说明

- 自动化测试已创建并清理 `TEST-AUTO` 前缀的客户、项目、任务、订单、资源配置等数据。
- OSS 测试文件是真实写入，不在脚本中删除；建议按 `KPM/*/TEST-AUTO` 或测试时间目录定期清理。
- Browser 插件当前无法取得 in-app browser pane；Playwright 未安装且 npm registry 不可达，因此纯视觉和浏览器交互项列为需人工复测。