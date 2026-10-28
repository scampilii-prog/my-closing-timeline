/* Existing PRO D1 account, promo redemption and Stripe Sandbox endpoints.
   Verified first-time codes are sent automatically; no admin approval. */
(function(){
"use strict";
var $=function(id){return document.getElementById(id)},user=null,pricing=null,ready=null;
var giftKey="mct-activation-code-pending-v1",previousGiftKey="mct-pending-private-gift-v1";
function message(id,text,type){var el=$(id);if(!el)return;el.textContent=text;el.dataset.type=type||"info";el.hidden=false}
async function api(route,options){
 var response=await fetch("/api/pro/"+route,Object.assign({credentials:"same-origin",cache:"no-store"},options||{}));
 var data={};try{data=await response.json()}catch(e){}
 if(!response.ok)throw Error(data.error||"This service is not available yet.");
 return data;
}
function safeCode(s){return /^MCT-[A-Z0-9_-]{12,60}$/.test(String(s||"").toUpperCase())}
function rememberCode(s){
 if(!safeCode(s))return;
 // Preserve the same private code across the registration/verification journey.
 // The PRO registration page already reads this original same-origin key.
 try{sessionStorage.setItem(giftKey,JSON.stringify({code:s,until:Date.now()+86400000}))}catch(e){}
 try{localStorage.setItem(previousGiftKey,JSON.stringify({code:s,expires:Date.now()+86400000}))}catch(e){}
}
function remembered(){
 try{
 var u=new URLSearchParams(location.hash.replace(/^#/,""));var c=(u.get("gift")||"").trim().toUpperCase();
 if(location.hash.startsWith("#gift=")){
  history.replaceState(null,"",location.pathname+location.search+"#mct-activation-gift");
  if(safeCode(c)){rememberCode(c);return c}
 }
 var x=JSON.parse(sessionStorage.getItem(giftKey)||"null");
 if(x&&Date.now()<x.until&&safeCode(x.code))return x.code;
 var y=JSON.parse(localStorage.getItem(previousGiftKey)||"null");
 if(y&&Date.now()<Number(y.expires)&&safeCode(y.code)){rememberCode(y.code);return y.code}
 }catch(e){}
 return "";
}
function clearCode(){try{sessionStorage.removeItem(giftKey);localStorage.removeItem(previousGiftKey)}catch(e){}}
function isTest(){return !!(ready&&ready.checkoutSandbox&&pricing&&pricing.catalogReady)}
function numPrice(cents){return "$"+(Number(cents)/100).toFixed(2)}
function showPrice(){
 var plan=$("mct-activate-plan").value,p=pricing&&pricing.plans&&pricing.plans[plan],offer=pricing&&pricing.campaign&&pricing.campaign.active;
 var amount=p&&(offer&&p.launchAmount!=null?p.launchAmount:p.regularAmount);
 $("mct-activation-price").textContent=amount==null?"Price unavailable":numPrice(amount);
 $("mct-activation-price-caption").textContent=offer?"LAUNCH90 introductory offer shown for Sandbox testing.":"Standard proposed rate. No live checkout.";
}
function updateView(){
 var sign=$("mct-activation-signin"),signed=$("mct-activation-signed");
 document.body.classList.toggle("mct-activation-account-verified",!!user);
 $("mct-activation-account-heading").textContent=user?"Account verified — activate your FREE credit":"Create your FREE account or sign in";
 $("mct-activation-account-kicker").textContent=user?"STEP 1 · COMPLETED":"STEP 1 · START HERE";
 sign.hidden=!!user;signed.hidden=!user;
 $("mct-activation-user").textContent=user?user.email:"";
 $("mct-activation-balance").textContent=user?(user.credits+" credit"+(user.credits===1?"":"s")+" available"):"";
 $("mct-activate-redeem").disabled=!user;
 $("mct-activate-check").disabled=!user;
 $("mct-activate-pay").disabled=!user||!isTest();
 $("mct-activate-checkout-note").textContent=user&&!isTest()?"Stripe Sandbox is not configured or the price catalog needs updating. No payment is possible.":"Stripe Sandbox test only. Never use a real card.";
 $("mct-activation-ready").hidden=!(user&&Number(user.credits)>0);
 if(user&&Number(user.credits)>0){$("mct-activation-ready-count").textContent=user.credits+" PRO credit"+(user.credits===1?"":"s")+" ready to use."}
 showPrice();
}
async function load(){
 var c=remembered();
 document.body.classList.toggle("mct-activation-gift-visit",!!c);
 if(c){
  $("mct-activate-code").value=c;
  message("mct-activate-gift-status","Your private FREE code has been entered automatically. Sign in with the invited email, then activate your $0.00 credit.","info");
 }else{
  $("mct-activation-heading").textContent="Activate Your PRO Credit.";
  $("mct-activation-hero-description").textContent="Already received your free code? Paste it below. First register or sign in using the same verified email. Paid Sandbox checkout is optional.";
  $("mct-activation-gift-instructions").textContent="Enter your personal MCT- code from the confirmation email. No credit card is needed for a first-time invitation.";
  message("mct-activate-gift-status","Already have a FREE code? Paste it above, then sign in with the email that received it.","info");
 }

 var checks=await Promise.allSettled([api("me"),api("health"),api("pricing")]);
 if(checks[0].status==="fulfilled"){var a=checks[0].value;user=a.authenticated?a.user:null}else message("mct-activate-status","Account service is temporarily unavailable. You can try signing in again.","error");
 if(checks[1].status==="fulfilled")ready=checks[1].value.configured||{};
 if(checks[2].status==="fulfilled")pricing=checks[2].value;
 updateView();
 if(user&&new URLSearchParams(location.search).has("verified"))message("mct-activate-status","Account email verified. Your personal code is ready for activation below.","success");
 else if(user)message("mct-activate-status","You are signed in. Continue with Step 2 to activate your FREE credit.","success");
 else message("mct-activate-status","START HERE: select the gold Create My FREE Account button, or Sign In if you already registered. Use the email that received your code.","info");
}
async function checkOrRedeem(redeem){
 if(!user){message("mct-activate-gift-status","First create your account and verify your email using the same address as your invitation.","error");return}
 var code=$("mct-activate-code").value.trim().toUpperCase();
 if(!safeCode(code)){message("mct-activate-gift-status","Enter the private MCT- code from your invitation email. LAUNCH90 is only a paid discount.","error");return}
 var btn=$(redeem?"mct-activate-redeem":"mct-activate-check");btn.disabled=true;
 try{
 var result=await api(redeem?"promo/redeem":"promo/check",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({code})});
 if(redeem){clearCode();$("mct-activate-code").value="";var m=await api("me");user=m.authenticated?m.user:user;updateView();message("mct-activate-gift-status","Success! "+result.credits_added+" complimentary PRO Closing Credit added to your account. No card or payment was needed.","success");$("mct-activation-ready").scrollIntoView({behavior:"smooth",block:"center"})}
 else{rememberCode(code);message("mct-activate-gift-status","Your FREE code is valid. Now click Activate My FREE Credit — $0.00. No payment required.","success")}
 }catch(e){message("mct-activate-gift-status",e.message,"error")}
 finally{updateView()}
}
async function checkout(){
 if(!user){message("mct-activate-pay-status","Please register and verify your email first.","error");return}
 if(!isTest()){message("mct-activate-pay-status","Stripe Sandbox is not ready. No payment was taken.","error");return}
 var btn=$("mct-activate-pay");btn.disabled=true;
 try{
 message("mct-activate-pay-status","Opening Stripe Sandbox TEST checkout…","info");
 var plan=$("mct-activate-plan").value,discount=pricing&&pricing.campaign&&pricing.campaign.active;
 var data=await api("checkout",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({plan:plan,code:discount?"LAUNCH90":""})});
 if(!/^https:\/\//i.test(data.checkout_url||""))throw Error("Checkout link was not valid.");
 location.assign(data.checkout_url);
 }catch(e){message("mct-activate-pay-status",e.message+". No payment was confirmed.","error");updateView()}
}
function start(){
 $("mct-activate-check").addEventListener("click",function(){checkOrRedeem(false)});
 $("mct-activate-redeem").addEventListener("click",function(){checkOrRedeem(true)});
 $("mct-activate-pay").addEventListener("click",checkout);
 $("mct-activate-plan").addEventListener("change",showPrice);
 $("mct-activate-code").addEventListener("change",function(){var c=this.value.trim().toUpperCase();this.value=c;if(safeCode(c)){rememberCode(c);document.body.classList.add("mct-activation-gift-visit")}});
 load();
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start);else start();
})();