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
    const lib=document.getElementById('rcTableLibrary');
    const save=document.getElementById('rcSaveDraft');
    const load=document.getElementById('rcLoadTable');
    const del=document.getElementById('rcDeleteTable');
    const taskTable=section.querySelector('.v3-scroll');
    if(lib&&save&&load&&del&&taskTable){
      let tools=section.querySelector('.v5-library-top-actions');
      if(!tools){
        tools=document.createElement('div');
        tools.className='v5-library-top-actions';
        tools.innerHTML='<strong>My Saved Tables</strong><span>Save, open or delete a named table</span>';
        taskTable.insertAdjacentElement('beforebegin',tools);
      }
      for(const btn of [save,load,del])if(btn.parentElement!==tools)tools.append(btn);
    }
    let manager=section.querySelector('.v5-compact-manager');
    if(!manager){
      manager=document.createElement('div');
      manager.className='v5-compact-manager';
      manager.innerHTML='<div class="v5-manager-group v5-manager-tools"><strong>Table Tools</strong><small>Adjust or restore your tasks</small><div class="v5-manager-buttons"></div></div><div class="v5-manager-group v5-manager-select"><strong>Manage Tasks</strong><small>Select tasks to include in your report</small><div class="v5-manager-buttons"></div></div>';
      const old=section.querySelector('.v3-actions');
      if(old)old.insertAdjacentElement('beforebegin',manager);
    }
    const toolsArea=manager.querySelector('.v5-manager-tools .v5-manager-buttons');
    const selectArea=manager.querySelector('.v5-manager-select .v5-manager-buttons');
    for(const id of ['clearDates','restore','sort']){
      const el=document.getElementById(id);
      if(el&&el.parentElement!==toolsArea)toolsArea.appendChild(el);
    }
    for(const id of ['selectedCount']){
      const el=document.getElementById(id);
      if(el&&el.parentElement!==selectArea)selectArea.appendChild(el);
    }
    let selectAll=manager.querySelector('#v5SelectAll');
    if(!selectAll){
      selectAll=document.createElement('button');
      selectAll.id='v5SelectAll';
      selectAll.type='button';
      selectAll.textContent='Select All';
      selectAll.addEventListener('click',function(){
        const header=document.getElementById('selectHeader');
        if(header&&!header.disabled){header.click();return;}
        const boxes=Array.from(document.querySelectorAll('#rows input[type="checkbox"]')).filter(x=>!x.disabled);
        for(const box of boxes)if(!box.checked)box.click();
      });
      selectArea.appendChild(selectAll);
    }
    const actions=section.querySelector('.v3-actions');
    if(actions){
      for(const el of Array.from(actions.querySelectorAll('button'))){
        if(/clear all tasks/i.test(el.textContent))el.hidden=true;
      }
    }
    for(const el of Array.from(section.querySelectorAll('a,button'))){
      if(/create personal task page/i.test(el.textContent))el.hidden=true;
    }
    add.hidden=false;
    return !!(lib&&save&&load&&del&&taskTable);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setup);
  else setup();
  const observer=new MutationObserver(function(){if(setup())observer.disconnect();});
  observer.observe(document.documentElement,{childList:true,subtree:true});
  setTimeout(()=>observer.disconnect(),15000);
})();