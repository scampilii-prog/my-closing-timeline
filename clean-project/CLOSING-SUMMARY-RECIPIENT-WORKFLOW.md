# Closing Timeline Summary — Recipient workflow
Approved by product owner: 2026-11-08. Status: APPROVED SPECIFICATION, NOT IMPLEMENTED OR TESTED.

## Core behavior
- Table 01 is the source of truth for contractual task names, offsets, date basis, due dates, Done state and contract notes. Do not mutate contract tasks when composing recipient messages.
- Selected Table 01 tasks immediately generate Result 01 / Closing Timeline Summary. Display only selected tasks, sorted by due date, in a polished navy/gold table based on the approved reference screenshot. Include effective date and closing date as contextual milestones where appropriate; distinguish unscheduled dates.
- Each selected row has a recipient-facing Purpose/Instruction dropdown: Action Required, Please Confirm, For Review, For Information, Completed, Custom Instruction. Provide an optional short note per row. Never infer task completion from purpose; keep Done independent.
- Add a separate Send checkbox per row. Send toggles inclusion in the outgoing report without changing the original Table 01 selection. Selection and send flags must remain distinct.
- Choose an existing saved recipient (name, email, role) or create/edit one. Do not silently send to a stale or wrong recipient. Recipient-specific purpose, notes, and inclusion are separate from other recipients.
- Choose an existing email template by recipient/role or start blank. Populate subject and editable body, and allow edits without overwriting the saved original. Offer explicit Save Draft and Save as Template, with clear names.
- Copy Table for Email copies the formatted recipient-ready table, not just text or a button that opens another view. Provide fallback plain text when rich clipboard is unavailable. The output table has no dropdowns, checkboxes, or editing controls. Keep navy/gold styling where rich email supports it.
- Prepare Email opens a review screen with recipient, subject, body, and formatted selected table. Open in Mail is a separate user-initiated action; do not claim delivery. A mailto draft cannot reliably carry HTML tables; provide Copy Formatted Table separately, with clear paste instructions.
- If no rows are marked Send, disable Copy/Prepare with explanatory text. Empty recipients and invalid email addresses must be validated before opening mail.
- Follow-Up Summary gets the same recipient workflow, but reads only Step 3 follow-up tasks, never duplicates Step 2 contractual milestones.
- Keep existing date recalculation, sorting, delete, add, Done/Reopen, summary and Today & Tomorrow functions intact. Avoid new CSS/JS patch layers that obscure ownership.
- Local browser persistence is demo-only; account-backed contacts, templates, drafts, and recipient pages require authenticated server-side storage and scoped authorization before production.
- Never auto-send emails or expose personal contacts in public preview. Production remains unchanged until explicit approval.

## Acceptance tests
1. Select two tasks; summary reflects exactly those two, including current dates.
2. Change purpose and custom note; contract task data is unchanged.
3. Uncheck Send on one row; copy contains only the other.
4. Change recipient; previous recipient's draft and instructions remain separate.
5. Edit email subject/body; original saved template is unchanged unless explicitly saved.
6. Copy produces a usable formatted table in an HTML-capable email editor; plain-text fallback is readable.
7. Changing Effective/Closing Date recalculates all relevant dates in both summary and prepared draft before sending.
8. Clear selection; no stale rows are included.
9. Refresh preview; local demo persists as designed, but never claims permanent account storage.
10. Follow-Up recipient workflow remains separate from contract summary.
