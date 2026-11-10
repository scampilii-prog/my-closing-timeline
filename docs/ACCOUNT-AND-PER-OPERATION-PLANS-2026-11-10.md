# MyClosingTimeline.com — Account, privacy and per-operation plans
Status: product requirements approved in conversation on 2026-11-10; implementation NOT yet confirmed. This document supersedes earlier pricing and free-tier assumptions for future builds; do not silently alter the live website or Stripe before implementation and testing.

## Product taxonomy
- Real Estate Timeline
- My Project Timeline (replaces "Other Projects" in proposed public-facing copy)
- One private user account can contain many closings and projects, each with its own unique public-safe alias and private metadata.
- The public website must never expose private operation details. User-selected identifiers must be scoped to authenticated accounts; avoid guessable public access.

## Registration and free trial
- One account per verified email. Display names are NOT unique: different people can share a name.
- Registration: name, email, password, email verification; protect accounts with secure authentication and anti-abuse controls.
- The first eligible operation gets a 21-day full-feature trial once per account; no second free trial on additional operations.
- Trial applies to one operation, not all simultaneously. Remind at 7, 3, 1 days before expiration, with user notification preferences and consent where required.
- Trial abuse protections cannot be guaranteed solely by matching names or emails.

## Pricing per operation
- Initial 2-month term: $40.
- Monthly: $20/month.
- Six months: $100 prepaid.
- Twelve months: $180 prepaid.
- The $40 term is a selectable option, not an obligatory gateway to longer plans. Confirm final billing rules, whether monthly renews automatically, and whether longer terms auto-renew before Stripe setup.
- Paid term starts at payment activation; one plan subscription/entitlement per operation, with separate dates, status and invoices.
- Nonrefundable prepaid terms subject to applicable law and clearly disclosed terms. Cancel future renewal without deleting records.
- All features available in trial and active paid terms.

## Access and retention
- Permanent login and read-only access to own operations, contacts, templates, history and existing PDFs after trial/plan expiration; export own records.
- Creating/editing tasks, dates, contacts, messages or operations and preparing new shares requires active entitlement for that operation, except account-level management, security, export and deletion rights.
- Account-level contacts/templates remain privately stored and visible across operations; using/editing them requires appropriate active access as product rules specify.
- Data never deleted automatically just for nonpayment; define privacy retention, user deletion and lawful deletion procedures separately.
- Protect data on server-side, with row-level authorization, secure backups, audit history and export; browser localStorage is not permanent multi-device storage.

## Templates and workflow
- Original built-in task template remains retrievable and editable as a draft.
- Save as Model stores a reusable custom template; saved models can be reopened, edited as drafts and saved as a new version.
- Active Task Table uses a saved, applied snapshot only. Draft edits never silently change an active closing/project.
- Continue → Prepare & Share appears for saved active task tables, not unsaved drafts.
- Save & Apply shows impact on existing tasks and requests confirmation, preserving notes, status and follow-up history.
- For Real Estate, Start Closing toggles lock/unlock with confirmation; Effective/Closing dates remain editable as allowed, recalculating due dates; Reset Dates clears all calculated due dates in every view while retaining task/day/notes/selection.

## Per-operation workspace
- Dashboard of operations with statuses: trial, active, expired/read-only, archived, cancelled.
- Each operation has own deadlines, Follow-Up Tasks, Follow-Up Summary, contacts selections, communications, private notes, PDF exports, history and archival.
- Shared private Contacts & Messages library supports personalized email subjects/bodies and reusable templates by recipient and occasion.
- No real email-send claim when implementation only opens a local mail draft.
- View Formatted Table and Prepare & Share must stay functional and synchronized with selected tasks and date resets.
- Preserve tested V5 UI and features as baseline; build authenticated backend separately and migrate only with regression tests.

## Implementation phases
1. Freeze and test V5 baseline, capture approved behavior and visual styles.
2. Data model: users, operations, operation_entitlements, trial_redemptions, task_templates, task_template_versions, task_snapshots, tasks, contacts, email_templates, followups, activity_log, pdf_exports.
3. Authentication and private storage; verify server authorization, duplicate email and trial redemption.
4. Per-operation billing in Stripe sandbox with webhook idempotency, renewal/cancellation and read-only access on expiry.
5. Template editor versus saved active table, then Follow-Up Center and communications.
6. Export/archival, reminders, accessibility/mobile, security/privacy and production acceptance tests.
Do not state these features are live until built and tested.

## Navigation simplification — approved 2026-11-10
- Remove FREE as a separate product tier, feature-limited workspace and main navigation category. The registration itself is free; the first operation has a 21-day FULL-feature trial.
- Remove separate FREE vs PRO copies of tables and duplicated promotional funnels from the new site architecture. Retire or redirect old routes only after testing; do not break existing links prematurely.
- Proposed compact primary navigation: Home, Real Estate Timeline, My Project Timeline, Plans & Pricing, Help & Contact; authenticated: My Workspace, My Account. Register / Sign In remain available as appropriate.
- Main CTA: Start Your 21-Day Full Access Trial. After verified registration, choose category and create the first operation.
- One unified full-feature workspace and shared UI components, with domain-specific task templates. A paid entitlement per additional operation; no extra free trials.
- This is a documented product decision, NOT a deployed website change. Keep V5 testing and freeze a tested baseline before migrating.

## Email template studio — approved direction 2026-11-10
- V5 test: Open Email Draft successfully populates recipient, subject, message, six selected tasks and the user's Mail signature, but current generated task content is plain text and visually inelegant. Treat functionality as visually verified, not as proof of email delivery.
- Provide a private My Email Studio for each operator: create, name, edit, preview, save, duplicate, select and reuse many personalized email templates for different recipients and occasions.
- Initial template styles: Professional Summary, Personal Message, Action Reminder, and operator-created custom templates. Templates may include customizable subject, greeting, body, optional branded table, sign-off and styling.
- Reusable template content is separate from operation-specific live data. Merge recipient, selected tasks, days and due dates from the currently active saved task table at preview/send time; never reuse stale dates.
- Preserve original templates when creating variants, and keep them accessible read-only when a plan expires. Editing and preparing new messages require the appropriate active operation entitlement.
- Mailto links alone cannot reliably transmit rich HTML email; support copy formatted HTML to clipboard for paste into the mail composer, or a future authenticated email integration with preview and explicit send confirmation. Do not claim rich formatting works via Open Email Draft without testing.
- Preserve personal email signatures supplied by the operator or their mail client; never expose private recipient/contact information publicly.

## Approved renewal and expiration policy — 2026-11-10
This section supersedes earlier FREE-versus-PRO tier terminology: there is one full-feature product, with a one-time 21-day free trial for the first eligible operation. Trial is free, not a separate feature-limited plan. Account registration requires unique verified email (display names need not be unique). Each additional operation has its own purchased access term. The same account owns multiple independently entitled operations; account-level Communication Center shares contacts and reusable message templates only, while messages and tasks belong to their respective operation.

### Reminders and access
- Notify 7, 3 and 1 days before each operation's expiry; in-app and email subject to delivery preferences and consent requirements.
- Avoid duplicate reminders and ensure reminders use the operation's local timezone and exact expiry timestamp.
- At expiry, operation becomes read-only: owner can sign in, inspect and export existing records, but cannot edit, create tasks or prepare new outbound communications for that expired operation.
- No automatic deletion solely for nonpayment; privacy-policy retention and account deletion rights still apply.

### Continue the SAME operation
- User opens an existing operation and chooses Continue Your Project / Extend Access.
- Offer one-time, non-auto-renewing per-operation access terms: 2 months $40 (primary), 3 months $55 (proposed price accepted in conversation), 6 months $100, 12 months $180. Confirm final pricing and tax/legal details before production.
- Paying to continue does NOT create another operation or consume a new-operation credit. Starting an additional operation is a separate purchase with its own access term and no second free trial.
- Before expiry: add the purchased period to current paid-through timestamp (preserve remaining time). After expiry: new term begins at payment confirmation.
- A payment only activates or extends after verified Stripe webhook confirmation; protect against duplicate events/idempotency and failed payments.
- No automatic renewals unless separately and explicitly opted into. Canceling or failing to renew does not delete the operation.
- Show a clear receipt, revised expiry and Open & Continue. Expose renewal anytime from My Account → My Projects.

### Implementation acceptance tests
1. First verified account receives exactly one 21-day full-feature operation trial.
2. A second operation never receives a new trial.
3. At 7/3/1 days, exactly one eligible reminder per stage and operation; suppress after renewal.
4. Before expiry, early purchase extends from existing expiry without losing days.
5. After expiry, purchase starts new term at confirmed payment.
6. Failed/canceled/duplicate Stripe events never extend twice.
7. Expired operations are read-only but remain visible and exportable.
8. One operation's renewal never alters another's entitlement or task data.
9. Shared contacts/templates remain account-scoped; messages and task selections remain operation-scoped.
10. No public UI claims these rules are live until authentication, database, Stripe and tests are deployed.
