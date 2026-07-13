-- Normalize legacy inactive display labels to the stable machine-readable status code.
-- Chinese values in the WHERE clause are legacy source data only; the stored target is English.
UPDATE kpm_process_templates
SET status='INACTIVE',
    update_time=current_timestamp,
    updator=coalesce(updator, 'migration:normalize-process-template-status')
WHERE del_flag=0
  AND status IN ('未启用', '草稿');
