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
 // A single D1 transaction makes credits idempotent even if Stripe retries this event.
 await db.batch([
  db.prepare("UPDATE purchases SET status='paid' WHERE id=? AND status='pending' AND credited_at IS NULL").bind(order.id),
  db.prepare("UPDATE users SET credits=credits+? WHERE id=? AND EXISTS(SELECT 1 FROM purchases WHERE id=? AND status='paid' AND credited_at IS NULL)").bind(order.credit_quantity,order.user_id,order.id),
  db.prepare("UPDATE purchases SET credited_at=datetime('now') WHERE id=? AND status='paid' AND credited_at IS NULL").bind(order.id)
 ]);
 return new Response("ok",{status:200,headers:{"Cache-Control":"no-store"}});
}
