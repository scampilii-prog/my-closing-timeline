# Website 13 — First Closing FREE launch verification

## Website 16 update — automatic first benefit and owner-only test reset (2026-10-28)
- **Definitive business rule:** one FREE PRO welcome code **per normalized verified email**, issued automatically on confirmation, with no administrator approval. A second PRO project requires a paid credit; reopening an existing project does not consume a new credit.
- **Visitor chooses** Realtor (working real-estate PRO redemption) or Other Projects (welcome code reserved; **the separate Other Projects PRO workspace is still not launched**, so no activation is available there yet). Customer type is saved in `first_free_requests` and access to Realtor redemption is blocked for Other Projects codes.
- **First-free backend:** `/api/first-free/request` receives `customerType`; `/api/first-free/confirm` automatically issues a code. Email is case-normalized and unique in D1, issuance is an atomic status transition, codes restricted to that email and one use. Realtor expires in 30 days. Other Projects codes are reserved without expiry before launch. Existing verified prelaunch requests can retry via request form.
- **Owner exception for practice ONLY:** `/admin-invitations.html` now monitors code requests and shows `Reset FREE Test`. The private POST `/api/first-free/admin/reset-test` requires owner session, same-origin, exact email and confirmation string `RESET FREE TEST: <email>`, does not run for paid purchasers, stores an audit row, disables the previous code, reopens that email for verification and marks `test_reset=1`. It does **not** delete closings, user account, prior promo redemptions, credits or marketing consents. Only the owner-authorized `test_reset` can bypass the normal prior-closing eligibility restriction when redeeming a fresh test code; real customers never get that override.
- **No mass marketing:** marketing checkbox remains separate, optional, not checked by default.
- **QA NOT certified:** verify deployed Cloudflare D1 schema, Resend sender, production runtime, emails, concurrent requests, owner reset cookie, paid-account block and PRO checkout in test/sandbox before public launch. GitHub commits alone do not establish a working production service.


## Architecture
- Public request page: /first-closing-free.html
- Public API: POST /api/first-free/request; email confirmation: GET /api/first-free/confirm?token=...
- Owner-only: /admin-invitations.html and GET /api/first-free/admin/list
- Owner-only practice reset: POST /api/first-free/admin/reset-test (double-confirmed); approval actions are not part of normal issuance
- Existing PRO gift redemption: /pro-get-started.html#gift=CODE → /api/pro/promo/redeem
- Existing PRO account verification, one-time credits, follow-ups and closing date logic remain intact.
- Separate D1 tables: first_free_requests, marketing_consents. See migration 0005. The first-free API also ensures tables exist in D1 to accommodate current prelaunch deployments.
- Private code hashes are stored in existing promo_codes; active code is restricted to email, one redemption and 30 days.
- Soliciting an invite and consenting to promotional email are separate; marketing is unchecked by default, recorded only after email verification, and withdrawn using the existing unsubscribe route.
- Do not put personal real-estate transaction data into promotional records.

## Preconditions
- Cloudflare Pages Functions deployed with PRO_DB D1 binding, working tables from migrations 0001–0004, RESEND_API_KEY, MCT_FROM_EMAIL, and secure PERSONAL_PRACTICE_PASSWORD.
- Verify the sender domain and email delivery in Resend.
- Verify privacy and applicable promotional email compliance, including sender identification, unsubscribe, and any required postal address, before commercial marketing.
- Live Stripe checkout remains sandbox-only; no real payments should be accepted during testing.

## Critical test matrix (not certified until run against deployed Cloudflare)
1. Anonymous request from Home, FREE, PRO, Pricing and PRO Registration reaches /first-closing-free.html in the same tab.
2. Unchecked marketing preference remains false. Checked marketing preference is not recorded as confirmed until email verification.
3. Invalid email is rejected. Multiple requests from the same email/IP are limited. Duplicate verified requests do not issue a second code.
4. Email verification expires within 24 h and can be used only once. Issuance proceeds automatically after confirmation; owner approval is not required.
5. Owner-only page and reset route deny anonymous or customer-PRO sessions. Reset requires a typed matching email, explicit confirmation and no paid purchases.
6. After verifying one Realtor email, Resend accepts ONE code email, status Sent, restricted to that email, 30-day expiry. Other Projects benefit remains reserved until its PRO release.
7. Failed email delivery disables the newly issued code and restores the request to Pending.
8. Recipient registers/verifies PRO account or signs in, opens gift link, redeems exactly once, receives exactly one Closing Credit, and starts one PRO closing.
9. Second redemption, mismatched account, prior closing, expired code, disabled code, unverified email and replay all fail without granting a credit.
10. Status appears Redeemed in Admin after use. Without owner reset, that email cannot get another free code. An owner-only test reset disables the old code, audits the reset, requires new email verification and allows a fresh test credit even after a prior test closing.
11. Marketing unsubscribe removes optional consent and records suppression; it does not erase or cancel essential account/offer service records.
12. Confirm no buyer/seller name, property address, price, bank data or ID is solicited in the request.
13. Inspect phone/desktop responsive cards, canonical header, links and footer.
14. Audit D1 contents, legacy closings, notes, local PDF edit/reopen, record access, rate limits, and Cloudflare logs separately before general release.

## Operational notes
- GitHub commits do not certify Cloudflare publication. A production deployment, HTTP route check, D1 test and email provider receipt must each be verified.
- A provider-accepted email is not proof of delivery to the recipient inbox.
- First-free eligibility is limited by known verified email/account records. Preventing a person from creating another email account cannot be guaranteed.
- If automatic issuance becomes stuck in Approved due to a runtime interruption, inspect the D1 state as owner; never blindly issue a second live credit.
- This feature does not authorize mass marketing. Send marketing only to verified opt-in addresses with applicable suppression rules and compliance review.
