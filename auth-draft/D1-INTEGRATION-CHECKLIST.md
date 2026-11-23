# D1 registration integration — pre-deployment gate

Status: DESIGN ONLY. Not a deployed implementation. Baseline: V12-216, whose registration-flow.mjs is isolated and whose verification adapter is a mock.

## Required sequence
1. Review the exact existing D1 schema and migration history; never assume that SQLite test behavior guarantees Cloudflare D1 behavior.
2. Implement a server-only adapter `consumeAndActivateAtomically` with a single atomic database operation covering token consumption, account activation, and the one-time 90-day entitlement. Reject expired, reused, revoked, or mismatched tokens.
3. Ensure repeated requests and simultaneous requests cannot create duplicate trial entitlements. Keep database UNIQUE constraints as the final safeguard; validate on a real isolated D1 database.
4. Never send a verification email until a pending registration is durably stored; avoid leaking whether an email already exists.
5. Add server-side attempt throttling, CSRF/origin protection, session rotation and secure cookies. Do not trust client-supplied account IDs, trial dates, roles, or category grants.
6. Run integration tests: two simultaneous token submissions, two different tokens for one account, expiration boundary, rollback on injected failure, retry after failure, account closure, session revocation, and 90-day duration.
7. Review privacy, retention and account deletion behavior. Use fictional identities and no third-party customer/company details in tests.
8. Keep public registration, email delivery, billing and production migrations disabled until all checks pass and the owner explicitly approves deployment.

## Acceptance evidence to record
- D1 migration identifier and isolated test database (no real customer data)
- Exact integration test command and observed results
- Concurrency test outcomes and database entitlement count
- Independent review of cookie attributes, CSRF, throttling, and rollback
- Explicit release authorization and rollback plan

Do not confuse a GitHub backup branch or a successful SQLite unit test with a production-ready registration system.
