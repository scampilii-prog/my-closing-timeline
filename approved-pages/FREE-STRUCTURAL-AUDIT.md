# FREE Real Estate Timeline — structural audit (2026-11-03)

Branch: preview-review-20261103. Production main is out of scope.

Source: real-estate-free-rebuilt-preview.html, 5,112 lines, approximately 515 KB.

Confirmed:
- The original primary table starts at line 1446 with id mct-new-primary-table.
- The planner starts at line 1399 with id contract-deadline-planner.
- Legacy styling at lines 2595–2621 targets a direct-child .fc-simple-layout and a nested mct-simplified-summary-row.
- Later styling at lines 5079–5086 targets mct-new-primary-table.
- The final script at lines 5087–5112 reparents the table, summary, tomorrow panel and follow-up, then registers a MutationObserver to repeat placement.
- An earlier script at lines 2555–2572 dynamically creates Today & Tomorrow and Step 3 preview.
- The document contains many independent style and script blocks; removing them blindly risks breaking task calculations and controls.

Approved target: 60% Contract Tasks & Deadlines / 40% Closing Timeline Summary and Today & Tomorrow, followed by full-width Step 3. Preserve original element IDs and behavior.

Next repair: map the complete DOM and all reparenting scripts; make one stable source-order layout, eliminate only superseded movers and conflicting rules, run browser functional checks, and seek user approval before copying the page to approved-pages.

No page has yet been approved. Do not delete or promote any page to production.
