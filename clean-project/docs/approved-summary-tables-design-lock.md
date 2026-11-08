# LOCKED DESIGN — TABLES 02 AND 03 / SUMMARY EMAILS (2026-11-08)

## Status: APPROVED — DO NOT REDESIGN
Before any further layout or clipboard modifications, preserve the current elegant compact table and its approved preview. Do not replace it with a generic HTML table or change column proportions, fonts, padding, colors, borders or header styling without explicit user approval.

## Table 02 → Result 01: Closing Timeline Summary
- Result header: blue matching TABLE 01 OF 02 · CONTRACT INPUT; title white, word **Summary** gold (#e6b35e), italic Georgia/serif.
- Composer: saved contact, Add Contact without leaving page, recipient email, subject, message, selected task rows, purpose/instruction, note, send checkmarks, Save Draft, Copy Formatted Table, Open Email Draft.
- Preview formatted table: the approved navy/blue full-width banner with turquoise check icon, white Closing Timeline and gold italic Summary. Gold column headings; wide TASK / MILESTONE; centered DAYS and DUE DATE; optional PURPOSE / INSTRUCTION. Number badges with thin gold circular border. Effective date light blue; closing date pale pink. Clear rows, readable text, no clipping.
- Copy/paste MUST preserve the same approved visual style as the preview in a rich-text email; copy only tasks selected for sending. No extra tasks. HTML email must use inline styles and explicit table widths/cell widths (not CSS classes or flex/grid), and clipboard text/html. Browser/email clients can vary; test pasted output before claiming fixed.

## Table 03 → Result 02: Follow-Up Summary
- Result header green, turquoise icon, white Follow-Up, **Summary** gold (#e6b35e) italic Georgia/serif.
- Same recipient/contact fields, selection/send checkmarks, instruction/note inputs, three actions and standalone Preview formatted table control as Result 01.
- Copied HTML shares the SAME elegant email table design as Result 01, only title/color/task data differ. No truncated columns, duplicated checkmarks, narrow task column, giant font or unwanted line wraps.

## Safety before edits
1. Keep both currently approved preview designs unchanged.
2. Change only the copy/export implementation needed for parity with preview, preferably via one reusable email-table renderer.
3. Verify preview AND actual paste into an HTML-capable email editor for BOTH summaries.
4. Work only in branch `clean-rebuild-20261103`; never alter main/production without approval.
5. A GitHub commit does NOT mean Cloudflare Worker V5 has been deployed.
6. Keep a before/after screenshot and revert if the approved layout regresses.

Relevant code: `clean-project/shared/recipient-summary.js`, `clean-project/shared/followup-recipient.js`, `clean-project/shared/pro-v4.css`, V5 HTML entrypoint.
