# Session Handoff

> Prepared for future KPM sessions.

## What the user wants from the assistant

Act as:

- a seasoned internet project manager
- a seasoned developer
- a seasoned product manager

Guide the user through:

1. requirements and prototype
2. technical solution
3. development
4. acceptance and deployment

Use `/Users/henry/Documents/KPM` as the single workspace root and keep files clearly categorized.

## Current user preference

The user has moved KPM into **Phase 2 — Technical solution** after judging the prototype broadly acceptable.

Current architecture discussion: revise the earlier modular-monolith-first proposal into a Java-first distributed microservice architecture that can support at least 1000 concurrent users, Nacos-like runtime configuration, free/open-source-first infrastructure choices, built-in IAM login, and Alibaba Cloud OSS file storage.

## Latest accepted decisions

1. Replace `组织与权限` with `资源管理`
2. Customer master data originally belonged in resource management, but has now been promoted to a standalone `客户管理` main menu
3. Project customers are linked separately from customer master data
4. Customer statuses are configurable enum values controlled by permission
5. Stages are parallel, not a single linear current step
6. Each stage has a detail page
7. Stage detail contains:
   - stage files
   - time-ordered records / comments with attachments
8. Stage-detail access is the boundary for stage-file visibility
9. Reusable stage materials are explicitly published to the project materials area
10. Chinese and English are required
11. Task management is lightweight daily-task tracking, not a Jira replacement
12. Customer requirements support create / invalidate / delete actions
13. Requirement invalidation is preferred over hard deletion for normal business use
14. Standalone delay workflow is postponed; delays are represented through task handling for now
15. Blocker help is created from stage detail as a task routed to the stage owner, with the project manager added as participant
16. Requirement creation can create a linked task by default, assigned to the requirement creator
17. Requirement cards store linked task IDs and jump to task detail
18. Linked task outcome semantics synchronize requirement status (completed → implemented, rejected → rejected)
19. Task detail is now part of the prototype
20. Tasks have categories: requirement, bug, technical support, other
21. Resource management now has prototype CRUD for users, departments, roles, permissions, customer-project-status options, order-type options, and task-status options
22. Users are enabled / disabled rather than physically deleted
23. Project creation now creates a real project record in the prototype
24. Projects use archive / restore instead of physical deletion and support archive-state filtering
25. Authorization is now a two-path model: role grants plus user direct grants; departments no longer directly carry permissions
26. User departments are selected from configured departments, and department member counts are derived automatically from users
27. Permission management now maintains the permission dictionary only; assignment happens in user and role management
28. Project managers reference real users
29. Project members reference real users and receive project-specific roles
30. Stage responsibility references real users and/or departments, and one stage may have multiple responsible parties
31. Project managers are automatically added to project members
32. Workflow-template maintenance now supports create / query / edit / copy / enable / disable / delete, with deletion limited to draft or disabled templates
33. Only enabled workflow templates can be selected during project creation
34. Permission management is now a read-only catalog generated from real menus and real business buttons
35. Permissions are split into menu permissions and button permissions, with type filtering on the permission page
36. Task statuses are globally configurable and allowed status transitions are configurable
37. Task statuses carry ordinary / completed / rejected semantics so requirement sync survives custom labels
38. Stage-detail task creation now happens in a modal on the same page
39. Project detail shows member count only; member maintenance happens in a modal
40. Stage detail no longer supports “share to later stages”; it only publishes to project materials
41. Customers support multiple sales owners and multiple technical-support owners
42. Order management is part of the prototype, including CRUD, amount calculation, and modification audit records
43. Statistics dashboard now includes order statistics, resource allocation, and technical-support views
44. Login / logout flow is represented, including the interactive four-character login page
45. Order statistics use combined bar-and-line charts to show comparison and trend together
46. Resource allocation uses an embedded world map and supports fullscreen expansion
47. Technical-support customer selection uses searchable input plus result selection
48. Order statistics preserve order-entry currency but can normalize sales into USD or CNY for reporting
49. Order statistics now support project, customer, and region multi-select filters; project selection is searchable
50. A trial-stability pass was selected before Phase 2: clean enum sources, protect in-use statuses, validate data references, and use the trial checklist.
51. People selection should use searchable inputs rather than full-list enumeration for project members, project managers, stage owners, and customer owners.
52. User and role management should not expand all granted permissions in the list view; show counts and maintain grants through searchable permission pickers.
53. Department management should be flat in V1, with no parent / child hierarchy.
54. Customer management is now a standalone main menu.
55. Customer detail supports contacts, customer materials, follow-up records, and direct order creation for that customer.
56. Orders now include an order type field, with order types configured in resource management.
57. Lightweight create/edit operations should use modal forms where practical, including customers, orders, tasks, requirements, resource options, contacts, follow-ups, and project-customer association.
58. Order creation and project-customer association should use searchable customer / project inputs instead of static full-list selection where practical.
59. Customer records include a customer level field; customer levels are configured in resource management.
60. Statistics dashboard includes customer activity analytics: KPI cards, customer × project matrix, risk customer list, and CRM / KPM data consistency warnings.
61. Project edit now opens as a modal rather than navigating to a separate edit page.
62. Project archive / restore / delete actions require second confirmation; delete confirmation shows related customer/task/order counts.
63. Customer-project statuses are configured as resource enums and currently include 商机发掘、样机测试、研发投入、订单冲刺、首单护航、量产维护、EOL 声明、EOL、Support Ended.
64. Customer detail now shows associated projects with each relationship status, project salesability, order count, and latest order.
65. Creating an order auto-links customer and project if missing; sample → 样机测试, pre-order → 商机发掘, formal → 订单冲刺.
66. Project status is now derived from stage statuses: no active stages → 未开始, any active stage → 进行中, all stages completed → 已完成.
67. New project wizard no longer lets users manually choose project status, and hides unsellable reason when salesability is 可销售.
68. Publishing a stage file to project materials now requires second confirmation.
69. Capacity target is now at least 1000 concurrent users.
70. The current proposed technical direction is controlled Java microservices with Eclipse Temurin OpenJDK 21, Spring Boot/Spring Cloud/Spring Cloud Alibaba/Nacos, PostgreSQL, Valkey-compatible cache, MQ/outbox events, Alibaba Cloud OSS behind a storage abstraction, and Kubernetes-ready deployment.
71. Nacos should be used for runtime technical configuration; KPM business configuration should stay in KPM services/databases with permissions and audit history.
72. Cost and license risk should be treated as architecture constraints: prefer free/open-source/self-hostable components and avoid commercial-only dependencies unless explicitly approved. Java 8/Oracle JDK 8 is not recommended for the new core system; Eclipse Temurin OpenJDK 21 is the selected runtime.
73. Kozen has no company SSO, so KPM should implement built-in account/password login in IAM service using Spring Security, password hashing, JWT access/refresh tokens, logout/revocation, and login audit.
74. File storage should use Alibaba Cloud OSS as the first production implementation, behind a KPM storage abstraction.

## Current prototype artifacts

- The clickable prototype is in `apps/frontend/prototype/`
- The latest screenshots are in `assets/prototype-screenshots/`
- The current backlog for still-missing prototype areas is in `docs/02-prototype/full-prototype-backlog.md`

## Recommended next step

Continue Phase 2 by confirming or adjusting the revised technical solution in `docs/03-architecture/technical-solution.md`.

If accepted, the next outputs should be:

1. service boundary and API contract document
2. database/schema design per service
3. deployment topology and Docker/Kubernetes plan
4. permission/security technical design
5. 1000-concurrency load-test plan

## How to behave in the next session

- Start by reading `START-HERE.md`
- Reconstruct current project state from the project files
- Confirm continuity briefly to the user
- Continue from the active prototype backlog instead of re-asking already-decided questions
- If a new user request conflicts with an accepted decision, surface the tradeoff and update the decision log if the user changes direction
