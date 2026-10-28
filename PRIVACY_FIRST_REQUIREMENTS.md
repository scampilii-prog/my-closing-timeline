# MY CLOSING TIMELINE — PRIVACY-FIRST PROJECT RULES
Revision: 2026-10-28. Status: in progress; not certified or ready for public privacy claims.

## Permanent brand philosophy
**Your Clients. Your Records. Your Privacy.**
Use consistently across HOME, FREE, PRO, pricing, legal pages and private/admin tools.
The message is a design objective, not a claim that all protections have been audited.

## Approved architecture
1. All real-estate timelines should use only a random, non-identifying Private Closing Reference, effective/closing dates and task/status data necessary for deadlines.
2. Do not request or save buyer/seller names, agent names, property addresses, purchase prices, personal contact details, or confidential documents in FREE or PRO transaction records.
3. FREE: browser planning, no account-based transaction storage.
4. PRO: an authenticated account may save only non-identifying project references, dates and generic workflow tasks. Account registration/email/credit records are separately governed by the Privacy Policy.
5. Private editable PDF: the website generates a downloadable fillable PDF from anonymous closing data in the browser. Optional personal details (buyer, seller, address, price, company, contacts and notes) are intentionally blank and are completed in a PDF viewer on the customer's own device. They must not be transmitted back or synchronized to this service.
6. Recipient email addresses must be entered in the user's own Mail application, never in a form on the timeline page.
7. Publicity must not say that the service is completely anonymous or legally immune; browser request metadata, account email and legacy data still require review.

## Changes already made in source
- Site-wide slogan on 19 substantive pages, HOME also has a prominent one-line slogan.
- FREE, PRO preview and Admin timeline inputs: property address, client name, agent name, purchase price and recipient email fields removed; new private reference added.
- Shared buyer-timeline export/calendar now carries a reference and leaves the former address/agent fields empty.
- FREE, PRO preview and Admin: local fillable PDF generator with 10 optional personal fields, generated as a Blob without network calls or a remote PDF service.
- New PRO closings: name/address form replaced with reference-only, and backend validates CL-XXXXXXXX before writing; addresses on new closing rows are stored as blank. PRO My Closings includes a PDF download for selected projects.
- Privacy Policy revised to describe the new workflow and unfinished legacy issues.

## Required release-blocking QA (not yet verified)
- Audit all remaining owner, preview and legacy workspaces for identifying data inputs and any background syncing.
- Inspect all historical D1 closing rows and create a user-approved, legally appropriate legacy data-remediation procedure. Do not mass-delete customer records without authorization.
- Review free-form task titles, notes, document names, events, and marketing/technical logs; user text can still include personal information. Decide on strict allow-listed fields or safe processing before offering a no-PII guarantee.
- Manually test PDF forms in Adobe Acrobat and macOS Preview: field focus, editing, saving, reopening, print, accents, pagination and multiple closings.
- Manually test FREE and authenticated PRO in desktop and mobile browsers for no JS exceptions, correct signed-contract dates, correct time zones and saved-task status.
- Verify account security and production Cloudflare D1 bindings; Stripe checkout remains Sandbox/test-only.
- Review privacy/terms/pricing with qualified US counsel and verify operator legal identity, retention/deletion procedures, notices and user rights.
- Verify Cloudflare production deployment and private-owner authentication with a signed-out/incognito browser.
- Update all marketing and external copy only after technical, operational and legal review.

## Regression rule
Never add name/address/price fields to the live FREE or PRO workflow for convenience. Any identity fields belong only in the private, locally completed PDF. Preserve Manrope, navy/gold palette, legibility, matching headers/footers and direct same-tab internal links.
