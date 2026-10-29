// Cloudflare Pages Function: private server-side feedback delivery via Resend.
// Required Cloudflare environment secrets: RESEND_API_KEY, FEEDBACK_TO_EMAIL
// Optional: FEEDBACK_FROM_EMAIL (verified sender; otherwise uses onboarding@resend.dev for limited tests).
export async function onRequestPost({request,env}){
 const json=(body,status=200)=>new Response(JSON.stringify(body),{status,headers:{"content-type":"application/json;charset=utf-8","cache-control":"no-store"}});
 if(!env.RESEND_API_KEY||!env.FEEDBACK_TO_EMAIL||!(env.FEEDBACK_FROM_EMAIL||env.MCT_FROM_EMAIL))return json({ok:false,message:"Feedback delivery is being configured. Please try again later."},503);
 let d;try{if(Number(request.headers.get("content-length")||0)>12000)return json({ok:false,message:"Message is too long."},413);d=await request.json();}catch{return json({ok:false,message:"Invalid message."},400)}
 if(d.website)return json({ok:true});
 const clean=(x,max)=>typeof x==="string"?x.trim().slice(0,max):"";
 const category=clean(d.category,80),type=clean(d.type,80),message=clean(d.message,3001),reply=clean(d.reply,150);
 if(message.length<10||message.length>3000||!["Real Estate FREE","Other Projects FREE","PRO / Registration","General website feedback","General information / contact"].includes(category)||!["Suggestion / Improvement","Something is not working","Question","Compliment"].includes(type))return json({ok:false,message:"Please review the form fields."},400);
 if(reply&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(reply))return json({ok:false,message:"Please enter a valid reply email."},400);
 const esc=s=>s.replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
 const subject="[MyClosingTimeline] "+type+" — "+category;
 const html="<h2>MyClosingTimeline — Customer Feedback</h2><p><b>Planner:</b> "+esc(category)+"</p><p><b>Type:</b> "+esc(type)+"</p><p><b>Reply email:</b> "+esc(reply||"Not supplied")+"</p><p><b>Message:</b></p><p style='white-space:pre-wrap'>"+esc(message)+"</p>";
 try{let payload={from:(env.FEEDBACK_FROM_EMAIL||env.MCT_FROM_EMAIL),to:[env.FEEDBACK_TO_EMAIL],subject,html};if(reply)payload.reply_to=reply;let res=await fetch("https://api.resend.com/emails",{method:"POST",headers:{"authorization":"Bearer "+env.RESEND_API_KEY,"content-type":"application/json"},body:JSON.stringify(payload)});if(!res.ok)return json({ok:false,message:"The feedback service could not deliver this message. Please try again later."},502);return json({ok:true});}catch{return json({ok:false,message:"The feedback service is temporarily unavailable."},502)}
}
