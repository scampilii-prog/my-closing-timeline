-- Optional explicit deployment migration for reusable, account-owned document templates.
-- The API also creates this table idempotently when a verified PRO user opens the library.
CREATE TABLE IF NOT EXISTS user_contract_form_templates (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL COLLATE NOCASE,
  forms_json TEXT NOT NULL,
  is_default INTEGER NOT NULL DEFAULT 0 CHECK(is_default IN (0,1)),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(user_id, name)
);
CREATE INDEX IF NOT EXISTS idx_form_templates_user
  ON user_contract_form_templates(user_id, updated_at);
