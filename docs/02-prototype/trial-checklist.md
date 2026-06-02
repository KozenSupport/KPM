# KPM V1 Prototype Trial Checklist

> Last updated: 2026-05-22

Use this checklist for the first simple trial before moving from Phase 1 prototype confirmation into Phase 2 technical design.

## 1. Login and navigation

- [ ] Login with demo account `zhangmin / 123456`
- [ ] Confirm the main menu opens the following pages:
  - [ ] 工作台
  - [ ] 项目管理
  - [ ] 客户管理
  - [ ] 任务管理
  - [ ] 订单管理
  - [ ] 统计看板
  - [ ] 流程模板
  - [ ] 资源管理
- [ ] Confirm top-right user menu can logout

## 2. Project management

- [ ] Project list can search by project name / internal name / model name
- [ ] Project list can filter by salesability and archive status
- [ ] Project detail shows stage statuses without forcing linear next / previous movement
- [ ] Changing a stage status updates the project detail and dashboard display
- [ ] New project status defaults to 未开始 and cannot be manually selected during creation
- [ ] Project status automatically becomes 进行中 when any stage is 进行中
- [ ] Project status automatically becomes 已完成 when all stages are 已完成
- [ ] Unsellable reason is hidden when salesability is 可销售
- [ ] Project member count opens a member maintenance modal
- [ ] Project members can be added through search input instead of full user enumeration
- [ ] Project manager remains included in project members automatically
- [ ] Editing project opens a modal and does not leave the current page
- [ ] Editing project basic info updates related task and order project names if the external name changes
- [ ] Archive / restore project requires a second confirmation
- [ ] Delete project requires a second confirmation and shows related customer/task/order counts

## 3. Stage detail

- [ ] Open a stage detail page from project detail
- [ ] Stage responsible people are maintained through search input, without department selection
- [ ] Uploading a stage file adds it to the stage repository
- [ ] Publishing a stage file asks for second confirmation before adding it to the project materials area
- [ ] Creating a task from stage detail opens a modal on the same page
- [ ] Blocker help creates a task assigned to the stage responsible user, with project manager as participant

## 4. Customers and requirements

- [ ] Customer management is a standalone main menu, not a resource-management subtab
- [ ] Customer list can search customers and open customer detail
- [ ] Customer list and customer form show customer level
- [ ] New / edit customer opens in a modal instead of expanding the list page
- [ ] Customer detail can maintain contacts
- [ ] Customer detail can show/upload customer materials
- [ ] Customer detail can add follow-up records with text and attachments
- [ ] Customer detail can open an order form with the current customer prefilled
- [ ] Customer detail shows an associated project list with each project’s customer-project status
- [ ] Customer detail contact, follow-up, and direct-order creation use modal forms
- [ ] Project customer list shows customer status, sales owners, and support owners from customer master data
- [ ] Project customer association uses a modal and searchable customer input
- [ ] Customer project status dropdown keeps the current value visible even if the status is later disabled
- [ ] Customer project status options include 商机发掘、样机测试、研发投入、订单冲刺、首单护航、量产维护、EOL 声明、EOL、Support Ended
- [ ] Resource-management customer region changes sync back to project-customer records
- [ ] New requirement can optionally create a linked task
- [ ] Requirement card stores linked task ID and can jump to task detail
- [ ] Linked task completion marks the requirement as implemented
- [ ] Linked task rejection marks the requirement as rejected

## 5. Task management

- [ ] Task list can filter by project, status, priority, assignee, and category
- [ ] New task opens in a modal rather than inline above the table
- [ ] Task creation uses configured task categories and active task statuses
- [ ] Task detail can update description, priority, assignees, participants, and expected completion date
- [ ] Task detail status dropdown shows all active configured task statuses, and displays configured transition hints
- [ ] Task attachment upload works in prototype state
- [ ] Task comments can include text and attachments

## 6. Resource management

- [ ] User edit uses configured department, role, and permission options
- [ ] User and role lists show permission counts instead of long expanded permission names
- [ ] User direct permissions and role permissions can be maintained through permission search
- [ ] Customer sales/support owners can be maintained through search input
- [ ] Customer level enum management supports strategic, key, ordinary, watchlist, and paused examples
- [ ] Department management is flat, without parent / child department fields
- [ ] Department member count is automatically derived from users
- [ ] Role authorization is configured from the real permission catalog
- [ ] Permission catalog is read-only and generated from real menus and buttons
- [ ] Resource create/edit forms open in a modal
- [ ] Customer project statuses are configured in “客户项目状态配置” and cannot be disabled while currently used
- [ ] Order type enum management supports sample, pre-order, and formal order examples
- [ ] Task statuses cannot be disabled while currently used
- [ ] New assignment selectors prefer active users; historical references remain visible

## 7. Orders and analytics

- [ ] New order can select order type, customer, project, currency, quantity, unit price, and shipping dates
- [ ] New / edit order opens in a modal and uses searchable customer / project inputs
- [ ] Creating an order automatically links customer and project if they were not already associated
- [ ] Auto-linked customer-project status follows order type: sample → 样机测试, pre-order → 商机发掘, formal → 订单冲刺
- [ ] Order amount is calculated from quantity × unit price
- [ ] Editing an order requires a modification reason and creates an audit record
- [ ] Order statistics can convert sales amount into USD or CNY
- [ ] Order statistics can filter by project, customer, and region
- [ ] Project filter is searchable multi-select
- [ ] Combined bar-and-line chart updates after filters change
- [ ] Customer activity dashboard shows KPI cards, customer × project matrix, and risk customer list
- [ ] Customer activity matrix cell opens a detail modal
- [ ] Customer activity identifies CRM opportunity without KPM follow-up and KPM investment without CRM opportunity

## 8. Known Phase 2 discussion items

- [ ] Decide official exchange-rate source and timing rule
- [ ] Decide whether menu/button permissions should be enforced in the prototype before technical design
- [ ] Decide real map provider and offline/China-access strategy for resource allocation
- [ ] Decide approval-flow scope before implementation
