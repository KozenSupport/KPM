-- Align pilot data model with maintainable ID-based relationships, RBAC catalog, and notifications.

ALTER TABLE kpm_users ADD COLUMN IF NOT EXISTS email TEXT;
UPDATE kpm_users SET email = account WHERE email IS NULL AND account LIKE '%@%';

CREATE TABLE IF NOT EXISTS kpm_notification_events (
  id TEXT PRIMARY KEY,
  event_type TEXT NOT NULL,
  aggregate_type TEXT NOT NULL,
  aggregate_id TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  recipient_user_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  status TEXT NOT NULL DEFAULT 'PENDING',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  processed_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS kpm_internal_messages (
  id TEXT PRIMARY KEY,
  recipient_user_id TEXT NOT NULL REFERENCES kpm_users(id),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  message_type TEXT NOT NULL DEFAULT 'system',
  read_flag BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  read_at TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_kpm_notification_events_status ON kpm_notification_events (status, created_at);
CREATE INDEX IF NOT EXISTS idx_kpm_internal_messages_recipient ON kpm_internal_messages (recipient_user_id, read_flag, created_at);

ALTER TABLE kpm_projects ADD COLUMN IF NOT EXISTS manager_user_id TEXT REFERENCES kpm_users(id);
UPDATE kpm_projects p
SET manager_user_id = u.id
FROM kpm_users u
WHERE p.manager_user_id IS NULL AND (u.account = p.manager_account OR u.name = p.manager_account);

ALTER TABLE kpm_project_members ADD COLUMN IF NOT EXISTS user_id TEXT REFERENCES kpm_users(id);
UPDATE kpm_project_members pm
SET user_id = u.id
FROM kpm_users u
WHERE pm.user_id IS NULL AND (u.account = pm.user_account OR u.name = pm.user_account);

ALTER TABLE kpm_stage_assignees ADD COLUMN IF NOT EXISTS user_id TEXT REFERENCES kpm_users(id);
UPDATE kpm_stage_assignees sa
SET user_id = u.id
FROM kpm_users u
WHERE sa.assignee_type = 'user'
  AND sa.user_id IS NULL
  AND (u.account = sa.account OR u.name = sa.assignee_name);

ALTER TABLE kpm_customer_owners ADD COLUMN IF NOT EXISTS owner_user_id TEXT REFERENCES kpm_users(id);
UPDATE kpm_customer_owners co
SET owner_user_id = u.id
FROM kpm_users u
WHERE co.owner_user_id IS NULL AND (u.name = co.owner_name OR u.account = co.owner_name);

ALTER TABLE kpm_tasks ADD COLUMN IF NOT EXISTS creator_user_id TEXT REFERENCES kpm_users(id);
UPDATE kpm_tasks t
SET creator_user_id = u.id
FROM kpm_users u
WHERE t.creator_user_id IS NULL AND (u.name = t.creator OR u.account = t.creator);

ALTER TABLE kpm_task_assignees ADD COLUMN IF NOT EXISTS user_id TEXT REFERENCES kpm_users(id);
UPDATE kpm_task_assignees ta
SET user_id = u.id
FROM kpm_users u
WHERE ta.user_id IS NULL AND (u.name = ta.assignee_name OR u.account = ta.assignee_name);

ALTER TABLE kpm_task_participants ADD COLUMN IF NOT EXISTS user_id TEXT REFERENCES kpm_users(id);
UPDATE kpm_task_participants tp
SET user_id = u.id
FROM kpm_users u
WHERE tp.user_id IS NULL AND (u.name = tp.participant_name OR u.account = tp.participant_name);

ALTER TABLE kpm_orders ADD COLUMN IF NOT EXISTS creator_user_id TEXT REFERENCES kpm_users(id);
UPDATE kpm_orders o
SET creator_user_id = u.id
FROM kpm_users u
WHERE o.creator_user_id IS NULL AND (u.name = o.creator OR u.account = o.creator);

ALTER TABLE kpm_customers DROP COLUMN IF EXISTS crm_opportunity_exists;
ALTER TABLE kpm_customers DROP COLUMN IF EXISTS crm_opportunity_id;
ALTER TABLE kpm_customers DROP COLUMN IF EXISTS crm_stage;
ALTER TABLE kpm_customers DROP COLUMN IF EXISTS crm_last_updated;

INSERT INTO kpm_permissions (id, code, name, permission_type, target, location) VALUES
('perm-btn-project-archive','button:projects:archive','项目管理 / 归档项目','BUTTON','归档','项目管理'),
('perm-btn-project-members','button:project-detail:edit-members','项目详情 / 维护成员','BUTTON','维护成员','项目详情'),
('perm-btn-stage-create-task','button:stage-detail:create-task','阶段详情 / 新建任务','BUTTON','新建任务','阶段详情'),
('perm-btn-stage-blocker-help','button:stage-detail:blocker-help','阶段详情 / 卡点求助','BUTTON','卡点求助','阶段详情'),
('perm-btn-stage-file-publish','button:stage-detail:publish-file','阶段详情 / 发布资料','BUTTON','发布到项目资料区','阶段详情'),
('perm-btn-stage-record-publish','button:stage-detail:publish-record','阶段详情 / 发布留言','BUTTON','发布留言','阶段详情'),
('perm-btn-customer-delete','button:customers:delete','客户管理 / 删除客户','BUTTON','删除客户','客户管理'),
('perm-btn-customer-detail','button:customers:view-detail','客户管理 / 查看详情','BUTTON','客户详情','客户管理'),
('perm-btn-customer-contact','button:customer-detail:add-contact','客户详情 / 新增联系人','BUTTON','新增联系人','客户详情'),
('perm-btn-customer-material','button:customer-detail:upload-material','客户详情 / 上传资料','BUTTON','上传资料','客户详情'),
('perm-btn-customer-followup','button:customer-detail:add-followup','客户详情 / 新增跟进','BUTTON','新增跟进','客户详情'),
('perm-btn-customer-order','button:customer-detail:create-order','客户详情 / 新建订单','BUTTON','下单','客户详情'),
('perm-btn-task-save','button:tasks:save','任务管理 / 保存任务','BUTTON','保存任务','任务管理'),
('perm-btn-task-detail-save','button:task-detail:save','任务详情 / 保存任务','BUTTON','保存任务','任务详情'),
('perm-btn-task-comment','button:task-detail:publish-comment','任务详情 / 发布评论','BUTTON','发布评论','任务详情'),
('perm-btn-order-delete','button:orders:delete','订单管理 / 删除订单','BUTTON','删除订单','订单管理'),
('perm-btn-order-history','button:orders:view-history','订单管理 / 查看修改记录','BUTTON','查看修改记录','订单管理'),
('perm-btn-template-create','button:templates:create','流程模板 / 新建模板','BUTTON','新建模板','流程模板'),
('perm-btn-template-edit','button:templates:edit','流程模板 / 编辑模板','BUTTON','编辑模板','流程模板'),
('perm-btn-template-toggle','button:templates:toggle','流程模板 / 启用停用','BUTTON','启用 / 停用','流程模板'),
('perm-btn-customer-status-create','button:customer-statuses:create','客户状态配置 / 新增','BUTTON','新增','客户状态配置'),
('perm-btn-customer-status-edit','button:customer-statuses:edit','客户状态配置 / 编辑','BUTTON','编辑','客户状态配置'),
('perm-btn-customer-status-toggle','button:customer-statuses:toggle','客户状态配置 / 启用停用','BUTTON','启用 / 停用','客户状态配置'),
('perm-btn-customer-status-delete','button:customer-statuses:delete','客户状态配置 / 删除','BUTTON','删除','客户状态配置'),
('perm-btn-customer-level-create','button:customer-levels:create','客户等级配置 / 新增','BUTTON','新增','客户等级配置'),
('perm-btn-customer-level-edit','button:customer-levels:edit','客户等级配置 / 编辑','BUTTON','编辑','客户等级配置'),
('perm-btn-customer-level-toggle','button:customer-levels:toggle','客户等级配置 / 启用停用','BUTTON','启用 / 停用','客户等级配置'),
('perm-btn-customer-level-delete','button:customer-levels:delete','客户等级配置 / 删除','BUTTON','删除','客户等级配置'),
('perm-btn-order-type-create','button:order-types:create','订单类型配置 / 新增','BUTTON','新增','订单类型配置'),
('perm-btn-order-type-edit','button:order-types:edit','订单类型配置 / 编辑','BUTTON','编辑','订单类型配置'),
('perm-btn-order-type-toggle','button:order-types:toggle','订单类型配置 / 启用停用','BUTTON','启用 / 停用','订单类型配置'),
('perm-btn-order-type-delete','button:order-types:delete','订单类型配置 / 删除','BUTTON','删除','订单类型配置'),
('perm-btn-task-status-create','button:task-statuses:create','任务状态配置 / 新增','BUTTON','新增','任务状态配置'),
('perm-btn-task-status-edit','button:task-statuses:edit','任务状态配置 / 编辑','BUTTON','编辑','任务状态配置'),
('perm-btn-task-status-toggle','button:task-statuses:toggle','任务状态配置 / 启用停用','BUTTON','启用 / 停用','任务状态配置'),
('perm-btn-task-status-delete','button:task-statuses:delete','任务状态配置 / 删除','BUTTON','删除','任务状态配置'),
('perm-btn-task-transition-add','button:task-statuses:add-transition','任务状态配置 / 新增流转','BUTTON','新增流转','任务状态配置'),
('perm-btn-task-transition-delete','button:task-statuses:delete-transition','任务状态配置 / 删除流转','BUTTON','删除流转','任务状态配置')
ON CONFLICT (code) DO UPDATE SET name=excluded.name, permission_type=excluded.permission_type, target=excluded.target, location=excluded.location;

INSERT INTO kpm_role_permissions (role_id, permission_id)
SELECT 'role-admin', p.id FROM kpm_permissions p
ON CONFLICT DO NOTHING;

INSERT INTO kpm_role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM kpm_roles r
JOIN kpm_permissions p ON p.code IN (
  'menu:dashboard','menu:projects','menu:tasks','button:projects:create','button:projects:edit',
  'button:tasks:create','button:tasks:save','button:task-detail:save','button:task-detail:publish-comment',
  'button:stage-detail:create-task','button:stage-detail:blocker-help'
)
WHERE r.name IN ('项目负责人','硬件项目经理','软件项目经理','技术支持','销售')
ON CONFLICT DO NOTHING;


-- Keep database permission catalog in sync with the real frontend menu/button registry.
INSERT INTO kpm_permissions (id, code, name, permission_type, target, location) VALUES
('perm-menu-dashboard','menu:dashboard','菜单 / 工作台','MENU','工作台','左侧菜单'),
('perm-menu-projects','menu:projects','菜单 / 项目管理','MENU','项目管理','左侧菜单'),
('perm-menu-customers','menu:customer-master','菜单 / 客户管理','MENU','客户管理','左侧菜单'),
('perm-menu-tasks','menu:tasks','菜单 / 任务管理','MENU','任务管理','左侧菜单'),
('perm-menu-orders','menu:orders','菜单 / 订单管理','MENU','订单管理','左侧菜单'),
('perm-menu-analytics','menu:analytics','菜单 / 统计看板','MENU','统计看板','左侧菜单'),
('perm-menu-templates','menu:templates','菜单 / 流程模板','MENU','流程模板','左侧菜单'),
('perm-menu-resources','menu:resources','菜单 / 资源管理','MENU','资源管理','左侧菜单'),
('perm-button-dashboard-view-all','button:dashboard:view-all','工作台 / 查看全部','BUTTON','查看全部','工作台'),
('perm-button-projects-create','button:projects:create','项目管理 / 新建项目','BUTTON','新建项目','项目管理'),
('perm-button-projects-view-detail','button:projects:view-detail','项目管理 / 查看详情','BUTTON','查看详情','项目管理'),
('perm-button-projects-edit','button:projects:edit','项目管理 / 编辑','BUTTON','编辑','项目管理'),
('perm-button-projects-archive','button:projects:archive','项目管理 / 归档或恢复','BUTTON','归档 / 恢复','项目管理'),
('perm-button-projects-delete','button:projects:delete','项目管理 / 删除','BUTTON','删除','项目管理'),
('perm-button-project-detail-edit','button:project-detail:edit','项目详情 / 编辑项目','BUTTON','编辑项目','项目详情'),
('perm-button-project-detail-archive','button:project-detail:archive','项目详情 / 归档项目','BUTTON','归档项目','项目详情'),
('perm-button-project-detail-delete','button:project-detail:delete','项目详情 / 删除项目','BUTTON','删除项目','项目详情'),
('perm-button-project-detail-stage-detail','button:project-detail:stage-detail','项目详情 / 阶段查看详情','BUTTON','查看详情','项目详情'),
('perm-button-project-detail-customers-entry','button:project-detail:customers-entry','项目详情 / 客户列表入口','BUTTON','进入','项目详情'),
('perm-button-project-detail-materials-entry','button:project-detail:materials-entry','项目详情 / 项目资料区入口','BUTTON','进入','项目详情'),
('perm-button-project-detail-requirement-overview-entry','button:project-detail:requirement-overview-entry','项目详情 / 需求纵览入口','BUTTON','进入','项目详情'),
('perm-button-project-edit-save','button:project-edit:save','项目编辑 / 保存项目','BUTTON','保存项目','项目编辑'),
('perm-button-tasks-create','button:tasks:create','任务管理 / 新建任务','BUTTON','新建任务','任务管理'),
('perm-button-tasks-save','button:tasks:save','任务管理 / 保存任务','BUTTON','保存任务','任务管理'),
('perm-button-task-detail-save','button:task-detail:save','任务详情 / 保存修改','BUTTON','保存修改','任务详情'),
('perm-button-task-detail-publish-comment','button:task-detail:publish-comment','任务详情 / 发布留言','BUTTON','发布留言','任务详情'),
('perm-button-stage-detail-create-task','button:stage-detail:create-task','阶段详情 / 从该阶段新建任务','BUTTON','从该阶段新建任务','阶段详情'),
('perm-button-stage-detail-blocker-help','button:stage-detail:blocker-help','阶段详情 / 卡点求助','BUTTON','卡点求助','阶段详情'),
('perm-button-stage-detail-create-blocker-task','button:stage-detail:create-blocker-task','阶段详情 / 创建卡点任务','BUTTON','创建卡点任务','阶段详情'),
('perm-button-stage-detail-publish-file','button:stage-detail:publish-file','阶段详情 / 发布到项目资料区','BUTTON','发布到项目资料区','阶段详情'),
('perm-button-stage-detail-publish-record','button:stage-detail:publish-record','阶段详情 / 发布记录','BUTTON','发布记录','阶段详情'),
('perm-button-project-customers-link','button:project-customers:link','项目客户 / 关联已有客户','BUTTON','关联已有客户','项目客户'),
('perm-button-project-customers-save-link','button:project-customers:save-link','项目客户 / 保存关联','BUTTON','保存关联','项目客户'),
('perm-button-project-customers-requirements','button:project-customers:requirements','项目客户 / 需求列表','BUTTON','需求列表','项目客户'),
('perm-button-requirements-create','button:requirements:create','客户需求 / 新增需求','BUTTON','新增需求','客户需求'),
('perm-button-requirements-save','button:requirements:save','客户需求 / 保存需求','BUTTON','保存需求','客户需求'),
('perm-button-requirements-void','button:requirements:void','客户需求 / 作废需求','BUTTON','作废需求','客户需求'),
('perm-button-requirements-delete','button:requirements:delete','客户需求 / 删除需求','BUTTON','删除需求','客户需求'),
('perm-button-templates-create','button:templates:create','流程模板 / 新建模板','BUTTON','新建模板','流程模板'),
('perm-button-templates-edit','button:templates:edit','流程模板 / 编辑模板','BUTTON','编辑模板','流程模板'),
('perm-button-templates-toggle','button:templates:toggle','流程模板 / 启用或停用','BUTTON','启用 / 停用','流程模板'),
('perm-button-templates-delete','button:templates:delete','流程模板 / 删除模板','BUTTON','删除','流程模板'),
('perm-button-templates-add-stage','button:templates:add-stage','流程模板 / 新增阶段','BUTTON','新增阶段','流程模板'),
('perm-button-templates-move-stage-up','button:templates:move-stage-up','流程模板 / 阶段上移','BUTTON','上移','流程模板'),
('perm-button-templates-move-stage-down','button:templates:move-stage-down','流程模板 / 阶段下移','BUTTON','下移','流程模板'),
('perm-button-templates-save','button:templates:save','流程模板 / 保存模板','BUTTON','保存模板','流程模板'),
('perm-button-users-create','button:users:create','用户管理 / 新增','BUTTON','新增','用户管理'),
('perm-button-users-edit','button:users:edit','用户管理 / 编辑','BUTTON','编辑','用户管理'),
('perm-button-users-toggle','button:users:toggle','用户管理 / 启用或停用','BUTTON','启用 / 停用','用户管理'),
('perm-button-users-reset-password','button:users:reset-password','用户管理 / 重置密码','BUTTON','重置密码','用户管理'),
('perm-button-resources-edit','button:resources:edit','资源管理 / 维护配置','BUTTON','维护资源','资源管理'),
('perm-button-departments-create','button:departments:create','部门管理 / 新增','BUTTON','新增','部门管理'),
('perm-button-departments-edit','button:departments:edit','部门管理 / 编辑','BUTTON','编辑','部门管理'),
('perm-button-departments-delete','button:departments:delete','部门管理 / 删除','BUTTON','删除','部门管理'),
('perm-button-roles-create','button:roles:create','角色管理 / 新增','BUTTON','新增','角色管理'),
('perm-button-roles-edit','button:roles:edit','角色管理 / 编辑','BUTTON','编辑','角色管理'),
('perm-button-roles-delete','button:roles:delete','角色管理 / 删除','BUTTON','删除','角色管理'),
('perm-button-customers-create','button:customers:create','客户管理 / 新增','BUTTON','新增','客户管理'),
('perm-button-customers-edit','button:customers:edit','客户管理 / 编辑','BUTTON','编辑','客户管理'),
('perm-button-customers-delete','button:customers:delete','客户管理 / 删除','BUTTON','删除','客户管理'),
('perm-button-customers-view-detail','button:customers:view-detail','客户管理 / 查看详情','BUTTON','查看详情','客户管理'),
('perm-button-customer-detail-add-contact','button:customer-detail:add-contact','客户详情 / 新增联系人','BUTTON','新增联系人','客户详情'),
('perm-button-customer-detail-upload-material','button:customer-detail:upload-material','客户详情 / 上传客户资料','BUTTON','上传资料','客户详情'),
('perm-button-customer-detail-add-followup','button:customer-detail:add-followup','客户详情 / 新增跟进记录','BUTTON','新增跟进记录','客户详情'),
('perm-button-customer-detail-create-order','button:customer-detail:create-order','客户详情 / 创建订单','BUTTON','创建订单','客户详情'),
('perm-button-customer-statuses-create','button:customer-statuses:create','客户项目状态配置 / 新增','BUTTON','新增','客户项目状态配置'),
('perm-button-customer-statuses-edit','button:customer-statuses:edit','客户项目状态配置 / 编辑','BUTTON','编辑','客户项目状态配置'),
('perm-button-customer-statuses-toggle','button:customer-statuses:toggle','客户项目状态配置 / 启用或停用','BUTTON','启用 / 停用','客户项目状态配置'),
('perm-button-customer-statuses-delete','button:customer-statuses:delete','客户项目状态配置 / 删除','BUTTON','删除','客户项目状态配置'),
('perm-button-customer-levels-create','button:customer-levels:create','客户等级配置 / 新增','BUTTON','新增','客户等级配置'),
('perm-button-customer-levels-edit','button:customer-levels:edit','客户等级配置 / 编辑','BUTTON','编辑','客户等级配置'),
('perm-button-customer-levels-toggle','button:customer-levels:toggle','客户等级配置 / 启用或停用','BUTTON','启用 / 停用','客户等级配置'),
('perm-button-customer-levels-delete','button:customer-levels:delete','客户等级配置 / 删除','BUTTON','删除','客户等级配置'),
('perm-button-order-types-create','button:order-types:create','订单类型配置 / 新增','BUTTON','新增','订单类型配置'),
('perm-button-order-types-edit','button:order-types:edit','订单类型配置 / 编辑','BUTTON','编辑','订单类型配置'),
('perm-button-order-types-toggle','button:order-types:toggle','订单类型配置 / 启用或停用','BUTTON','启用 / 停用','订单类型配置'),
('perm-button-order-types-delete','button:order-types:delete','订单类型配置 / 删除','BUTTON','删除','订单类型配置'),
('perm-button-task-statuses-create','button:task-statuses:create','任务状态配置 / 新增状态','BUTTON','新增状态','任务状态配置'),
('perm-button-task-statuses-edit','button:task-statuses:edit','任务状态配置 / 编辑状态','BUTTON','编辑状态','任务状态配置'),
('perm-button-task-statuses-toggle','button:task-statuses:toggle','任务状态配置 / 启用或停用','BUTTON','启用 / 停用','任务状态配置'),
('perm-button-task-statuses-delete','button:task-statuses:delete','任务状态配置 / 删除状态','BUTTON','删除状态','任务状态配置'),
('perm-button-task-statuses-add-transition','button:task-statuses:add-transition','任务状态配置 / 新增流转','BUTTON','新增流转','任务状态配置'),
('perm-button-task-statuses-delete-transition','button:task-statuses:delete-transition','任务状态配置 / 删除流转','BUTTON','删除流转','任务状态配置'),
('perm-button-orders-create','button:orders:create','订单管理 / 新增订单','BUTTON','新增订单','订单管理'),
('perm-button-orders-edit','button:orders:edit','订单管理 / 编辑订单','BUTTON','编辑订单','订单管理'),
('perm-button-orders-delete','button:orders:delete','订单管理 / 删除订单','BUTTON','删除订单','订单管理'),
('perm-button-orders-view-history','button:orders:view-history','订单管理 / 查看修改记录','BUTTON','查看修改记录','订单管理')
ON CONFLICT (code) DO UPDATE SET name=excluded.name, permission_type=excluded.permission_type, target=excluded.target, location=excluded.location;

INSERT INTO kpm_role_permissions (role_id, permission_id)
SELECT 'role-admin', p.id FROM kpm_permissions p
ON CONFLICT DO NOTHING;
