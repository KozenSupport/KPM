ALTER TABLE kpm_customers ADD COLUMN IF NOT EXISTS address TEXT;

CREATE TABLE IF NOT EXISTS kpm_geocode_cache (
  query TEXT PRIMARY KEY,
  latitude NUMERIC(10, 7) NOT NULL,
  longitude NUMERIC(10, 7) NOT NULL,
  display_name TEXT,
  provider TEXT NOT NULL,
  precision TEXT NOT NULL,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

UPDATE kpm_customers SET address = region WHERE address IS NULL OR address = '';
