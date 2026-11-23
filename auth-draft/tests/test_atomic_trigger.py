"""Local SQLite prototype test. NOT a Cloudflare D1 integration test.
Run from the V12 project root: python auth-draft/tests/test_atomic_trigger.py
"""
import concurrent.futures
import pathlib
import sqlite3
import tempfile

ROOT = pathlib.Path(__file__).resolve().parents[2]
SCHEMA = (ROOT / "ESQUEMA-REGISTRO-PROPUESTO.sql").read_text()
TRIGGER = (ROOT / "auth-draft/atomic-trial-trigger-PROTOTYPE.sql").read_text()

with tempfile.TemporaryDirectory() as tmp:
    path = str(pathlib.Path(tmp) / "test.sqlite")
    conn = sqlite3.connect(path)
    conn.executescript(SCHEMA + TRIGGER)
    conn.execute("INSERT INTO accounts(id,full_name,email_normalized,status) VALUES ('a','Test','test@example.org','pending')")
    conn.execute("INSERT INTO verification_tokens(token_hash,account_id,expires_at) VALUES ('hash','a','2099-01-01T00:00:00Z')")
    conn.commit()
    conn.close()

    def consume(_):
        c = sqlite3.connect(path, timeout=5)
        c.execute('PRAGMA foreign_keys=ON')
        try:
            result = c.execute("UPDATE verification_tokens SET consumed_at='2026-11-23T15:00:00Z' WHERE token_hash='hash' AND consumed_at IS NULL AND expires_at>'2026-11-23T15:00:00Z'")
            c.commit()
            return result.rowcount
        finally:
            c.close()

    with concurrent.futures.ThreadPoolExecutor(max_workers=2) as executor:
        results = list(executor.map(consume, range(2)))
    assert sorted(results) == [0, 1], results
    conn = sqlite3.connect(path)
    assert conn.execute("SELECT COUNT(*) FROM entitlements").fetchone()[0] == 1
    assert conn.execute("SELECT status FROM accounts WHERE id='a'").fetchone()[0] == 'active'
    assert conn.execute("SELECT ends_at FROM entitlements").fetchone()[0] == ('2027-02-21T15:00:00Z',)

    conn.execute("INSERT INTO verification_tokens(token_hash,account_id,expires_at) VALUES ('hash2','a','2099-01-01T00:00:00Z')")
    conn.commit()
    try:
        conn.execute("UPDATE verification_tokens SET consumed_at='2026-11-23T15:01:00Z' WHERE token_hash='hash2' AND consumed_at IS NULL")
        raise AssertionError('second token should be rejected')
    except sqlite3.IntegrityError:
        conn.rollback()
    assert conn.execute("SELECT consumed_at FROM verification_tokens WHERE token_hash='hash2'").fetchone()[0] is None
    assert conn.execute("SELECT COUNT(*) FROM entitlements").fetchone()[0] == 1
    print('PASS: concurrent same token; 90-day duration; second token rollback')
