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
 // Align the fixed masthead to the actual hero title, rather than guessed viewport margins.
 const inner=header.querySelector('.mct-header-inner');
 const hero=document.querySelector('.mct-photo-hero-content');
 const align=()=>{
  if(!hero||!inner)return;
  if(window.matchMedia('(max-width:700px)').matches){
   inner.style.removeProperty('margin-left');inner.style.removeProperty('margin-right');inner.style.removeProperty('width');return;
  }
  const left=Math.max(20,Math.round(hero.getBoundingClientRect().left));
  inner.style.setProperty('margin-left',left+'px','important');
  inner.style.setProperty('margin-right','32px','important');
  inner.style.setProperty('width',Math.max(0,window.innerWidth-left-32)+'px','important');
 };
 sync();align();
 if(typeof ResizeObserver==='function')new ResizeObserver(sync).observe(header);
 window.addEventListener('resize',()=>{sync();align()},{passive:true});
 if(document.fonts?.ready)document.fonts.ready.then(()=>{sync();align()}).catch(()=>{});
})();