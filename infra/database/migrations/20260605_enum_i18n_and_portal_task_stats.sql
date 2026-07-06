-- Add English enum names used by bilingual UI. Chinese display uses kpm_enum_items.name.
ALTER TABLE kpm_enum_items
  ADD COLUMN IF NOT EXISTS label_en TEXT;

UPDATE kpm_enum_items
SET label_en = COALESCE(label_en, name),
    update_time = CURRENT_TIMESTAMP;

UPDATE kpm_enum_items SET label_en='Requirement', update_time=CURRENT_TIMESTAMP WHERE enum_type='task_category' AND value='需求';
UPDATE kpm_enum_items SET label_en='Bug', update_time=CURRENT_TIMESTAMP WHERE enum_type='task_category' AND value='Bug';
UPDATE kpm_enum_items SET label_en='Support', update_time=CURRENT_TIMESTAMP WHERE enum_type='task_category' AND value='技术支持';
UPDATE kpm_enum_items SET label_en='Other', update_time=CURRENT_TIMESTAMP WHERE enum_type='task_category' AND value='其他';
UPDATE kpm_enum_items SET label_en='High', update_time=CURRENT_TIMESTAMP WHERE enum_type IN ('task_priority','priority') AND value='高';
UPDATE kpm_enum_items SET label_en='Medium', update_time=CURRENT_TIMESTAMP WHERE enum_type IN ('task_priority','priority') AND value='中';
UPDATE kpm_enum_items SET label_en='Low', update_time=CURRENT_TIMESTAMP WHERE enum_type IN ('task_priority','priority') AND value='低';
