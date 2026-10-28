-- First-free requests are independent from saved PRO closings and marketing subscriptions.
CREATE TABLE IF NOT EXISTS first_free_requests (
 id TEXT PRIMARY KEY, email TEXT NOT NULL UNIQUE,
 status TEXT NOT NULL DEFAULT 'pending_verification' CHECK(status IN ('pending_verification','pending','approved','sent','declined')),
 verification_hash TEXT, verification_expires INTEGER, verified_at TEXT,
 marketing_requested INTEGER NOT NULL DEFAULT 0 CHECK(marketing_requested IN (0,1)),
 promo_code_id TEXT UNIQUE REFERENCES promo_codes(id),
 requested_at TEXT NOT NULL DEFAULT (datetime('now')), updated_at INTEGER NOT NULL,
 sent_at TEXT, declined_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_first_free_status ON first_free_requests(status,updated_at);
CREATE TABLE IF NOT EXISTS marketing_consents (
 email TEXT PRIMARY KEY, source TEXT NOT NULL,
 consented_at TEXT NOT NULL DEFAULT (datetime('now'))
);