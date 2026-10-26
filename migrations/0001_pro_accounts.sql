-- My Closing Timeline PRO: Cloudflare D1 schema. Apply to a new D1 database before enabling accounts.
-- Cloudflare D1 automatically enforces foreign keys.
CREATE TABLE IF NOT EXISTS users (
 id TEXT PRIMARY KEY,
 email TEXT NOT NULL UNIQUE,
 full_name TEXT NOT NULL,
 password_salt TEXT NOT NULL,
 password_hash TEXT NOT NULL,
 verified INTEGER NOT NULL DEFAULT 0,
 credits INTEGER NOT NULL DEFAULT 0 CHECK(credits >= 0),
 created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS sessions (
 token_hash TEXT PRIMARY KEY,
 user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 expires_at INTEGER NOT NULL,
 created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id);
CREATE TABLE IF NOT EXISTS email_verifications (
 token_hash TEXT PRIMARY KEY,
 user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 expires_at INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS purchases (
 id TEXT PRIMARY KEY,
 user_id TEXT NOT NULL REFERENCES users(id),
 plan_id TEXT NOT NULL,
 credit_quantity INTEGER NOT NULL CHECK(credit_quantity IN (1,2,5)),
 amount_cents INTEGER NOT NULL CHECK(amount_cents IN (2000,3500,8000)),
 checkout_session_id TEXT UNIQUE,
 status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','paid','expired')),
 credited_at TEXT,
 created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_purchases_user ON purchases(user_id);
CREATE TABLE IF NOT EXISTS promo_codes (
 id TEXT PRIMARY KEY,
 code_hash TEXT NOT NULL UNIQUE,
 credits INTEGER NOT NULL CHECK(credits > 0 AND credits <= 100),
 max_uses INTEGER NOT NULL CHECK(max_uses > 0),
 uses INTEGER NOT NULL DEFAULT 0 CHECK(uses >= 0),
 expires_at INTEGER,
 restricted_email TEXT,
 active INTEGER NOT NULL DEFAULT 1,
 created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS promo_redemptions (
 id TEXT PRIMARY KEY,
 code_id TEXT NOT NULL REFERENCES promo_codes(id),
 user_id TEXT NOT NULL REFERENCES users(id),
 created_at TEXT NOT NULL DEFAULT (datetime('now')),
 UNIQUE(code_id,user_id)
);
CREATE TABLE IF NOT EXISTS closings (
 id TEXT PRIMARY KEY,
 user_id TEXT NOT NULL REFERENCES users(id),
 name TEXT NOT NULL,
 address TEXT NOT NULL DEFAULT '',
 effective_date TEXT NOT NULL,
 closing_date TEXT NOT NULL,
 status TEXT NOT NULL DEFAULT 'in_progress' CHECK(status IN ('in_progress','completed','cancelled')),
 completed_on TEXT,
 cancelled_on TEXT,
 cancel_reason TEXT,
 created_at TEXT NOT NULL DEFAULT (datetime('now')),
 updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_closings_user ON closings(user_id,created_at);
CREATE TABLE IF NOT EXISTS follow_tasks (
 id TEXT PRIMARY KEY,
 closing_id TEXT NOT NULL REFERENCES closings(id) ON DELETE CASCADE,
 user_id TEXT NOT NULL REFERENCES users(id),
 title TEXT NOT NULL,
 due_date TEXT NOT NULL,
 status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','done')),
 auto_shift INTEGER NOT NULL DEFAULT 0,
 created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_tasks_closing ON follow_tasks(closing_id,due_date);
CREATE TABLE IF NOT EXISTS closing_events (
 id TEXT PRIMARY KEY,
 closing_id TEXT NOT NULL REFERENCES closings(id),
 user_id TEXT NOT NULL REFERENCES users(id),
 event_type TEXT NOT NULL,
 details TEXT NOT NULL,
 created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS auth_attempts (
 rate_key TEXT PRIMARY KEY,
 attempts INTEGER NOT NULL DEFAULT 0,
 expires_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_auth_expires ON auth_attempts(expires_at);
CREATE TABLE IF NOT EXISTS password_resets (
 token_hash TEXT PRIMARY KEY,
 user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 expires_at INTEGER NOT NULL
);
