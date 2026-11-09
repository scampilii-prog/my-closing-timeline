# AGENTS.md — My Closing Timeline / Clean Build

These instructions apply to Codex and other agents working in this repository. Read them before any edit.

## Fixed working environment
- Repository: `scampilii-prog/my-closing-timeline`.
- Isolated rebuild branch: `clean-rebuild-20261103`.
- Website: `https://myclosingtimeline.com`; Cloudflare Workers and Pages are distinct deployment targets.
- Deployment configuration previously observed in Cloudflare UI: branch `clean-rebuild-20261103`, build command `None`, deploy command `cd clean-project && npx wrangler deploy`, root `/`. This is **reported configuration, not independently verified current state**.
- Use GitHub, Codex, and Cloudflare. Do not propose ChatGPT Work or paid plan upgrades as the default solution.
- Never request credentials in chat.

## Critical publishing discipline
- A GitHub commit is NOT proof of a Cloudflare deployment.
- A successful deployment is NOT proof that a particular URL is served.
- Before sharing a live link as working, fetch that exact public URL and verify HTTP success and an identifiable marker in the actual HTML.
- If unable to verify, state precisely what was saved, what was deployed (if known), and what remains unverified. Never invent a URL.
- Do not merge, overwrite, or deploy to production without explicit authorization.
- Inspect Wrangler configuration, asset directory, Worker routes, branch, and traffic allocation before fixing 404s.
- The file `clean-project/real-estate-pro-v6-clean.html` was committed to the rebuild branch but the suggested Worker URL returned HTTP 404. Do not assume the absence from `main` is the cause: the Worker was reportedly configured to deploy from the rebuild branch.
- Existing `clean-project/real-estate-pro-v6.html` was previously observed as a redirect to V5. Do not confuse it with `real-estate-pro-v6-clean.html`.

## Product and UI decisions
- Preserve the approved elegant compact Table 01, "Contract Tasks & Deadlines", with its selected checkboxes, task management, dates, status, notes, done/reopen, email and formatted table actions.
- Keep the header checkbox aligned with task checkboxes; sticky table header within scroll frame.
- Show effective/closing dates, days between, deadline counting, and linked Result 01 summary.
- Table Library for Table 01: save/load/delete, name, prepared for/role, role picker and custom role; avoid duplicate libraries or identically named conflicting tables.
- Follow-Up Table 02 and linked Result 02 are separate. Never replace an approved table with another similarly named table.
- Maintain six original contract tasks, date logic, and existing working functions.
- Keep layouts consistent; no duplicate controls or contradictory CSS/JS. Before editing, identify the single active source file and remove or reconcile conflicting instructions.
- Do not claim unimplemented buttons work. A prototype is not the approved final product.

## Change procedure
1. Read this file and inspect the exact current source, branch, and deploy configuration.
2. Record the desired behavior and the source file being edited.
3. Make a focused change without breaking approved features.
4. Test behavior and calculations; document gaps.
5. Verify actual deployed URL if publishing is requested.
6. Report what changed, exact commit/path, and what was **not** verified.

## Communication
- Reply concisely in Spanish.
- Do the authorized work without repeated "¿sigo?" requests.
- Do not claim success on the basis of code changes alone.
- Respect the user's limited budget; no unnecessary paid services.
