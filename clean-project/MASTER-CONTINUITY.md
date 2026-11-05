# MY CLOSING TIMELINE — CLEAN BUILD — MASTER CONTINUITY & BUSINESS RULES
Updated: 2026-11-04
Status: PRODUCT DECISIONS AGREED IN CHAT; NOT PROOF OF IMPLEMENTATION.

## Project boundaries
- Repository: scampilii-prog/my-closing-timeline
- Working branch: clean-rebuild-20261103
- Working folder: clean-project/
- Test site: https://plain-mouse-a4cc.scampilii.workers.dev
- Production myclosingtimeline.com MUST NOT be changed without explicit approval.
- Clean build: one approved shared page model, no legacy CSS/JS, test one page at a time.
- User prefers concise Spanish explanations, actual functioning preview links, no pasted source code.
- Maintain separate FREE Real Estate, Real Estate PRO, and Other Projects experiences.

## Commercial thesis
We sell an ACTIVE CLOSING MANAGEMENT SERVICE, not a list of tasks. PRO value must be ongoing deadline calculations, Daily Briefing, alerts, activity history, reminders, useful reporting, secure records, reusable personal preferences and future multi-closing dashboard. Users can copy lists; do not claim this can be technically prevented. Make paying for each new closing more convenient than manually reusing a previous one.
Do not advertise unimplemented functionality as available.

## Real Estate FREE
- No registration to try.
- Step 1 and Step 2 usable; FREE limit 8 tasks (7 original + 1 optional in current clean prototype; verify actual code before publishing).
- Step 3: describe benefits and 40+ customizable PRO follow-up suggestions, but do not expose entire task library in FREE.
- FREE may preview Today & Tomorrow; distinguish preview from working PRO functionality.
- CTA: Activate Real Estate PRO.

## Real Estate PRO — latest agreed commercial terms (2026-11-04)
- $20 per closing, 60 days of active PRO access, tied to one immutable server-side Closing ID.
- Access period starts on activation/purchase assignment; changing Closing Date or task dates NEVER resets access expiration.
- Optional extension: $5 per 15-day period; customer selects number of 15-day periods, no automatic renewal. Extension is for continuing FULL ACTIVE PRO functions (create/edit tasks, daily reminders, recalculations, Today & Tomorrow) for SAME transaction, not for reading records.
- Consultation/read-only history remains accessible after expiry subject to documented retention policy; no additional fee just to read existing records.
- Welcome offer: 2 closings for $35 (previous rule: 30 days after registration; verify before launch). Loyalty: BUY 5 CLOSINGS · GET 1 FREE (previous rule: $35 package counts as 2). Implement/test before claiming automated.
- An extension of contractual Closing Date is not the same as a paid extension of PRO access. Clearly label both.
- PRO is a PER-CLOSING purchase, not a subscription. A new transaction needs a new closing credit.
- Other Projects PRO has different commercial terms; do not silently apply Real Estate rules to it.

## Closing identity and anti-reuse
- Immutable internal Closing ID stored/validated SERVER SIDE, linked to payment/credit and account.
- Original Effective Date and property/transaction identity are protected; allow legitimate corrections via exceptional, audited workflow, not free reuse.
- Changing display name, notes, task titles, or dates never transfers entitlement to another closing.
- Step 2 and Step 3 may have unlimited custom tasks while active, with each task bound to the Closing ID.
- Preserve timestamped activity log of previous/new dates, completion, reschedules, and reasons.
- Users could still abuse generic tasks; no perfect prevention. Avoid false claims or punitive false-positive automated blocking.

## Closing Date versus access expiry — latest agreed workflow
- 5 days before scheduled Closing Date: alert/ask whether still on schedule, extended, canceled, or completed.
- If Closing Date passes without updated date or user confirmation: next day switch to Pending Confirmation — Read Only (preventive lock). DO NOT falsely mark transaction Completed: passing date is not proof of closing.
- User may confirm a legitimate contractual extension, record reason, and update Closing Date while entitled to active access; preserve audit trail. Recovery from preventive lock must be designed to permit legitimate extension/confirmation without opening general task editing.
- Independently, before PRO access expiration notify at 7, 3, and 1 day (proposed implementation timing; not built). After paid access expires, switch to Read Only; user may purchase $5 / 15-day extension(s) to resume full active access.
- User may save a Closing Date beyond paid access with clear warning; this does NOT extend paid access.
- Completed means user-confirmed closed transaction; Completed becomes archived/read-only, with controlled corrections only. Expired means paid access ended; not equivalent to Completed.
- Do NOT automatically claim transaction completed merely because the Closing Date passed.
- Any final automatic archival policy needs explicit product specification before coding.

## Core PRO value / roadmap
1. Secure closing identity, server-side credit validation, reliable persistent storage and access status.
2. Step 2 unlimited deadlines, Step 3 40+ customizable follow-ups, task done/reopen, automatic relative-date recalculation, Today & Tomorrow, full activity log.
3. Daily Closing Briefing emails, configurable alerts and timezone. Alerts for today/tomorrow/overdue. SMS later (cost, opt-in/opt-out compliance).
4. Calendar integration (Google/Outlook/Apple), preferably updates synced after date changes, not merely one-time export.
5. My Closing Command Center showing multiple active closings, priorities and overdue items.
6. Useful Progress Report and Final Closing Activity Report (not a substitute for ALTA settlement statement or broker compliance records).
7. Reuse user's own preferences/templates in next *paid* closing.
- Protect personal data; retention and deletion rules must be specified.
- Validate with real agents and repeat purchases; do not assume pricing is market-proven.

## Page messaging (proposed, not necessarily implemented)
HOME: "Never Miss What Matters in Your Closing." CTA Explore FREE Timeline.
REAL ESTATE LANDING: "From Contract to Closing. Stay One Step Ahead."
FREE: "See How Easy Closing Management Can Be." Explain PRO benefits, not entire task library.
PRO: "$20 per closing · 60 days of full access · $5 per additional 15 days." Emphasize daily reminders and one secure workspace.
REGISTER/CHECKOUT: clearly explain single-closing credit, active access dates, extension terms, no auto-renewal.
PRO WORKSPACE: minimize sales messages; prioritize actionable tasks and reminders.
COMPLETED: archive/report, offer Start New Closing and loyalty progress.
Do NOT use earlier slogan "One Payment. Until It's Done." without qualification: superseded by 60-day PRO access and paid optional extensions.

## Current prototype status as of 2026-11-04
- clean-project/free-real-estate.html, shared/free.js, shared/free.css are prototype.
- Test URL: https://plain-mouse-a4cc.scampilii.workers.dev/free-real-estate
- Tested: 7 tasks, Done changes, deposit rescheduling, refresh persistence, activity history. Recent CSS patch restored intended navy headings for lower cards; confirm visually.
- Distinct /real-estate-pro page is PLANNED, not yet confirmed built.
- Do not mislabel FREE as PRO or imply that features above are already working.
- Never deploy clean build to production without user's explicit approval.

## Continuity procedure
At the start of each new CLEAN BUILD chat, read THIS FILE first and inspect current GitHub branch/files/commits; do not rely on chat memory alone. Summarize only pending action and relevant approved rules. Update THIS FILE whenever a commercial or technical decision changes, including superseding older statements. Do not change production. Distinguish AGREED / IMPLEMENTED / TESTED / DEPLOYED.

## Step 2 vs Step 3 — approved 2026-11-04
- NEVER duplicate Step 2 contract deadline tasks inside Step 3.
- Step 2 = contractual milestones, due dates, deposit/inspection/loan obligations and recalculation.
- Step 3 = distinct practical follow-up actions: contact, request, verify, coordinate, confirm, review, chase outstanding items. E.g., Step 2 'Inspection Deadline'; Step 3 'Confirm inspection appointment' or 'Follow up on inspection report', not a second Inspection Deadline.
- Step 3 may reference/link Step 2 milestones for timing and reminders without duplicating their task records or counting them twice.
- FREE previews Step 3 benefits but does not reveal full PRO task library.

## Step 3 reference screenshot and approved row design — 2026-11-04
User provided screenshot of legacy /real-estate-free-rebuilt-preview#contract-deadline-planner showing the 40 follow-up tasks table (plus 4 contract tasks in legacy view). Adopt its per-row columns and behavior from the outset in the CLEAN PRO build: #, Task / reminder, Days with +/- spinner, Delete, Date Basis (After Effective Date / Before Closing Date), Reminder Date, Status, Alert, Notes, Done. Preserve task editing, date recalculation, sorting, status/alerts, and Done locking/reopening, plus Today & Tomorrow integration and history. Do not implement one feature at a time or make the user repeat these requirements. IMPORTANT: new Step 3 must NOT repeat Step 2 contract tasks; legacy table's four contract tasks are to be excluded or replaced by genuine follow-up actions. The screenshot is a design reference, not proof that the new PRO engine is implemented. Keep FREE max 8 and PRO 40+ suggestions/unlimited tasks.

## Step 3 visual design rule — user confirmed 2026-11-04
The legacy screenshot is a FUNCTIONAL and MICRO-DETAIL reference only, NOT a visual theme/template. Preserve the clean-build visual design currently approved for the new site (navy, turquoise, gold, Manrope, unified headers/cards, spacing and responsive layout). Transfer all row fields, small controls, interactions, behavior, calculation rules, notes, Done, alerts and history from the legacy Step 3, adapting their presentation to the NEW design. Do not copy legacy CSS, HTML styling, or visual appearance. Functional parity with legacy details + new clean design are BOTH mandatory.

## Agreement recording protocol — 2026-11-04
User may say 'Recuérdalo' to explicitly request immediate GitHub documentation of an approved decision. Important agreements should be saved proactively without requiring that phrase. Update/supersede earlier contradictory decisions instead of merely accumulating conflicting rules. Confirm 'saved in GitHub' only after successful write. Distinguish approved design, code committed, deployment and visually/functionally verified.

## Legacy closing record and educational sections — screenshot approved for migration 2026-11-04
Legacy screenshot of /real-estate-free-rebuilt-preview shows (1) 'Complete your Closing · Private Records' with Save Record to Device, Open Saved Record, Prepare Private PDF / Print, Complete & Close; (2) 'Understanding your closing timeline' six explanatory cards: Contract & escrow, Inspection period, Financing & appraisal, Title & insurance, HOA & condominium, Final preparations; (3) Further Reading & Trusted Resources (HAR, NAR, CFPB etc.). Preserve useful content and functions in clean design, NOT legacy CSS/visuals. New PRO should save server-side to user account (browser/device exports may be supplementary, never imply browser save equals permanent account save). PDF is a progress/activity report, not ALTA. Complete & Close requires explicit user confirmation and archives read-only; date passing alone does not mark completed. External resources require verified links before publication. Current screenshot is reference only, not evidence new features are implemented.

## Suggested refinements awaiting user approval — 2026-11-04
Proposed, NOT YET APPROVED: private records buttons ordered Save Record, Open Saved Record, PDF / Print, Complete & Close (last visually distinct with explicit confirmation); visible Closing Status In Progress / Pending Confirmation / Completed; six educational cards shorter and more concise; trusted external resources in collapsed Helpful Resources disclosure; Final Closing Activity Report PDF with completed follow-ups, dates, history, distinct from official settlement documents. These are proposals only; do not treat as approved implementation until user confirms.

## PRO records and learning panels — implemented demo 2026-11-04
User said 'sigue' following proposed refinements; proceeded with compact clean-design PRO records and learning sections. PRO preview now includes status In Progress/Completed (local demo), Save Record to Device (JSON of Step 3 follow-ups and dates), Open Saved Record (validates and imports own JSON, refresh needed), PDF / Print (browser printable Step 3 progress report), Complete & Close (explicit confirmation, local demo status only); six educational cards; collapsible Helpful Resources links to CFPB and NAR. Implementation is a DEMO: no server account save, paid access enforcement, permanent archive, full Step 2 export, or full activity history PDF yet. Do not claim these features complete. Preserve layout and all approved functions for production implementation. Browser demo completion does not enforce read-only archival.

## Approved elegant records design — 2026-11-04
User explicitly approved the visual mockup of Private Records and Understanding Your Closing Timeline ('perfecto. sigue'). Implemented clean CSS/markup: prominent navy gradient records heading, four equally prominent full-width responsive buttons in a row with clear priorities (teal Save, pale-blue Open, blue PDF/Print, gold Complete & Close), visible status pill, six icon-led educational cards in 3x2 grid, collapsible Helpful Resources and subtle legal notice. No legacy CSS reused; screenshot is visual direction, implementation in clean-project/real-estate-pro.html and shared/free.css. Confirm GitHub checks and live screenshot separately. These remain local DEMO functions; account-backed completion/read-only not yet implemented.

## Approved button hover and priority — 2026-11-04
Four bottom Private Records action buttons highlight on hover with brightness, saturation and shadow, without changing size/position or causing layout shifts; respect reduced-motion preferences. Complete & Close is the most prominent final action with stronger gold background/border, still requires explicit confirmation. Implemented in clean-project/shared/free.css; verify after Cloudflare deployment.

## Step 3 date behavior, approved 2026-11-04
Group same-date tasks visually. Automatically reorder when dates or day offsets change. Date and days must stay synchronized. Today green, tomorrow yellow, overdue red; update by calendar date. Keep completed tasks locked until reopened, notes and change history. These behaviors remain to be implemented and tested in clean PRO.

## Approved 2026-11-04: Apply before moving Step 3 row
Changing Days, Reminder Date, or Date Basis must NOT immediately reposition a row while the user is editing. Add a small Apply action in the same row; on Apply, synchronize Days and Reminder Date, save and reposition chronologically. Keep all existing columns in the same order; avoid a long days dropdown. Newly added rows stay at top until Apply. Implementation pending verification.

## Step 3 Apply implementation — 2026-11-04
Implemented per-row Apply inside Reminder Date column (no extra table column) in clean-project/shared/pro-followups.js and shared/free.css. Editing Days, Date Basis or Reminder Date stages changes without immediately moving the row. Apply validates Days 0–365, synchronizes days/date, persists and then chronologically reorders. New custom draft stays at top until Apply. This is committed to GitHub but browser/live Cloudflare testing is still required. Existing local demo records remain in browser.

## Approved Apply no-layout-shift improvement — 2026-11-04
Keep Apply in a permanently reserved 48px slot beside Reminder Date, invisible when not needed (visibility:hidden, not display:none); changing days/date/basis reveals it without moving inputs, columns, or rows. Only pressing Apply commits and chronologically reorders. Implemented in clean-project/shared/free.css; Cloudflare visual verification pending.

## SUPERSEDING Step 3 Apply placement — 2026-11-04
User rejected the Apply button next to Reminder Date because it compressed later columns. FINAL approved behavior: reuse the existing Delete button in its original column. When Days, Reminder Date or Date Basis is edited, Delete becomes gold Apply; on Apply the edit is saved and the row reorders, and the same button returns to Delete. No extra button, no new column, no hover-only dependency. Previous Apply-in-date-cell and reserved-width CSS approaches are superseded and must NOT be restored. Code and CSS updated; live browser verification pending.

## Step 3 refinement — 2026-11-04
Approved vivid teal Apply with white lettering in the existing Delete column. Additional code fix committed: staged unsaved Days, Reminder Date and Date Basis values remain visible if another row causes a redraw, rather than silently reverting. Tomorrow tasks now show Tomorrow in both Status and Alert. Browser testing still pending; no production changes.

## Step 3 daily priority panel — 2026-11-04
Added separate Step 3 Due Today (green), Tomorrow (yellow) and Overdue (red) compact cards with counts and scrollable task lists, calculated from Step 3 follow-ups, excluding Done tasks. This replaces an unreadable single-line list. The existing upper Today & Tomorrow remains Step 2 only; these two sources have NOT yet been merged into one panel. Code committed to clean-project/real-estate-pro.html, shared/pro-followups.js and shared/free.css. Browser verification pending. Do not claim live notifications or account persistence.

## Transaction Overview layout — 2026-11-04
User requested more elegant, prominent placement INSIDE existing Step 1 Transaction Overview card. Applied CSS-only redesign: centered larger turquoise days countdown, centered gold kicker, two balanced metadata rows, subtle separators and soft background. Preserve fields, calculations and Step 1 position. Commit 66d51c6; live browser verification pending.

## Step 1 compact identity — 2026-11-04
User approved shortening date inputs and using unused space in Transaction Details for indispensable information. Added optional Property / Closing Reference and Representing (Buyer, Seller, Both) in a compact two-column row under Effective and Closing dates. Values persist in browser demo localStorage; not server-account records. Date input height reduced to 39px; original calculations and overview preserved. Commits f5d0c7d, 6d7b757, dfa64a9; visual verification pending. Do not touch production.

## PERMANENT PRIVACY-BY-DESIGN POLICY — RESTORED FROM PREVIOUS PROJECT (2026-11-04)

**Canonical slogan: "Your Clients. Your Records. Your Privacy." This section supersedes any contradictory prior instruction (especially the recent "Property / Closing Reference" address/name field).**

1. My Closing Timeline is a timeline/operational-management tool, NOT a repository for identifying transaction or client details. No FREE or PRO web form should request client names, property addresses, transaction prices, phone numbers, participant contact details, or other identifying/confidential information. Avoid asking users to paste these into Notes, custom task titles, uploads, emails or integrations. The privacy principle applies to Real Estate and Other Projects.
2. Web timelines use only anonymous private closing IDs (e.g. CL-7C2D9A04), dates, non-identifying generic tasks/categories, due dates, completion statuses and essential operational metadata. Do not equate an anonymous ID with a property address or a customer's name. Any future server-side ID must be generated uniquely, attached to the purchaser's account and protected from reuse as decided in the commercial rules. Account registration, payment and necessary platform operations are distinct from client/transaction information.
3. Separate, locally fillable **PRIVATE PDF** documents are the approved home for sensitive information: names, addresses, prices, brokerages, companies, contacts, phones, detailed private notes and transaction documentation. The professional downloads/opens a fillable PDF, enters details privately in their own office/on their device, saves and reopens locally, and may print it. These private PDF fields must not upload to, synchronize with, or be transmitted to My Closing Timeline, its PRO workspace, analytics, emails, APIs or cloud storage. Clearly label PDFs "PRIVATE FILLABLE PDF | LOCAL FILE" and "These fields do not sync to PRO." PDF generation must be verified to work offline/local-only, not just described that way.
4. FREE practice needs no registration; local save/print of practice records and local private PDF are separate from account-backed PRO records. PRO may store only necessary non-identifying operational timeline data, subject to an actual security review. Do not promise that the platform stores absolutely no data: accounts, payment providers, IP addresses, logs and technical metadata may still exist.
5. Preserve the approved Private Records workflow: "Save Record to Device", "Open Saved Record", "Prepare Private PDF / Print", "Complete & Close". Clarify which records are saved locally, and never misrepresent browser-local demo data as a secure server-backed PRO account. A final progress/activity report is not an ALTA settlement statement.
6. BEFORE any public privacy guarantee or commercial launch, audit every page, field, JS script, API, analytics/telemetry, email and calendar integration, Cloudflare D1/database, server logs, legacy data, exports, backups, retention policy, access control, and PDF implementation. Verify with actual network/browser testing that private PDF data never leaves the device. Legal/compliance claims need separate review. Current privacy audit is **NOT COMPLETE**.
7. **Immediate correction 2026-11-04:** Step 1 mistakenly added "Property / Closing Reference" with a prompt to enter a property address. Changed it to "Private Closing Reference" with anonymous CL- ID placeholder and format validation in clean-project/real-estate-pro.html and shared/free.js. This mitigates accidental identifying entry but is NOT a complete privacy audit or guarantee. Existing locally saved references and arbitrary free-text notes/tasks require further review; avoid migrating sensitive old values to any PRO server.

Previous privacy decisions were recorded around 2026-10-28 and 2026-10-31. Never reintroduce property-address/name fields into web timelines merely to fill layout space. Prioritize confidentiality over decorative content. 

## Step 1 privacy and status review — 2026-11-04
Implemented in clean PRO preview: legacy locally stored propertyReference values that do not match anonymous CL- ID format are cleared on load, rather than reused in the new field. Step 1 explicitly warns never to enter client names or property addresses. Timeline status now distinguishes Waiting for Contract Dates, Check Closing Date, Ready to Confirm and Active · Auto-updating. Changes committed in free.js, real-estate-pro.html, free.css. Browser testing pending. This does not audit or sanitize arbitrary notes/custom tasks or existing browser data elsewhere; private PDF/local-only workflow remains to be implemented and verified. No production changes.

## CANONICAL DEFAULT ORDER AND DEADLINES — 2026-11-04
User screenshot showed Step 2 original reset order broken (Final walk-through first and 30-day approval out of place) and Step 3 dates/sequence not consistently respected. **Approved principle:** both tables must start from a coherent recommended chronological workflow with their default day offsets, without forcing user edits; users can later customize due dates, days and priority. Step 2 sorts by recommended effective-date offsets before both contract dates exist, puts closing-relative tasks after effective-date tasks in that initial baseline, preserves original sequence for equal offsets, and sorts by actual computed dates when both contract dates exist. Step 3 sorts by recommended day offsets and original ID for ties until both contract dates exist, then sorts by actual reminder date, preserving stable tie order. Draft Step 3 tasks remain pinned above until Apply. Existing user-edited records are NOT reset or deleted. Implemented in shared/free.js and shared/pro-followups.js (commits 13f7ab4, e0eff2c). Browser verification pending. NOTE: Current Step 3 default offsets are simplified 0/3/5-day groups; they still need substantive review for 44 individual recommendations. Dates and task offsets are planning examples, not universal Florida contract terms. Do not silently replace signed contract dates.


## PRO baseline review — 2026-11-04, continuation
- Current PRO preview Restore Original Setup clears local Step 1/2/3 practice storage and restores 7 Step 2 defaults plus 44 Step 3 defaults; two confirmations. This is for browser-only demonstration, not paid account records.
- Step 2 canonical defaults: Condo Application +3 ED; 1st Deposit +6 ED; Loan Application +6 ED; 2nd Deposit +7 ED; Property Inspection +7 ED; Loan Approval notice +30 ED; Final walk-through -1 Closing Date. These are examples requiring contract verification.
- Step 3 has 44 initial task names but its defaultOffsets array uses simplified days after Effective Date for all 44, including closing and post-closing activities. These offsets should be reviewed task by task, with closing-relative bases where appropriate, before declaring the original list approved. Do not silently change customers' existing edits.
- Found report storage mismatch: pro-records.js read legacy `mct-clean-pro-followups-demo-v1` while live Step 3 uses `mct-clean-pro-followups-demo-v2`. Fixed report export/import to use v2 in commit 7b9697b22ef45dd0606fac95f5014e7b91ce7960. Browser test of save/open/print still pending.
- Next: review 44 default follow-ups in chronological and contract-relative order; distinguish illustrative recommendations from contractual deadlines, then test Restore Original Setup, Confirm & Start, reports, and refresh. Do not modify production.

- 2026-11-04 follow-up improvement (commit f03c119469c44586c93d27a44aa220cd1f69aaf9): Step 3 displays original 44 defaults in their original source order until both contract dates exist; then sorts by computed due date. Selected closing-stage reminders now default to days BEFORE Closing Date rather than after Effective Date. Existing browser-saved edits remain intact; Restore Original Setup is required to see changed default offsets. Review remaining 44 offsets and post-closing basis before final approval. This is a preview, not live PRO.

## Handoff checkpoint — 2026-11-04 evening (Clean Build)
- GitHub is the source of truth, NOT an external service called Gift: repository `scampilii-prog/my-closing-timeline`, branch `clean-rebuild-20261103`, directory `clean-project/`. Keep production and old CSS untouched.
- Current test URL: https://plain-mouse-a4cc.scampilii.workers.dev/real-estate-pro . The account subdomain is spelled **scampilii** (double i at the end). A prior misspelled URL caused DNS_PROBE_FINISHED_NXDOMAIN. Do not share the misspelled URL.
- User provided definitive visual reference: Step 2 original SIX suggested tasks in this exact original order and offset from Effective Date: (1) 1st Deposit +3, (2) 2nd Deposit +5, (3) Loan Application +5, (4) Condo Application +5, (5) Property Inspection deadline w/right to cancel +7, (6) LOAN APPROVAL - Notify seller if NO LOAN APPROVAL +30. In FREE, user can add two optional tasks (6+2=8); PRO has unlimited custom tasks. Original Step 2 reset should remove all custom tasks, clear dates and restore exact names/order/offsets. Avoid reintroducing the previous seven-task defaults or Final walk-through as a seventh default.
- Step 3 PRO is a separate Daily Follow-Up Checklist with 44 suggested entries, unlimited additional tasks; reset removes added practice tasks and restores original 44, not old test placeholders. Follow-up timing requires review against effective/closing date and actual contract; do not claim every offset legally correct.
- User explicitly wants Step 2 Contract Tasks & Deadlines on LEFT and Closing Timeline Summary on RIGHT at desktop width, both aligned; Step 3 below. Header stays in its original approved position. Do not move header to align cards; align cards to header's original content left edge.
- Recent change accidentally made Step 2 full width, pushing summary below. Fixed the conflicting one-column CSS declaration in `shared/free.css`, commit `2795978995551ef4ebb850ccbceccf7cee4ed154`, restoring `3fr 2fr` columns and compacting Step 2 row grid. **GitHub saved; user has NOT yet visually verified this final fix.** Previous screenshot of single-column Step 2 was BEFORE the fix. Test at desktop before further redesign. Note that prior CSS has accumulated overrides: prefer consolidating the exact PRO-only rules rather than appending conflicting new ones.
- Recent Step 2 numbered row addition in `shared/free.js` commit `eed1f2b3df8ff5aec8413e89e9b57d9510458985`; do not duplicate numbers. Six original defaults and actual reset logic must be verified in source and browser; don't infer from an earlier screenshot.
- PRO preview is browser-local demo only. Registration, payment, server-side Closing ID security, PDF privacy workflow, account persistence and automated notifications are not verified as operational. Never promise live paid features. Privacy policy: no client names or property addresses entered into online workspace; sensitive information should be completed privately in office PDFs. Audit free-text inputs and PDF implementation before launch.
- Next verification: 1) desktop side-by-side Step 2 + Summary, 2) exact six task defaults and Reset/Restore, 3) Step 3 44 baseline after reset, 4) Confirm & Start date calculations, 5) no production changes. Then continue PRO workflow and FREE separately.

## Verification checkpoint — 2026-11-04, latest
- PRO preview GitHub smoke-test workflow PASSED on commit `cfe3d715acd016eff4d1ffff32048827f399242d`. The previous commit `501abb4` failed because a new test incorrectly expected literal `todayCount`, `tomorrowCount`, `overdueCount` references; implementation dynamically generates selectors via `$(id+'Count')`. Corrected the test to match the actual shared loop, and the subsequent workflow passed. This was a test assertion error, not evidence that the daily counters were broken.
- Verified structurally (NOT browser tested): Step 2 and summary are in left/right columns at desktop widths, six contract defaults in `shared/free.js`, Step 3 has 44 follow-ups in `shared/pro-followups.js`, PRO-only two-confirmation restore clears practice keys but not FREE, date changes invalidate manualDue and rerender, daily group counts are recomputed.
- Step 3 now supports a distinct `afterClosing` date basis, with the final `Send post-closing client follow-up` default at Closing Date +1 day; post-closing regression assertions passed. Existing saved Step 3 edits are not reset by code updates; restoring Step 3 is necessary to see new defaults.
- **Pending**: visual browser verification of latest Cloudflare preview, responsive two-column layout and task controls; actual click-through tests of full reset, date recalculation, storage reload, save/open record and print. Do not describe GitHub smoke tests as end-to-end browser tests. Production unchanged.

## Approved redesign specification — 2026-11-05 (user PDF and screenshot)
- Keep the existing clean branch isolated from production. The user's PDF "Protecto PRO" requests a new page arrangement: top full-width frame containing existing transaction details and Contract Tasks & Deadlines, with a fixed frame header and a vertically scrollable task body showing about 10–15 rows, prioritizing today's and future due tasks with today's/tomorrow's colors. Label this top task area STEP 1 as requested, while clearly distinguishing contract metadata fields.
- Middle 2×2 cards: left Closing Timeline Summary, right Follow-Up Summary (results from the second task table); below left Closing Progress & Activity, right Today & Tomorrow.
- Bottom full-width frame: existing Daily Follow-Up Checklist, renamed STEP 2; fixed header, internal scrolling for about 10–15 rows, future/today rows prioritized with due-today/tomorrow colors. Preserve the 6 contract defaults and 44 follow-up defaults, their separate data and visual identities.
- BOTH source tables (Contract Tasks & Deadlines and Daily Follow-Up Checklist) require a narrow, contrasting-background selection column of small clickable circles/checkboxes. Reduce Reminder Date column to the minimum usable width to make room without expanding table. Multi-select is independent of Done/Pending and does not modify task data. Display Selected count, Email Selected and Clear Selection (reset selection only, never delete tasks). Keep a consistent workflow and capabilities for both tables.
- Each source table feeds ONLY its corresponding results card: Contract selections -> Closing Timeline Summary; follow-up selections -> Follow-Up Summary. Each results card displays the selected tasks with dates and status, and supports Copy, Email, Save PDF / Print, Calendar & Reminders, More Tools. Reuse the user-approved three visual cards (Save PDF / Print, Calendar & Reminders, More Tools) elegantly and consistently in the results tools without unnecessarily duplicating large blocks.
- Email composes a draft for any recipient selected by the owner, including only selected tasks and due dates; never send automatically. Allow copying selection. Clear Selection removes checkmarks only. Avoid leaking sensitive client/property information, avoid presenting demo as private account storage.
- The screenshot shows 3 PRO tiles: "Save PDF / Print" (Export and print your closing timeline), "Calendar & Reminders" (Organize dates and follow-up reminders), "More Tools" (Discover professional closing tools). These are requested in BOTH results experiences. Mark non-implemented integrations accurately as planned, not functional.
- Implementation status as of this note: REQUIREMENTS CAPTURED, NOT YET IMPLEMENTED. Existing PRO preview still uses old Step 2/Step 3 labels and existing side-by-side layout. Build incrementally and verify functionality and visual browser layout before claiming complete. Do not add a pile of contradictory CSS overrides; keep approved styling.


## APPROVED — NOVEMBER 5, 2026: PRO V3 flexible recipient-based email workflow (authoritative future-chat specification)

**User-approved product behavior — preserve when implementing Real Estate PRO V3 and the final website.** This supersedes older fixed buyer-agent email/table templates where they conflict.

1. **The customer chooses what to communicate.** In Step 1 `Contract Tasks & Deadlines`, the customer may edit/add/delete contract tasks, check any combination using the leftmost `Select` column, and send exactly the selected tasks to any chosen recipients. No predefined set of tasks or immutable standard email table is required for the other Realtor. The same flexible model will apply separately to Step 2 `Daily Follow-Up Checklist` and its Follow-Up Summary.
2. **Selection is not task completion.** `Select` is exclusively for sharing; `Done / Reopen` independently tracks completion. `Deselect` clears all selected checkmarks without deleting tasks, altering due dates, notes, or completion status. Selected-task reports should reflect current edited task names, dates, statuses, and applicable notes.
3. **Two independent report sources.** `Closing Timeline Summary` reports Step 1 tasks; `Follow-Up Summary` reports Step 2 tasks. The user may share any selected subset. Keep Copy, Email, Save PDF / Print where implemented; do not claim calendar/reminder or extra tools integrations are live unless actually functional. Avoid duplicating large report cards.
4. **Email Selected opens a recipient-composition window/modal**, not an automatic send. Display a clear `To — Recipients` area with a visible `+ Add Recipient` action. Customer may select one or multiple previously saved recipients and/or create a new recipient with **name, email address, role** (Buyer Agent, Seller Agent, Buyer, Seller, Lender, Title Company, Other). Saved recipients remain available for later emails. Customer can edit the subject, greeting/body and review the selected task summary before proceeding. Include a clear preview and `Open in Mail` action; the mail client creates a draft, user remains responsible for sending. Verify recipients and exact shared content before opening mail.
5. **Congratulations message stays available** for an accepted contract and another Realtor (e.g. “Congratulations on your accepted contract! We look forward to working together toward a successful closing.”). This is an **optional editable greeting**, not a mandatory fixed template for every recipient or every occasion. Avoid inserting it into unrelated messages by default.
6. **Privacy and storage.** Contacts, email draft choices and task selections must be isolated per authenticated PRO account in the eventual production system, with durable private storage and access controls. Browser-local demo storage may be used for testing but must be labeled as such; it is NOT production multi-device persistence. Do not automatically send emails or leak client/property data. Avoid saving sensitive names and property addresses into public page output.
7. **Build process.** V3 is the fresh clean implementation. First finish the full-width, internally scrolling Step 1 with its own clean CSS/JS and all task functions; then add the side-by-side Closing Timeline Summary and Follow-Up Summary; below them Closing Progress & Activity and Today & Tomorrow with Copy/Email; then full-width internally scrolling Step 2. Reuse the established 6 original contract tasks and 44 original follow-up suggestions. Do not import legacy `free.css` or layer conflicting overrides. Preserve V2 and older preview until V3 is verified; do not alter production prematurely.
8. **Validation before release.** Test adding/editing/removing tasks; dates and alerts; selection and deselection; Done/Reopen; saved recipients and multi-recipient composition; optional congratulations; report preview; copy and draft creation; persistence and account isolation. A mailto draft cannot guarantee a rendered image attachment or HTML image of Closing Timeline Summary: verify a suitable print/PDF or actual email integration before promising such delivery.

**Implementation status at recording:** Approved requirements saved for future work; recipient modal, saved recipient book and production account storage are **NOT YET IMPLEMENTED**. Do not claim they work until coded and tested.


## V1-to-V3 RULE AUDIT — 2026-11-05 (verified against prior clean prototype and product decisions)

- **Dates**: Both Effective Date and Closing Date may initially be blank; refreshing preserves user-entered dates. Clear Dates must erase dates only, preserving task text, notes, selections/completion states and other closing metadata. A native calendar picker and explicit date clearing control are desirable.
- **Deadline calculations**: Task due dates derive from Effective Date or Closing Date plus a signed day offset. Calendar Days and Business Days (weekdays only, excluding weekends but not automatically public holidays) are distinct modes. On date changes, dependent due dates recalculate. Manual due-date overrides, when offered, must be preserved until the user explicitly changes their calculation basis/offset.
- **Original six contract tasks**: 1st Deposit +3, 2nd Deposit +5, Loan Application +5, Condo Application +5, Property Inspection deadline w/right to cancel +7, LOAN APPROVAL - Notify seller if NO LOAN APPROVAL +30 (all Effective Date based).
- **Completion vs selection**: Done/Reopen changes task completion independently from Select, which is only for choosing tasks to share. Keep selected-only flexible email workflow, optional congratulations and reusable private recipients specified above; never reinstate a fixed buyer-agent task subset.
- **Task history**: The previous clean prototype had activity records for reschedules and changes. Production must audit original and updated dates, completion and rescheduling; V3's current browser-local prototype does not yet implement a durable audit log.
- **Ordering**: Preserve stable task order while editing/hovering so the table does not jump; explicit sort by due date is allowed. Earlier prototype used a pointer-enter freeze to prevent visual jumping.
- **Crucial distinction**: Real Estate PRO access is 60 days from activation, NOT a 60-day contractual closing limit. Approved commercial rules explicitly allow saving a Closing Date beyond paid access with a warning, without extending entitlement. **CURRENT V3 CODE TEMPORARILY RESTRICTS Closing Date TO Effective Date +60 calendar days following a recent request. This conflicts with the earlier approved commercial rule; do not conflate these concepts.** Resolve whether the user wants a 60-day visible calendar window (navigation convenience) or a strict maximum Closing Date before changing the product rule. A future contract extension must be allowed under the approved access/extension rules.
- **Account privacy**: Current V3 data and contacts are browser-local demo only. Immutable Closing ID, server-side credits, secure account isolation, retention, access expiry and audit logs remain future production implementation, not completed.
- **Implementation status**: This section is a verified rule audit and handoff, NOT a claim that V3 currently implements all these behaviors. Avoid copying old CSS/JS wholesale; implement in clean V3 components with tests.

## 2026-11-05 — V3 visual alignment and copy-to-email report
- User approved the current full-width Contract Tasks & Deadlines frame and requested the header logo visually aligned farther left, rather than repeatedly changing the table width. V3-only CSS adjusts `.header .logo` by -82px on desktop >=1181px; the shared header, other pages and production remain unchanged. Check in browser at the reference screenshot viewport; no live browser verification has been performed.
- `shared/pro-v3.js` `buildReport()` now embeds inline styles in the copied HTML summary so navy/gold header, row fills, date columns and milestone circles survive HTML-capable email pasting better; actual Apple Mail appearance still needs visual verification.
- Preserve clean single-source styles, avoid repeated conflicting overrides. Continue recording decisions and code changes in this master document on the isolated branch.

## 2026-11-05 — Selected Closing Timeline Summary: clipped fourth column fixed
- User's screenshots show copied summary missing the DUE DATE column, while approved reference has four columns (#, TASK / MILESTONE, DAYS, DUE DATE), navy-and-gold header, circular milestone numbering, blue effective-date row and rose closing-date row.
- Root cause verified in `shared/pro-v3.css`: global `table{min-width:1020px}` applied to the report nested inside a ~850px dialog, clipping the fourth column. Fixed the existing `.v3-report-table` declaration with `min-width:0;max-width:100%;table-layout:fixed` and explicit second/fourth column widths. Did not change contract task table, selection behavior, or production.
- Next: user browser verification of due-date column and actual pasted HTML in Apple Mail; source change alone does not prove mail-client rendering.

## 2026-11-05 — Header alignment reference screenshot 1:30 PM
- User requested the Step 1 contract table and site header/logo aligned at their left edges. Screenshot shows logo visible start ~x248 and table left edge ~x217, a ~31px discrepancy. Replaced the earlier unverified -82px V3-only logo margin with -31px at desktop widths >=1181px; no changes to the table or shared site header. Requires browser screenshot confirmation, because preview deployment timing can differ.

## 2026-11-05 — Approved report heading style and all section titles
- User explicitly approved restoring the original branded title treatment across reports and future sections, based on screenshots: navy header, teal square icon, vertical gold separator, small uppercase gold eyebrow (for Closing Timeline Summary: `YOUR CLOSING AT A GLANCE`), main white title with the final accent word `Summary` in gold italic serif. Keep the distinct approved title wording for each section (e.g., `Closing Progress & Activity`, `Today & Tomorrow`, `Daily Follow-Up Checklist`); apply the same coherent heading system rather than generic plain titles.
- Updated `clean-project/shared/pro-v3.js` `buildReport()` to render the approved `Closing Timeline Summary` branded heading both in the preview and copied HTML, using inline styles for mail-client compatibility. Preserved selected task rows, four columns and dates. Teal square uses a text glyph rather than an embedded image to keep clipboard HTML self-contained. Requires browser/Apple Mail verification.
- Work only in isolated `clean-rebuild-20261103` branch; no production changes. Do not reintroduce legacy contradictory CSS rules.

## 2026-11-05 — Closing Summary report must use actual header logo
- User approved the new Closing Timeline Summary title but requested that its teal square icon match the real MyClosingTimeline.com logo shown in the site header, not a generic outlined square glyph.
- Replaced the placeholder glyph in `shared/pro-v3.js` `buildReport()` with an `<img>` pointing to the same `images/original-logo.png` asset used by the V3 site header, cropped to the left icon in a 62×62 container. The report's navy/gold header, eyebrow, title, columns and task rows remain unchanged. The HTML copied to mail references the public preview image URL; recipients' mail apps may block remote images, so browser and Apple Mail verification are required. Never substitute the placeholder square again.

## 2026-11-05 — Apple Mail copied report header layout repair
- User screenshot showed the branded copied report breaking in Apple Mail: teal mark detached above the navy title, heading stretched, oversized text/table. Root cause: HTML clipboard copied a flexbox-based header that Apple Mail does not reliably preserve.
- `shared/pro-v3.js` now builds the report header using an email-compatible presentation table with explicit cell backgrounds and inline styles, no flexbox. The actual full `images/original-logo.png` is shown in a fixed-width left cell, a gold divider and a title cell. The logo is intentionally full, not a CSS-cropped icon, since email clients often ignore crop/overflow styling. Keep four-column report content unchanged. Browser preview and Apple Mail paste still need visual verification; don't claim verified until user checks.

## 2026-11-05 — Restore classic copied-report design
- User rejected the newly added full MyClosingTimeline logo and giant header after pasting in Apple Mail. Reverted the copied-report header in `shared/pro-v3.js` to the original visual language: navy banner, gold house symbol, thin gold vertical divider, white `Closing Timeline` and gold italic `Summary`; removed full-width commercial logo and `YOUR CLOSING AT A GLANCE` from copied report. Retained email-compatible HTML table cells rather than flex. This is a visual approximation of the original approved reference screenshots; Apple Mail paste needs user verification.

## 2026-11-05 — Step 1 right-side action buttons
- Group Clear Dates and Restore Original Tasks in a single softly bordered light-blue panel on the right of the date controls. Both buttons have larger 13px labels, at least 40px height, clear hover/focus treatment and an 8px gap, so they are easy to locate. Keep Start Closing separate as the primary action. Change scoped to clean-project/shared/pro-v3.css on isolated branch; production untouched.

## 2026-11-05 — Date action buttons visibility
- Clear Dates and Restore Original Tasks must stay grouped and immediately beside Start Closing on wide screens, not isolated at the far right. In V3 CSS removed automatic left margin on date-tools group, aligned it to the left, and retained a visible light-blue bordered panel with larger buttons. On narrow screens wrapping is permitted. Do not hide these actions or detach them from date controls.

## 2026-11-05 — Email report visual refinements
- User screenshot shows too-short navy report header, a broken image icon, and heavy type in pasted email. Increased report header padding, changed heading to 25px weight 600, body to 13px weight 500 with 1.5 line-height and taller rows. Calendar icon now references the published website asset at myclosingtimeline.com/assets/myclosingtimeline-email-icon.png rather than raw GitHub. Verify actual email image loading; remote images may be blocked by mail client. Only clean rebuild branch changed.

## 2026-11-05 — Preserve report appearance when pasting into Apple Mail
- User requires pasted report to look like the browser preview. Apple Mail reformats HTML tables and strips or changes typography, spacing, image positioning and circular milestone badges.
- The `Copy Formatted Table` action now first creates a PNG rendering of the selected Closing Timeline Summary and copies it as `image/png` through the Clipboard API, retaining a consistent fixed visual design when pasted into Apple Mail. It includes the navy/gold header, drawn calendar mark, numbered circles, four columns, colored Effective/Closing rows and disclaimer. If PNG clipboard is unavailable, it falls back to the existing HTML clipboard. `Copy Text` remains editable plain text. Note: pasted PNG is an image, not editable table text. Requires actual Apple Mail paste test; no production changes.

## 2026-11-05 — Remove report icon/title divider
- User requested removal of the thick vertical gold separator between the calendar icon and `Closing Timeline Summary` title, both in the on-screen report and in the PNG copied for email. Removed divider cell from `buildReport()` and the gold vertical rectangle from `reportPng()` in `shared/pro-v3.js`. Other report styling unchanged; verify after preview refresh.

## 2026-11-05 — One identical report for Copy Selected and email
- User explicitly approved the PNG pasted in email (first screenshot) and requested that the Copy Selected modal (second screenshot) show that same design. `openCopyReport()` now renders the exact PNG produced by `reportPng()` as an image inside the modal. `Copy Formatted Table` uses the same PNG generator, so both views share one design source. HTML report remains as fallback when image preview is unavailable. The modal's temporary object URL is revoked on close. This avoids maintaining two competing report layouts. Requires preview deployment and browser test; production unchanged.

## 2026-11-05 — Copy Selected preview not updating
- User reports Copy Selected still showing old HTML report instead of the approved PNG copied to Apple Mail. The branch already contains the image preview implementation; changed the V3 page script URL to `shared/pro-v3.js?v=20261105-copy-preview-2` to invalidate a potentially cached old JavaScript file. Verify that preview deployment actually serves this HTML/JS version. Do not claim the issue is resolved without browser confirmation.
