// First-free invitation requests are account data, never transaction data.
// Existing PRO promo_codes/promo_redemptions handle credit redemption.
const E=new TextEncoder(), now=()=>Math.floor(Date.now()/1000), guid=()=>crypto.randomUUID();
const token=()=>{let x=new Uint8Array(24);crypto.getRandomValues(x);return btoa(String.fromCharCode(...x)).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")};
const sha=async s=>Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256",E.encode(s)))).map(b=>b.toString(16).padStart(2,"0")).join("");
const json=(v,s=200)=>Response.json(v,{status:s,headers:{"Cache-Control":"private,no-store","Referrer-Policy":"no-referrer"}});
const err=(s,n=400)=>json({ok:false,error:s},n);
const emailOK=s=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)&&s.length<=254;
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const same=(a,b)=>{if(!a||!b||a.length!==b.length)return false;let x=0;for(let i=0;i<a.length;i++)x|=a.charCodeAt(i)^b.charCodeAt(i);return !x};
async function owner(req,env){
 const pass=env.PERSONAL_PRACTICE_PASSWORD;if(!pass||pass.length<12)return false;
 const c=(req.headers.get("Cookie")||"").split(";").map(x=>x.trim()).find(x=>x.startsWith("mct_owner_session_v2="));
 const m=/^v2\.(\d+)\.([A-Za-z0-9_-]+)$/.exec(c?.slice(21)||"");if(!m||Number(m[1])<Date.now()||Number(m[1])>Date.now()+2592000000)return false;
 const k=await crypto.subtle.importKey("raw",E.encode(pass),{name:"HMAC",hash:"SHA-256"},false,["sign"]);
 const signed=btoa(String.fromCharCode(...new Uint8Array(await crypto.subtle.sign("HMAC",k,E.encode("v2."+m[1]))))).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"");
 return same(signed,m[2]);
}
async function tables(db){
 await db.prepare("CREATE TABLE IF NOT EXISTS first_free_requests(id TEXT PRIMARY KEY,email TEXT NOT NULL UNIQUE,status TEXT NOT NULL DEFAULT 'pending_verification' CHECK(status IN ('pending_verification','pending','approved','sent','declined')),verification_hash TEXT,verification_expires INTEGER,verified_at TEXT,marketing_requested INTEGER NOT NULL DEFAULT 0 CHECK(marketing_requested IN (0,1)),promo_code_id TEXT UNIQUE REFERENCES promo_codes(id),requested_at TEXT NOT NULL DEFAULT (datetime('now')),updated_at INTEGER NOT NULL,sent_at TEXT,declined_at TEXT)").run();
 // Add visitor classification to older databases without losing verified requests.
 const info=await db.prepare("PRAGMA table_info(first_free_requests)").all();
 if(!info.results.some(x=>x.name==="customer_type")){
  try{await db.prepare("ALTER TABLE first_free_requests ADD COLUMN customer_type TEXT NOT NULL DEFAULT 'realtor' CHECK(customer_type IN ('realtor','other'))").run()}
  catch(e){if(!/duplicate column/i.test(String(e?.message||"")))throw e}
 }
 await db.prepare("CREATE INDEX IF NOT EXISTS idx_first_free_status ON first_free_requests(status,updated_at)").run();
 await db.prepare("CREATE TABLE IF NOT EXISTS marketing_consents(email TEXT PRIMARY KEY,source TEXT NOT NULL,consented_at TEXT NOT NULL DEFAULT (datetime('now')))").run();
 // Discard abandoned, unverified requests older than 30 days.
 await db.prepare("DELETE FROM first_free_requests WHERE status='pending_verification' AND updated_at<?").bind(now()-2592000).run();
}
async function throttle(db,k,v,max,seconds){
 const h=await sha(k+":"+v),r=await db.prepare("SELECT attempts,expires_at FROM auth_attempts WHERE rate_key=?").bind(h).first();
 if(r&&r.expires_at>now()&&r.attempts>=max)return false;
 await db.prepare("INSERT INTO auth_attempts(rate_key,attempts,expires_at) VALUES(?,1,?) ON CONFLICT(rate_key) DO UPDATE SET attempts=CASE WHEN expires_at<=? THEN 1 ELSE attempts+1 END,expires_at=CASE WHEN expires_at<=? THEN excluded.expires_at ELSE expires_at END").bind(h,now()+seconds,now(),now()).run();return true;
}
async function send(env,to,subject,html,body){
 const r=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:"Bearer "+env.RESEND_API_KEY,"Content-Type":"application/json"},body:JSON.stringify({from:"My Closing Timeline <"+env.MCT_FROM_EMAIL+">",to:[to],subject,html,text:body})});
 if(!r.ok)throw Error("Email provider rejected request");
}
async function eligible(db,email){
 const u=await db.prepare("SELECT id FROM users WHERE email=?").bind(email).first();if(!u)return true;
 if(await db.prepare("SELECT 1 FROM closings WHERE user_id=? LIMIT 1").bind(u.id).first())return false;
 if(await db.prepare("SELECT 1 FROM promo_redemptions p JOIN first_free_requests r ON r.promo_code_id=p.code_id WHERE p.user_id=? LIMIT 1").bind(u.id).first())return false;
 return true;
}
/* Automatic first-time reward. Verification is mandatory; manual owner approval
   is not. The status compare-and-set locks issuance to one request/email. */
async function issueVerifiedInvite(db,env,r){
 if(!r||r.status!=="pending"||!r.verified_at||r.promo_code_id)return "not_ready";
 if(!env.RESEND_API_KEY||!env.MCT_FROM_EMAIL)return "not_configured";
 if(!await eligible(db,r.email))return "ineligible";
 const rid=r.id;
  const lock=await db.prepare("UPDATE first_free_requests SET status='approved',updated_at=? WHERE id=? AND status='pending' AND verified_at IS NOT NULL AND promo_code_id IS NULL").bind(now(),rid).run();
  if(!lock.meta?.changes)return "busy";
  const t="MCT-"+token().toUpperCase(),codeId=guid(),link="https://myclosingtimeline.com/pro-activate.html#gift="+encodeURIComponent(t);
  try{
   await db.prepare("INSERT INTO promo_codes(id,code_hash,credits,max_uses,expires_at,restricted_email) VALUES(?,?,1,1,?,?)").bind(codeId,await sha(t),r.customer_type==="other"?null:now()+2592000,r.email).run();
   await db.prepare("UPDATE first_free_requests SET promo_code_id=? WHERE id=? AND status='approved'").bind(codeId,rid).run();
   const html='<div style="background:#f2f6f8;padding:30px 14px;font-family:Arial,sans-serif"><div style="max-width:600px;background:white;border-top:5px solid #d5b578;border-radius:12px;padding:30px;margin:auto;color:#173b52"><div><a href="https://myclosingtimeline.com" style="text-decoration:none"><img src="https://myclosingtimeline.com/assets/myclosingtimeline-email-logo-dark.png" alt="MyClosingTimeline.com" width="300" style="display:block;max-width:100%;height:auto;border:0"></a></div><p>Your Clients. Your Records. Your Privacy.</p><h1>'+ (r.customer_type==="other"?"Your first Other Project PRO credit is reserved!":"Your first PRO Closing is on us!")+'</h1><p>Your email was confirmed. Enjoy <strong>one complimentary PRO Closing Credit</strong>, a planned $29.90 value, without a credit card.</p><p style="background:#f9f3e8;padding:14px;border-radius:8px">Your personal code: <strong>'+esc(t)+'</strong></p><p><a href="'+(r.customer_type==="other"?"https://myclosingtimeline.com/other-projects.html":link)+'" style="display:inline-block;padding:14px 19px;background:#173b52;color:white;text-decoration:none;border-radius:8px">'+(r.customer_type==="other"?"Explore Other Projects Preview":"Redeem My FREE Closing")+'</a></p><p>Register or sign in with <strong>'+esc(r.email)+'</strong>. Verify your email first. This single-use invitation expires in 30 days for Realtors. Other Projects PRO activation will be available after its separate launch. Eligibility applies.</p><p><a href="https://myclosingtimeline.com/privacy.html">Privacy &amp; Terms</a> · <a href="https://myclosingtimeline.com/unsubscribe.html">Unsubscribe</a> · <a href="https://myclosingtimeline.com/contact.html">Contact</a></p></div></div>';
   const plain="Your first My Closing Timeline PRO Closing is complimentary (planned $29.90 value).\n\nPrivate code: "+t+"\nRedeem: "+link+"\n\nUse verified email: "+r.email+". One redemption. Realtor code expires in 30 days; Other Projects code is reserved until that PRO workspace launches. No card required.\nPrivacy: https://myclosingtimeline.com/privacy.html\nUnsubscribe: https://myclosingtimeline.com/unsubscribe.html";
   // Mark ready before sending: once the provider accepts, the issued code is redeemable.
   // If sending fails, disable the code and restore Pending in the catch branch.
   await db.prepare("UPDATE first_free_requests SET status='sent',sent_at=datetime('now'),updated_at=? WHERE id=? AND status='approved'").bind(now(),rid).run();
   await send(env,r.email,"Your FREE My Closing Timeline PRO invitation",html,plain);
   return "sent";
  }catch(e){
   await db.prepare("UPDATE promo_codes SET active=0 WHERE id=?").bind(codeId).run().catch(()=>{});
   await db.prepare("UPDATE first_free_requests SET status='pending',promo_code_id=NULL,updated_at=? WHERE id=? AND status IN ('approved','sent')").bind(now(),rid).run().catch(()=>{});
   return "send_failed";
  }
}
const publicReply="Check your inbox for email confirmation. Once verified, your first-time code is sent automatically, without administrator approval.";
export async function onRequest({request:req,env}){
 const u=new URL(req.url),route=u.pathname.replace(/^\/api\/first-free\/?/,"").replace(/\/$/,"");
 if(req.method==="GET"&&route==="health")return json({ok:true,configured:{database:!!env.PRO_DB,email:!!(env.RESEND_API_KEY&&env.MCT_FROM_EMAIL)}});
 if(!env.PRO_DB)return err("Invitation service is not configured yet.",503);
 const db=env.PRO_DB;
 try{
 await tables(db);
 if(req.method==="GET"&&route==="confirm"){
  const secret=u.searchParams.get("token")||"";if(!/^[A-Za-z0-9_-]{30,60}$/.test(secret))return err("Invalid confirmation link.");
  const r=await db.prepare("SELECT * FROM first_free_requests WHERE verification_hash=? AND verification_expires>? AND status='pending_verification'").bind(await sha(secret),now()).first();
  if(!r)return new Response(null,{status:303,headers:{Location:"/first-closing-free.html?verification=expired","Cache-Control":"no-store","Referrer-Policy":"no-referrer"}});
  const updated=await db.prepare("UPDATE first_free_requests SET status='pending',verified_at=datetime('now'),verification_hash=NULL,verification_expires=NULL,updated_at=? WHERE id=? AND status='pending_verification'").bind(now(),r.id).run();
  if(updated.meta?.changes&&r.marketing_requested){
   // Explicit opt-in takes effect only after email confirmation.
   await db.prepare("INSERT INTO marketing_consents(email,source) VALUES(?,'verified_first_free_opt_in') ON CONFLICT(email) DO UPDATE SET source=excluded.source,consented_at=datetime('now')").bind(r.email).run();
   await db.prepare("DELETE FROM marketing_optouts WHERE email_hash=?").bind(await sha(r.email)).run().catch(()=>{});
  }
  let outcome="pending";
  if(updated.meta?.changes){
   const verified=await db.prepare("SELECT * FROM first_free_requests WHERE id=?").bind(r.id).first();
   outcome=await issueVerifiedInvite(db,env,verified);
  }
  // Even if delivery fails, confirmation persists. Visitor can retry the same
  // verified address from the request form, without administrator assistance.
  return new Response(null,{status:303,headers:{Location:"/first-closing-free.html?verification=confirmed&delivery="+(outcome==="sent"?"sent":"pending"),"Cache-Control":"no-store","Referrer-Policy":"no-referrer"}});
 }
 if(req.method==="GET"&&route==="admin/list"){
  if(!await owner(req,env))return err("Owner access required.",403);
  const d=await db.prepare("SELECT r.id,r.email,r.status,r.verified_at,r.marketing_requested,r.requested_at,r.sent_at,CASE WHEN p.uses>0 THEN 1 ELSE 0 END redeemed FROM first_free_requests r LEFT JOIN promo_codes p ON p.id=r.promo_code_id ORDER BY r.requested_at DESC LIMIT 250").all();
  return json({ok:true,requests:d.results.map(x=>({...x,status:x.redeemed?"redeemed":x.status}))});
 }
 if(req.method!=="POST")return err("Not found.",404);
 if(req.headers.get("Origin")!==u.origin)return err("Request origin not accepted.",403);
 if(!(req.headers.get("Content-Type")||"").startsWith("application/json")||Number(req.headers.get("Content-Length")||0)>5000)return err("Invalid request.",400);
 const b=await req.json();
 if(route==="request"){
  if(!env.RESEND_API_KEY||!env.MCT_FROM_EMAIL)return err("Email invitations are not ready. Please try again later.",503);
  const email=String(b.email||"").trim().toLowerCase(),type=String(b.customerType||"");
  if(!emailOK(email)||typeof b.marketingOptIn!=="boolean"||!["realtor","other"].includes(type))return err("Select Realtor or Other Projects and provide a valid email.");
  if(!await throttle(db,"firstfree_ip",req.headers.get("CF-Connecting-IP")||"unknown",8,3600)||!await throttle(db,"firstfree_email",email,3,86400))return err("Too many requests. Try later.",429);
  const prev=await db.prepare("SELECT id,status,updated_at,verified_at,promo_code_id,customer_type FROM first_free_requests WHERE email=?").bind(email).first();
  // A previously confirmed request may be completed without requesting a
  // second confirmation email or exposing the private code to this caller.
  if(prev?.status==="pending"&&prev.verified_at&&!prev.promo_code_id){
   const row=await db.prepare("SELECT * FROM first_free_requests WHERE id=?").bind(prev.id).first();
   if(row.customer_type===type)await issueVerifiedInvite(db,env,row);
   return json({ok:true,message:"If this verified address has an unused first-time benefit, your private code will be emailed to that address."});
  }
  if(prev&&(prev.status!=="pending_verification"||now()-prev.updated_at<900))return json({ok:true,message:publicReply});
  if(!await eligible(db,email))return json({ok:true,message:publicReply});
  const t=token();
  if(prev)await db.prepare("UPDATE first_free_requests SET verification_hash=?,verification_expires=?,marketing_requested=?,customer_type=?,updated_at=? WHERE id=? AND status='pending_verification'").bind(await sha(t),now()+86400,b.marketingOptIn?1:0,type,now(),prev.id).run();
  else await db.prepare("INSERT INTO first_free_requests(id,email,verification_hash,verification_expires,marketing_requested,customer_type,updated_at) VALUES(?,?,?,?,?,?,?)").bind(guid(),email,await sha(t),now()+86400,b.marketingOptIn?1:0,type,now()).run();
  const link="https://myclosingtimeline.com/api/first-free/confirm?token="+encodeURIComponent(t);
  const html='<div style="background:#f2f6f8;padding:30px 14px;font-family:Arial,sans-serif"><div style="background:white;border-top:5px solid #d6b579;padding:30px;max-width:580px;margin:auto;border-radius:12px;color:#173b52"><h1>Confirm your invitation request</h1><p>Thank you for your interest in My Closing Timeline PRO. Please confirm your email to request your first complimentary Closing Credit.</p><p><a style="background:#173b52;color:white;text-decoration:none;padding:14px 20px;display:inline-block;border-radius:7px" href="'+link+'">Confirm My Email</a></p><p>After email confirmation, your one-time code is issued automatically if this is your first eligible request. No administrator approval. If this was not you, ignore this email.</p><p><a href="https://myclosingtimeline.com/privacy.html">Privacy &amp; Terms</a></p></div></div>';
  try{await send(env,email,"Confirm your My Closing Timeline invitation request",html,"Confirm your invitation request: "+link+"\n\nIf this was not you, ignore this email.\nPrivacy: https://myclosingtimeline.com/privacy.html")}
  catch(e){await db.prepare("DELETE FROM first_free_requests WHERE email=? AND status='pending_verification'").bind(email).run();return err("Could not send confirmation email. Try later.",503)}
  return json({ok:true,message:publicReply},202);
 }
 if(route==="admin/approve"||route==="admin/decline"){
  if(!await owner(req,env))return err("Owner access required.",403);
  const rid=String(b.id||"");if(!/^[0-9a-f-]{36}$/.test(rid))return err("Invalid request ID.");
  const r=await db.prepare("SELECT * FROM first_free_requests WHERE id=?").bind(rid).first();
  if(!r)return err("Request not found.",404);
  if(r.status!=="pending"||!r.verified_at)return err("Only verified pending requests may be processed.",409);
  if(route==="admin/decline"){
   await db.prepare("UPDATE first_free_requests SET status='declined',declined_at=datetime('now'),updated_at=? WHERE id=? AND status='pending'").bind(now(),rid).run();return json({ok:true});
  }
  // Legacy admin action remains a troubleshooting fallback only.
  const outcome=await issueVerifiedInvite(db,env,r);
  if(outcome==="sent")return json({ok:true,message:"Code email accepted by provider."});
  return err(outcome==="ineligible"?"An existing PRO closing or prior credit was found.":"No code issued. Request remains available for review.",409);
 }
 return err("Not found.",404);
 }catch(e){console.error("First FREE request failed",{route,type:e?.name||"Error"});return err("Invitation service is unavailable.",503)}
}