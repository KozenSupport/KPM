-- Prevent duplicate customer portal messages caused by repeated project-customer/contact rows.
-- Existing duplicated announcement messages are logically deleted before the partial unique index is added.
WITH ranked AS (
  SELECT id,
         row_number() OVER (
           PARTITION BY announcement_id, lower(trim(contact_email))
           ORDER BY created_at ASC, id ASC
         ) AS rn
  FROM kpm_customer_portal_messages
  WHERE del_flag=0
    AND announcement_id IS NOT NULL
    AND contact_email IS NOT NULL
    AND trim(contact_email) <> ''
)
UPDATE kpm_customer_portal_messages
SET del_flag=1,
    update_time=current_timestamp,
    updator='migration:dedupe-portal-announcements'
WHERE id IN (SELECT id FROM ranked WHERE rn > 1);

CREATE UNIQUE INDEX IF NOT EXISTS uk_kpm_portal_messages_announcement_contact
  ON kpm_customer_portal_messages (announcement_id, lower(trim(contact_email)))
  WHERE announcement_id IS NOT NULL AND del_flag=0;
