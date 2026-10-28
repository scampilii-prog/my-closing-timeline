// My Closing Timeline — single private authentication gateway.
const protectedRoute=/^\/(?:personal-sabatino|realtor-private-test|owner-pro-workspace|admin-gift-codes|admin-invitations|private-pdf-demo)(?:\.html|\/)?$/i;
const enc=new TextEncoder(),cookieName="mct_owner_session_v2",lifetime=30*24*60*60*1000;
const baseHeaders={"Cache-Control":"private, no-store","X-Robots-Tag":"noindex, nofollow, noarchive, nosnippet","Referrer-Policy":"no-referrer","X-Content-Type-Options":"nosniff"};
const escapeHtml=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const page=(html,status=200,headers={})=>new Response(html,{status,headers:{...baseHeaders,"Content-Type":"text/html; charset=utf-8","Content-Security-Policy":"default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'",...headers}});
const b64=bytes=>btoa(String.fromCharCode(...bytes)).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"");
async function mac(secret,value){const key=await crypto.subtle.importKey("raw",enc.encode(secret),{name:"HMAC",hash:"SHA-256"},false,["sign"]);return b64(new Uint8Array(await crypto.subtle.sign("HMAC",key,enc.encode(value))))}
function equal(a,b){if(typeof a!=="string"||typeof b!=="string"||a.length!==b.length)return false;let diff=0;for(let i=0;i<a.length;i++)diff|=a.charCodeAt(i)^b.charCodeAt(i);return diff===0}
function cookieFor(token){return cookieName+"="+token+"; Path=/; Max-Age=2592000; HttpOnly; Secure; SameSite=Lax"}
const logoutCookie=()=>cookieName+"=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax";
function login(error="",csrf=""){return page(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Private Sign In · My Closing Timeline</title><style>*{box-sizing:border-box}body{margin:0;min-height:100vh;background:#10283e;display:grid;place-items:center;font:16px Manrope,Arial,sans-serif;color:#173b52;padding:16px}.panel{width:min(440px,100%);padding:32px;background:#fffdf8;border-top:5px solid #d5b578;border-radius:14px;box-shadow:0 17px 45px #061b2940}h1{margin:0 0 7px;font-size:27px}.muted{color:#637587;line-height:1.5;font-size:14px}label{display:block;margin:17px 0 5px;font-weight:800}input{width:100%;padding:12px;font-size:16px;border:1px solid #aabfc9;border-radius:7px}button{width:100%;padding:13px;margin-top:21px;background:#173b52;border:0;border-radius:8px;font:800 16px Arial;color:white;cursor:pointer}.error{background:#fff2eb;color:#8f2d26;padding:11px;border-radius:7px}</style></head><body><main class="panel"><h1>Private Sign In</h1><p class="muted">My Closing Timeline · Owner development access</p>${error?'<p class="error">'+escapeHtml(error)+'</p>':''}<form method="post"><input type="hidden" name="action" value="login"><input type="hidden" name="csrf" value="${escapeHtml(csrf)}"><label>Username<input name="username" autocomplete="username" required></label><label>Password<input name="password" type="password" autocomplete="current-password" required></label><button type="submit">Sign In · Remember 30 Days</button></form><p class="muted">Your session will stay valid up to 30 days unless you sign out or clear cookies.</p></main></body></html>`)}
const redirect=(destination,headers={})=>new Response(null,{status:303,headers:{...baseHeaders,Location:destination,...headers}});
export async function onRequest(context){
 const req=context.request,url=new URL(req.url);
 if((url.pathname==="/"||url.pathname==="/index.html")&&(req.method==="GET"||req.method==="HEAD")){
  // The owner can preview the actual Home using the existing signed 30-day
  // admin session. Anonymous visitors keep the original Coming Soon screen.
  const ownerSecret=context.env.PERSONAL_PRACTICE_PASSWORD;
  if(typeof ownerSecret==="string"&&ownerSecret.length>=12){
   const cookie=(req.headers.get("Cookie")||"").split(";").map(v=>v.trim()).find(v=>v.startsWith(cookieName+"="));
   const ownerToken=cookie?.slice(cookieName.length+1)||"";
   const signed=/^v2\.(\d+)\.([A-Za-z0-9_-]+)$/.exec(ownerToken);
   if(signed){
    const expires=Number(signed[1]);
    const current=Date.now();
    if(Number.isSafeInteger(expires)&&expires>current&&expires<=current+lifetime+60000&&
       equal(signed[2],await mac(ownerSecret,"v2."+signed[1]))){
     const response=await context.next();
     const headers=new Headers(response.headers);
     for(const [key,value] of Object.entries(baseHeaders))headers.set(key,value);
     headers.set("Content-Security-Policy","frame-ancestors 'none'");
     return new Response(response.body,{status:response.status,statusText:response.statusText,headers});
    }
   }
  }
  return page(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>My Closing Timeline — Coming Soon</title><style>*{box-sizing:border-box}body{background:#10283e;color:#f4f5f4;margin:0;min-height:100vh;display:grid;place-items:center;font-family:Arial,sans-serif;padding:24px}.panel{width:min(730px,100%);text-align:center;border:1px solid #caa96e;border-radius:18px;padding:clamp(32px,6vw,74px) 28px;background:#173b52;box-shadow:0 22px 70px #071a2a55}.brand{font-weight:800;font-size:clamp(24px,4vw,38px);color:#fff}.brand span{color:#73cdd0}.kicker{letter-spacing:.2em;font-size:12px;font-weight:800;color:#e8c17d;margin-top:32px}h1{font-size:clamp(34px,6vw,57px);margin:16px 0;color:#f4dfba}p{line-height:1.7;color:#dce9ee;font-size:clamp(15px,2vw,18px)}.line{height:2px;width:72px;background:#caa96e;margin:24px auto}.small{font-size:12px;color:#b9cbd5;margin-top:34px}</style></head><body><main class="panel"><div class="brand">MyClosing<span>Timeline</span>.com</div><div class="kicker">SOMETHING GREAT IS COMING</div><h1>Under Construction</h1><div class="line"></div><p>We're preparing a more organized way for real estate professionals to manage their closing timelines, deadlines, and follow-up tasks.</p><p>Our public launch is being prepared. No real payments are being accepted at this time.</p><p style="margin:19px 0 0"><a href="/pro-get-started.html?auth=login" style="display:inline-block;padding:12px 18px;background:#e8c990;color:#10283e;border-radius:8px;font-weight:800;text-decoration:none">Already invited? Open Your PRO Account</a></p><p style="font-size:13px">First time here? <a href="/first-closing-free.html" style="color:#f0d3a2;text-decoration:underline;font-weight:800">Request an invitation for your first PRO Closing FREE</a> (subject to eligibility and approval).<br>If you received a complimentary gift, use the personal redemption link in your invitation to activate it.</p><div class="small">© 2026 My Closing Timeline · All rights reserved</div></main></body></html>`);
 }


 if(/^\/workspace(?:\.html|\/)?$/i.test(url.pathname))return redirect("/personal-sabatino.html");
 if(!protectedRoute.test(url.pathname))return context.next();
 const secret=context.env.PERSONAL_PRACTICE_PASSWORD;
 if(typeof secret!=="string"||secret.length<12)return page("<h1>Private access unavailable</h1><p>Administrator password must be configured in Cloudflare Production.</p>",503);
 const now=Date.now();
 const cookies=(req.headers.get("Cookie")||"").split(";").map(s=>s.trim());
 const found=cookies.find(x=>x.startsWith(cookieName+"="));
 const token=found?found.substring(cookieName.length+1):"";
 const match=/^v2\.(\d+)\.([A-Za-z0-9_-]+)$/.exec(token);
 let authorized=false;
 if(match){const expires=Number(match[1]);if(Number.isSafeInteger(expires)&&expires>now&&expires<=now+lifetime+60000){authorized=equal(match[2],await mac(secret,"v2."+match[1]))}}
 if(req.method==="POST"){
  const type=req.headers.get("Content-Type")||"";
  if(!type.startsWith("application/x-www-form-urlencoded"))return page("<h1>Invalid form submission</h1>",415);
  const f=await req.formData();
  if(f.get("action")==="logout")return redirect("/",{"Set-Cookie":logoutCookie()});
  const csrf=String(f.get("csrf")||"");
  const pair=/^(\d+)\.([A-Za-z0-9_-]+)$/.exec(csrf);
  if(!pair||Math.abs(now-Number(pair[1]))>900000||!equal(pair[2],await mac(secret,"csrf:"+pair[1])))return login("Login page expired. Please sign in again.",String(now)+"."+await mac(secret,"csrf:"+now));
  const username=String(f.get("username")||""),password=String(f.get("password")||"");
  if(username!=="sabatino"||!equal(await mac(secret,password),await mac(secret,secret)))return login("Incorrect username or password.",String(now)+"."+await mac(secret,"csrf:"+now));
  const exp=String(now+lifetime),signed="v2."+exp+"."+await mac(secret,"v2."+exp);
  return redirect(url.pathname,{"Set-Cookie":cookieFor(signed)});
 }
 if(req.method!=="GET"&&req.method!=="HEAD")return page("<h1>Method not allowed</h1>",405);
 if(!authorized)return login("",String(now)+"."+await mac(secret,"csrf:"+now));
 const response=await context.next();const headers=new Headers(response.headers);
 for(const [key,value] of Object.entries(baseHeaders))headers.set(key,value);
 headers.set("Content-Security-Policy","frame-ancestors 'none'");
 return new Response(response.body,{status:response.status,statusText:response.statusText,headers});
}
