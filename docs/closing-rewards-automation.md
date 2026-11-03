# Real Estate PRO — Automatic Closing Rewards (implementation requirement)

Status: NOT ACTIVE. Do not claim rewards are automatically issued until server-side implementation and tests pass.

## Rule
After every 5 eligible, successfully paid and confirmed Real Estate PRO closing credits accumulated by the same verified account, issue exactly 1 additional FREE Real Estate PRO closing credit. Count purchases across dates. $20 single = 1 eligible unit; $35 two-closing welcome package = 2. Never count gifts, complimentary credits, previously earned reward credits, unpaid/failed/test-mode purchases, or refunded/chargeback credits as qualifying purchases. A paid closing credit counts when purchased, not when used. Reward credits do not expire.

## Server-side design
- Apply only to verified production payments, on the backend, using authenticated account identity and verified payment provider webhook events.
- Maintain an append-only ledger with unique purchase/payment IDs and reward issuance IDs, plus refund adjustments; never trust browser-provided totals.
- Use a database transaction and unique constraint/idempotency key for each fifth eligible credit threshold. Retried or out-of-order webhooks must never issue duplicate credits.
- Calculate entitlement from eligible net paid credit units: floor(total / 5), minus previously issued rewards, with a defined reconciliation process for refunds after issuance. Do not silently delete used credits; flag exceptional cases for admin review.
- Grant earned rewards into the same verified account and show progress (e.g. 3 of 5), reward history and available credits on My Closings.
- Keep the feature gated OFF until tested with successful payments, 2-for-$35 purchases, multiple purchases, webhook retries, refunds, gift credits, two thresholds (10 units), concurrent events, account isolation and end-to-end credit activation.
- Promotional language must say 'Coming Soon' until the actual feature is active; do not imply that customers already earn automatic rewards.

## Launch verification
Confirm Stripe production mode, webhook signature verification, database transactionality, idempotency, reward balance, account verification, refunds and dashboard consistency before enabling or changing 'Coming Soon' copy.
