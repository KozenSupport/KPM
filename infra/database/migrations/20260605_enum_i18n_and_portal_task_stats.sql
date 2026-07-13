-- Add English enum names used by bilingual UI. Chinese display uses kpm_enum_items.name.
ALTER TABLE kpm_enum_items
  ADD COLUMN IF NOT EXISTS label_en TEXT;

UPDATE kpm_enum_items
SET label_en = COALESCE(label_en, name),
    update_time = CURRENT_TIMESTAMP;

UPDATE kpm_enum_items SET label_en='Requirement', update_time=CURRENT_TIMESTAMP WHERE enum_type='task_category' AND value='REQUIREMENT';
UPDATE kpm_enum_items SET label_en='Bug', update_time=CURRENT_TIMESTAMP WHERE enum_type='task_category' AND value='BUG';
UPDATE kpm_enum_items SET label_en='Technical Support', update_time=CURRENT_TIMESTAMP WHERE enum_type='task_category' AND value='TECHNICAL_SUPPORT';
UPDATE kpm_enum_items SET label_en='Other', update_time=CURRENT_TIMESTAMP WHERE enum_type='task_category' AND value='OTHER';
UPDATE kpm_enum_items SET label_en='High', update_time=CURRENT_TIMESTAMP WHERE enum_type IN ('task_priority','priority') AND value='HIGH';
UPDATE kpm_enum_items SET label_en='Medium', update_time=CURRENT_TIMESTAMP WHERE enum_type IN ('task_priority','priority') AND value='MEDIUM';
UPDATE kpm_enum_items SET label_en='Low', update_time=CURRENT_TIMESTAMP WHERE enum_type IN ('task_priority','priority') AND value='LOW';
