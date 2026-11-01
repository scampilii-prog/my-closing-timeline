// Stripe webhook: verified raw-body signature and idempotent D1 credit assignment.
const E=new TextEncoder();
const safeEq=(a,b)=>{if(a.length!==b.length)return false;let x=0;for(let i=0;i<a.length;i++)x|=a.charCodeAt(i)^b.charCodeAt(i);return x===0};
async function hmacHex(key,payload){const k=await crypto.subtle.importKey("raw",E.encode(key),{name:"HMAC",hash:"SHA-256"},false,["sign"]);return Array.from(new Uint8Array(await crypto.subtle.sign("HMAC",k,E.encode(payload)))).map(b=>b.toString(16).padStart(2,"0")).join("")}
export async function onRequestPost({request,env}){
 if(!env.PRO_DB||!env.STRIPE_WEBHOOK_SECRET)return new Response("Not configured",{status:503});
 const raw=await request.text();if(raw.length>200000)return new Response("Payload too large",{status:413});
 const header=request.headers.get("Stripe-Signature")||"";const t=/\bt=(\d+)\b/.exec(header);const signatures=[...header.matchAll(/\bv1=([0-9a-f]{64})\b/g)].map(x=>x[1]);if(!t||!signatures.length||Math.abs(Math.floor(Date.now()/1000)-Number(t[1]))>300)return new Response("Invalid signature",{status:400});
 const expected=await hmacHex(env.STRIPE_WEBHOOK_SECRET,t[1]+"."+raw);if(!signatures.some(x=>safeEq(expected,x)))return new Response("Invalid signature",{status:400});
 let evt;try{evt=JSON.parse(raw)}catch(_){return new Response("Invalid JSON",{status:400})}
 if(!["checkout.session.completed","checkout.session.async_payment_succeeded"].includes(evt.type))return new Response("ignored");
 const s=evt.data?.object;if(s?.object!=="checkout.session"||s.mode!=="payment"||s.payment_status!=="paid"||!s.id||!s.metadata?.order_id||!s.client_reference_id)return new Response("Invalid session",{status:400});
 const db=env.PRO_DB;
 const order=await db.prepare("SELECT * FROM purchases WHERE id=? AND checkout_session_id=? AND user_id=?").bind(s.metadata.order_id,s.id,s.client_reference_id).first();if(!order)return new Response("Unknown order",{status:400});
 if(order.amount_cents!==s.amount_total||s.currency!=="usd"||s.livemode!==false)return new Response("Order amount or environment mismatch",{status:400});
 // Safety gate: honor verified paid test orders, but do not automatically issue
 // loyalty bonuses until refunds, D1 migrations and replay tests are certified.
 // Explicitly enabling this flag is a separate launch decision.
 if(env.PRO_LOYALTY_REWARDS_ENABLED!=="true"){
  await db.batch([
   db.prepare("UPDATE purchases SET status='paid' WHERE id=? AND status='pending' AND credited_at IS NULL").bind(order.id),
   db.prepare("UPDATE users SET credits=credits+? WHERE id=? AND EXISTS(SELECT 1 FROM purchases WHERE id=? AND status='paid' AND credited_at IS NULL)").bind(order.credit_quantity,order.user_id,order.id),
   db.prepare("UPDATE purchases SET credited_at=datetime('now') WHERE id=? AND status='paid' AND credited_at IS NULL").bind(order.id)
  ]);
  return new Response("ok",{status:200,headers:{"Cache-Control":"no-store"}});
 }
 // Reward ledger is independent of private gift codes. Unique user/milestone
 // prevents reissuance when Stripe retries or multiple purchases arrive together.
 // Only confirmed, non-refunded purchases at the approved $20/$35 prices qualify.
 // The approved $35 bundle contributes two paid credits toward each milestone.
 const awardedTable="CREATE TABLE IF NOT EXISTS closing_loyalty_rewards (user_id TEXT NOT NULL, milestone INTEGER NOT NULL, credited_at TEXT, PRIMARY KEY(user_id,milestone))";
 const paidUnits="SELECT COALESCE(SUM(credit_quantity),0) FROM purchases WHERE user_id=? AND status='paid' AND credited_at IS NOT NULL AND ((plan_id='single' AND amount_cents=2000 AND credit_quantity=1) OR (plan_id IN ('welcome2','pack2') AND amount_cents=3500 AND credit_quantity=2))";
 // D1 batch executes atomically: payment credit, earned milestone and reward credit.
 await db.batch([
  db.prepare(awardedTable),
  db.prepare("UPDATE purchases SET status='paid' WHERE id=? AND status='pending' AND credited_at IS NULL").bind(order.id),
  db.prepare("UPDATE users SET credits=credits+? WHERE id=? AND EXISTS(SELECT 1 FROM purchases WHERE id=? AND status='paid' AND credited_at IS NULL)").bind(order.credit_quantity,order.user_id,order.id),
  db.prepare("UPDATE purchases SET credited_at=datetime('now') WHERE id=? AND status='paid' AND credited_at IS NULL").bind(order.id),
  db.prepare("WITH RECURSIVE milestones(n) AS (SELECT 1 UNION ALL SELECT n+1 FROM milestones WHERE n < (("+paidUnits+") / 5)) INSERT OR IGNORE INTO closing_loyalty_rewards(user_id,milestone) SELECT ?,n FROM milestones WHERE n<= (("+paidUnits+") / 5)").bind(order.user_id,order.user_id,order.user_id),
  db.prepare("UPDATE users SET credits=credits+(SELECT COUNT(*) FROM closing_loyalty_rewards WHERE user_id=? AND credited_at IS NULL) WHERE id=?").bind(order.user_id,order.user_id),
  db.prepare("UPDATE closing_loyalty_rewards SET credited_at=datetime('now') WHERE user_id=? AND credited_at IS NULL").bind(order.user_id)
 ]);
 return new Response("ok",{status:200,headers:{"Cache-Control":"no-store"}});
}
