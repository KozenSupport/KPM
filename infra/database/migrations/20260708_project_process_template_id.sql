-- Record which process template was used when a project was created.
-- Existing projects are backfilled to the first enabled template so project detail/list can show a sensible source.
ALTER TABLE kpm_projects
  ADD COLUMN IF NOT EXISTS process_template_id BIGINT REFERENCES kpm_process_templates(id);

UPDATE kpm_projects
SET process_template_id = (
  SELECT id
  FROM kpm_process_templates
  WHERE status='启用' AND del_flag=0
  ORDER BY updated_at DESC, name
  LIMIT 1
)
WHERE process_template_id IS NULL
  AND del_flag=0
  AND EXISTS (
    SELECT 1 FROM kpm_process_templates WHERE status='启用' AND del_flag=0
  );

CREATE INDEX IF NOT EXISTS idx_kpm_projects_process_template
  ON kpm_projects (process_template_id, del_flag);
