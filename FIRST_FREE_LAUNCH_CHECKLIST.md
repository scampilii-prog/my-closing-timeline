# Website 13 — First Closing FREE launch verification

## Architecture
- Public request page: /first-closing-free.html
- Public API: POST /api/first-free/request; email confirmation: GET /api/first-free/confirm?token=...
- Owner-only: /admin-invitations.html and GET /api/first-free/admin/list
- Owner actions: POST /api/first-free/admin/approve and /admin/decline
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
4. Email verification expires within 24 h and can be used only once. Only verified, pending requests can be approved.
5. Owner-only page cannot be loaded without owner session. Customer PRO login never authorizes owner actions.
6. Owner approves a verified request: provider accepts email, one code is issued, status Sent, restricted to that verified email, expires in 30 days.
7. Failed email delivery disables the newly issued code and restores the request to Pending.
8. Recipient registers/verifies PRO account or signs in, opens gift link, redeems exactly once, receives exactly one Closing Credit, and starts one PRO closing.
9. Second redemption, mismatched account, prior closing, expired code, disabled code, unverified email and replay all fail without granting a credit.
10. Status appears Redeemed in Admin after use. Declined request cannot be approved automatically.
11. Marketing unsubscribe removes optional consent and records suppression; it does not erase or cancel essential account/offer service records.
12. Confirm no buyer/seller name, property address, price, bank data or ID is solicited in the request.
13. Inspect phone/desktop responsive cards, canonical header, links and footer.
14. Audit D1 contents, legacy closings, notes, local PDF edit/reopen, record access, rate limits, and Cloudflare logs separately before general release.

## Operational notes
- GitHub commits do not certify Cloudflare publication. A production deployment, HTTP route check, D1 test and email provider receipt must each be verified.
- A provider-accepted email is not proof of delivery to the recipient inbox.
- First-free eligibility is limited by known verified email/account records. Preventing a person from creating another email account cannot be guaranteed.
- If an approval becomes stuck in Approved due to a runtime interruption, investigate the D1 row and code state as owner; do not blindly issue another live credit.
- This feature does not authorize mass marketing. Send marketing only to verified opt-in addresses with applicable suppression rules and compliance review.
