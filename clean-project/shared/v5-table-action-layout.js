/* V5: keep existing add-task handler; move its button beneath Table 01. */
(function(){
  function setup(){
    const section=document.getElementById('contract-input');
    if(!section)return false;
    const foot=section.querySelector('.v3-foot');
    const add=document.getElementById('add');
    if(!foot||!add)return false;
    let bar=section.querySelector('.v5-task-edit-actions');
    if(!bar){
      bar=document.createElement('div');
      bar.className='v5-task-edit-actions';
      bar.innerHTML='<strong class="v5-task-title" style="flex:1 1 100%;font-size:18px;color:#193d52">Create Your Own Tasks &amp; Tables</strong><span class="v5-task-caption">Customize tasks, create reusable tables, and save each one with a name and purpose for future use.</span><button type="button" id="v5NameSaveTable">Name &amp; Save This Table ↓</button>';
      foot.insertAdjacentElement('afterend',bar);
      bar.querySelector('#v5NameSaveTable').addEventListener('click',function(){
        const lib=document.getElementById('rcTableLibrary');
        if(!lib){return;}
        lib.scrollIntoView({behavior:'smooth',block:'center'});
        const name=lib.querySelector('input');
        if(name)setTimeout(()=>name.focus({preventScroll:true}),300);
      });
    }
    if(add.parentElement!==bar)bar.insertBefore(add,bar.querySelector('#v5NameSaveTable'));
    add.hidden=false;
    return true;
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setup);
  else setup();
  const observer=new MutationObserver(function(){if(setup())observer.disconnect();});
  observer.observe(document.documentElement,{childList:true,subtree:true});
  setTimeout(()=>observer.disconnect(),15000);
})();