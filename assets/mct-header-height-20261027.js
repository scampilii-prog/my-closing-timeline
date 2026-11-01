/* Canonical masthead: measured layout alignment and header spacer. */
(()=>{'use strict';
 const header=document.getElementById('mct-site-header');
 const spacer=document.getElementById('mct-fixed-header-spacer');
 const inner=header?.querySelector('.mct-header-inner');
 const hero=document.querySelector('.mct-photo-hero-content');
 if(!header||!spacer)return;
 let framePending=false;
 function update(){
  framePending=false;
  const height=Math.ceil(header.getBoundingClientRect().height);
  if(height>0)spacer.style.setProperty('height',height+'px','important');
  if(!inner||!hero)return;
  if(window.innerWidth<=700){
   for(const p of ['width','margin-left','margin-right','max-width'])inner.style.removeProperty(p);
   return;
  }
  // Match the actual hero title's left edge, irrespective of conflicting historical CSS.
  const x=Math.max(20,Math.round(hero.getBoundingClientRect().left));
  const planner=document.querySelector('#contract-deadline-planner');
  const plannerEdge=planner?.getBoundingClientRect().right;
  const right=plannerEdge>0?Math.max(14,Math.round(window.innerWidth-plannerEdge)):32;
  inner.style.setProperty('margin-left',x+'px','important');
  inner.style.setProperty('margin-right',right+'px','important');
  inner.style.setProperty('width',Math.max(320,window.innerWidth-x-right)+'px','important');
  inner.style.setProperty('max-width','none','important');
 }
 function schedule(){if(!framePending){framePending=true;requestAnimationFrame(update)}}
 schedule();
 if(typeof ResizeObserver==='function'){const ro=new ResizeObserver(schedule);ro.observe(header);if(hero)ro.observe(hero)}
 window.addEventListener('resize',schedule,{passive:true});
 window.addEventListener('load',schedule,{once:true});
 if(document.fonts?.ready)document.fonts.ready.then(schedule).catch(()=>{});
})();