-- EXPERIMENTAL: SQLite trigger prototype; NOT validated on Cloudflare D1.
-- Apply to isolated test database only after reviewing schema.
CREATE TRIGGER IF NOT EXISTS activate_trial_on_token_consume
AFTER UPDATE OF consumed_at ON verification_tokens
WHEN OLD.consumed_at IS NULL AND NEW.consumed_at IS NOT NULL
BEGIN
  SELECT RAISE(ABORT, 'token or account ineligible')
    WHERE NEW.expires_at <= NEW.consumed_at
       OR NOT EXISTS (SELECT 1 FROM accounts WHERE id=NEW.account_id AND status='pending')
       OR EXISTS (SELECT 1 FROM entitlements WHERE account_id=NEW.account_id AND kind='intro_trial');
  UPDATE accounts SET status='active', email_verified_at=NEW.consumed_at
    WHERE id=NEW.account_id AND status='pending';
  SELECT RAISE(ABORT, 'account activation failed') WHERE changes() != 1;
  INSERT INTO entitlements (id,account_id,kind,starts_at,ends_at)
    VALUES (lower(hex(randomblob(16))),NEW.account_id,'intro_trial',NEW.consumed_at,
      strftime('%Y-%m-%dT%H:%M:%SZ', unixepoch(NEW.consumed_at)+7776000, 'unixepoch'));
END;
