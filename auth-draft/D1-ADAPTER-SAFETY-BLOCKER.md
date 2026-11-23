# D1 adapter review — safety blocker (2026-11-23)

**Status: BLOCKED FOR DEPLOYMENT.** This is a review of a local uncommitted draft `auth-draft/d1-adapter.mjs`; it is not the V12-216 released baseline and must not be treated as a production-ready adapter.

## Identified failure
The draft uses `db.batch()` with three conditional statements: insert trial entitlement, update account, and consume verification token. The statements can each execute successfully while affecting **zero rows**. A batch can commit even when a later statement does not satisfy the application's business invariant. The draft checks `meta.changes` **after** the batch and throws if partial, but throwing then does not undo already committed statements.

Example: if an insert succeeds but a subsequent conditional account update affects zero rows, an entitlement may remain even though the token was not consumed. This is a release blocker, regardless of any passing SQLite tests.

## Required correction
- Do not publish or wire this draft into Cloudflare Functions.
- Implement a D1-supported atomic operation that guarantees all three changes or none; avoid assuming `batch()` plus post-hoc checks is sufficient.
- Test a forced zero-row account update after a successful entitlement insert and confirm **no entitlement remains**.
- Test simultaneous submissions, different tokens for the same account, retries, and rollback in an isolated Cloudflare D1 environment.
- Document the exact D1 mechanism, migration, test output, and release approval before enabling any registration endpoint.

This finding supersedes any suggestion that the draft is safe because it has a unique index or uses `batch()`. No production deployment or real database mutation occurred in this review.
