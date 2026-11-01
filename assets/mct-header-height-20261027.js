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
  // Header horizontal alignment is fixed by canonical CSS at first paint.
  // Do not remeasure and move the brand after fonts, images, or layout settle.
 }
 function schedule(){if(!framePending){framePending=true;requestAnimationFrame(update)}}
 schedule();
 if(typeof ResizeObserver==='function'){const ro=new ResizeObserver(schedule);ro.observe(header);if(hero)ro.observe(hero)}
 window.addEventListener('resize',schedule,{passive:true});
 window.addEventListener('load',schedule,{once:true});
 if(document.fonts?.ready)document.fonts.ready.then(schedule).catch(()=>{});
})();