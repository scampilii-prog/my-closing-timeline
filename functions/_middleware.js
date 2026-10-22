// Personal practice authentication at the edge. Never place the secret in client code.
const protectedPath = /^\/personal-sabatino(?:\.html|\/)?$/i;
const encoder = new TextEncoder();
const common = {"Cache-Control":"private, no-store","X-Robots-Tag":"noindex, nofollow, noarchive, nosnippet","Referrer-Policy":"no-referrer","X-Content-Type-Options":"nosniff"};
const page = (body,status=200,extra={}) => new Response(body,{status,headers:{...common,"Content-Type":"text/html; charset=utf-8","Content-Security-Policy":"default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'",...extra}});
const safe = s => String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const login = (message="") => page(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex,nofollow"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Admin Console · Sign in</title><style>*{box-sizing:border-box}body{min-height:100vh;margin:0;background:#102b3f;color:#1b3c50;font:16px Arial,sans-serif;display:grid;place-items:center}.panel{background:#fffefb;border-top:5px solid #dbb777;border-radius:13px;padding:36px;width:min(440px,calc(100% - 30px));box-shadow:0 20px 50px #061b2960}h1{font-size:26px;margin:0 0 8px}.muted{color:#50687a;font-size:14px;line-height:1.5}label{display:block;margin:17px 0 6px;font-weight:700}input{width:100%;border:1px solid #a7b8c4;border-radius:7px;padding:12px;font-size:16px}button{width:100%;background:#133d52;color:white;border:0;border-radius:8px;font-size:16px;font-weight:700;padding:13px;margin-top:22px;cursor:pointer}.error{background:#fff0e8;color:#a13a25;padding:10px;border-radius:6px}a{color:#23546b}</style></head><body><main class="panel"><h1>Admin Console</h1><p class="muted">Private practice · My Closing Timeline</p>${message?'<p class="error" role="alert">'+safe(message)+'</p>':''}<form method="post" autocomplete="off"><input type="hidden" name="action" value="login"><label for="username">Username</label><input id="username" name="username" autocomplete="username" required><label for="password">Password</label><input id="password" name="password" type="password" autocomplete="current-password" required><button type="submit">Sign in</button></form><p class="muted">Access is restricted to the administrator. <a href="/">Return to Home</a></p></main></body></html>`);
const b64 = bytes => btoa(String.fromCharCode(...bytes)).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"");
const sign = async (secret,data) => {const k=await crypto.subtle.importKey("raw",encoder.encode(secret),{name:"HMAC",hash:"SHA-256"},false,["sign"]);return b64(new Uint8Array(await crypto.subtle.sign("HMAC",k,encoder.encode(data))))};
const equal = (a,b)=>{if(a.length!==b.length)return false;let x=0;for(let i=0;i<a.length;i++)x|=a.charCodeAt(i)^b.charCodeAt(i);return x===0};
const cookieName="mct_private_session";
const expiredCookie=cookieName+"=; Path=/personal-sabatino; Max-Age=0; HttpOnly; Secure; SameSite=Strict";
function cookieHeader(token){return cookieName+"="+token+"; Path=/; Max-Age=3600; HttpOnly; Secure; SameSite=Strict";}
const redirect=(to,cookie)=>new Response(null,{status:303,headers:{...common,Location:to,...(cookie?{"Set-Cookie":cookie}:{})}});
export async function onRequest(context){
 const req=context.request,url=new URL(req.url);
 if(!protectedPath.test(url.pathname))return context.next();
 const secret=context.env.PERSONAL_PRACTICE_PASSWORD;
 if(typeof secret!=="string"||secret.length<12)return page("<h1>Private access unavailable</h1><p>Configure the administrator password in Cloudflare Production (minimum 12 characters).</p>",503);
 const current=Date.now();
 const cookie=(req.headers.get("Cookie")||"").split(";").map(x=>x.trim()).find(x=>x.startsWith(cookieName+"="));
 const value=cookie?.slice(cookieName.length+1)||"";
 const parts=value.split(".");
 let authenticated=false;
 if(parts.length===2&&/^\d+$/.test(parts[0])) {
  const expiry=Number(parts[0]);
  if(expiry>current&&expiry<current+3600000+60000)authenticated=equal(parts[1],await sign(secret,parts[0]));
 }
 if(req.method==="POST"){
  const origin=req.headers.get("Origin");
  const originHost=(()=>{try{return new URL(origin).hostname.toLowerCase()}catch{return ""}})();
  const allowedOrigins=new Set(["myclosingtimeline.com","www.myclosingtimeline.com","my-closing-timeline.pages.dev"]);
  const requestHost=(req.headers.get("Host")||"").toLowerCase().split(":")[0];
  if(!originHost || !allowedOrigins.has(originHost) || (allowedOrigins.has(requestHost) && originHost!==requestHost))return page("<h1>Forbidden</h1><p>Open Admin Console in a fresh tab and sign in again.</p>",403);
  const type=req.headers.get("Content-Type")||"";
  if(!type.startsWith("application/x-www-form-urlencoded"))return page("<h1>Invalid request</h1>",415);
  const fields=await req.formData();
  if(fields.get("action")==="logout")return redirect("/personal-sabatino.html",cookieName+"=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Strict");
  const user=String(fields.get("username")||""),pass=String(fields.get("password")||"");
  if(user!=="sabatino"||!equal(await sign(secret,pass),await sign(secret,secret))) {
   return login("Incorrect username or password.");
  }
  const exp=String(current+3600000),token=exp+"."+await sign(secret,exp);
  return redirect("/personal-sabatino.html",cookieHeader(token));
 }
 if(req.method!=="GET"&&req.method!=="HEAD")return page("<h1>Method not allowed</h1>",405);
 if(!authenticated)return login();
 const response=await context.next(),headers=new Headers(response.headers);
 for(const [k,v] of Object.entries(common))headers.set(k,v);
 headers.set("Content-Security-Policy","frame-ancestors 'none'");
 return new Response(response.body,{status:response.status,statusText:response.statusText,headers});
}
