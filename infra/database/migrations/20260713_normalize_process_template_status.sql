-- Keep process template status values consistent across UI and backend rules.
-- Only '启用' can be selected when creating projects; legacy inactive labels are normalized to '停用'.
UPDATE kpm_process_templates
SET status='停用',
    update_time=current_timestamp,
    updator=coalesce(updator, 'migration:normalize-process-template-status')
WHERE del_flag=0
  AND status IN ('未启用', '草稿');
