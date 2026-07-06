-- Simplify enum item model.
-- Keep one stable business value and two display names:
--   name     = Chinese name
--   value    = stable value used by APIs and service logic
--   label_en = English name

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name='kpm_enum_items'
      AND column_name='label_zh'
  ) THEN
    EXECUTE 'UPDATE kpm_enum_items
             SET name = COALESCE(NULLIF(label_zh, ''''), name),
                 label_en = COALESCE(NULLIF(label_en, ''''), name),
                 update_time = CURRENT_TIMESTAMP';
  ELSE
    EXECUTE 'UPDATE kpm_enum_items
             SET label_en = COALESCE(NULLIF(label_en, ''''), name),
                 update_time = CURRENT_TIMESTAMP';
  END IF;
END $$;

DROP INDEX IF EXISTS idx_kpm_enum_items_default;

ALTER TABLE kpm_enum_items
  DROP COLUMN IF EXISTS label_zh,
  DROP COLUMN IF EXISTS short_label_zh,
  DROP COLUMN IF EXISTS short_label_en,
  DROP COLUMN IF EXISTS semantic;

CREATE INDEX IF NOT EXISTS idx_kpm_enum_items_order
  ON kpm_enum_items (enum_type, active, del_flag, sort_order, id);
