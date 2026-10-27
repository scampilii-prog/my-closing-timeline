/* One identical masthead everywhere: reserve its measured height while it stays fixed. */
(()=>{'use strict';
 const header=document.getElementById('mct-site-header');
 const spacer=document.getElementById('mct-fixed-header-spacer');
 if(!header||!spacer)return;
 let last=0;
 const sync=()=>{
  const height=Math.ceil(header.getBoundingClientRect().height);
  if(height<=0||height===last)return;
  last=height;
  spacer.style.setProperty('height',height+'px','important');
 };
 sync();
 if(typeof ResizeObserver==='function')new ResizeObserver(sync).observe(header);
 window.addEventListener('resize',sync,{passive:true});
 if(document.fonts?.ready)document.fonts.ready.then(sync).catch(()=>{});
})();