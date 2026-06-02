-- Add common audit and logical-delete columns required by KPM coding standards.
-- Safe to run repeatedly. This keeps the current string business identifiers intact for the pilot.

DO $$
DECLARE
  table_name text;
BEGIN
  FOR table_name IN
    SELECT tablename
    FROM pg_tables
    WHERE schemaname = 'public'
      AND tablename LIKE 'kpm_%'
  LOOP
    EXECUTE format('ALTER TABLE %I ADD COLUMN IF NOT EXISTS creator TEXT', table_name);
    EXECUTE format('ALTER TABLE %I ADD COLUMN IF NOT EXISTS updator TEXT', table_name);
    EXECUTE format('ALTER TABLE %I ADD COLUMN IF NOT EXISTS create_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP', table_name);
    EXECUTE format('ALTER TABLE %I ADD COLUMN IF NOT EXISTS update_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP', table_name);
    EXECUTE format('ALTER TABLE %I ADD COLUMN IF NOT EXISTS del_flag SMALLINT NOT NULL DEFAULT 0', table_name);
  END LOOP;
END $$;
