# Real Estate PRO — handoff, known failures, and next-chat instructions
Updated 2026-11-08. Branch: `clean-rebuild-20261103`. Repository: `scampilii-prog/my-closing-timeline`.

## READ THIS FIRST — USER EXPECTATIONS
- User has spent many hours on repeated ineffective fixes. Do not apologize repeatedly, give empty progress updates, or request endless screenshots, refreshes, or repeated Cloudflare navigation.
- Do not claim a page is fixed, deployed, or tested without independent verification.
- Do not create PRO 6, 7, etc. Do not change production/main or approved TABLE 02 without permission.
- Preserve approved visual design, original contract tasks, existing browser data, and working functions.
- GitHub edits alone do NOT establish a live deployment. Browser may display a different page or cached assets.
- Prefer diagnosing and removing conflicts rather than layering CSS or JS overrides.

## REPOSITORY AND PREVIEW
- Branch: `clean-rebuild-20261103`; working directory `clean-project`.
- Cloudflare Worker: `plain-mouse-a4cc`; URL root `https://plain-mouse-a4cc.scampilii.workers.dev/`.
- Legacy test page: `clean-project/real-estate-pro-v5.html` (path `/real-estate-pro-v5` or `/real-estate-pro-v5.html` only after verified).
- New isolated file (NOT VERIFIED LIVE): `clean-project/real-estate-pro-clean.html`. Created in commit `31c6dd59`; alert fix `f99bb2b6`. It is a prototype, not a validated replacement. Its functionality and fidelity to approved TABLE 02 have NOT been tested.
- `clean-project/wrangler.json` specifies name `plain-mouse-a4cc`, `assets.directory: "./"`. SPA fallback removed in commit `82ed424b`; this alone does NOT fix stale pages.
- User Cloudflare screenshots showed Worker deployments marked Ready, manually deployed through Wrangler, build command `cd clean-project && npx wrangler deploy`, and ~50 files processed. Do NOT infer that a specific URL is serving the expected file merely from Ready status.
- The assistant environment previously could not resolve the Worker URL; user screenshots showed that the browser might perform a Google search if a bare filename is entered. Do not overclaim root cause.

## CONFIRMED SOURCE-CODE CONFLICTS IN V5
Inspection of `clean-project/real-estate-pro-v5.html` on 2026-11-08:
- 31 `<style>` blocks and 607 `!important` occurrences.
- Duplicate HTML IDs: `clearDates` twice, `restore` twice. Duplicate IDs make `getElementById`/selectors ambiguous.
- Four inline `<script>` blocks and five external JS files:
  1. `shared/pro-v3.js?v=20261108-apply-clean-1`
  2. `shared/pro-v4.js?v=20261108-no-duplicate-actions-13`
  3. `shared/recipient-summary-v5.js?v=20261108-library-below-table-14`
  4. `shared/followup-recipient-v5.js?v=20261108-buttons-clean-11`
  5. `shared/contact-manager.js?v=20261108-matched-checkboxes`
- Prior `shared/v5-table-action-layout.js` moved/recreated controls; its script tag was removed from V5 in commit `a8b6b54d`. It should NOT be reintroduced without a deliberate architecture review.
- Existing inline action wiring may overlap listeners already bound by `pro-v3.js`; investigate before modifying destructive buttons.
- Past UI bugs: missing/hidden action toolbar, duplicate Apply controls, sorting not applied, incorrect alert after changing Days, table layout diverging from approved design, bad copied-email table, button handlers conflicting, and repeated caching/refresh complaints.
- A prior update to `pro-v3.js` recalculated alert status on Days/Due Date changes, but end-to-end behavior is not verified.

## APPROVED PRODUCT INTENT
- TABLE 01 OF 02 · CONTRACT INPUT: follow the same elegant visual/action layout as approved TABLE 02, but retain six original contract tasks and their user-edited values. Do not overwrite localStorage automatically.
- Original contract tasks: 1st Deposit (3 days), 2nd Deposit (5), Loan Application (5), Condo Application (5), Property Inspection deadline w/right to cancel (7), Loan Approval (30). These are defaults, not legal guarantees; real deadlines follow the contract.
- TABLE 01 toolbar: Add Custom Task; Clear Dates; Restore Original Tasks; Sort by Date; selected count; Select All; Delete Selected; Clear All Tasks; Create Personal Task Page. Avoid duplicate actions.
- Table columns: Select, #, Task / Reminder, Days, Date Basis, Due Date, Status, Alert, Notes, Done / Reopen, Delete.
- Days/date basis changes should recalculate Due Date and Alert; Sort by Date must actually reorder; selected tasks can produce elegant formatted table for copy/email; named reusable templates and recipients; summary linked to input.
- TABLE 02 · FOLLOW-UP INPUT must retain its approved appearance and functionality; its linked Follow-Up Summary also stays.
- Preserve Closing Timeline Summary and saved/personal tables. Long-term product requires account-persistent storage, not just browser localStorage. The standalone prototype currently uses localStorage and is NOT production-ready.
- Product pricing and account workflows exist elsewhere in repo; do not casually change them.

## SAFE NEXT STEPS
1. No new page versions. Inspect actual deploy source/routing, and test exact asset response using an environment with real HTTP access; determine whether Worker serves the expected HTML, wrong route, or stale content. Do not assume from deployment success alone.
2. Audit and document all conflicting IDs, styles, and duplicate event handlers; keep TABLE 02 untouched.
3. Establish one canonical layout and one owner per button/event. Remove obsolete code in controlled edits, retaining backup and branch isolation.
4. Verify date calculations, alerts, sorting, select/delete/restore, copy/email formatting, and saved data; use repeatable tests and report pass/fail rather than claims.
5. Only then provide one verified public URL. Do not request repeated screenshots from user.

## HISTORICAL COMMITS
- `4496a1b9`: changed TABLE 01 markup to match TABLE 02 toolbar/table.
- `a8b6b54d`: removed conflicting `v5-table-action-layout.js` include and added CSS overrides.
- `31c6dd59`: created standalone clean prototype.
- `f99bb2b6`: corrected JavaScript alert naming collision in prototype.
- `82ed424b`: removed SPA fallback from Wrangler config.
