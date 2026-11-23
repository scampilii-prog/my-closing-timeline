# D1 implementation decision record — registration activation

Status: design review only, 2026-11-23. No Cloudflare deployment.

## Confirmed V12-216 baseline
The proposed `ESQUEMA-REGISTRO-PROPUESTO.sql` has `accounts`, `verification_tokens`, `entitlements`, and `activity_preferences`. A partial unique index enforces at most one `intro_trial` per account. The isolated `auth-draft/registration-flow.mjs` calls a not-yet-implemented `consumeAndActivateAtomically` adapter.

## Critical implementation constraint
A D1 `batch()` call is not, by itself, proof of **business-level** atomic activation. A SQL statement that updates zero rows can still succeed, and a subsequent unconditional insert may incorrectly grant a trial. The implementation must enforce the token/account preconditions in the database and treat a zero-row conditional update as failure, with no entitlement granted. It must survive concurrent requests and retries, and use the database uniqueness constraint as the final safeguard.

Do not copy the SQLite test's `BEGIN IMMEDIATE` implementation into a D1 Worker without validating support; D1's transaction and request model differ. Choose a D1-supported transaction mechanism only after testing against the exact deployed D1 runtime.

## Specific acceptance cases
1. One valid token: one consumed token, account active, one entitlement exactly 90 days.
2. Same token twice (including parallel requests): exactly one success and one entitlement.
3. Two different valid tokens for the same account: exactly one trial entitlement.
4. Expired, revoked, wrong-account, or already-consumed token: no activation and no entitlement.
5. Injected error between steps: no partial activation or consumed token without entitlement.
6. Retried request after an unknown network result: no extra trial.
7. Suspended/closed account: cannot activate.
8. Account deletion/retention: explicitly decide how to reconcile privacy deletion with `entitlements.account_id` foreign key that currently prevents physical deletion.

## Deployment gate
A local SQLite test, a GitHub ZIP backup, or a passing mock adapter does not satisfy these cases on D1. Keep registration and email sending off until an isolated D1 integration test produces reproducible evidence, security review is complete, and owner authorizes release.
