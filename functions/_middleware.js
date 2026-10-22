// Server-side password gate for the personal practice document.
// Set PERSONAL_PRACTICE_PASSWORD as an encrypted Pages secret in Cloudflare.
// No credentials are stored in this repository or in browser JavaScript.
const pathPattern = /^\/personal-sabatino(?:\.html|\/)?$/i;
const deny = (status, body) => new Response(body, {
  status,
  headers: {
    "Content-Type": "text/plain; charset=utf-8",
    "Cache-Control": "private, no-store",
    "X-Robots-Tag": "noindex, nofollow, noarchive, nosnippet",
    ...(status === 401 ? { "WWW-Authenticate": 'Basic realm="Personal Closing Practice", charset="UTF-8"' } : {})
  }
});
async function sameSecret(actual, supplied) {
  const encoder = new TextEncoder();
  const hashes = await Promise.all([actual, supplied].map(s => crypto.subtle.digest("SHA-256", encoder.encode(s))));
  const a = new Uint8Array(hashes[0]), b = new Uint8Array(hashes[1]);
  let difference = 0;
  for (let i = 0; i < a.length; i++) difference |= a[i] ^ b[i];
  return difference === 0;
}
export async function onRequest(context) {
  const path = new URL(context.request.url).pathname;
  if (!pathPattern.test(path)) return context.next();
  const secret = context.env.PERSONAL_PRACTICE_PASSWORD;
  if (typeof secret !== "string") {
    return deny(503, "Private page unavailable: password secret is missing from Production.");
  }
  if (secret.length < 12) {
    return deny(503, "Private page unavailable: password must contain at least 12 characters.");
  }
  const header = context.request.headers.get("Authorization") || "";
  if (!header.startsWith("Basic ")) return deny(401, "Authentication required.");
  let username, password;
  try {
    const decoded = atob(header.slice(6).trim());
    const position = decoded.indexOf(":");
    if (position < 0) return deny(401, "Invalid credentials.");
    username = decoded.slice(0, position);
    password = decoded.slice(position + 1);
  } catch {
    return deny(401, "Invalid credentials.");
  }
  if (username !== "sabatino" || !(await sameSecret(secret, password))) {
    return deny(401, "Invalid credentials.");
  }
  const response = await context.next();
  const headers = new Headers(response.headers);
  headers.set("Cache-Control", "private, no-store");
  headers.set("X-Robots-Tag", "noindex, nofollow, noarchive, nosnippet");
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}
