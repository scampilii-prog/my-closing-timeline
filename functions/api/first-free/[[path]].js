// First-free invitation requests are account data, never transaction data.
// Existing PRO promo_codes/promo_redemptions handle credit redemption.
const E=new TextEncoder(), now=()=>Math.floor(Date.now()/1000), guid=()=>crypto.randomUUID();
const token=()=>{let x=new Uint8Array(24);crypto.getRandomValues(x);return btoa(String.fromCharCode(...x)).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")};
const sha=async s=>Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256",E.encode(s)))).map(b=>b.toString(16).padStart(2,"0")).join("");
const json=(v,s=200)=>Response.json(v,{status:s,headers:{"Cache-Control":"private,no-store","Referrer-Policy":"no-referrer"}});
const err=(s,n=400)=>json({ok:false,error:s},n);
const emailOK=s=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)&&s.length<=254;
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
// Email-safe calendar/check icon and wordmark drawn from text,
// no external image and no remote asset dependency in Mail or Gmail.
const brandMark='<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;margin:0 0 22px 0;width:auto"><tr><td width="54" height="54" align="center" valign="middle" bgcolor="#078d97" style="width:54px;height:54px;background-color:#078d97;border-radius:10px;vertical-align:middle;text-align:center"><table role="presentation" align="center" cellpadding="0" cellspacing="0" border="0" width="34" style="width:34px;border:3px solid #ffffff;border-top:8px solid #ffffff;border-radius:4px;background-color:#ffffff"><tr><td height="23" align="center" valign="middle" style="height:23px;text-align:center;color:#087f8c;font:bold 23px/23px Arial,sans-serif">&#10003;</td></tr></table></td><td valign="middle" style="padding-left:13px;vertical-align:middle;white-space:nowrap"><a href="https://myclosingtimeline.com/" style="color:#193b51;text-decoration:none;font:bold 22px/1.2 Arial,sans-serif"><span style="color:#193b51">MyClosing</span><span style="color:#078e98">Timeline</span><span style="color:#193b51;font-size:14px">.com</span></a></td></tr></table>';

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
 // Only owner-driven test resets may override first-use eligibility.
 const latest=await db.prepare("PRAGMA table_info(first_free_requests)").all();
 if(!latest.results.some(x=>x.name==="test_reset")){
  try{await db.prepare("ALTER TABLE first_free_requests ADD COLUMN test_reset INTEGER NOT NULL DEFAULT 0 CHECK(test_reset IN (0,1))").run()}
  catch(e){if(!/duplicate column/i.test(String(e?.message||"")))throw e}
 }
 await db.prepare("CREATE TABLE IF NOT EXISTS first_free_test_reset_history(id TEXT PRIMARY KEY,email TEXT NOT NULL,previous_promo_code_id TEXT,previous_status TEXT NOT NULL,reset_at TEXT NOT NULL DEFAULT (datetime('now')))").run();
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
 if(!r.test_reset&&!await eligible(db,r.email))return "ineligible";
 const rid=r.id;
  const lock=await db.prepare("UPDATE first_free_requests SET status='approved',updated_at=? WHERE id=? AND status='pending' AND verified_at IS NOT NULL AND promo_code_id IS NULL").bind(now(),rid).run();
  if(!lock.meta?.changes)return "busy";
  const t="MCT-"+token().toUpperCase(),codeId=guid(),isOther=r.customer_type==="other",link="https://myclosingtimeline.com/pro-get-started.html?auth=register&mode=gift"+(isOther?"&audience=other":"")+"#gift="+encodeURIComponent(t),typeLabel=isOther?"Other Projects":"Real Estate & Closings";
  try{
   await db.prepare("INSERT INTO promo_codes(id,code_hash,credits,max_uses,expires_at,restricted_email) VALUES(?,?,1,1,?,?)").bind(codeId,await sha(t),r.customer_type==="other"?null:now()+2592000,r.email).run();
   await db.prepare("UPDATE first_free_requests SET promo_code_id=? WHERE id=? AND status='approved'").bind(codeId,rid).run();
   const html='<div style="background:#f2f6f8;padding:30px 14px;font-family:Arial,sans-serif"><div style="max-width:600px;background:white;border-top:5px solid #d5b578;border-radius:12px;padding:30px;margin:auto;color:#173b52">'+brandMark+'<p>Your Clients. Your Records. Your Privacy.</p><h1>'+ (r.customer_type==="other"?"Your first Other Project PRO credit is reserved!":"Your first PRO Closing is on us!")+'</h1><p>Your email was confirmed. Enjoy <strong>one complimentary '+(isOther?"Other Projects":"real estate")+' PRO project credit</strong> — your one-time welcome benefit for this verified email, without a credit card.</p>'+(isOther?'<p><strong>Your Other Projects benefit is reserved.</strong> You can use the separate FREE project planner and try the PRO task-tracking demonstration today. Your complimentary PRO account credit is <strong>not yet redeemable</strong>; it will remain reserved for the Other Projects launch. It cannot be used for real estate closings.</p>':'<p><strong>Next:</strong> Select <strong>Create My FREE Account</strong> below and use this same verified email. Your one-time credit is saved for automatic application after account verification, with <strong>no card and no manual code entry</strong>.</p>')+'<p style="background:#f9f3e8;padding:14px;border-radius:8px">Your personal code: <strong>'+esc(t)+'</strong></p><p><a href="'+(r.customer_type==="other"?"https://myclosingtimeline.com/other-projects.html":link)+'" style="display:inline-block;padding:14px 19px;background:#173b52;color:white;text-decoration:none;border-radius:8px">'+(r.customer_type==="other"?"Explore Other Projects Preview":"Create My FREE Account →")+'</a></p><p>'+ (isOther?'This invitation belongs exclusively to <strong>Other Projects</strong> and has no expiry before its separate launch. No account purchase or activation is available yet. You can explore the two different project task tables in your browser now.':'Register or sign in with <strong>'+esc(r.email)+'</strong>. Verify your account email first. This single-use Real Estate &amp; Closings invitation expires in 30 days. Eligibility applies.')+'</p><p><a href="https://myclosingtimeline.com/privacy.html">Privacy &amp; Terms</a> · <a href="https://myclosingtimeline.com/unsubscribe.html">Unsubscribe</a> · <a href="https://myclosingtimeline.com/contact.html">Contact</a></p></div></div>';
   const plain="Your first My Closing Timeline "+typeLabel+" PRO project is complimentary.\n\nPrivate one-time code: "+t+"\n"+(isOther?"Other Projects PRO is a preview. Your code is reserved and cannot be activated until that workspace launches. Explore: https://myclosingtimeline.com/other-projects.html":"Activate: "+link)+"\n\nUse verified email: "+r.email+". One code per verified email. "+(isOther?"The Other Projects code has no expiry before its separate launch.":"Realtor code expires 30 days after issue.")+" No card required for the first PRO project. Later PRO projects require paid credits.\nPrivacy: https://myclosingtimeline.com/privacy.html";
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
const publicReply="If this email is eligible for its one-time welcome benefit, check the inbox for confirmation or your already-issued code. A code already issued to an email is never issued a second time.";
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
  return new Response(null,{status:303,headers:{Location:"/first-closing-free.html?verification=confirmed&delivery="+(outcome==="sent"?"sent":"pending")+"&audience="+(r.customer_type==="other"?"other":"realtor"),"Cache-Control":"no-store","Referrer-Policy":"no-referrer"}});
 }
 if(req.method==="GET"&&route==="admin/list"){
  if(!await owner(req,env))return err("Owner access required.",403);
  const d=await db.prepare("SELECT r.id,r.email,r.status,r.verified_at,r.marketing_requested,r.requested_at,r.sent_at,r.test_reset,CASE WHEN r.verification_hash IS NOT NULL THEN 1 ELSE 0 END confirmation_sent,CASE WHEN p.uses>0 THEN 1 ELSE 0 END redeemed FROM first_free_requests r LEFT JOIN promo_codes p ON p.id=r.promo_code_id ORDER BY r.requested_at DESC LIMIT 250").all();
  return json({ok:true,requests:d.results.map(x=>({...x,status:x.redeemed?"redeemed":x.status}))});
 }
 // Exceptional OWNER-ONLY practice reset. Does not delete any PRO closing,
 // purchased credits, original account or marketing-consent records.
 // Ordinary visitors cannot invoke it and automatic issuance still enforces
 // one code per email until a deliberate owner reset.
 if(req.method==="POST"&&route==="admin/reset-test"){
  if(!await owner(req,env))return err("Owner access required.",403);
  if(req.headers.get("Origin")!==u.origin)return err("Request origin not accepted.",403);
  if(!(req.headers.get("Content-Type")||"").startsWith("application/json"))return err("Expected JSON.",400);
  if(Number(req.headers.get("Content-Length")||0)>3000)return err("Request too large.",400);
  const data=await req.json(),id=String(data.id||""),email=String(data.email||"").trim().toLowerCase();
  if(!/^[0-9a-f-]{36}$/.test(id)||!emailOK(email)||data.confirm!=="RESET FREE TEST: "+email)return err("Confirm the full test email to reset its benefit.",400);
  const record=await db.prepare("SELECT id,email,status,verified_at,promo_code_id FROM first_free_requests WHERE id=? AND email=?").bind(id,email).first();
  if(!record)return err("Invitation record not found.",404);
  if(record.status==="approved")return err("A code is being issued. Retry after processing finishes.",409);
  // Never modify paid customers by mistake. Use a separate unpaid practice
  // account/email; do not alter an existing paid purchase or real closing.
  const account=await db.prepare("SELECT id FROM users WHERE email=?").bind(email).first();
  if(account){
   const paid=await db.prepare("SELECT id FROM purchases WHERE user_id=? LIMIT 1").bind(account.id).first();
   if(paid)return err("This email has purchases. Use a separate unpaid practice email; customer purchase records cannot be reset.",409);
   if(record.promo_code_id){
    const redeemed=await db.prepare("SELECT 1 FROM promo_redemptions WHERE code_id=? AND user_id=? LIMIT 1").bind(record.promo_code_id,account.id).first();
    if(redeemed){
     const balance=await db.prepare("SELECT credits FROM users WHERE id=?").bind(account.id).first();
     if(Number(balance?.credits||0)>0)return err("Use the remaining test credit before resetting. Existing account credits are never deleted.",409);
    }
   }
  }
  const updates=[
   db.prepare("UPDATE first_free_requests SET status='pending_verification',verification_hash=NULL,verification_expires=NULL,verified_at=NULL,promo_code_id=NULL,test_reset=1,marketing_requested=0,sent_at=NULL,declined_at=NULL,updated_at=? WHERE id=? AND email=? AND status!='approved'").bind(now(),id,email),
   db.prepare("INSERT INTO first_free_test_reset_history(id,email,previous_promo_code_id,previous_status) VALUES(?,?,?,?)").bind(guid(),email,record.promo_code_id||null,record.status)
  ];
  if(record.promo_code_id)updates.push(db.prepare("UPDATE promo_codes SET active=0 WHERE id=?").bind(record.promo_code_id));
  const changed=await db.batch(updates);
  if(!changed[0]?.meta?.changes)return err("Practice reset was not completed.",409);
  // Allow a new confirmation request for the exact reset email.
  await db.prepare("DELETE FROM auth_attempts WHERE rate_key=?").bind(await sha("firstfree_email:"+email)).run();
  return json({ok:true,message:"Practice benefit reset for this email. The former code was disabled; the email may request and confirm ONE new code. Saved closings and paid credits were not deleted."});
 }
 if(req.method!=="POST")return err("Not found.",404);
 if(req.headers.get("Origin")!==u.origin)return err("Request origin not accepted.",403);
 if(!(req.headers.get("Content-Type")||"").startsWith("application/json")||Number(req.headers.get("Content-Length")||0)>5000)return err("Invalid request.",400);
 const b=await req.json();
 if(route==="request"){
  if(!env.RESEND_API_KEY||!env.MCT_FROM_EMAIL)return err("Email invitations are not ready. Please try again later.",503);
  const email=String(b.email||"").trim().toLowerCase(),type=String(b.customerType||"");
  if(!emailOK(email)||typeof b.marketingOptIn!=="boolean"||!["realtor","other"].includes(type))return err("Select Realtor or Other Projects and provide a valid email.");
  const prev=await db.prepare("SELECT id,status,updated_at,verified_at,promo_code_id,customer_type,test_reset,verification_hash FROM first_free_requests WHERE email=?").bind(email).first();
  // An owner reset creates a one-shot exception for this previously verified
  // practice email. Without another owner reset, all regular limits apply.
  const ownerResetReady=prev?.test_reset===1&&prev.status==="pending_verification"&&!prev.verification_hash;
  if((!ownerResetReady&&!await throttle(db,"firstfree_ip",req.headers.get("CF-Connecting-IP")||"unknown",8,3600))||!await throttle(db,"firstfree_email",email,3,86400))return err("Too many requests. Try later.",429);
  // A previously confirmed request may be completed without requesting a
  // second confirmation email or exposing the private code to this caller.
  if(prev?.status==="pending"&&prev.verified_at&&!prev.promo_code_id){
   const row=await db.prepare("SELECT * FROM first_free_requests WHERE id=?").bind(prev.id).first();
   if(row.customer_type===type)await issueVerifiedInvite(db,env,row);
   return json({ok:true,message:"If this verified address has an unused first-time benefit, your private code will be emailed to that address."});
  }
  // A deliberate owner reset clears the previous confirmation token. Let the
  // same verified address request a NEW confirmation immediately, without
  // waiting for the normal 15-minute anti-spam throttle on fresh requests.
  if(prev&&(prev.status!=="pending_verification"||(now()-prev.updated_at<900&&!ownerResetReady)))return json({ok:true,message:publicReply});
  // A previously used first credit is valid for a NEW owner-authorized test,
  // but not for an ordinary visitor or an un-reset returning account.
  if(!ownerResetReady&&!await eligible(db,email))return json({ok:true,message:publicReply});
  const t=token();
  if(prev)await db.prepare("UPDATE first_free_requests SET verification_hash=?,verification_expires=?,marketing_requested=?,customer_type=?,updated_at=? WHERE id=? AND status='pending_verification'").bind(await sha(t),now()+86400,b.marketingOptIn?1:0,type,now(),prev.id).run();
  else await db.prepare("INSERT INTO first_free_requests(id,email,verification_hash,verification_expires,marketing_requested,customer_type,updated_at) VALUES(?,?,?,?,?,?,?)").bind(guid(),email,await sha(t),now()+86400,b.marketingOptIn?1:0,type,now()).run();
  const link="https://myclosingtimeline.com/api/first-free/confirm?token="+encodeURIComponent(t);
  const html='<div style="background:#f2f6f8;padding:30px 14px;font-family:Arial,sans-serif"><div style="background:white;border-top:5px solid #d6b579;padding:30px;max-width:580px;margin:auto;border-radius:12px;color:#173b52">'+brandMark+'<h1>Confirm your first PRO benefit</h1><p>Thank you for your interest in My Closing Timeline '+(type==="other"?"Other Projects":"Realtor")+' PRO. Confirm your email to receive your single first-project complimentary code, without manual approval.</p><p><a style="background:#173b52;color:white;text-decoration:none;padding:14px 20px;display:inline-block;border-radius:7px" href="'+link+'">Confirm My Email</a></p><p>After email confirmation, your one-time code is issued automatically if this is your first eligible request. No administrator approval. If this was not you, ignore this email.</p><p><a href="https://myclosingtimeline.com/privacy.html">Privacy &amp; Terms</a></p></div></div>';
  try{await send(env,email,"Confirm your My Closing Timeline first-project benefit",html,"Confirm your first-project email: "+link+"\n\nIf this was not you, ignore this email.\nPrivacy: https://myclosingtimeline.com/privacy.html")}
  catch(e){
   // Keep a resettable test record and its audit history on provider failure;
   // never delete its original same-email record.
   if(prev)await db.prepare("UPDATE first_free_requests SET verification_hash=NULL,verification_expires=NULL,updated_at=? WHERE id=? AND status='pending_verification'").bind(now(),prev.id).run();
   else await db.prepare("DELETE FROM first_free_requests WHERE email=? AND status='pending_verification'").bind(email).run();
   return err("Could not send confirmation email. Try later.",503)
  }
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