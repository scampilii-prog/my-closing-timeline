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
const plans={single:{credits:1,amount:2000,price:"price_1UUv1MClAoCQ0RPCP6IcwrTK"},pack2:{credits:2,amount:3500,price:"price_1UUv1fClAoCQ0RPCzGZNSZKU"},pack5:{credits:5,amount:8000,price:"price_1UUv1hClAoCQ0RPCqh16HkBU"}};
const emailOK=s=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)&&s.length<=254;
const isoDate=s=>{if(!/^\d{4}-\d{2}-\d{2}$/.test(s||""))return false;const d=new Date(s+"T00:00:00Z");return !Number.isNaN(d.valueOf())&&d.toISOString().slice(0,10)===s};
async function pbkdf(password,salt){const key=await crypto.subtle.importKey("raw",E.encode(password),"PBKDF2",false,["deriveBits"]);const bits=await crypto.subtle.deriveBits({name:"PBKDF2",hash:"SHA-256",salt:E.encode(salt),iterations:210000},key,256);return Array.from(new Uint8Array(bits)).map(x=>x.toString(16).padStart(2,"0")).join("")}
async function permit(db,kind,value,max,windowSeconds){const key=await digest(kind+":"+value);const previous=await db.prepare("SELECT attempts,expires_at FROM auth_attempts WHERE rate_key=?").bind(key).first();if(previous&&previous.expires_at>now()&&previous.attempts>=max)return false;await db.prepare("INSERT INTO auth_attempts(rate_key,attempts,expires_at) VALUES(?,1,?) ON CONFLICT(rate_key) DO UPDATE SET attempts=CASE WHEN expires_at<=? THEN 1 ELSE attempts+1 END,expires_at=CASE WHEN expires_at<=? THEN excluded.expires_at ELSE expires_at END").bind(key,now()+windowSeconds,now(),now()).run();return true}
async function getAuth(req,db){const cookie=(req.headers.get("Cookie")||"").split(";").map(v=>v.trim()).find(v=>v.startsWith(cookieName+"="));if(!cookie)return null;const token=cookie.slice(cookieName.length+1);if(!/^[A-Za-z0-9_-]{40,60}$/.test(token))return null;return db.prepare("SELECT u.id,u.email,u.full_name,u.verified,u.credits FROM sessions s JOIN users u ON u.id=s.user_id WHERE s.token_hash=? AND s.expires_at>?").bind(await digest(token),now()).first()}
async function newSession(db,userId){const token=random();await db.prepare("INSERT INTO sessions(token_hash,user_id,expires_at) VALUES (?,?,?)").bind(await digest(token),userId,now()+2592000).run();return sessionCookie(token)}
async function parseBody(req){if(!(req.headers.get("Content-Type")||"").startsWith("application/json"))throw Error("Expected JSON");if(Number(req.headers.get("Content-Length")||0)>10000)throw Error("Request too large");return await req.json()}
function validOrigin(req){const origin=req.headers.get("Origin");return origin===new URL(req.url).origin}
async function sendVerification(env,email,link){const response=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:"Bearer "+env.RESEND_API_KEY,"Content-Type":"application/json"},body:JSON.stringify({from:env.MCT_FROM_EMAIL,to:[email],subject:"Verify your My Closing Timeline account",html:"<p>Verify your email to activate your My Closing Timeline account.</p><p><a href=\""+link+"\">Verify Email</a></p><p>If you did not request an account, ignore this email.</p>"})});if(!response.ok)throw Error("Email provider rejected verification")}
async function ownerAuthenticated(req,env){const pass=env.PERSONAL_PRACTICE_PASSWORD;if(typeof pass!=="string"||pass.length<12)return false;const v=(req.headers.get("Cookie")||"").split(";").map(s=>s.trim()).find(s=>s.startsWith("mct_owner_session_v2="));if(!v)return false;const m=/^v2\.(\d+)\.([A-Za-z0-9_-]+)$/.exec(v.split("=")[1]);if(!m||Number(m[1])<Date.now()||Number(m[1])>Date.now()+2592000000)return false;const key=await crypto.subtle.importKey("raw",E.encode(pass),{name:"HMAC",hash:"SHA-256"},false,["sign"]);const sig=new Uint8Array(await crypto.subtle.sign("HMAC",key,E.encode("v2."+m[1])));const b64=btoa(String.fromCharCode(...sig)).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"");return safeEq(b64,m[2])}
async function stripeRequest(env,data){const secret=env.STRIPE_SECRET_KEY;if(!secret||!secret.startsWith("sk_test_"))throw Error("Stripe Sandbox key has not been configured");const response=await fetch("https://api.stripe.com/v1/checkout/sessions",{method:"POST",headers:{Authorization:"Bearer "+secret,"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams(data)});const result=await response.json();if(!response.ok||!result.url||!result.id)throw Error("Stripe checkout could not be opened");return result}
export async function onRequest(context){
 const {request:req,env}=context;const url=new URL(req.url),route=url.pathname.replace(/^\/api\/pro\/?/,"").replace(/\/$/,"");
 if(req.method==="GET"&&route==="health")return reply({ok:true,configured:{database:!!env.PRO_DB,checkoutSandbox:!!env.STRIPE_SECRET_KEY,webhook:!!env.STRIPE_WEBHOOK_SECRET,email:!!env.RESEND_API_KEY&&!!env.MCT_FROM_EMAIL}});
 if(!env.PRO_DB)return error("PRO service is being configured. No payment or registration has been started.",503);
 const db=env.PRO_DB;
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
 if(req.method!=="POST")return error("Not found",404);
 if(!validOrigin(req))return error("Request origin was not accepted",403);
 if(route==="forgot"){
  if(!env.RESEND_API_KEY||!env.MCT_FROM_EMAIL)return error("Password recovery email is not yet configured",503);
  const email=String(body.email||"").trim().toLowerCase();if(!emailOK(email))return error("Invalid email");
  if(!await permit(db,"forgot",req.headers.get("CF-Connecting-IP")||"unknown",5,3600))return error("Too many requests. Try again later.",429);
  const user=await db.prepare("SELECT id FROM users WHERE email=? AND verified=1").bind(email).first();
  if(user){const token=random();await db.prepare("INSERT INTO password_resets(token_hash,user_id,expires_at) VALUES(?,?,?)").bind(await digest(token),user.id,now()+1800).run();
   const link=url.origin+"/pro-get-started.html?reset="+encodeURIComponent(token);const response=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:"Bearer "+env.RESEND_API_KEY,"Content-Type":"application/json"},body:JSON.stringify({from:env.MCT_FROM_EMAIL,to:[email],subject:"Reset your My Closing Timeline password",html:"<p>Use this one-time link to reset your password:</p><p><a href=\""+link+"\">Reset Password</a></p><p>This link expires in 30 minutes. Ignore this message if you did not request it.</p>"})});if(!response.ok)return error("Recovery email is temporarily unavailable",503)}
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
 const body=await parseBody(req);
 if(route==="register"){
  if(!env.RESEND_API_KEY||!env.MCT_FROM_EMAIL)return error("Email verification is not yet configured",503);
  const name=String(body.name||"").trim().slice(0,120),email=String(body.email||"").trim().toLowerCase(),password=String(body.password||"");
  if(name.length<2||!emailOK(email)||password.length<12||password.length>128)return error("Enter your name, valid email and a password of at least 12 characters");
  if(!await permit(db,"register",req.headers.get("CF-Connecting-IP")||"unknown",5,3600))return error("Too many registration attempts. Try again later.",429);const existing=await db.prepare("SELECT id FROM users WHERE email=?").bind(email).first();if(existing)return error("This email already has an account. Please sign in.",409);
  const id=guid(),salt=random(20),hash=await pbkdf(password,salt),token=random(32);
  await db.batch([db.prepare("INSERT INTO users(id,email,full_name,password_salt,password_hash) VALUES(?,?,?,?,?)").bind(id,email,name,salt,hash),db.prepare("INSERT INTO email_verifications(token_hash,user_id,expires_at) VALUES(?,?,?)").bind(await digest(token),id,now()+86400)]);
  try{await sendVerification(env,email,url.origin+"/api/pro/verify?token="+encodeURIComponent(token))}
  catch(_){await db.batch([db.prepare("DELETE FROM email_verifications WHERE user_id=?").bind(id),db.prepare("DELETE FROM users WHERE id=? AND verified=0").bind(id)]);return error("Could not send verification email. Try again later.",503)}
  return reply({ok:true,message:"Check your email for a verification link."},201);
 }
 if(route==="login"){
  const email=String(body.email||"").trim().toLowerCase(),password=String(body.password||"");if(!emailOK(email)||password.length>128)return error("Invalid credentials",401);if(!await permit(db,"login",email,8,900))return error("Too many sign-in attempts. Try again later.",429);
  const row=await db.prepare("SELECT id,password_salt,password_hash,verified FROM users WHERE email=?").bind(email).first();
  if(!row||!safeEq(await pbkdf(password,row.password_salt),row.password_hash))return error("Invalid credentials",401);
  if(!row.verified)return error("Verify your email before signing in",403);
  return reply({ok:true},200,{"Set-Cookie":await newSession(db,row.id)});
 }
 if(route==="admin/code"){
  if(!await ownerAuthenticated(req,env))return error("Owner access required",403);
  const credits=Number(body.credits),uses=Number(body.max_uses||1),exp=body.expires_at?Date.parse(body.expires_at):NaN,email=String(body.email||"").trim().toLowerCase();
  if(!Number.isInteger(credits)||credits<1||credits>20||!Number.isInteger(uses)||uses<1||uses>100||email&&!emailOK(email)||body.expires_at&&!Number.isFinite(exp))return error("Invalid code settings");
  const code="MCT-"+random(12).toUpperCase();await db.prepare("INSERT INTO promo_codes(id,code_hash,credits,max_uses,expires_at,restricted_email) VALUES(?,?,?,?,?,?)").bind(guid(),await digest(code),credits,uses,Number.isFinite(exp)?Math.floor(exp/1000):null,email||null).run();return reply({ok:true,code,credits,max_uses:uses,notice:"Store this code now; it cannot be retrieved later."},201);
 }
 const user=await getAuth(req,db);if(!user||!user.verified)return error("Sign in to your verified account first",401);
 if(route==="promo/check"||route==="promo/redeem"){
  const code=String(body.code||"").trim().toUpperCase();if(!await permit(db,"promo",user.id,30,3600))return error("Too many code attempts. Please try again later.",429);
  if(code.length<12||code.length>64)return error("Invalid promotional code");
  const row=await db.prepare("SELECT id,credits FROM promo_codes WHERE code_hash=? AND active=1 AND uses<max_uses AND (expires_at IS NULL OR expires_at>?) AND (restricted_email IS NULL OR restricted_email=?)").bind(await digest(code),now(),user.email).first();
  if(!row)return error("Code is invalid, expired or fully used",404);
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
  const plan=plans[String(body.plan||"")];if(!plan)return error("Choose a valid closing credit plan");
  const order=guid();await db.prepare("INSERT INTO purchases(id,user_id,plan_id,credit_quantity,amount_cents) VALUES(?,?,?,?,?)").bind(order,user.id,body.plan,plan.credits,plan.amount).run();
  let result;try{result=await stripeRequest(env,{"mode":"payment","line_items[0][price]":plan.price,"line_items[0][quantity]":"1","client_reference_id":user.id,"customer_email":user.email,"metadata[order_id]":order,"metadata[plan_id]":body.plan,"success_url":url.origin+"/my-closings.html?checkout=complete","cancel_url":url.origin+"/pro-get-started.html?checkout=cancelled"})}catch(_){await db.prepare("DELETE FROM purchases WHERE id=? AND status='pending'").bind(order).run();return error("Checkout is not available yet. No payment was taken.",503)}
  await db.prepare("UPDATE purchases SET checkout_session_id=? WHERE id=?").bind(result.id,order).run();
  return reply({ok:true,checkout_url:result.url});
 }
 if(route==="closings/create"){
  const name=String(body.name||"").trim().slice(0,120),address=String(body.address||"").trim().slice(0,250),eff=String(body.effective_date||""),end=String(body.closing_date||"");
  if(!name||!isoDate(eff)||!isoDate(end)||end<eff)return error("Enter a transaction name and valid contract dates");
  const id=guid();
  const res=await db.batch([
   db.prepare("INSERT INTO closings(id,user_id,name,address,effective_date,closing_date) SELECT ?,id,?,?,?,? FROM users WHERE id=? AND credits>0").bind(id,name,address,eff,end,user.id),
   db.prepare("UPDATE users SET credits=credits-1 WHERE id=? AND EXISTS(SELECT 1 FROM closings WHERE id=? AND user_id=?)").bind(user.id,id,user.id)
  ]);
  if(!res[0]?.meta?.changes)return error("No closing credits available. Purchase or redeem a credit first.",402);
  return reply({ok:true,id},201);
 }
 const match=/^closings\/([0-9a-f-]{36})\/(details|change-date|cancel|complete|tasks\/add|tasks\/update)$/.exec(route);
 if(match){
  const id=match[1],act=match[2],closing=await db.prepare("SELECT * FROM closings WHERE id=? AND user_id=?").bind(id,user.id).first();
  if(!closing)return error("Closing not found",404);
  if(act==="details"){const tasks=await db.prepare("SELECT id,title,due_date,status FROM follow_tasks WHERE closing_id=? AND user_id=? ORDER BY due_date ASC").bind(id,user.id).all();return reply({ok:true,closing,tasks:tasks.results})}
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
   await db.prepare("INSERT INTO follow_tasks(id,closing_id,user_id,title,due_date) VALUES(?,?,?,?,?)").bind(guid(),id,user.id,title,date).run();return reply({ok:true},201);
  }
  if(act==="tasks/update"){
   const task=await db.prepare("SELECT * FROM follow_tasks WHERE id=? AND closing_id=? AND user_id=?").bind(body.task_id,id,user.id).first();
   if(!task)return error("Task not found",404);
   if(task.due_date<new Date().toISOString().slice(0,10))return error("Expired tasks are locked",409);
   const title=String(body.title||task.title).trim().slice(0,150),date=String(body.date||task.due_date),status=body.done===true?"done":body.done===false?"pending":task.status;
   if(!title||!isoDate(date))return error("Invalid task");
   await db.prepare("UPDATE follow_tasks SET title=?,due_date=?,status=? WHERE id=? AND user_id=?").bind(title,date,status,task.id,user.id).run();return reply({ok:true});
  }
 }
 return error("Not found",404);
 }catch(e){if(String(e).includes("UNIQUE constraint"))return error("Already exists or was already used",409);return error("Request could not be completed. Please try again.",500)}
}
