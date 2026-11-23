# Concurrency reference — 2026-11-23

This is a **SQLite reference test**, not a Cloudflare D1 test. The original V12-216 registration workflow remains isolated and is not deployed.

## Verified
Two separate SQLite connections simultaneously attempted to consume the same verification token. With `BEGIN IMMEDIATE`, token consumption and entitlement creation in one transaction, the observed outcomes were one activation and one already-used token. The resulting database contained exactly one `intro_trial` entitlement.

## Limits and next gate
- Cloudflare D1 transactional behavior, batch semantics, network retries, and concurrent Workers remain **untested**.
- A single local SQLite test does not prove distributed idempotency or production safety.
- No public registration, live email sending, billing, or migrations should be enabled.
- Before implementation, adapt the reference to the actual D1 API and run integration tests against an isolated D1 database, including rollback and parallel requests.

The reference is not intended to be copied into a Cloudflare Worker without adapting transaction semantics.
