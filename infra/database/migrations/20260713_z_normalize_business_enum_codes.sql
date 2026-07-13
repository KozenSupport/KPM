-- Normalize KPM business enums to stable English machine-readable codes.
--
-- Storage/API rule:
--   * value/status/type columns store UPPER_SNAKE_CASE codes only.
--   * kpm_enum_items.name stores the Chinese display name.
--   * kpm_enum_items.label_en stores the English display name.
--
-- Chinese strings below are legacy source values used only to migrate existing data. No target
-- column is assigned a localized display label by this migration.

BEGIN;

CREATE TEMP TABLE _kpm_enum_code_map (
  enum_type TEXT NOT NULL,
  code TEXT NOT NULL,
  name_zh TEXT NOT NULL,
  name_en TEXT NOT NULL,
  sort_order INT NOT NULL,
  legacy_values TEXT[] NOT NULL,
  PRIMARY KEY (enum_type, code)
) ON COMMIT DROP;

INSERT INTO _kpm_enum_code_map (enum_type, code, name_zh, name_en, sort_order, legacy_values) VALUES
  ('stage_status','NOT_STARTED','未开始','Not Started',10,ARRAY['NOT_STARTED','未开始']),
  ('stage_status','IN_PROGRESS','进行中','In Progress',20,ARRAY['IN_PROGRESS','进行中']),
  ('stage_status','COMPLETED','已完成','Completed',30,ARRAY['COMPLETED','已完成','完成']),

  ('customer_master_status','PROSPECT','潜在客户','Prospect',10,ARRAY['PROSPECT','潜在客户']),
  ('customer_master_status','ACTIVE','合作中','Active',20,ARRAY['ACTIVE','合作中']),
  ('customer_master_status','INACTIVE','已停用','Inactive',30,ARRAY['INACTIVE','已停用','停用']),

  ('customer_project_status','OPPORTUNITY_DISCOVERY','商机发掘','Opportunity Discovery',10,ARRAY['OPPORTUNITY_DISCOVERY','商机发掘']),
  ('customer_project_status','SAMPLE_TESTING','样机测试','Sample Testing',20,ARRAY['SAMPLE_TESTING','样机测试']),
  ('customer_project_status','RND_INVESTMENT','研发投入','R&D Investment',30,ARRAY['RND_INVESTMENT','研发投入']),
  ('customer_project_status','ORDER_SPRINT','订单冲刺','Order Sprint',40,ARRAY['ORDER_SPRINT','订单冲刺']),
  ('customer_project_status','FIRST_ORDER_SUPPORT','首单护航','First Order Support',50,ARRAY['FIRST_ORDER_SUPPORT','首单护航']),
  ('customer_project_status','MASS_PRODUCTION_SUPPORT','量产维护','Mass Production Support',60,ARRAY['MASS_PRODUCTION_SUPPORT','量产维护']),
  ('customer_project_status','EOL_NOTICE','EOL 声明','EOL Notice',70,ARRAY['EOL_NOTICE','EOL 声明','EOL声明']),
  ('customer_project_status','EOL','EOL','EOL',80,ARRAY['EOL']),
  ('customer_project_status','SUPPORT_ENDED','Support Ended','Support Ended',90,ARRAY['SUPPORT_ENDED','Support Ended','Support ended']),

  ('customer_level','STRATEGIC','A / 战略客户','A / Strategic Customer',10,ARRAY['STRATEGIC','A / 战略客户','A/战略客户','战略客户']),
  ('customer_level','KEY','B / 重点客户','B / Key Customer',20,ARRAY['KEY','B / 重点客户','B/重点客户','重点客户']),
  ('customer_level','STANDARD','C / 普通客户','C / Standard Customer',30,ARRAY['STANDARD','C / 普通客户','C/普通客户','普通客户']),
  ('customer_level','WATCHLIST','D / 观察客户','D / Watchlist Customer',40,ARRAY['WATCHLIST','D / 观察客户','D/观察客户','观察客户']),
  ('customer_level','BLACKLISTED','黑名单 / 暂停合作','Blacklisted / Suspended',50,ARRAY['BLACKLISTED','黑名单 / 暂停合作','黑名单/暂停合作','黑名单']),

  ('order_type','SAMPLE','样品订单','Sample Order',10,ARRAY['SAMPLE','样品订单']),
  ('order_type','PRE_ORDER','预订单','Pre-order',20,ARRAY['PRE_ORDER','预订单']),
  ('order_type','FORMAL','正式订单','Formal Order',30,ARRAY['FORMAL','正式订单']),

  ('order_status','CREATED','已创建','Created',10,ARRAY['CREATED','已创建']),
  ('order_status','IN_PRODUCTION','生产中','In Production',20,ARRAY['IN_PRODUCTION','生产中']),
  ('order_status','SHIPPED','已发货','Shipped',30,ARRAY['SHIPPED','已发货']),
  ('order_status','RECEIVED','已收货','Received',40,ARRAY['RECEIVED','已收货']),
  ('order_status','COMPLETED','已完成','Completed',50,ARRAY['COMPLETED','已完成','完成']),

  ('task_category','REQUIREMENT','需求','Requirement',10,ARRAY['REQUIREMENT','需求']),
  ('task_category','BUG','Bug','Bug',20,ARRAY['BUG','Bug','bug']),
  ('task_category','TECHNICAL_SUPPORT','技术支持','Technical Support',30,ARRAY['TECHNICAL_SUPPORT','技术支持']),
  ('task_category','OTHER','其他','Other',40,ARRAY['OTHER','其他']),

  ('task_status','PENDING','待处理','Pending',10,ARRAY['PENDING','待处理']),
  ('task_status','IN_PROGRESS','进行中','In Progress',20,ARRAY['IN_PROGRESS','进行中']),
  ('task_status','COMPLETED','已完成','Completed',30,ARRAY['COMPLETED','已完成','完成']),
  ('task_status','REJECTED','已拒绝','Rejected',40,ARRAY['REJECTED','已拒绝','拒绝']),

  ('priority','HIGH','高','High',10,ARRAY['HIGH','高']),
  ('priority','MEDIUM','中','Medium',20,ARRAY['MEDIUM','中']),
  ('priority','LOW','低','Low',30,ARRAY['LOW','低']),
  ('task_priority','HIGH','高','High',10,ARRAY['HIGH','高']),
  ('task_priority','MEDIUM','中','Medium',20,ARRAY['MEDIUM','中']),
  ('task_priority','LOW','低','Low',30,ARRAY['LOW','低']),

  ('requirement_status','PENDING_REVIEW','待评估','Pending Review',10,ARRAY['PENDING_REVIEW','待评估','待审核']),
  ('requirement_status','ACCEPTED','已采纳','Accepted',20,ARRAY['ACCEPTED','已采纳']),
  ('requirement_status','IMPLEMENTING','实现中','Implementing',30,ARRAY['IMPLEMENTING','实现中']),
  ('requirement_status','IMPLEMENTED','已实现','Implemented',40,ARRAY['IMPLEMENTED','已实现']),
  ('requirement_status','REJECTED','已拒绝','Rejected',50,ARRAY['REJECTED','已拒绝']),
  ('requirement_status','VOIDED','已作废','Voided',60,ARRAY['VOIDED','已作废','作废']),

  ('currency','USD','USD','USD',10,ARRAY['USD']),
  ('currency','EUR','EUR','EUR',20,ARRAY['EUR']),
  ('currency','CNY','CNY','CNY',30,ARRAY['CNY']),

  ('project_announcement_type','GENERAL','普通公告','General Notice',10,ARRAY['GENERAL','普通公告']),
  ('project_announcement_type','PRODUCT_EOL','产品 EOL 公告','Product EOL Notice',20,ARRAY['PRODUCT_EOL','产品EOL公告','产品 EOL 公告']);

-- Choose one canonical row for every known code. This avoids unique-key conflicts when both a
-- legacy label row and a code row exist in the same environment.
CREATE TEMP TABLE _kpm_enum_code_keeper ON COMMIT DROP AS
SELECT m.enum_type, m.code, min(e.id) AS keep_id
FROM _kpm_enum_code_map m
JOIN kpm_enum_items e
  ON e.enum_type=m.enum_type
 AND (e.value=ANY(m.legacy_values) OR e.value=m.code)
GROUP BY m.enum_type, m.code;

UPDATE kpm_enum_items e
SET value=left('LEGACY_DUPLICATE_' || regexp_replace(upper(e.id::text), '[^A-Z0-9]+', '_', 'g'), 64),
    active=false,
    del_flag=1,
    updator='migration:business-enum-codes',
    update_time=current_timestamp
FROM _kpm_enum_code_map m
JOIN _kpm_enum_code_keeper k ON k.enum_type=m.enum_type AND k.code=m.code
WHERE e.enum_type=m.enum_type
  AND (e.value=ANY(m.legacy_values) OR e.value=m.code)
  AND e.id<>k.keep_id;

UPDATE kpm_enum_items e
SET name=m.name_zh,
    value=m.code,
    label_en=m.name_en,
    active=true,
    sort_order=m.sort_order,
    del_flag=0,
    updator='migration:business-enum-codes',
    update_time=current_timestamp
FROM _kpm_enum_code_map m
JOIN _kpm_enum_code_keeper k ON k.enum_type=m.enum_type AND k.code=m.code
WHERE e.id=k.keep_id;

INSERT INTO kpm_enum_items (enum_type, name, value, label_en, active, sort_order, creator, updator)
SELECT m.enum_type, m.name_zh, m.code, m.name_en, true, m.sort_order,
       'migration:business-enum-codes', 'migration:business-enum-codes'
FROM _kpm_enum_code_map m
WHERE NOT EXISTS (
  SELECT 1 FROM kpm_enum_items e WHERE e.enum_type=m.enum_type AND e.value=m.code
);

-- Configurable business columns.
UPDATE kpm_project_stages t SET status=m.code, update_time=current_timestamp
FROM _kpm_enum_code_map m WHERE m.enum_type='stage_status' AND t.status=ANY(m.legacy_values);
UPDATE kpm_customers t SET status=m.code, update_time=current_timestamp
FROM _kpm_enum_code_map m WHERE m.enum_type='customer_master_status' AND t.status=ANY(m.legacy_values);
UPDATE kpm_customers t SET level=m.code, update_time=current_timestamp
FROM _kpm_enum_code_map m WHERE m.enum_type='customer_level' AND t.level=ANY(m.legacy_values);
UPDATE kpm_project_customers t SET project_status=m.code, update_time=current_timestamp
FROM _kpm_enum_code_map m WHERE m.enum_type='customer_project_status' AND t.project_status=ANY(m.legacy_values);
UPDATE kpm_orders t SET order_type=m.code, update_time=current_timestamp
FROM _kpm_enum_code_map m WHERE m.enum_type='order_type' AND t.order_type=ANY(m.legacy_values);
UPDATE kpm_orders t SET status=m.code, update_time=current_timestamp
FROM _kpm_enum_code_map m WHERE m.enum_type='order_status' AND t.status=ANY(m.legacy_values);
UPDATE kpm_orders t SET currency=m.code, update_time=current_timestamp
FROM _kpm_enum_code_map m WHERE m.enum_type='currency' AND t.currency=ANY(m.legacy_values);
UPDATE kpm_tasks t SET category=m.code, update_time=current_timestamp
FROM _kpm_enum_code_map m WHERE m.enum_type='task_category' AND t.category=ANY(m.legacy_values);
UPDATE kpm_tasks t SET status=m.code, update_time=current_timestamp
FROM _kpm_enum_code_map m WHERE m.enum_type='task_status' AND t.status=ANY(m.legacy_values);
UPDATE kpm_tasks t SET priority=m.code, update_time=current_timestamp
FROM _kpm_enum_code_map m WHERE m.enum_type='task_priority' AND t.priority=ANY(m.legacy_values);
UPDATE kpm_requirements t SET priority=m.code, update_time=current_timestamp
FROM _kpm_enum_code_map m WHERE m.enum_type='priority' AND t.priority=ANY(m.legacy_values);
UPDATE kpm_requirements t SET status=m.code, update_time=current_timestamp
FROM _kpm_enum_code_map m WHERE m.enum_type='requirement_status' AND t.status=ANY(m.legacy_values);
UPDATE kpm_project_announcements t SET announcement_type=m.code, update_time=current_timestamp
FROM _kpm_enum_code_map m WHERE m.enum_type='project_announcement_type' AND t.announcement_type=ANY(m.legacy_values);
UPDATE kpm_task_status_transitions t SET from_status=m.code, update_time=current_timestamp
FROM _kpm_enum_code_map m WHERE m.enum_type='task_status' AND t.from_status=ANY(m.legacy_values);
UPDATE kpm_task_status_transitions t SET to_status=m.code, update_time=current_timestamp
FROM _kpm_enum_code_map m WHERE m.enum_type='task_status' AND t.to_status=ANY(m.legacy_values);

-- Fixed system enums.
UPDATE kpm_departments SET status='ACTIVE', update_time=current_timestamp WHERE status IN ('启用','已启用','enabled','ENABLED');
UPDATE kpm_departments SET status='INACTIVE', update_time=current_timestamp WHERE status IN ('停用','未启用','禁用','disabled','DISABLED');
UPDATE kpm_users SET status='ACTIVE', update_time=current_timestamp WHERE status IN ('启用','已启用','enabled','ENABLED');
UPDATE kpm_users SET status='INACTIVE', update_time=current_timestamp WHERE status IN ('停用','未启用','禁用','disabled','DISABLED');
UPDATE kpm_roles SET status='ACTIVE', update_time=current_timestamp WHERE status IN ('启用','已启用','enabled','ENABLED');
UPDATE kpm_roles SET status='INACTIVE', update_time=current_timestamp WHERE status IN ('停用','未启用','禁用','disabled','DISABLED');
UPDATE kpm_roles SET role_type='GLOBAL', update_time=current_timestamp WHERE role_type IN ('全局角色','global','Global');
UPDATE kpm_roles SET role_type='PROJECT', update_time=current_timestamp WHERE role_type IN ('项目内角色','项目角色','project','Project');
UPDATE kpm_permissions SET permission_type='MENU', update_time=current_timestamp WHERE permission_type IN ('菜单权限','menu','Menu');
UPDATE kpm_permissions SET permission_type='BUTTON', update_time=current_timestamp WHERE permission_type IN ('按钮权限','button','Button');
UPDATE kpm_process_templates SET status='ACTIVE', update_time=current_timestamp WHERE status IN ('启用','已启用','enabled','ENABLED');
UPDATE kpm_process_templates SET status='INACTIVE', update_time=current_timestamp WHERE status IN ('停用','未启用','草稿','禁用','disabled','DISABLED','DRAFT');
UPDATE kpm_project_announcements SET announcement_status='PUBLISHED', update_time=current_timestamp WHERE announcement_status IN ('已发布','发布','published');
UPDATE kpm_project_announcements SET announcement_status='RETRACTED', update_time=current_timestamp WHERE announcement_status IN ('撤回','已撤回','下架','retracted');
UPDATE kpm_knowledge_articles SET status='PENDING_REVIEW', update_time=current_timestamp WHERE status IN ('待审核','待评估','pending');
UPDATE kpm_knowledge_articles SET status='PUBLISHED', update_time=current_timestamp WHERE status IN ('已发布','发布','published');
UPDATE kpm_project_materials SET share_target='PROJECT_MATERIALS', update_time=current_timestamp WHERE share_target IN ('项目资料区','project-materials');
UPDATE kpm_tasks SET source='TASK_MANAGEMENT', update_time=current_timestamp
WHERE source IS NULL OR btrim(source)='' OR source IN ('任务管理','task-management');
UPDATE kpm_tasks SET source='STAGE_DETAIL', update_time=current_timestamp WHERE source IN ('阶段详情','stage-detail');
UPDATE kpm_tasks SET source='CUSTOMER_PORTAL', update_time=current_timestamp WHERE source IN ('客户门户','customer-portal');
UPDATE kpm_tasks SET source='REQUIREMENT_AUTO_CREATED', update_time=current_timestamp
WHERE source IN ('需求创建自动生成','requirement-auto-created');
UPDATE kpm_tasks SET source='CUSTOMER_FOLLOW_UP', update_time=current_timestamp WHERE source='客户例行跟进';
UPDATE kpm_tasks SET source='CUSTOMER_REQUIREMENT_BREAKDOWN', update_time=current_timestamp WHERE source='客户需求拆解';
UPDATE kpm_tasks SET source='CUSTOMER_PROJECT_FOLLOW_UP', update_time=current_timestamp WHERE source='客户项目推进';
UPDATE kpm_tasks SET source='TEST_DATA', update_time=current_timestamp WHERE source IN ('KPMT 测试数据','demo-activity-rebalance');
UPDATE kpm_tasks SET source='INTEGRATION_SCRIPT', update_time=current_timestamp WHERE source='联调脚本';

-- File type is a fixed technical classification. MIME type remains part of the upload response;
-- persisted file_type stores a stable code instead of a localized label or extension.
UPDATE kpm_stage_materials SET file_type=CASE
  WHEN upper(file_type) IN ('IMAGE','VIDEO','PDF','DOCUMENT','SPREADSHEET','PRESENTATION','OTHER') THEN upper(file_type)
  WHEN file_type='图片' OR lower(file_type) LIKE 'image/%' THEN 'IMAGE'
  WHEN file_type='视频' OR lower(file_type) LIKE 'video/%' THEN 'VIDEO'
  WHEN file_type='Word' THEN 'DOCUMENT'
  WHEN file_type='表格' THEN 'SPREADSHEET'
  WHEN file_type='演示文稿' THEN 'PRESENTATION'
  ELSE 'OTHER' END,
  update_time=current_timestamp
WHERE file_type IS NOT NULL;
UPDATE kpm_project_materials SET file_type=CASE
  WHEN upper(file_type) IN ('IMAGE','VIDEO','PDF','DOCUMENT','SPREADSHEET','PRESENTATION','OTHER') THEN upper(file_type)
  WHEN file_type='图片' OR lower(file_type) LIKE 'image/%' THEN 'IMAGE'
  WHEN file_type='视频' OR lower(file_type) LIKE 'video/%' THEN 'VIDEO'
  WHEN file_type='Word' THEN 'DOCUMENT'
  WHEN file_type='表格' THEN 'SPREADSHEET'
  WHEN file_type='演示文稿' THEN 'PRESENTATION'
  ELSE 'OTHER' END,
  update_time=current_timestamp
WHERE file_type IS NOT NULL;
UPDATE kpm_customer_materials SET file_type=CASE
  WHEN upper(file_type) IN ('IMAGE','VIDEO','PDF','DOCUMENT','SPREADSHEET','PRESENTATION','OTHER') THEN upper(file_type)
  WHEN file_type='图片' OR lower(file_type) LIKE 'image/%' THEN 'IMAGE'
  WHEN file_type='视频' OR lower(file_type) LIKE 'video/%' THEN 'VIDEO'
  WHEN file_type='Word' THEN 'DOCUMENT'
  WHEN file_type='表格' THEN 'SPREADSHEET'
  WHEN file_type='演示文稿' THEN 'PRESENTATION'
  ELSE 'OTHER' END,
  update_time=current_timestamp
WHERE file_type IS NOT NULL;
UPDATE kpm_task_attachments SET file_type=CASE
  WHEN upper(file_type) IN ('IMAGE','VIDEO','PDF','DOCUMENT','SPREADSHEET','PRESENTATION','OTHER') THEN upper(file_type)
  WHEN file_type='图片' OR lower(file_type) LIKE 'image/%' THEN 'IMAGE'
  WHEN file_type='视频' OR lower(file_type) LIKE 'video/%' THEN 'VIDEO'
  WHEN file_type='Word' THEN 'DOCUMENT'
  WHEN file_type='表格' THEN 'SPREADSHEET'
  WHEN file_type='演示文稿' THEN 'PRESENTATION'
  ELSE 'OTHER' END,
  update_time=current_timestamp
WHERE file_type IS NOT NULL;

-- Invalid test transitions are retained as logically deleted audit rows, but their fields are
-- converted to valid technical codes so database constraints remain enforceable.
UPDATE kpm_task_status_transitions t
SET del_flag=1,
    from_status=left('LEGACY_INVALID_' || regexp_replace(upper(t.id::text), '[^A-Z0-9]+', '_', 'g') || '_FROM', 64),
    to_status=left('LEGACY_INVALID_' || regexp_replace(upper(t.id::text), '[^A-Z0-9]+', '_', 'g') || '_TO', 64),
    updator='migration:business-enum-codes',
    update_time=current_timestamp
WHERE NOT EXISTS (
        SELECT 1 FROM kpm_enum_items e
        WHERE e.enum_type='task_status' AND e.value=t.from_status AND e.active=true AND e.del_flag=0
      )
   OR NOT EXISTS (
        SELECT 1 FROM kpm_enum_items e
        WHERE e.enum_type='task_status' AND e.value=t.to_status AND e.active=true AND e.del_flag=0
      );

-- Re-run the project-template backfill after legacy template statuses have been normalized.
UPDATE kpm_projects p
SET process_template_id = (
  SELECT id FROM kpm_process_templates
  WHERE status='ACTIVE' AND del_flag=0
  ORDER BY updated_at DESC, name
  LIMIT 1
),
update_time=current_timestamp
WHERE p.process_template_id IS NULL
  AND p.del_flag=0
  AND EXISTS (SELECT 1 FROM kpm_process_templates WHERE status='ACTIVE' AND del_flag=0);

-- Remove obsolete duplicated enum-label columns. The canonical model is name/value/label_en.
ALTER TABLE kpm_enum_items
  DROP COLUMN IF EXISTS semantic,
  DROP COLUMN IF EXISTS label_zh,
  DROP COLUMN IF EXISTS short_label_zh,
  DROP COLUMN IF EXISTS short_label_en;

-- Fail fast instead of silently preserving an unknown localized business value. If this guard
-- fails in UAT, add an explicit mapping above so the resulting code remains meaningful.
DO $$
DECLARE
  invalid_values TEXT;
BEGIN
  SELECT string_agg(enum_type || '=' || value, ', ' ORDER BY enum_type, value)
  INTO invalid_values
  FROM kpm_enum_items
  WHERE del_flag=0 AND value !~ '^[A-Z][A-Z0-9_]{0,63}$';
  IF invalid_values IS NOT NULL THEN
    RAISE EXCEPTION 'Unmapped enum values found: %', invalid_values;
  END IF;
END $$;

-- Deleted legacy dictionary rows are retained for audit, but their obsolete localized values must
-- also satisfy the code constraint. Active unknown values are rejected by the guard above.
UPDATE kpm_enum_items
SET value=left('LEGACY_ENUM_' || regexp_replace(upper(id::text), '[^A-Z0-9]+', '_', 'g'), 64),
    updator='migration:business-enum-codes',
    update_time=current_timestamp
WHERE del_flag<>0
  AND value !~ '^[A-Z][A-Z0-9_]{0,63}$';

DO $$
DECLARE
  invalid_values TEXT;
BEGIN
  SELECT string_agg(field_name || '=' || field_value, ', ' ORDER BY field_name, field_value)
  INTO invalid_values
  FROM (
    SELECT 'kpm_project_stages.status' field_name, status field_value FROM kpm_project_stages WHERE status !~ '^[A-Z][A-Z0-9_]{0,63}$'
    UNION SELECT 'kpm_customers.level', level FROM kpm_customers WHERE level !~ '^[A-Z][A-Z0-9_]{0,63}$'
    UNION SELECT 'kpm_customers.status', status FROM kpm_customers WHERE status !~ '^[A-Z][A-Z0-9_]{0,63}$'
    UNION SELECT 'kpm_project_customers.project_status', project_status FROM kpm_project_customers WHERE project_status !~ '^[A-Z][A-Z0-9_]{0,63}$'
    UNION SELECT 'kpm_orders.order_type', order_type FROM kpm_orders WHERE order_type !~ '^[A-Z][A-Z0-9_]{0,63}$'
    UNION SELECT 'kpm_orders.status', status FROM kpm_orders WHERE status !~ '^[A-Z][A-Z0-9_]{0,63}$'
    UNION SELECT 'kpm_tasks.category', category FROM kpm_tasks WHERE category !~ '^[A-Z][A-Z0-9_]{0,63}$'
    UNION SELECT 'kpm_tasks.status', status FROM kpm_tasks WHERE status !~ '^[A-Z][A-Z0-9_]{0,63}$'
    UNION SELECT 'kpm_tasks.priority', priority FROM kpm_tasks WHERE priority !~ '^[A-Z][A-Z0-9_]{0,63}$'
    UNION SELECT 'kpm_tasks.source', source FROM kpm_tasks
      WHERE source NOT IN (
        'TASK_MANAGEMENT','STAGE_DETAIL','CUSTOMER_PORTAL','REQUIREMENT_AUTO_CREATED',
        'CUSTOMER_FOLLOW_UP','CUSTOMER_REQUIREMENT_BREAKDOWN','CUSTOMER_PROJECT_FOLLOW_UP',
        'TEST_DATA','INTEGRATION_SCRIPT'
      )
    UNION SELECT 'kpm_requirements.priority', priority FROM kpm_requirements WHERE priority !~ '^[A-Z][A-Z0-9_]{0,63}$'
    UNION SELECT 'kpm_requirements.status', status FROM kpm_requirements WHERE status !~ '^[A-Z][A-Z0-9_]{0,63}$'
    UNION SELECT 'kpm_project_announcements.announcement_type', announcement_type FROM kpm_project_announcements WHERE announcement_type !~ '^[A-Z][A-Z0-9_]{0,63}$'
  ) invalid;
  IF invalid_values IS NOT NULL THEN
    RAISE EXCEPTION 'Unmapped business field values found: %', invalid_values;
  END IF;
END $$;

-- Defaults and integrity constraints for clean future writes.
ALTER TABLE kpm_departments ALTER COLUMN status SET DEFAULT 'ACTIVE';
ALTER TABLE kpm_users ALTER COLUMN status SET DEFAULT 'ACTIVE';
ALTER TABLE kpm_roles ALTER COLUMN status SET DEFAULT 'ACTIVE';
ALTER TABLE kpm_project_stages ALTER COLUMN status SET DEFAULT 'NOT_STARTED';
ALTER TABLE kpm_project_announcements ALTER COLUMN announcement_type SET DEFAULT 'GENERAL';
ALTER TABLE kpm_project_announcements ALTER COLUMN announcement_status SET DEFAULT 'PUBLISHED';
ALTER TABLE kpm_knowledge_articles ALTER COLUMN status SET DEFAULT 'PENDING_REVIEW';
ALTER TABLE kpm_project_materials ALTER COLUMN share_target SET DEFAULT 'PROJECT_MATERIALS';
ALTER TABLE kpm_tasks ALTER COLUMN source SET DEFAULT 'TASK_MANAGEMENT';
ALTER TABLE kpm_tasks ALTER COLUMN source SET NOT NULL;

ALTER TABLE kpm_departments DROP CONSTRAINT IF EXISTS chk_kpm_departments_status;
ALTER TABLE kpm_departments ADD CONSTRAINT chk_kpm_departments_status CHECK (status IN ('ACTIVE','INACTIVE'));
ALTER TABLE kpm_users DROP CONSTRAINT IF EXISTS chk_kpm_users_status;
ALTER TABLE kpm_users ADD CONSTRAINT chk_kpm_users_status CHECK (status IN ('ACTIVE','INACTIVE'));
ALTER TABLE kpm_roles DROP CONSTRAINT IF EXISTS chk_kpm_roles_type;
ALTER TABLE kpm_roles ADD CONSTRAINT chk_kpm_roles_type CHECK (role_type IN ('GLOBAL','PROJECT'));
ALTER TABLE kpm_roles DROP CONSTRAINT IF EXISTS chk_kpm_roles_status;
ALTER TABLE kpm_roles ADD CONSTRAINT chk_kpm_roles_status CHECK (status IN ('ACTIVE','INACTIVE'));
ALTER TABLE kpm_permissions DROP CONSTRAINT IF EXISTS chk_kpm_permissions_type;
ALTER TABLE kpm_permissions ADD CONSTRAINT chk_kpm_permissions_type CHECK (permission_type IN ('MENU','BUTTON'));
ALTER TABLE kpm_process_templates DROP CONSTRAINT IF EXISTS chk_kpm_process_templates_status;
ALTER TABLE kpm_process_templates ADD CONSTRAINT chk_kpm_process_templates_status CHECK (status IN ('ACTIVE','INACTIVE'));
ALTER TABLE kpm_enum_items DROP CONSTRAINT IF EXISTS chk_kpm_enum_items_type;
ALTER TABLE kpm_enum_items ADD CONSTRAINT chk_kpm_enum_items_type CHECK (enum_type ~ '^[a-z][a-z0-9_]{1,63}$');
ALTER TABLE kpm_enum_items DROP CONSTRAINT IF EXISTS chk_kpm_enum_items_value;
ALTER TABLE kpm_enum_items ADD CONSTRAINT chk_kpm_enum_items_value CHECK (value ~ '^[A-Z][A-Z0-9_]{0,63}$');
ALTER TABLE kpm_task_status_transitions DROP CONSTRAINT IF EXISTS chk_kpm_task_transition_from;
ALTER TABLE kpm_task_status_transitions ADD CONSTRAINT chk_kpm_task_transition_from CHECK (from_status ~ '^[A-Z][A-Z0-9_]{0,63}$');
ALTER TABLE kpm_task_status_transitions DROP CONSTRAINT IF EXISTS chk_kpm_task_transition_to;
ALTER TABLE kpm_task_status_transitions ADD CONSTRAINT chk_kpm_task_transition_to CHECK (to_status ~ '^[A-Z][A-Z0-9_]{0,63}$');
ALTER TABLE kpm_project_stages DROP CONSTRAINT IF EXISTS chk_kpm_project_stages_status;
ALTER TABLE kpm_project_stages ADD CONSTRAINT chk_kpm_project_stages_status CHECK (status ~ '^[A-Z][A-Z0-9_]{0,63}$');
ALTER TABLE kpm_customers DROP CONSTRAINT IF EXISTS chk_kpm_customers_level_code;
ALTER TABLE kpm_customers ADD CONSTRAINT chk_kpm_customers_level_code CHECK (level ~ '^[A-Z][A-Z0-9_]{0,63}$');
ALTER TABLE kpm_customers DROP CONSTRAINT IF EXISTS chk_kpm_customers_status_code;
ALTER TABLE kpm_customers ADD CONSTRAINT chk_kpm_customers_status_code CHECK (status ~ '^[A-Z][A-Z0-9_]{0,63}$');
ALTER TABLE kpm_project_customers DROP CONSTRAINT IF EXISTS chk_kpm_project_customers_status;
ALTER TABLE kpm_project_customers ADD CONSTRAINT chk_kpm_project_customers_status CHECK (project_status ~ '^[A-Z][A-Z0-9_]{0,63}$');
ALTER TABLE kpm_orders DROP CONSTRAINT IF EXISTS chk_kpm_orders_type;
ALTER TABLE kpm_orders ADD CONSTRAINT chk_kpm_orders_type CHECK (order_type ~ '^[A-Z][A-Z0-9_]{0,63}$');
ALTER TABLE kpm_orders DROP CONSTRAINT IF EXISTS chk_kpm_orders_status;
ALTER TABLE kpm_orders ADD CONSTRAINT chk_kpm_orders_status CHECK (status ~ '^[A-Z][A-Z0-9_]{0,63}$');
ALTER TABLE kpm_orders DROP CONSTRAINT IF EXISTS chk_kpm_orders_currency;
ALTER TABLE kpm_orders ADD CONSTRAINT chk_kpm_orders_currency CHECK (currency ~ '^[A-Z][A-Z0-9_]{0,15}$');
ALTER TABLE kpm_tasks DROP CONSTRAINT IF EXISTS chk_kpm_tasks_category;
ALTER TABLE kpm_tasks ADD CONSTRAINT chk_kpm_tasks_category CHECK (category ~ '^[A-Z][A-Z0-9_]{0,63}$');
ALTER TABLE kpm_tasks DROP CONSTRAINT IF EXISTS chk_kpm_tasks_status;
ALTER TABLE kpm_tasks ADD CONSTRAINT chk_kpm_tasks_status CHECK (status ~ '^[A-Z][A-Z0-9_]{0,63}$');
ALTER TABLE kpm_tasks DROP CONSTRAINT IF EXISTS chk_kpm_tasks_priority;
ALTER TABLE kpm_tasks ADD CONSTRAINT chk_kpm_tasks_priority CHECK (priority ~ '^[A-Z][A-Z0-9_]{0,63}$');
ALTER TABLE kpm_tasks DROP CONSTRAINT IF EXISTS chk_kpm_tasks_source;
ALTER TABLE kpm_tasks ADD CONSTRAINT chk_kpm_tasks_source
  CHECK (source IN (
    'TASK_MANAGEMENT','STAGE_DETAIL','CUSTOMER_PORTAL','REQUIREMENT_AUTO_CREATED',
    'CUSTOMER_FOLLOW_UP','CUSTOMER_REQUIREMENT_BREAKDOWN','CUSTOMER_PROJECT_FOLLOW_UP',
    'TEST_DATA','INTEGRATION_SCRIPT'
  ));
ALTER TABLE kpm_requirements DROP CONSTRAINT IF EXISTS chk_kpm_requirements_priority;
ALTER TABLE kpm_requirements ADD CONSTRAINT chk_kpm_requirements_priority CHECK (priority ~ '^[A-Z][A-Z0-9_]{0,63}$');
ALTER TABLE kpm_requirements DROP CONSTRAINT IF EXISTS chk_kpm_requirements_status;
ALTER TABLE kpm_requirements ADD CONSTRAINT chk_kpm_requirements_status CHECK (status ~ '^[A-Z][A-Z0-9_]{0,63}$');
ALTER TABLE kpm_project_announcements DROP CONSTRAINT IF EXISTS chk_kpm_project_announcements_type;
ALTER TABLE kpm_project_announcements ADD CONSTRAINT chk_kpm_project_announcements_type CHECK (announcement_type ~ '^[A-Z][A-Z0-9_]{0,63}$');
ALTER TABLE kpm_project_announcements DROP CONSTRAINT IF EXISTS chk_kpm_project_announcements_status;
ALTER TABLE kpm_project_announcements ADD CONSTRAINT chk_kpm_project_announcements_status CHECK (announcement_status IN ('PUBLISHED','RETRACTED'));
ALTER TABLE kpm_knowledge_articles DROP CONSTRAINT IF EXISTS chk_kpm_knowledge_status;
ALTER TABLE kpm_knowledge_articles ADD CONSTRAINT chk_kpm_knowledge_status CHECK (status IN ('PENDING_REVIEW','PUBLISHED'));
ALTER TABLE kpm_stage_materials DROP CONSTRAINT IF EXISTS chk_kpm_stage_materials_file_type;
ALTER TABLE kpm_stage_materials ADD CONSTRAINT chk_kpm_stage_materials_file_type CHECK (file_type IS NULL OR file_type ~ '^[A-Z][A-Z0-9_]{0,63}$');
ALTER TABLE kpm_project_materials DROP CONSTRAINT IF EXISTS chk_kpm_project_materials_file_type;
ALTER TABLE kpm_project_materials ADD CONSTRAINT chk_kpm_project_materials_file_type CHECK (file_type IS NULL OR file_type ~ '^[A-Z][A-Z0-9_]{0,63}$');
ALTER TABLE kpm_customer_materials DROP CONSTRAINT IF EXISTS chk_kpm_customer_materials_file_type;
ALTER TABLE kpm_customer_materials ADD CONSTRAINT chk_kpm_customer_materials_file_type CHECK (file_type IS NULL OR file_type ~ '^[A-Z][A-Z0-9_]{0,63}$');
ALTER TABLE kpm_task_attachments DROP CONSTRAINT IF EXISTS chk_kpm_task_attachments_file_type;
ALTER TABLE kpm_task_attachments ADD CONSTRAINT chk_kpm_task_attachments_file_type CHECK (file_type IS NULL OR file_type ~ '^[A-Z][A-Z0-9_]{0,63}$');

COMMIT;
