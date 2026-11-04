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
