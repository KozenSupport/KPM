-- KPM display ID rules.
-- 1. Customer technical id is BIGINT; UI displays short_name.
-- 2. New customer short_name must be 1-5 English letters and unique.
-- 3. Task technical id is BIGINT; UI displays task_no.

CREATE SEQUENCE IF NOT EXISTS kpm_task_no_seq START WITH 1 INCREMENT BY 1;

ALTER TABLE kpm_tasks ADD COLUMN IF NOT EXISTS task_no TEXT;

UPDATE kpm_tasks
SET task_no = CASE
  WHEN customer_id IS NOT NULL AND EXISTS (
    SELECT 1 FROM kpm_customers c
    WHERE c.id = kpm_tasks.customer_id
      AND c.short_name ~ '^[A-Za-z]{1,5}$'
  )
  THEN upper((SELECT c.short_name FROM kpm_customers c WHERE c.id = kpm_tasks.customer_id LIMIT 1)) || regexp_replace(kpm_tasks.id::text, '[^0-9]', '', 'g')
  ELSE 'N' || coalesce(nullif(regexp_replace(kpm_tasks.id::text, '[^0-9]', '', 'g'), ''), '0')
END
WHERE task_no IS NULL OR task_no = '';

CREATE UNIQUE INDEX IF NOT EXISTS uk_kpm_tasks_task_no ON kpm_tasks(task_no) WHERE del_flag=0;

SELECT setval(
  'kpm_task_no_seq',
  greatest(
    1,
    coalesce((SELECT max(nullif(regexp_replace(task_no, '[^0-9]', '', 'g'), '')::bigint) FROM kpm_tasks), 0) + 1
  ),
  false
);

CREATE UNIQUE INDEX IF NOT EXISTS uk_kpm_customers_short_name_active
  ON kpm_customers(upper(short_name))
  WHERE del_flag=0 AND short_name IS NOT NULL;
