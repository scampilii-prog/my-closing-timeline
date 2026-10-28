/* PRO tool availability: presentation gate for the preview page.
   This does not replace secure server-side authorization for saved closings. */
(()=>{"use strict";
 const init=()=>{
  if(!/\/pro-timeline(?:\.html)?\/?$/.test(location.pathname))return;
  const $=id=>document.getElementById(id),root=$("contract-deadline-planner");
  if(!root)return;
  const status=$("mct-pro-access-status"),extra=$("mct-pro-extra-tools");
  const toggle=$("mct-pro-more-toggle"),privateButton=$("mct-pro-private-pdf-shortcut");
  const locked=[...root.querySelectorAll("[data-pro-tool]")];
  const privateExport=()=>root.querySelector(".mct-private-export .mct-private-action button");
  let entitled=false;
  const reset=()=>{
   locked.forEach(button=>{button.disabled=!entitled;button.setAttribute("aria-disabled",String(!entitled))});
   const exportButton=privateExport();
   if(exportButton){exportButton.disabled=!entitled;exportButton.setAttribute("aria-disabled",String(!entitled))}
   if(!entitled&&extra){extra.hidden=true;toggle?.setAttribute("aria-expanded","false")}
  };
  function note(message,active){
   if(!status)return;
   status.dataset.state=active?"ready":"locked";
   status.replaceChildren();
   status.append(document.createTextNode(message));
   const link=document.createElement("a");
   link.href=active?"/my-closings.html":"/pro-get-started.html";
   link.textContent=active?"My Saved Closings": "Sign in / Activate PRO";
   status.append(document.createTextNode(" · "),link);
  }
  // The free mail tools are intentionally not locked.
  reset();
  if(toggle)toggle.addEventListener("click",()=>{
   if(!entitled||!extra)return;
   extra.hidden=!extra.hidden;
   toggle.setAttribute("aria-expanded",String(!extra.hidden));
   toggle.textContent=extra.hidden?"▸ More Tools":"▾ More Tools";
  });
  if(privateButton)privateButton.addEventListener("click",()=>{
   if(!entitled)return;
   const pdf=privateExport();
   if(!pdf){note("Private PDF is unavailable in this browser. Your closing data has not been sent.",true);return}
   pdf.click();
  });
  const check=async()=>{
   try{
    const response=await fetch("/api/pro/me",{method:"GET",credentials:"same-origin",cache:"no-store",headers:{Accept:"application/json"}});
    if(!response.ok)throw Error("Not authorized");
    const data=await response.json();
    entitled=data.authenticated===true && (Number(data.user?.credits||0)>0||Array.isArray(data.closings)&&data.closings.length>0);
    reset();
    if(entitled)note("PRO tools enabled. Complete private PDF fields only after downloading the file.",true);
    else note("Extra tools require a verified PRO account and an activated Closing Credit.",false);
   }catch(e){entitled=false;reset();note("PRO tools are locked until your account access can be verified.",false)}
  };
  check();
  window.addEventListener("pageshow",e=>{if(e.persisted){entitled=false;reset();check()}});
 };
 if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});else init();
})();
