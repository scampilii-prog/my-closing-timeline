/* Website 19 — Same-page choice between Real Estate and Other Projects.
   Displays the canonical Other Projects editor in a responsive same-origin
   frame, without duplicating date formulas, saved state or task implementations.
   No customer data or credentials flow through frame messages. */
(function(){
 "use strict";
 function init(){
  var links=Array.from(document.querySelectorAll('a[data-mct-inline-choice]'));
  function markChoice(link){
   if(!link)return;
   var group=link.closest(".mct-product-path");
   if(!group)return;
   group.querySelectorAll("a[data-mct-inline-choice]").forEach(function(a){
    var selected=a===link;
    a.classList.toggle("active",selected);
    if(selected)a.setAttribute("aria-current","true");
    else a.removeAttribute("aria-current");
   });
  }
  links.forEach(function(link){
   link.addEventListener("click",function(){markChoice(link)});
  });
  if(location.hash){
   var chosen=links.find(function(link){return link.getAttribute("href")===location.hash});
   if(chosen)markChoice(chosen);
  }
  window.addEventListener("hashchange",function(){
   var chosen=links.find(function(link){return link.getAttribute("href")===location.hash});
   if(chosen)markChoice(chosen);
  });
  Array.from(document.querySelectorAll("iframe[data-mct-inline-project]")).forEach(function(frame){
   var observer=null,doc=null,section=null;
   function resize(){
    if(!section||!frame.isConnected)return;
    // Same origin: measure the real editor, not a fixed-height iframe
    // or the hidden website header/footer.
    var height=Math.ceil(section.getBoundingClientRect().height)+24;
    if(Number.isFinite(height))frame.style.height=Math.min(16000,Math.max(570,height))+"px";
   }
   frame.addEventListener("load",function(){
    if(observer){observer.disconnect();observer=null}
    try{
     doc=frame.contentDocument;
     var mode=frame.dataset.mctInlineProject;
     if(!doc||doc.documentElement.getAttribute("data-mpt-embed")!==mode)throw new Error("Unexpected embedded view");
     section=doc.getElementById(mode==="free"?"mpt-free-preview":"mpt-pro-preview");
     if(!section)throw new Error("Project timeline missing");
     resize();
     if(window.ResizeObserver){observer=new ResizeObserver(resize);observer.observe(section)}
     // Links within an embedded editor leave the frame, not the website.
     doc.querySelectorAll('a[href^="/"]').forEach(function(a){a.target="_top"});
     var msg=frame.parentElement.querySelector(".mct-inline-status");
     if(msg)msg.textContent=mode==="free"?"FREE project tasks are ready below.":"PRO project follow-up demonstration is ready below. No payments are active.";
    }catch(e){
     frame.style.height="650px";
     var note=frame.parentElement.querySelector(".mct-inline-status");
     if(note)note.textContent="The embedded planner could not be displayed. Please use the separate Other Projects page link below.";
    }
   });
   window.addEventListener("resize",resize,{passive:true});
  });
 }
 if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);
 else init();
})();
