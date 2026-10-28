// Cloudflare Pages Functions · My Closing Timeline PRO API
// Requires D1 binding PRO_DB and the secrets documented in PRO_SETUP.md.
const E=new TextEncoder();
const now=()=>Math.floor(Date.now()/1000);
const random=(n=32)=>{const b=new Uint8Array(n);crypto.getRandomValues(b);return btoa(String.fromCharCode(...b)).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")};
const digest=async value=>Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256",E.encode(value)))).map(b=>b.toString(16).padStart(2,"0")).join("");
const safeEq=(a,b)=>{if(typeof a!=="string"||typeof b!=="string"||a.length!==b.length)return false;let d=0;for(let i=0;i<a.length;i++)d|=a.charCodeAt(i)^b.charCodeAt(i);return d===0};
const reply=(value,status=200,extra={})=>Response.json(value,{status,headers:{"Cache-Control":"private, no-store","X-Content-Type-Options":"nosniff","Referrer-Policy":"no-referrer",...extra}});
const error=(msg,status=400)=>reply({ok:false,error:msg},status);
const cookieName="mct_pro_session";
const sessionCookie=v=>cookieName+"="+v+"; Path=/; Secure; HttpOnly; SameSite=Lax; Max-Age=2592000";
const clearCookie=()=>cookieName+"=; Path=/; Secure; HttpOnly; SameSite=Lax; Max-Age=0";
const guid=()=>crypto.randomUUID();
const plans={single:{credits:1,amount:2990,launchAmount:1990,label:"1 Closing Credit"},pack2:{credits:2,amount:5980,launchAmount:3490,label:"2 Closing Credits"},pack5:{credits:5,amount:14950,launchAmount:8490,label:"5 Closing Credits"}};

// The same 40 suggested Step 3 follow-ups used in the private Realtor test.
// Dates are suggestions only, never contractual deadlines.
const suggestedFollowUps=[["Send client congratulations email",0,0],["Update brokerage transaction system to Pending",0,0],["Retrieve missing documents / signatures as required",0,0],["Confirm applicable property disclosures received",0,0],["Send transaction timeline email to client",0,0],["1st deposit — deliver or confirm earnest money receipt",1,0],["Review occupancy / leases and applicable notice period",2,0],["Confirm appraisal ordered by lender",2,0],["2nd deposit — deliver or confirm earnest money receipt",5,0],["Order survey",5,0],["Verify all title work is complete",20,0],["Confirm repair negotiations",20,0],["Send termite report to title and lender",20,0],["Verify appraisal has passed",20,0],["Lease information — obtain tenant estoppel letter",10,0],["Deliver or confirm lender clear to close",7,0],["Confirm closing time with title",7,0],["Send final walkthrough and closing email to client",7,0],["Purchase closing gift / thank-you card",7,0],["Verify condo association approval",5,0],["Title evidence and insurance",5,0],["Ensure no additional amendments are required",3,0],["Submit final documents to brokerage compliance",1,0],["Update brokerage transaction system to Closed",1,0],["Introduce buyer, seller, lender and settlement contacts",0,0],["Confirm all parties received executed agreement",0,0],["Confirm deposit receipt with escrow holder",2,0],["Schedule property inspections as applicable",3,0],["Follow up on inspection results and questions",7,0],["Coordinate agreed repair access and updates",10,0],["Confirm insurance application and coverage progress",10,0],["Check title or escrow outstanding requirements",14,1],["Follow up on appraisal appointment and access",14,1],["Review loan conditions with lender contact",10,1],["Confirm association documents or approval if applicable",10,1],["Check survey requirements with settlement team",10,1],["Confirm settlement statement review with parties",4,1],["Verify wire instructions independently by trusted phone number",3,1],["Schedule and coordinate final walkthrough",2,1],["Confirm funds, signing, keys and possession coordination",1,1]];
function suggestedDate(iso,offset){const d=new Date(iso+"T12:00:00Z");d.setUTCDate(d.getUTCDate()+offset);return d.toISOString().slice(0,10)}
const launch={code:"LAUNCH90",start:Date.UTC(2026,9,27),end:Date.UTC(2027,0,25)};
const launchActive=()=>Date.now()>=launch.start&&Date.now()<launch.end;
const launchValid=code=>launchActive()&&String(code||"").trim().toUpperCase()===launch.code;
const emailOK=s=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)&&s.length<=254;
const isoDate=s=>{if(!/^\d{4}-\d{2}-\d{2}$/.test(s||""))return false;const d=new Date(s+"T00:00:00Z");return !Number.isNaN(d.valueOf())&&d.toISOString().slice(0,10)===s};
// Workers production limits each PBKDF2 call to 100,000 iterations.
// Use three domain-separated chained calls and version the stored result.
// Never silently fall back to a single weak/legacy hashing pass.
async function pbkdf(password,salt){
 let material=E.encode(password);
 for(let round=1;round<=3;round++){
  const key=await crypto.subtle.importKey("raw",material,"PBKDF2",false,["deriveBits"]);
  material=new Uint8Array(await crypto.subtle.deriveBits({name:"PBKDF2",hash:"SHA-256",salt:E.encode("mct-pbkdf2-v2:"+round+":"+salt),iterations:100000},key,256));
 }
 return "v2:"+Array.from(material).map(x=>x.toString(16).padStart(2,"0")).join("");
}
async function permit(db,kind,value,max,windowSeconds){const key=await digest(kind+":"+value);const previous=await db.prepare("SELECT attempts,expires_at FROM auth_attempts WHERE rate_key=?").bind(key).first();if(previous&&previous.expires_at>now()&&previous.attempts>=max)return false;await db.prepare("INSERT INTO auth_attempts(rate_key,attempts,expires_at) VALUES(?,1,?) ON CONFLICT(rate_key) DO UPDATE SET attempts=CASE WHEN expires_at<=? THEN 1 ELSE attempts+1 END,expires_at=CASE WHEN expires_at<=? THEN excluded.expires_at ELSE expires_at END").bind(key,now()+windowSeconds,now(),now()).run();return true}
async function getAuth(req,db){const cookie=(req.headers.get("Cookie")||"").split(";").map(v=>v.trim()).find(v=>v.startsWith(cookieName+"="));if(!cookie)return null;const token=cookie.slice(cookieName.length+1);if(!/^[A-Za-z0-9_-]{40,60}$/.test(token))return null;return db.prepare("SELECT u.id,u.email,u.full_name,u.verified,u.credits FROM sessions s JOIN users u ON u.id=s.user_id WHERE s.token_hash=? AND s.expires_at>?").bind(await digest(token),now()).first()}
async function newSession(db,userId){const token=random();await db.prepare("INSERT INTO sessions(token_hash,user_id,expires_at) VALUES (?,?,?)").bind(await digest(token),userId,now()+2592000).run();return sessionCookie(token)}
async function parseBody(req,maxBytes=10000){if(!(req.headers.get("Content-Type")||"").startsWith("application/json"))throw Error("Expected JSON");if(Number(req.headers.get("Content-Length")||0)>maxBytes)throw Error("Request too large");return await req.json()}
function validOrigin(req){const origin=req.headers.get("Origin");return origin===new URL(req.url).origin}
const corporateSignature="<table role=\"presentation\" width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-top:1px solid #e0e8eb;margin-top:21px\"><tr><td align=\"center\" style=\"padding:18px 0 5px\"><a href=\"https://myclosingtimeline.com\" style=\"text-decoration:none\"><img src=\"https://myclosingtimeline.com/assets/myclosingtimeline-email-signature.png\" width=\"490\" alt=\"MyClosingTimeline.com — Closing deadlines, follow-ups, one clear timeline\" style=\"max-width:100%;width:490px;height:auto;display:block;border:0\" /></a></td></tr><tr><td align=\"center\" style=\"padding:3px 0 0\"><a href=\"https://myclosingtimeline.com\" style=\"color:#116c9d;font-weight:800;font-size:13px;text-decoration:underline\">myclosingtimeline.com</a></td></tr></table>";
async function sendVerification(env,email,link){
 const html='<div style="background:#f3f7f9;padding:28px 14px;font-family:Arial,Helvetica,sans-serif"><div style="background:white;border-radius:12px;padding:26px;max-width:600px;margin:auto;color:#1a3c52"><h1 style="font-size:24px;color:#153d53;margin:0 0 12px">Verify your email</h1><p style="font-size:15px;line-height:1.6;color:#516d7d">Thank you for joining My Closing Timeline. Confirm your email to activate your PRO account.</p><p style="padding:13px 0"><a href="'+link+'" style="display:inline-block;background:#146a7a;color:white;text-decoration:none;padding:13px 22px;border-radius:8px;font-weight:800">Verify My Email</a></p><p style="font-size:12px;color:#6d8490">If you did not create this account, please ignore this email.</p>'+corporateSignature+'</div></div>';
 const response=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:"Bearer "+env.RESEND_API_KEY,"Content-Type":"application/json"},body:JSON.stringify({from:"My Closing Timeline <"+env.MCT_FROM_EMAIL+">",to:[email],subject:"Verify your My Closing Timeline account",html,text:"Verify your My Closing Timeline account: "+link+"\n\nIf you did not request this, ignore this email.\n\nMyClosingTimeline.com"})});
 if(!response.ok)throw Error("Email provider rejected verification");
}
async function ownerAuthenticated(req,env){const pass=env.PERSONAL_PRACTICE_PASSWORD;if(typeof pass!=="string"||pass.length<12)return false;const v=(req.headers.get("Cookie")||"").split(";").map(s=>s.trim()).find(s=>s.startsWith("mct_owner_session_v2="));if(!v)return false;const m=/^v2\.(\d+)\.([A-Za-z0-9_-]+)$/.exec(v.split("=")[1]);if(!m||Number(m[1])<Date.now()||Number(m[1])>Date.now()+2592000000)return false;const key=await crypto.subtle.importKey("raw",E.encode(pass),{name:"HMAC",hash:"SHA-256"},false,["sign"]);const sig=new Uint8Array(await crypto.subtle.sign("HMAC",key,E.encode("v2."+m[1])));const b64=btoa(String.fromCharCode(...sig)).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"");return safeEq(b64,m[2])}
async function stripeRequest(env,data){const secret=env.STRIPE_SECRET_KEY;if(!secret||!secret.startsWith("sk_test_"))throw Error("Stripe Sandbox key has not been configured");const response=await fetch("https://api.stripe.com/v1/checkout/sessions",{method:"POST",headers:{Authorization:"Bearer "+secret,"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams(data)});const result=await response.json();if(!response.ok||!result.url||!result.id)throw Error("Stripe checkout could not be opened");return result}

/* User-owned, reusable form-name templates. Separate from the forms on each closing. */
async function mctReadFormTemplates(db,userId){
 await db.prepare("CREATE TABLE IF NOT EXISTS user_contract_form_templates (id TEXT PRIMARY KEY,user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,name TEXT NOT NULL COLLATE NOCASE,forms_json TEXT NOT NULL,is_default INTEGER NOT NULL DEFAULT 0 CHECK(is_default IN (0,1)),created_at TEXT NOT NULL DEFAULT (datetime('now')),updated_at TEXT NOT NULL DEFAULT (datetime('now')),UNIQUE(user_id,name))").run();
 await db.prepare("CREATE INDEX IF NOT EXISTS idx_form_templates_user ON user_contract_form_templates(user_id,updated_at)").run();
 let result=await db.prepare("SELECT id,name,forms_json,is_default,updated_at FROM user_contract_form_templates WHERE user_id=? ORDER BY is_default DESC,name COLLATE NOCASE ASC").bind(userId).all();
 // Import a legacy single-list library once, without exposing it to other accounts.
 if(!result.results.length){
  const hasOld=await db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='user_contract_form_library'").first();
  if(hasOld){
   const old=await db.prepare("SELECT forms_json FROM user_contract_form_library WHERE user_id=?").bind(userId).first();
   let legacy=[];try{const arr=JSON.parse(old?.forms_json||"[]");if(Array.isArray(arr))legacy=arr.filter(v=>typeof v==="string"&&v.trim())}catch(e){}
   if(legacy.length){
    await db.batch([
     db.prepare("INSERT INTO user_contract_form_templates(id,user_id,name,forms_json,is_default) VALUES(?,?,?,?,1)").bind(guid(),userId,"My Standard Forms",JSON.stringify(legacy)),
     db.prepare("DELETE FROM user_contract_form_library WHERE user_id=?").bind(userId)
    ]);
    result=await db.prepare("SELECT id,name,forms_json,is_default,updated_at FROM user_contract_form_templates WHERE user_id=? ORDER BY is_default DESC,name COLLATE NOCASE ASC").bind(userId).all();
   }
  }
 }
 return result.results.map(r=>{let forms=[];try{const parsed=JSON.parse(r.forms_json);if(Array.isArray(parsed))forms=parsed}catch(e){}return {id:r.id,name:r.name,forms,is_default:!!r.is_default,updated_at:r.updated_at}});
}

export async function onRequest(context){
 const {request:req,env}=context;const url=new URL(req.url),route=url.pathname.replace(/^\/api\/pro\/?/,"").replace(/\/$/,"");
 if(req.method==="GET"&&route==="health")return reply({ok:true,configured:{database:!!env.PRO_DB,checkoutSandbox:!!env.STRIPE_SECRET_KEY,webhook:!!env.STRIPE_WEBHOOK_SECRET,email:!!env.RESEND_API_KEY&&!!env.MCT_FROM_EMAIL}});
 if(!env.PRO_DB)return error("PRO service is being configured. No payment or registration has been started.",503);
 const db=env.PRO_DB;
 if(req.method==="GET"&&route==="pricing"){
  // D1 has its original fixed-price check constraint until migration 0002 is installed.
  // Do not enable Stripe checkout while D1 cannot persist the real amount paid.
  let catalogReady=false;
  try{
   const table=await db.prepare("SELECT sql FROM sqlite_master WHERE type='table' AND name='purchases'").first();
   const sql=String(table?.sql||"");
   catalogReady=[1990,3490,8490,2990,5980,14950].every(amount=>new RegExp("\\b"+amount+"\\b").test(sql));
  }catch(e){console.error("PRO pricing readiness check failed",{type:e?.name||"Error"})}
  return reply({ok:true,catalogReady,campaign:{code:launch.code,active:launchActive(),end:"2027-01-25",label:"Introductory launch offer"},plans:Object.fromEntries(Object.entries(plans).map(([id,p])=>[id,{credits:p.credits,regularAmount:p.amount,launchAmount:launchActive()?p.launchAmount:null}]))});
 }
 // Non-sensitive database readiness check (no account data is returned).
 if(req.method==="GET"&&route==="diagnostics"){
  const checks={
   accounts:"SELECT id,email,full_name,password_salt,password_hash,verified,credits FROM users LIMIT 0",
   verification:"SELECT token_hash,user_id,expires_at FROM email_verifications LIMIT 0",
   rateLimits:"SELECT rate_key,attempts,expires_at FROM auth_attempts LIMIT 0"
  };
  const result={};
  for(const [key,query] of Object.entries(checks)){
   try{await db.prepare(query).all();result[key]=true}
   catch(e){result[key]=false;console.error("PRO D1 readiness failed",{check:key,type:e?.name||"Unknown"})}
  }
  const ok=Object.values(result).every(Boolean);
  return reply({ok,databaseReady:ok,checks:result},ok?200:503);
 }
 let stage="request";
 try{
 if(req.method==="GET"&&route==="verify"){
  const token=url.searchParams.get("token")||"";if(token.length<32)return error("Invalid verification link");
  const hash=await digest(token);const match=await db.prepare("SELECT user_id FROM email_verifications WHERE token_hash=? AND expires_at>?").bind(hash,now()).first();
  if(!match)return error("Verification link is expired or has already been used",410);
  await db.batch([db.prepare("UPDATE users SET verified=1 WHERE id=?").bind(match.user_id),db.prepare("DELETE FROM email_verifications WHERE token_hash=?").bind(hash)]);
  return new Response(null,{status:303,headers:{Location:"/pro-get-started.html?verified=1","Set-Cookie":await newSession(db,match.user_id),"Cache-Control":"no-store"}});
 }
 if(req.method==="GET"&&route==="me"){
  const user=await getAuth(req,db);if(!user)return reply({authenticated:false});
  const items=await db.prepare("SELECT id,name,address,effective_date,closing_date,status,created_at FROM closings WHERE user_id=? ORDER BY created_at DESC LIMIT 200").bind(user.id).all();
  return reply({authenticated:true,user:{name:user.full_name,email:user.email,credits:user.credits},closings:items.results});
 }
 if(req.method==="GET"&&route==="admin/codes"){
  if(!await ownerAuthenticated(req,env))return error("Owner access required",403);
  // Show ONLY unused, enabled, unexpired gift codes. Retain all redeemed codes
  // in D1 so that none can ever be used again or randomly reissued.
  const rows=await db.prepare("SELECT id,credits,max_uses,uses,active,expires_at,restricted_email,created_at FROM promo_codes WHERE active=1 AND uses<max_uses AND (expires_at IS NULL OR expires_at>?) ORDER BY created_at DESC LIMIT 100").bind(now()).all();
  return reply({ok:true,codes:rows.results});
}
 if(req.method==="GET"&&route==="forms/templates"){
  const user=await getAuth(req,db);if(!user||!user.verified)return error("Sign in to your verified PRO account",401);
  return reply({ok:true,templates:await mctReadFormTemplates(db,user.id)});
 }
 if(req.method==="GET"&&route==="forms/library"){
  const user=await getAuth(req,db);if(!user||!user.verified)return error("Sign in to verified PRO account",401);
  await db.prepare("CREATE TABLE IF NOT EXISTS user_contract_form_library (user_id TEXT PRIMARY KEY, forms_json TEXT NOT NULL, updated_at TEXT NOT NULL DEFAULT (datetime('now')))").run();
  const saved=await db.prepare("SELECT forms_json,updated_at FROM user_contract_form_library WHERE user_id=?").bind(user.id).first();
  let forms=[];try{const parsed=JSON.parse(saved?.forms_json||"[]");if(Array.isArray(parsed))forms=parsed}catch(e){}
  return reply({ok:true,forms,updated_at:saved?.updated_at||null});
 }
 if(req.method!=="POST")return error("Not found",404);
 if(!validOrigin(req))return error("Request origin was not accepted",403);
 const body=await parseBody(req,(route==="forms/library"||route==="forms/templates")?200000:10000);
 if(route==="marketing/unsubscribe"){
  const address=String(body.email||"").trim().toLowerCase();
  if(!emailOK(address))return error("Enter a valid email address",400);
  if(!await permit(db,"marketing_optout",req.headers.get("CF-Connecting-IP")||"unknown",25,3600))return error("Too many attempts. Please try again later.",429);
  await db.prepare("CREATE TABLE IF NOT EXISTS marketing_optouts(email_hash TEXT PRIMARY KEY, created_at TEXT NOT NULL DEFAULT (datetime('now')))").run();
  await db.prepare("INSERT OR IGNORE INTO marketing_optouts(email_hash) VALUES(?)").bind(await digest(address)).run();
  return reply({ok:true,message:"Promotional email opt-out recorded."});
 }
 if(route==="forgot"){
  if(!env.RESEND_API_KEY||!env.MCT_FROM_EMAIL)return error("Password recovery email is not yet configured",503);
  const email=String(body.email||"").trim().toLowerCase();if(!emailOK(email))return error("Invalid email");
  if(!await permit(db,"forgot",req.headers.get("CF-Connecting-IP")||"unknown",5,3600))return error("Too many requests. Try again later.",429);
  const user=await db.prepare("SELECT id FROM users WHERE email=? AND verified=1").bind(email).first();
  if(user){const token=random();await db.prepare("INSERT INTO password_resets(token_hash,user_id,expires_at) VALUES(?,?,?)").bind(await digest(token),user.id,now()+1800).run();
   const link=url.origin+"/pro-get-started.html?reset="+encodeURIComponent(token);const response=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:"Bearer "+env.RESEND_API_KEY,"Content-Type":"application/json"},body:JSON.stringify({from:env.MCT_FROM_EMAIL,to:[email],subject:"Reset your My Closing Timeline password",html:'<div style="background:#f3f7f9;padding:28px 14px;font-family:Arial,Helvetica,sans-serif"><div style="background:white;border-radius:12px;padding:26px;max-width:600px;margin:auto;color:#1a3c52"><h1 style="font-size:23px;color:#153d53">Reset your password</h1><p>Use the secure link below to choose a new password:</p><p style="padding:12px 0"><a href="'+link+'" style="display:inline-block;background:#146a7a;color:white;text-decoration:none;padding:12px 20px;border-radius:8px;font-weight:800">Reset My Password</a></p><p style="font-size:12px;color:#607582">This link expires in 30 minutes. Ignore it if you did not request it.</p>'+corporateSignature+'</div></div>'})});if(!response.ok)return error("Recovery email is temporarily unavailable",503)}
  return reply({ok:true,message:"If the email belongs to an active account, recovery instructions were sent."});
 }
 if(route==="reset"){
  const token=String(body.token||""),password=String(body.password||"");
  if(token.length<32||password.length<12||password.length>128)return error("Invalid or expired reset request");
  const hash=await digest(token),row=await db.prepare("SELECT user_id FROM password_resets WHERE token_hash=? AND expires_at>?").bind(hash,now()).first();if(!row)return error("Reset link expired or was used",410);
  const salt=random(20),passHash=await pbkdf(password,salt);
  await db.batch([db.prepare("UPDATE users SET password_salt=?,password_hash=? WHERE id=?").bind(salt,passHash,row.user_id),db.prepare("DELETE FROM sessions WHERE user_id=?").bind(row.user_id),db.prepare("DELETE FROM password_resets WHERE user_id=?").bind(row.user_id)]);
  return reply({ok:true,message:"Password updated. Please sign in."},200,{"Set-Cookie":clearCookie()});
 }
 if(route==="logout"){
  const found=(req.headers.get("Cookie")||"").split(";").map(s=>s.trim()).find(s=>s.startsWith(cookieName+"="));
  if(found)await db.prepare("DELETE FROM sessions WHERE token_hash=?").bind(await digest(found.slice(cookieName.length+1))).run();
  return reply({ok:true},200,{"Set-Cookie":clearCookie()});
 }

 if(route==="register"){
  stage="R-CONFIG";
  if(!env.RESEND_API_KEY||!env.MCT_FROM_EMAIL)return error("Email verification is not yet configured",503);
  const name=String(body.name||"").trim().slice(0,120),email=String(body.email||"").trim().toLowerCase(),password=String(body.password||"");
  if(name.length<2||!emailOK(email)||password.length<12||password.length>128)return error("Enter your name, valid email and a password of at least 12 characters");
  stage="R-LIMIT";if(!await permit(db,"register",req.headers.get("CF-Connecting-IP")||"unknown",20,900))return error("Too many registration attempts. Try again later.",429);stage="R-LOOKUP";const existing=await db.prepare("SELECT id FROM users WHERE email=?").bind(email).first();if(existing)return error("This email already has an account. Please sign in.",409);
  stage="R-HASH";const id=guid(),salt=random(20),hash=await pbkdf(password,salt),token=random(32);
  stage="R-INSERT";await db.batch([db.prepare("INSERT INTO users(id,email,full_name,password_salt,password_hash) VALUES(?,?,?,?,?)").bind(id,email,name,salt,hash),db.prepare("INSERT INTO email_verifications(token_hash,user_id,expires_at) VALUES(?,?,?)").bind(await digest(token),id,now()+86400)]);
  stage="R-EMAIL";try{await sendVerification(env,email,url.origin+"/api/pro/verify?token="+encodeURIComponent(token))}
  catch(_){await db.batch([db.prepare("DELETE FROM email_verifications WHERE user_id=?").bind(id),db.prepare("DELETE FROM users WHERE id=? AND verified=0").bind(id)]);return error("Could not send verification email. Try again later.",503)}
  return reply({ok:true,message:"Check your email for a verification link."},201);
 }
 if(route==="login"){
  const email=String(body.email||"").trim().toLowerCase(),password=String(body.password||"");if(!emailOK(email)||password.length>128)return error("Invalid credentials",401);if(!await permit(db,"login",email,8,900))return error("Too many sign-in attempts. Try again later.",429);
  const row=await db.prepare("SELECT id,password_salt,password_hash,verified FROM users WHERE email=?").bind(email).first();
  if(!row)return error("Invalid credentials",401);
  if(!String(row.password_hash||"").startsWith("v2:"))return error("Please reset your password to finish the security update.",403);
  if(!safeEq(await pbkdf(password,row.password_salt),row.password_hash))return error("Invalid credentials",401);
  if(!row.verified)return error("Verify your email before signing in",403);
  return reply({ok:true},200,{"Set-Cookie":await newSession(db,row.id)});
 }
 if(route==="admin/codes/disable"){if(!await ownerAuthenticated(req,env))return error("Owner access required",403);const id=String(body.id||"");if(!/^[0-9a-f-]{36}$/.test(id))return error("Invalid code ID");await db.prepare("UPDATE promo_codes SET active=0 WHERE id=?").bind(id).run();return reply({ok:true})}
 if(route==="admin/gift/send"){
  if(!await ownerAuthenticated(req,env))return error("Owner access required",403);
  if(!env.RESEND_API_KEY||!env.MCT_FROM_EMAIL)return error("Branded email delivery is not configured",503);
  const recipient=String(body.email||"").trim().toLowerCase(),code=String(body.code||"").trim().toUpperCase();
  if(!emailOK(recipient)||!/^MCT-[A-Z0-9_-]{12,60}$/.test(code))return error("Enter the recipient email and a valid private gift code");
  await db.prepare("CREATE TABLE IF NOT EXISTS marketing_optouts(email_hash TEXT PRIMARY KEY, created_at TEXT NOT NULL DEFAULT (datetime('now')))").run();
  if(await db.prepare("SELECT 1 FROM marketing_optouts WHERE email_hash=?").bind(await digest(recipient)).first())return error("This recipient has unsubscribed from promotional emails. Do not send another gift invitation.",409);
  const record=await db.prepare("SELECT id,restricted_email FROM promo_codes WHERE code_hash=? AND active=1 AND credits=1 AND max_uses=1 AND uses=0 AND (expires_at IS NULL OR expires_at>?)").bind(await digest(code),now()).first();
  if(!record)return error("This gift code is unavailable, already used, or expired",409);
  if(record.restricted_email&&record.restricted_email!==recipient)return error("This gift code is restricted to a different recipient email",403);
  if(!await permit(db,"owner_gift_send","owner",20,3600))return error("Too many invitations sent. Try again later.",429);
  const htmlTemplate="<!doctype html><html lang=\"en\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"></head><body style=\"margin:0;background:#f1f5f7;font-family:Arial,Helvetica,sans-serif;color:#183b52\"><div style=\"display:none;max-height:0;overflow:hidden\">A personal invitation for 1 free My Closing Timeline PRO Closing Credit. No payment required.</div><table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"background:#f1f5f7\"><tr><td align=\"center\" style=\"padding:32px 14px\"><table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"max-width:600px;background:#ffffff;border:1px solid #dce5e8;border-radius:14px;overflow:hidden\"><tr><td align=\"center\" style=\"background:#10283e;padding:12px 17px;border-bottom:3px solid #c9a56c\"><a href=\"https://myclosingtimeline.com\" style=\"text-decoration:none;color:#ffffff\"><img src=\"https://myclosingtimeline.com/assets/myclosingtimeline-header-logo.png\" width=\"490\" height=\"78\" alt=\"MyClosingTimeline.com\" style=\"display:block;width:490px;max-width:100%;height:auto;border:0;outline:none;text-decoration:none\"></a></td></tr><tr><td style=\"padding:30px 29px 24px\"><p style=\"margin:0 0 11px;font-size:11px;letter-spacing:2px;color:#a17437;font-weight:800\">A PERSONAL INVITATION</p><h1 style=\"margin:0 0 14px;color:#163e56;font-size:28px;line-height:1.24\">A complimentary PRO Closing Credit, just for you.</h1><p style=\"font-size:15px;line-height:1.7;color:#466577;margin:0 0 19px\">Hello,</p><p style=\"font-size:15px;line-height:1.75;color:#466577;margin:0 0 17px\">I'd love to invite you to experience <strong style=\"color:#143950\">My Closing Timeline PRO</strong>. Your invitation includes <strong style=\"color:#157359\">1 FREE Closing Credit</strong> to organize a real estate closing, track priorities, and keep important deadlines in one place.</p><div style=\"background:#f0faf5;border:1px solid #b6d7c7;padding:16px 20px;border-radius:10px;margin:18px 0;text-align:center\"><p style=\"margin:0 0 6px;color:#207058;font-size:11px;letter-spacing:1.2px;font-weight:800\">YOUR PRIVATE GIFT CODE</p><p style=\"margin:0;color:#124d40;font-size:20px;line-height:1.45;font-weight:800;word-break:break-word;letter-spacing:.02em\">{CODE}</p><p style=\"margin:7px 0 0;color:#59766d;font-size:12px\">Valid for 1 PRO Closing Credit · Single use</p></div><table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\"><tr><td align=\"center\" style=\"padding:7px 0 17px\"><a href=\"https://myclosingtimeline.com/pro-get-started.html#gift={CODE}\" style=\"display:inline-block;padding:15px 22px;background:#126c7b;border-radius:8px;color:#ffffff;text-decoration:none;font-size:15px;font-weight:800\">Redeem Your Free Closing Credit</a></td></tr></table><p style=\"font-size:13px;line-height:1.7;color:#597180;margin:0 0 17px;text-align:center\">No credit card or payment is required.</p><h2 style=\"margin:16px 0 10px;color:#163e56;font-size:18px\">How to redeem your invitation</h2><p style=\"font-size:14px;line-height:1.75;color:#466577;margin:0 0 9px\"><strong style=\"color:#a77936\">01.</strong> Click <a href=\"https://myclosingtimeline.com/pro-get-started.html#gift={CODE}\" style=\"color:#116ea0;font-weight:800;text-decoration:underline\">Redeem Your Free Closing Credit</a>.</p><p style=\"font-size:14px;line-height:1.75;color:#466577;margin:0 0 9px\"><strong style=\"color:#a77936\">02.</strong> Create a free account and verify your email, or sign in to your existing account.{RESTRICTED}</p><p style=\"font-size:14px;line-height:1.75;color:#466577;margin:0 0 9px\"><strong style=\"color:#a77936\">03.</strong> Your private code is included automatically. Once you verify your email and sign in, <strong>your FREE credit will be saved to your PRO account</strong>.</p><p style=\"font-size:14px;line-height:1.75;color:#466577;margin:0 0 18px\"><strong style=\"color:#a77936\">04.</strong> Open <a href=\"https://myclosingtimeline.com/my-closings.html\" style=\"color:#116ea0;font-weight:800;text-decoration:underline\">My PRO Workspace</a> and start your first closing.</p><div style=\"color:#466577;font-size:14px;line-height:1.6\">Enjoy your complimentary access!</div><table role=\"presentation\" width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-top:1px solid #e0e8eb;margin-top:21px\"><tr><td align=\"center\" style=\"padding:18px 0 5px\"><a href=\"https://myclosingtimeline.com\" style=\"text-decoration:none\"><img src=\"https://myclosingtimeline.com/assets/myclosingtimeline-email-signature.png\" width=\"490\" alt=\"MyClosingTimeline.com — Closing deadlines, follow-ups, one clear timeline\" style=\"max-width:100%;width:490px;height:auto;display:block;border:0\" /></a></td></tr><tr><td align=\"center\" style=\"padding:3px 0 0\"><a href=\"https://myclosingtimeline.com\" style=\"color:#116c9d;font-weight:800;font-size:13px;text-decoration:underline\">myclosingtimeline.com</a></td></tr></table></td></tr><tr><td style=\"background:#f6f9fa;padding:18px 25px;text-align:center;border-top:1px solid #e2e9ec;color:#778b96;font-size:11px;line-height:1.7\">My Closing Timeline · One-time private gift invitation.<br>Unsubscribe from future promotional emails: <a href=\"https://myclosingtimeline.com/unsubscribe.html\" style=\"color:#116ea0;font-weight:800;text-decoration:underline\">Unsubscribe</a> &nbsp;·&nbsp; <a href=\"https://myclosingtimeline.com/privacy.html\" style=\"color:#116ea0;text-decoration:underline\">Privacy &amp; Terms</a> &nbsp;·&nbsp; <a href=\"https://myclosingtimeline.com/contact.html\" style=\"color:#116ea0;text-decoration:underline\">Help &amp; Contact</a><br>Sent by My Closing Timeline · myclosingtimeline.com · No purchase required.<br>If this invitation is unexpected, you may ignore it.</td></tr></table></td></tr></table></body></html>";
  const textTemplate="Hello,\n\nI'd like to give you one complimentary PRO Closing Credit to try My Closing Timeline.\n\nYOUR PRIVATE GIFT CODE: {CODE}\n\nRedeem your gift here:\nhttps://myclosingtimeline.com/pro-get-started.html#gift={CODE}\n\n1. Open the redeem link above; your private code is automatically included.\n2. Create your free account and verify your email (or sign in).{RESTRICTED_PLAIN}\n3. Your FREE Closing Credit is automatically added after account verification.\n4. Open My PRO Workspace: https://myclosingtimeline.com/my-closings.html\n\nYour invitation is valid for one Closing Credit only. No credit card or payment is required.\n\nBest regards,\nMy Closing Timeline\n\nUnsubscribe from promotions: https://myclosingtimeline.com/unsubscribe.html\nPrivacy & Terms: https://myclosingtimeline.com/privacy.html\nHelp & Contact: https://myclosingtimeline.com/contact.html";
  const escapedCode=code.replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","\u0027":"&#39;"}[ch]||""));
  const escapedEmail=recipient.replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","\u0027":"&#39;"}[ch]||""));
  const htmlBody=htmlTemplate.replaceAll("{CODE}",escapedCode).replace("{RESTRICTED}",record.restricted_email?" <span style=\"color:#526b78\">(Use the invited email: <strong>"+escapedEmail+"</strong>.)</span>":"");
  const textBody=textTemplate.replaceAll("{CODE}",code).replace("{RESTRICTED_PLAIN}",record.restricted_email?" Use the invited email: "+recipient+".":"");
  const response=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:"Bearer "+env.RESEND_API_KEY,"Content-Type":"application/json"},body:JSON.stringify({from:"My Closing Timeline <"+env.MCT_FROM_EMAIL+">",to:[recipient],subject:"A Gift for You | 1 FREE My Closing Timeline PRO Closing Credit",html:htmlBody,text:textBody})});
  if(!response.ok){console.error("PRO gift invitation provider rejected request",{status:response.status});return error("The email service could not send your invitation. Please check the recipient and try again.",503)}
  return reply({ok:true,message:"Branded invitation submitted to email service",recipient});
 }
 if(route==="admin/code"){
  if(!await ownerAuthenticated(req,env))return error("Owner access required",403);
  // Every private invitation grants exactly ONE closing credit to ONE redemption.
  const email=String(body.email||"").trim().toLowerCase();
  const expiryString=String(body.expires_at||"").trim();
  const expiryMillis=expiryString?Date.parse(/^\d{4}-\d{2}-\d{2}$/.test(expiryString)?expiryString+"T23:59:59Z":expiryString):NaN;
  if(email&&!emailOK(email)||expiryString&&(!Number.isFinite(expiryMillis)||expiryMillis<=Date.now()))return error("Enter a valid recipient email or a future expiration date");
  if(!await permit(db,"admin_one_credit_gift","owner",60,3600))return error("Gift generator usage limit reached. Try later.",429);
  const code="MCT-"+random(18).toUpperCase();
  await db.prepare("INSERT INTO promo_codes(id,code_hash,credits,max_uses,expires_at,restricted_email) VALUES(?,?,?,?,?,?)").bind(guid(),await digest(code),1,1,Number.isFinite(expiryMillis)?Math.floor(expiryMillis/1000):null,email||null).run();
  return reply({ok:true,code,credits:1,max_uses:1,notice:"This gift is valid for one free PRO closing only. Copy the private code now; it is not retrievable later."},201);
 }
 const user=await getAuth(req,db);if(!user||!user.verified)return error("Sign in to your verified account first",401);
 if(route==="forms/templates"){
  const templates=await mctReadFormTemplates(db,user.id);
  const action=String(body.action||"");
  const id=String(body.id||"").trim();
  if(action==="save"){
   const name=String(body.name||"").replace(/\s+/g," ").trim();
   if(!name||name.length>100)return error("Template name must be between 1 and 100 characters");
   if(!Array.isArray(body.forms))return error("Provide document names for the template");
   let total=0;const forms=[],seen=new Set();
   for(const item of body.forms){
    if(typeof item!=="string")return error("Invalid document name");
    const label=item.replace(/\s+/g," ").trim();
    if(!label||label.length>160)return error("Document names must be between 1 and 160 characters");
    const key=label.toLocaleLowerCase("en");if(seen.has(key))continue;
    seen.add(key);forms.push(label);total+=label.length;
    if(total>100000)return error("This template exceeds the maximum request size");
   }
   const target=id?templates.find(t=>t.id===id):null;
   if(id&&!target)return error("Template not found in this account",404);
   if(templates.some(t=>t.id!==id&&t.name.toLocaleLowerCase("en")===name.toLocaleLowerCase("en")))return error("You already have a template with this name",409);
   const makeDefault=!templates.length||!!body.make_default;
   if(makeDefault)await db.prepare("UPDATE user_contract_form_templates SET is_default=0 WHERE user_id=?").bind(user.id).run();
   if(target){
    await db.prepare("UPDATE user_contract_form_templates SET name=?,forms_json=?,is_default=?,updated_at=datetime('now') WHERE user_id=? AND id=?")
     .bind(name,JSON.stringify(forms),makeDefault?1:(target.is_default?1:0),user.id,id).run();
   }else{
    await db.prepare("INSERT INTO user_contract_form_templates(id,user_id,name,forms_json,is_default) VALUES(?,?,?,?,?)")
     .bind(guid(),user.id,name,JSON.stringify(forms),makeDefault?1:0).run();
   }
  }else if(action==="delete"){
   const target=templates.find(t=>t.id===id);if(!target)return error("Template not found in this account",404);
   await db.prepare("DELETE FROM user_contract_form_templates WHERE user_id=? AND id=?").bind(user.id,id).run();
   if(target.is_default){
    const next=await db.prepare("SELECT id FROM user_contract_form_templates WHERE user_id=? ORDER BY name COLLATE NOCASE LIMIT 1").bind(user.id).first();
    if(next)await db.prepare("UPDATE user_contract_form_templates SET is_default=1 WHERE user_id=? AND id=?").bind(user.id,next.id).run();
   }
  }else if(action==="set_default"){
   if(!templates.some(t=>t.id===id))return error("Template not found in this account",404);
   await db.batch([
    db.prepare("UPDATE user_contract_form_templates SET is_default=0 WHERE user_id=?").bind(user.id),
    db.prepare("UPDATE user_contract_form_templates SET is_default=1 WHERE user_id=? AND id=?").bind(user.id,id)
   ]);
  }else return error("Invalid template operation");
  return reply({ok:true,templates:await mctReadFormTemplates(db,user.id)});
 }
 if(route==="forms/library"){
  if(!Array.isArray(body.forms)||body.forms.length>1000)return error("Invalid forms library");
  const names=[],seen=new Set();let total=0;
  for(const raw of body.forms){
   if(typeof raw!=="string")return error("Invalid document name");
   const name=raw.replace(/\s+/g," ").trim();
   if(!name||name.length>160)return error("Document names must be between 1 and 160 characters");
   const key=name.toLocaleLowerCase("en");if(seen.has(key))continue;
   seen.add(key);names.push(name);total+=name.length;if(total>100000)return error("Forms library is too large");
  }
  await db.prepare("CREATE TABLE IF NOT EXISTS user_contract_form_library (user_id TEXT PRIMARY KEY, forms_json TEXT NOT NULL, updated_at TEXT NOT NULL DEFAULT (datetime('now')))").run();
  await db.prepare("INSERT INTO user_contract_form_library(user_id,forms_json,updated_at) VALUES(?,?,datetime('now')) ON CONFLICT(user_id) DO UPDATE SET forms_json=excluded.forms_json,updated_at=datetime('now')").bind(user.id,JSON.stringify(names)).run();
  return reply({ok:true,count:names.length});
 }
 if(route==="promo/check"||route==="promo/redeem"){
  const code=String(body.code||"").trim().toUpperCase();if(code===launch.code)return error("LAUNCH90 is a purchase discount, not a free closing credit. Apply it at checkout.");if(!await permit(db,"promo",user.id,30,3600))return error("Too many code attempts. Please try again later.",429);
  if(code.length<12||code.length>64)return error("Invalid promotional code");
  const row=await db.prepare("SELECT id,credits,restricted_email FROM promo_codes WHERE code_hash=? AND active=1 AND uses<max_uses AND (expires_at IS NULL OR expires_at>?)").bind(await digest(code),now()).first();
  if(!row)return error("This private gift code has expired, has already been redeemed or is not available. Please contact the sender for a new invitation.",404);
  if(row.restricted_email&&row.restricted_email!==user.email)return error("This private gift is restricted to a different email address. Sign out and register or sign in with the email that received the invitation.",403);
  if(route==="promo/check")return reply({ok:true,credits:row.credits,total:0});
  const id=guid();const q=[
   db.prepare("INSERT INTO promo_redemptions(id,code_id,user_id) SELECT ?,id,? FROM promo_codes WHERE id=? AND active=1 AND uses<max_uses AND (expires_at IS NULL OR expires_at>?) AND NOT EXISTS(SELECT 1 FROM promo_redemptions WHERE code_id=? AND user_id=?)").bind(id,user.id,row.id,now(),row.id,user.id),
   db.prepare("UPDATE promo_codes SET uses=uses+1 WHERE id=? AND EXISTS(SELECT 1 FROM promo_redemptions WHERE id=?)").bind(row.id,id),
   db.prepare("UPDATE users SET credits=credits+? WHERE id=? AND EXISTS(SELECT 1 FROM promo_redemptions WHERE id=?)").bind(row.credits,user.id,id)
  ];
  const res=await db.batch(q);if(!res[0]?.meta?.changes)return error("This code has already been used by your account or is unavailable",409);
  return reply({ok:true,credits_added:row.credits});
 }
 if(route==="checkout"){
  const purchaseTable=await db.prepare("SELECT sql FROM sqlite_master WHERE type='table' AND name='purchases'").first();
  const purchaseSchema=String(purchaseTable?.sql||"");
  if(![1990,3490,8490,2990,5980,14950].every(value=>new RegExp("\\b"+value+"\\b").test(purchaseSchema)))return error("PRO purchase pricing upgrade is pending. No payment was taken.",503);
  const plan=plans[String(body.plan||"")];if(!plan)return error("Choose a valid closing credit plan");
  const promotional=launchValid(body.code),amount=promotional?plan.launchAmount:plan.amount;
  const order=guid();await db.prepare("INSERT INTO purchases(id,user_id,plan_id,credit_quantity,amount_cents) VALUES(?,?,?,?,?)").bind(order,user.id,body.plan,plan.credits,amount).run();
  let result;try{result=await stripeRequest(env,{"mode":"payment","line_items[0][price_data][currency]":"usd","line_items[0][price_data][unit_amount]":String(amount),"line_items[0][price_data][product_data][name]":plan.label,"line_items[0][quantity]":"1","client_reference_id":user.id,"customer_email":user.email,"metadata[order_id]":order,"metadata[plan_id]":body.plan,"metadata[launch]":promotional?"LAUNCH90":"none","success_url":url.origin+"/my-closings.html?checkout=complete","cancel_url":url.origin+"/pro-get-started.html?checkout=cancelled"})}catch(_){await db.prepare("DELETE FROM purchases WHERE id=? AND status='pending'").bind(order).run();return error("Checkout is not available yet. No payment was taken.",503)}
  await db.prepare("UPDATE purchases SET checkout_session_id=? WHERE id=?").bind(result.id,order).run();
  return reply({ok:true,checkout_url:result.url});
 }
 if(route==="closings/create"){
  const name=String(body.name||"").trim().slice(0,120),address=String(body.address||"").trim().slice(0,250),eff=String(body.effective_date||""),end=String(body.closing_date||"");
  if(!name||!isoDate(eff)||!isoDate(end)||end<eff)return error("Enter a transaction name and valid contract dates");
  const id=guid();
  // The batch is atomic: no task is added and no credit is consumed if the
  // closing cannot be registered. Existing closings remain untouched.
  const statements=[
   db.prepare("INSERT INTO closings(id,user_id,name,address,effective_date,closing_date) SELECT ?,id,?,?,?,? FROM users WHERE id=? AND credits>0").bind(id,name,address,eff,end,user.id),
   db.prepare("UPDATE users SET credits=credits-1 WHERE id=? AND EXISTS(SELECT 1 FROM closings WHERE id=? AND user_id=?)").bind(user.id,id,user.id)
  ];
  for(const [title,days,closingBased] of suggestedFollowUps){
   const proposed=suggestedDate(closingBased?end:eff,closingBased?-days:days);
   statements.push(db.prepare("INSERT INTO follow_tasks(id,closing_id,user_id,title,due_date,auto_shift) SELECT ?,id,user_id,?,?,? FROM closings WHERE id=? AND user_id=?").bind(guid(),title,proposed,closingBased,id,user.id));
  }
  const res=await db.batch(statements);
  if(!res[0]?.meta?.changes)return error("No closing credits available. Purchase or redeem a credit first.",402);
  return reply({ok:true,id},201);
 }
 const match=/^closings\/([0-9a-f-]{36})\/(details|change-date|cancel|complete|tasks\/add|tasks\/update)$/.exec(route);
 if(match){
  const id=match[1],act=match[2],closing=await db.prepare("SELECT * FROM closings WHERE id=? AND user_id=?").bind(id,user.id).first();
  if(!closing)return error("Closing not found",404);
  if(act==="details"){const tasks=await db.prepare("SELECT id,title,due_date,status,auto_shift FROM follow_tasks WHERE closing_id=? AND user_id=? ORDER BY due_date ASC").bind(id,user.id).all();return reply({ok:true,closing,tasks:tasks.results})}
  if(closing.status!=="in_progress")return error("Archived transactions cannot be changed",409);
  if(act==="change-date"){
   const value=String(body.date||""),reason=String(body.reason||"").trim().slice(0,400);
   if(!isoDate(value)||value<closing.effective_date||reason.length<3)return error("Provide the revised closing date and written reason");
   const delta=Math.round((Date.parse(value)-Date.parse(closing.closing_date))/86400000);
   await db.batch([
    db.prepare("UPDATE closings SET closing_date=?,updated_at=datetime('now') WHERE id=? AND user_id=? AND status='in_progress'").bind(value,id,user.id),
    db.prepare("UPDATE follow_tasks SET due_date=date(due_date,?||' days') WHERE closing_id=? AND auto_shift=1 AND due_date>=date('now') AND status='pending'").bind(String(delta),id),
    db.prepare("INSERT INTO closing_events(id,closing_id,user_id,event_type,details) VALUES(?,?,?,?,?)").bind(guid(),id,user.id,"closing_date_changed",JSON.stringify({from:closing.closing_date,to:value,reason}))
   ]);
   return reply({ok:true});
  }
  if(act==="cancel"||act==="complete"){
   const value=String(body.date||"");
   if(!isoDate(value))return error("Enter the actual date");
   if(act==="cancel"){
    const reason=String(body.reason||"").trim().slice(0,400);if(reason.length<3||body.confirm!==true)return error("Written reason and explicit confirmation required");
    await db.batch([db.prepare("UPDATE closings SET status='cancelled',cancelled_on=?,cancel_reason=?,updated_at=datetime('now') WHERE id=? AND user_id=?").bind(value,reason,id,user.id),db.prepare("INSERT INTO closing_events(id,closing_id,user_id,event_type,details) VALUES(?,?,?,?,?)").bind(guid(),id,user.id,"cancelled",JSON.stringify({date:value,reason}))]);
   }else{
    if(body.confirm!==true)return error("Confirm that closing was completed");
    await db.batch([db.prepare("UPDATE closings SET status='completed',completed_on=?,updated_at=datetime('now') WHERE id=? AND user_id=?").bind(value,id,user.id),db.prepare("INSERT INTO closing_events(id,closing_id,user_id,event_type,details) VALUES(?,?,?,?,?)").bind(guid(),id,user.id,"completed",JSON.stringify({date:value}))]);
   }
   return reply({ok:true});
  }
  if(act==="tasks/add"){
   const title=String(body.title||"").trim().slice(0,150),date=String(body.date||"");
   if(!title||!isoDate(date)||date<new Date().toISOString().slice(0,10))return error("Enter a task with a current or future due date");
   await db.prepare("INSERT INTO follow_tasks(id,closing_id,user_id,title,due_date,auto_shift) VALUES(?,?,?,?,?,?)").bind(guid(),id,user.id,title,date,body.relative===true?1:0).run();return reply({ok:true},201);
  }
  if(act==="tasks/update"){
   const task=await db.prepare("SELECT * FROM follow_tasks WHERE id=? AND closing_id=? AND user_id=?").bind(body.task_id,id,user.id).first();
   if(!task)return error("Task not found",404);
   if(task.due_date<new Date().toISOString().slice(0,10))return error("Expired tasks are locked",409);
   const title=String(body.title||task.title).trim().slice(0,150),date=String(body.date||task.due_date),status=body.done===true?"done":body.done===false?"pending":task.status;
   if(!title||!isoDate(date)||date<new Date().toISOString().slice(0,10))return error("Invalid task or past due date");
   await db.prepare("UPDATE follow_tasks SET title=?,due_date=?,status=? WHERE id=? AND user_id=?").bind(title,date,status,task.id,user.id).run();return reply({ok:true});
  }
 }
 return error("Not found",404);
 }catch(e){const message=e instanceof Error?e.message:String(e);console.error("MyClosingTimeline PRO request failed",{route,stage,errorType:e?.name||"Unknown",detail:message.slice(0,350)});if(message.includes("UNIQUE constraint"))return error("Already exists or was already used",409);return error(stage.startsWith("R-")?"Account registration could not be completed. Reference "+stage+". No payment was taken.":"Request could not be completed. Please try again.",500)}
}
