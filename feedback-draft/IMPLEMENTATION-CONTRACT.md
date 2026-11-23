# Feedback & Improvements — prototype contract
**Status:** isolated static preview, not integrated or published. The HTML copies a structured report to the user's clipboard; it does not transmit, persist, assign an ID, or notify Admin.
**Privacy:** no third-party personal information; no uploads in prototype. Simple pattern warning is not a substitute for server-side moderation and can miss sensitive details.
**Future production API:** authenticated or anti-abuse-protected POST /api/feedback; server-assigned opaque ID, UTC timestamp, type, category, page/step, sanitized description, optional expected result, state, priority. Rate limit, CSRF protection where applicable, access-controlled Admin-only retrieval, retention and deletion policy. Never expose reports to other users. No public testimonials without explicit opt-in.
**Admin states:** New, Reviewing, Planned, Testing, Resolved, Closed. Track separately fixed-in-test and released-to-production. Copy for ChatGPT exports a minimal anonymized report; review before pasting.
**Acceptance tests:** keyboard navigation, empty text, invalid input, copy failure, no network requests, no persistence, no third-party data; backend later must test permissions, duplicate handling, abuse, privacy, audit logs and deletion.
**Do not add to live navigation until backend, privacy copy, and tests are approved.**
