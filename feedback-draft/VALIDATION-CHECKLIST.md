# Feedback & Improvements — validation plan

**Status:** checklist only; no browser run or production integration has been completed.

## Customer prototype
- [ ] Type choices produce the correct exported type.
- [ ] All five areas and each step option appear and export correctly.
- [ ] Empty description is rejected.
- [ ] Description, reproduction steps and expected result export correctly; optional fields say "Not provided".
- [ ] Common email/phone/credential patterns trigger a warning, without claiming complete detection.
- [ ] Copy succeeds on a secure origin with clipboard permission.
- [ ] Copy fails gracefully on file:// or denied permission; read-only manual report appears, is focused and selected.
- [ ] Keyboard-only navigation and status announcements work.
- [ ] No network requests, persistent storage or user-data transmission occurs.

## Admin isolated demonstration
- [ ] Empty pasted report is rejected.
- [ ] P0–P3 and all review states export correctly.
- [ ] Changing any field invalidates the previously prepared report.
- [ ] Review output clearly marks unverified customer content and absence of a verified ticket.
- [ ] Copy succeeds, with manual selection fallback on failure.
- [ ] Clear all resets report, notes, priority, state and preview.
- [ ] Keyboard and screen-reader status updates work.
- [ ] No network requests or storage occurs.

## Before real integration
- [ ] Confirm admin authentication and server-enforced authorization for all reads/writes.
- [ ] Server-side validation, size limits, abuse controls and safe error messages.
- [ ] Minimize personal data; define retention, deletion and access audit.
- [ ] Verify opaque ticket IDs and immutable creation timestamps.
- [ ] Test duplicate submissions, concurrency and state transitions.
- [ ] Keep public reviews opt-in and distinct from private issue reports.
- [ ] Run regression tests on Real Estate 01/02/03 and all four categories.
- [ ] Obtain explicit authorization before modifying production.

**Important:** The HTML prototypes have not been browser-tested or connected. This list is not evidence that the checks have passed.
