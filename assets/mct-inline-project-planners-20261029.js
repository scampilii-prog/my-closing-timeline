/* Website 19 — same-page, equal access to Real Estate and Other Projects.
   Other Projects is one canonical task engine; the iframe is isolated from
   Real Estate contract data. In-frame navigation and headers are never shown. */
(function(){
 "use strict";
 function init(){
  const links=Array.from(document.querySelectorAll('a[data-mct-inline-choice]'));
  function markChoice(link){
   if(!link)return;
   const group=link.closest(".mct-product-path");
   if(!group)return;
   group.querySelectorAll("a[data-mct-inline-choice]").forEach(function(a){
    const active=a===link;
    a.classList.toggle("active",active);
    if(active)a.setAttribute("aria-current","true");
    else a.removeAttribute("aria-current");
   });
  }
  links.forEach(link=>link.addEventListener("click",function(event){
   markChoice(link);
   if(link.dataset.mctInlineChoice==="other"){
    event.preventDefault();
    const targetSection=document.getElementById("mct-free-other-projects");
    if(!targetSection)return;
    if(history.replaceState)history.replaceState(null,"","#mct-free-other-projects");
    requestAnimationFrame(function(){
      const fixed=document.querySelector("#mct-fixed-header-spacer");
      const nav=document.querySelector(".apphead")||document.querySelector("header");
      const h=fixed?fixed.getBoundingClientRect().height:(nav?nav.getBoundingClientRect().height:85);
      const y=targetSection.getBoundingClientRect().top+window.scrollY-Math.max(0,h)-8;
      window.scrollTo({top:Math.max(0,y),behavior:"smooth"});
    });
    return;
   }
   if(link.dataset.mctInlineChoice!=="realtor")return;
   const heading=document.getElementById("deadline-planner-title");
   if(!heading)return;
   event.preventDefault();
   if(history.replaceState)history.replaceState(null,"","#deadline-planner-title");
   const go=function(){
    const header=document.querySelector(".apphead")||document.querySelector("header");
    const headerHeight=header?Math.max(0,header.getBoundingClientRect().height):85;
    const target=heading.getBoundingClientRect().top+window.scrollY-headerHeight-14;
    window.scrollTo({top:Math.max(0,target),behavior:"smooth"});
   };
   requestAnimationFrame(go);
  }));
  function updateSelection(){
   const match=links.find(link=>link.getAttribute("href")===location.hash);
   if(match)markChoice(match);
  }
  updateSelection();window.addEventListener("hashchange",updateSelection);
  document.querySelectorAll("iframe[data-mct-inline-project]").forEach(function(frame){
   let observer=null,section=null,doc=null;
   const mode=frame.dataset.mctInlineProject;
   frame.style.visibility="hidden";
   function resize(){
    if(!section||!frame.isConnected)return;
    const height=Math.ceil(section.getBoundingClientRect().height)+30;
    if(Number.isFinite(height)&&height>0)frame.style.height=Math.min(16000,Math.max(560,height))+"px";
   }
   function fail(){
    frame.style.display="none";
    const msg=frame.parentElement.querySelector(".mct-inline-status");
    if(msg){
     msg.style.display="block";
     msg.textContent="The project planner could not be loaded here. Open the Other Projects page to continue.";
     const link=document.createElement("a");
     link.href="/other-projects.html#"+(mode==="free"?"mpt-free-preview":"mpt-pro-preview");
     link.textContent="Open Project Timeline";
     link.style.cssText="display:inline-block;margin-left:10px;color:#176d78;font-weight:850";
     msg.append(link);
    }
   }
   frame.addEventListener("load",function(){
    try{
     if(observer){observer.disconnect();observer=null}
     doc=frame.contentDocument;
     if(!doc||!doc.documentElement)throw new Error("Project editor unavailable");
     // The query can be stripped by hosting redirects; set the requested mode
     // from the trusted parent control and then enforce the view explicitly.
     doc.documentElement.setAttribute("data-mpt-embed",mode);
     const main=doc.querySelector("main.mpt-main");
     section=doc.getElementById(mode==="free"?"mpt-free-preview":"mpt-pro-preview");
     if(!main||!section)throw new Error("Project editor missing");
     // Hide duplicate header, hero, navigation and footer even when the
     // deployed child HTML is an older revision without embedding CSS.
     doc.querySelectorAll("header,#mct-fixed-header-spacer,.mpt-hero,footer,.mct-back-to-top,.mct-back-top,[data-mct-back-to-top]").forEach(function(el){
      el.style.setProperty("display","none","important");
     });
     Array.from(main.children).forEach(function(el){
      if(el!==section)el.style.setProperty("display","none","important");
     });
     const sheet=doc.createElement("style");sheet.id="mct-inline-forced-clean-view-20261029";
     sheet.textContent=[
      "html,body{margin:0!important;padding:0!important;scroll-behavior:auto!important;overflow-x:hidden!important;background:#f8fafb!important}",
      "body{min-height:0!important}",
      "main.mpt-main{display:block!important;margin:0!important;padding:0!important;width:100%!important;max-width:none!important}",
      "#mpt-free-preview,#mpt-pro-preview{display:block!important;box-sizing:border-box!important;width:100%!important;margin:0!important;padding:2px 0 9px!important;border:0!important;box-shadow:none!important;background:transparent!important}",
      ".mpt-demo-board{margin:5px 0!important}",
      ".mpt-demo-head,.mpt-free-step-links{display:none!important}",
      "#mpt-free-preview>h2,#mpt-free-preview>.mpt-free-tagline,#mpt-free-preview>.mpt-free-access-note,#mpt-free-preview>.mpt-free-intro,#mpt-free-preview>.mpt-steps,#mpt-free-preview>.mpt-workmode-explainer,#mpt-free-preview>.mpt-example,#mpt-free-preview>.mpt-followup-showcase,#mpt-free-preview>.mpt-followup-bottom,#mpt-free-preview>.mpt-followup-disclaimer{display:none!important}",
      "#mpt-pro-preview>h2,#mpt-pro-preview>p:not(.mpt-plan-offer-terms),#mpt-pro-preview>.mpt-steps,#mpt-pro-preview>.mpt-pro-followup-link,#mpt-pro-preview>.mpt-disclaimer{display:none!important}",
      "#mpt-free-task-demo,#mpt-pro-task-demo{border-radius:10px!important;background:#fff!important;padding:14px!important}",
      "#mpt-free-task-demo .mpt-free-inner-card{background:#fff!important}"
     ].join("\n");
     doc.head.appendChild(sheet);
     // Keep the embedded header stripped from older deployments as well.
     doc.querySelectorAll('a[href^="/"]').forEach(a=>a.target="_top");
     resize();
     if(typeof ResizeObserver==="function"){observer=new ResizeObserver(resize);observer.observe(section)}
     frame.style.visibility="visible";
     const note=frame.parentElement.querySelector(".mct-inline-status");
     if(note){note.textContent="Project tasks ready.";note.style.display="none"}
    }catch(e){fail()}
   });
   frame.addEventListener("error",fail);
   window.addEventListener("resize",resize,{passive:true});
  });
 }
 if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);
 else init();
})();
