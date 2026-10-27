CREATE TABLE IF NOT EXISTS purchases_pricing_v2 (
 id TEXT PRIMARY KEY,
 user_id TEXT NOT NULL REFERENCES users(id),
 plan_id TEXT NOT NULL,
 credit_quantity INTEGER NOT NULL CHECK(credit_quantity IN (1,2,5)),
 amount_cents INTEGER NOT NULL CHECK(
   (credit_quantity = 1 AND amount_cents IN (2000,1990,2990))
   OR (credit_quantity = 2 AND amount_cents IN (3500,3490,5980))
   OR (credit_quantity = 5 AND amount_cents IN (8000,8490,14950))
 ),
 checkout_session_id TEXT UNIQUE,
 status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','paid','expired')),
 credited_at TEXT,
 created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
INSERT OR IGNORE INTO purchases_pricing_v2
 (id,user_id,plan_id,credit_quantity,amount_cents,checkout_session_id,status,credited_at,created_at)
 SELECT id,user_id,plan_id,credit_quantity,amount_cents,checkout_session_id,status,credited_at,created_at
 FROM purchases;
DROP TABLE purchases;
ALTER TABLE purchases_pricing_v2 RENAME TO purchases;
CREATE INDEX IF NOT EXISTS idx_purchases_user ON purchases(user_id);
