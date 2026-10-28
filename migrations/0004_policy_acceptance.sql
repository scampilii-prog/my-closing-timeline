-- Website 12 · Retain an explicit record of PRO account policy acceptance.
-- Run after 0001_pro_accounts.sql; the API creates this table idempotently if necessary.
-- No password, client data or raw IP address is stored in the consent record.
CREATE TABLE IF NOT EXISTS account_policy_acceptances (
 user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
 terms_version TEXT NOT NULL,
 privacy_version TEXT NOT NULL,
 accepted_at TEXT NOT NULL DEFAULT (datetime('now')),
 acceptance_method TEXT NOT NULL
);
