# Project State

> Last updated: 2026-05-26

## Current phase

- **Phase:** Phase 2 — Technical solution
- **Working approach:** Confirm a Java-first distributed microservice architecture before Phase 3 development


## Current technical direction

- Capacity target has been raised from 100 concurrent users to at least 1000 concurrent users.
- The preferred implementation direction is now a controlled Java microservice architecture rather than the earlier modular-monolith-first proposal.
- Recommended foundation: Eclipse Temurin OpenJDK 21, Spring Boot 4.x, Spring Cloud 2025.x, Spring Cloud Alibaba 2025.x, Nacos cluster for service discovery/runtime configuration, Spring Cloud Gateway, Sentinel, MQ/outbox events, PostgreSQL, Valkey-compatible cache, Alibaba Cloud OSS behind a storage abstraction, and Kubernetes-ready deployment.
- Nacos should manage technical runtime configuration. KPM business configuration such as workflow templates, task statuses, permission catalogs, customer levels, order types, and customer-project statuses should remain in KPM databases with permission control and audit history.
- Architecture should be free/open-source first where practical. Use Eclipse Temurin OpenJDK 21 and avoid Oracle JDK 8 for the new core system, use PostgreSQL rather than a commercial database, prefer Valkey over license-unclear Redis distributions, use KPM built-in IAM because Kozen has no SSO, and use Alibaba Cloud OSS for file storage.
- The latest detailed proposal is in `docs/03-architecture/technical-solution.md`.

## Product purpose

KPM is an internal product lifecycle and collaboration system for Kozen's POS products. It is intended to replace fragmented coordination through chat tools by providing a trustworthy place to see:

- product projects
- configurable lifecycle stages
- responsible people / departments
- project customers and their per-project states
- stage files, records, and shared project materials

## Core accepted product model

### Project and workflow

- A project represents a product model, e.g.:
  - external name: `P8 dual`
  - internal name: `R2351`
  - model name: `K1352`
- Product workflow stages are configurable
- Stages are **not strictly sequential**; multiple stages may be active in parallel
- Project status is derived from stage statuses: 未开始 until work starts, 进行中 when any stage is active, 已完成 when all stages are completed
- Each stage has its own owner / owning department and its own status
- Project CRUD is represented in the prototype
- Project creation now produces a real project record
- New project status defaults to 未开始 and is not manually selected in the wizard
- Unsellable reason is hidden when salesability is 可销售
- Projects primarily use archive / restore for lifecycle management; prototype also exposes delete with second confirmation for mistaken records

### Organization and permissions

- Users may belong to multiple departments
- The same user may hold different roles in different projects
- Permissions may be granted to:
  - roles
  - specific users
- `资源管理` is the top-level module for:
  - users
  - departments
  - roles
  - permissions
  - customer-project-status configuration
  - order-type configuration
  - task-status configuration
- Resource-management CRUD is represented in the prototype
- Users use enable / disable instead of hard deletion

### Customer model

- Customer master data is now managed from a standalone `客户管理` main menu
- Customer master data supports multiple sales owners and multiple technical-support owners
- Customer detail supports contacts, customer materials, follow-up records, and direct order creation
- A customer can be linked to multiple projects
- The same customer can have different statuses in different projects
- Project-customer statuses are configurable enum values, not workflow templates
- Default customer-project statuses now include 商机发掘、样机测试、研发投入、订单冲刺、首单护航、量产维护、EOL 声明、EOL、Support Ended
- Customer detail includes an associated-project list showing each project relationship status, project salesability, order count, and latest order

### Stage collaboration model

- Each stage has its own detail page
- Stage detail is the permission boundary for stage materials
- Anyone who can access the stage detail can view / download stage files
- Stage detail includes:
  - a file repository
  - a time-ordered message / record stream
- Messages may contain:
  - text
  - photos
  - videos
  - arbitrary file attachments

### Project materials

- Stage files do **not** use separate file-level ACL by default
- Reusable project materials are explicitly published to the project materials area
- Publishing stage files to the project materials area requires second confirmation
- The project materials area is the trusted place for reusable documents

### Task management

- Task management is intentionally lightweight daily-task tracking, not a Jira replacement
- Tasks may be created from the task page or from stage detail
- Stage-detail task creation now happens in-place through a modal
- Blocker help is implemented as a task launched from stage detail
- Blocker-help tasks route to the stage owner and automatically add the project manager as participant
- Task detail is now part of the prototype
- Tasks may link back to customer requirements
- Tasks have categories: requirement, bug, technical support, other
- Tasks support multiple assignees, multiple participants, creator capture, expected completion time, attachments, and threaded discussion
- Task statuses and allowed transitions are globally configurable
- Task statuses carry ordinary / completed / rejected semantics so linked requirement synchronization survives custom labels
- No standalone delay workflow is planned for now; schedule slippage is represented through tasks
- No board / Sprint / Epic / Story scope is currently accepted

### Requirement management

- Each project customer has its own requirement list
- Requirement records support creation, invalidation, and deletion
- Requirement invalidation is the preferred business action; deletion is mainly for mistaken records
- Requirement creation can optionally create a linked task by default
- Linked requirement tasks are assigned to the requirement creator
- Requirement cards store and expose the linked task ID
- Linked task outcomes synchronize requirement status:
  - completed task → implemented requirement
  - rejected task → rejected requirement
- Project requirement overview ignores invalidated requirements

### Internationalization

- The system must support Chinese and English
- Other languages are out of scope for now

### Order management

- Orders are first-class records with:
  - order type
  - order date
  - customer
  - project
  - quantity
  - specification
  - expected ship date
  - planned ship date
  - software version
  - currency
  - unit price
  - amount
  - creator
- Order amount is calculated from quantity × unit price
- Order edits preserve modifier, modification time, change summary, and reason
- Creating an order automatically links the customer and project if missing, with initial status derived from order type: sample → 样机测试, pre-order → 商机发掘, formal → 订单冲刺

### Analytics and login

- Statistics dashboard includes:
  - order statistics
  - resource allocation
  - technical-support situation
- Order statistics use combined bar-and-line charts so one view shows both project comparison and time trend
- Order statistics support project / customer / region filtering, with searchable multi-select project selection
- Order statistics can normalize source-currency order amounts into USD or CNY for reporting
- Resource allocation uses an embedded world map and supports fullscreen expansion
- Technical-support customer selection supports search-and-select instead of a long fixed dropdown
- Login page and logout flow are represented in the prototype

## Prototype coverage completed

- Dashboard
- Project list
- Project creation wizard
- Real project creation
- Project edit modal
- Project archive / restore / delete confirmation
- Project archive-state filtering
- Project detail
- Parallel stage status maintenance
- Stage detail page
- Stage file repository
- Stage message stream
- Project materials area
- Workflow templates
- Resource management
  - users
  - departments
  - roles
  - permissions
  - customer-project-status configuration
  - order-type configuration
  - task-status configuration
  - CRUD interactions
- Standalone customer management
  - customer list
  - customer detail
  - contacts
  - customer materials
  - follow-up records
  - direct customer order entry
  - associated project list
- Project customer list
- Linking customers to projects
- Per-project customer status maintenance
- Order-driven automatic customer-project linking
- Customer requirement list
- Requirement creation / invalidation / deletion
- Requirement-linked task creation
- Requirement ↔ task navigation
- Requirement status sync from task outcome
- Requirement overview
- Stage blocker help routed into task management
- Lightweight task management
- Task categories
- Task detail page
- Task-detail editing, attachments, and discussion
- Project-member modal maintenance
- Order management
- Statistics dashboard
- Login / logout
- Resource-management relationship cleanup:
  - user departments use configured selections
  - department counts are auto-derived from users
  - authorization now flows through roles or user direct grants
  - permission management is now a read-only system capability catalog
  - permissions are generated from real menus and business buttons
  - permission display supports menu / button filtering
- Project-side relationship cleanup:
  - project managers reference real users
  - project managers are automatically included in project members
  - project members reference real users plus project-specific roles
  - stage responsibility binds real users and/or departments
  - stages can carry multiple responsible parties
- Workflow-template CRUD:
  - create / query / edit / copy
  - enable / disable
  - delete draft or disabled templates
  - configure stage add / rename / reorder / delete
  - only enabled templates are selectable when creating projects
- Chinese / English entrypoint
- Trial-stability pass is now in progress / prepared: enum sources, reference integrity, status protection, and simple trial checklist
- People selection for project members, project managers, stage owners, and customer owners is search-based instead of full-list enumeration
- User / role permission columns now show permission counts instead of expanded permission names
- User direct grants and role grants are maintained through searchable permission pickers
- Department management is flat; V1 does not maintain department hierarchy
- Lightweight create/edit flows now prefer modal forms, including project edit, customer, order, task, requirement, contact, follow-up, resource configuration, and project-customer association flows
- Order creation and project-customer association use searchable customer / project inputs instead of static full-list selection where practical
- Customer records now include customer level, with level enums maintained in resource management
- Statistics dashboard now includes a customer activity page with KPI cards, customer × project matrix, risk customer list, and CRM / KPM consistency signals

## Prototype files

- Clickable prototype:
  - `apps/frontend/prototype/index.html`
  - `apps/frontend/prototype/styles.css`
  - `apps/frontend/prototype/app.js`
- Screenshots:
  - `assets/prototype-screenshots/`

## Open product areas still to prototype

See `docs/02-prototype/full-prototype-backlog.md` for the active checklist.

Current main remaining areas:

- approval flow
- Jira integration flow
- DingTalk notifications / notification center
- deeper reporting / management views

## Key product documents

- `docs/01-requirements/prd.md`
- `docs/02-prototype/prototype-notes.md`
- `docs/02-prototype/v1-prototype-spec.md`
- `docs/02-prototype/full-prototype-backlog.md`
- `docs/00-governance/decision-log.md`
