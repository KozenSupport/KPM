-- Indexes for task dashboard statistics, task list filters and analytics dashboards.
-- They are safe to run repeatedly and do not change business data.

-- Dashboard/user scoped task statistics: related-by-creator/assignee/participant and completed/open status checks.
CREATE INDEX IF NOT EXISTS idx_kpm_tasks_creator_status_active
  ON kpm_tasks (creator_user_id, status, created_at DESC, id DESC)
  WHERE del_flag = 0;

CREATE INDEX IF NOT EXISTS idx_kpm_tasks_customer_status_active
  ON kpm_tasks (customer_id, status, created_at DESC, id DESC)
  WHERE del_flag = 0 AND customer_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_kpm_task_assignees_user_task_active
  ON kpm_task_assignees (user_id, task_id)
  WHERE del_flag = 0 AND user_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_kpm_task_participants_user_task_active
  ON kpm_task_participants (user_id, task_id)
  WHERE del_flag = 0 AND user_id IS NOT NULL;

-- Order analytics: grouping by period/project/customer/currency and filtering out logically deleted rows.
CREATE INDEX IF NOT EXISTS idx_kpm_orders_analytics_active
  ON kpm_orders (order_date, project_id, customer_id, currency)
  INCLUDE (amount, quantity)
  WHERE del_flag = 0;

CREATE INDEX IF NOT EXISTS idx_kpm_orders_customer_latest_active
  ON kpm_orders (customer_id, order_date DESC)
  WHERE del_flag = 0;

-- Customer activity dashboard: latest follow-up and project/customer matrix lookups.
CREATE INDEX IF NOT EXISTS idx_kpm_customer_followups_latest_active
  ON kpm_customer_followups (customer_id, created_at DESC)
  WHERE del_flag = 0;

CREATE INDEX IF NOT EXISTS idx_kpm_project_customers_customer_project_active
  ON kpm_project_customers (customer_id, project_id)
  WHERE del_flag = 0;

CREATE INDEX IF NOT EXISTS idx_kpm_project_customers_project_customer_active
  ON kpm_project_customers (project_id, customer_id)
  WHERE del_flag = 0;

-- Resource/support dashboards: owner aggregation by type and user.
CREATE INDEX IF NOT EXISTS idx_kpm_customer_owners_type_user_customer_active
  ON kpm_customer_owners (owner_type, owner_user_id, customer_id)
  WHERE del_flag = 0;
