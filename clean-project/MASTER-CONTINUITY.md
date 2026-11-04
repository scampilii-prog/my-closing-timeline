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
