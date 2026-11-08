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
        tools.innerHTML='<strong>Create &amp; Save Your Tables</strong><span>Select tasks below, then save your named table for future use.</span><div class="v5-inline-selection-actions"></div>';
        taskTable.insertAdjacentElement('beforebegin',tools);
      }
      for(const btn of [save,load,del])if(btn.parentElement!==tools)tools.append(btn);
    }
    // Put the useful controls directly above the table, without an empty manager panel.
    const selectArea=section.querySelector('.v5-library-top-actions .v5-inline-selection-actions');
    const tools=section.querySelector('.v5-library-top-actions');
    for(const id of ['clearDates','restore','sort']){
      const el=document.getElementById(id);
      if(el&&tools&&el.parentElement!==tools)tools.appendChild(el);
    }
    // Old manager can contain dynamically created buttons: move them before removing it.
    const obsoleteManager=section.querySelector('.v5-compact-manager');
    if(obsoleteManager){
      for(const el of Array.from(obsoleteManager.querySelectorAll('button'))){
        if(['clearDates','restore','sort'].includes(el.id)&&tools)tools.appendChild(el);
      }
      obsoleteManager.remove();
    }
    for(const id of ['selectedCount']){
      const el=document.getElementById(id);
      if(el&&el.parentElement!==selectArea)selectArea.appendChild(el);
    }
    let selectAll=section.querySelector('#v5SelectAll');
    if(selectAll&&selectArea&&selectAll.parentElement!==selectArea)selectArea.appendChild(selectAll);
    if(!selectAll){
      selectAll=document.createElement('button');
      selectAll.id='v5SelectAll';
      selectAll.type='button';
      selectAll.textContent='Select All';
      selectAll.addEventListener('click',function(){
        // The header's original click handler DESELECTS tasks; use row checkboxes instead.
        const boxes=Array.from(section.querySelectorAll('.v3-scroll tbody tr td.sel input[type="checkbox"]')).filter(x=>!x.disabled);
        for(const box of boxes)if(!box.checked)box.click();
      });
      if(selectArea)selectArea.appendChild(selectAll);
    }
        // Keep selection and deletion controls together in the table-library toolbar.
    const deleteSelected=Array.from(section.querySelectorAll('button')).find(el=>/delete selected/i.test(el.textContent));
    if(deleteSelected&&selectArea&&deleteSelected.parentElement!==selectArea)selectArea.appendChild(deleteSelected);
    // Remove duplicate Select All controls produced by older layout handlers.
    const duplicates=Array.from(section.querySelectorAll('button')).filter(el=>el!==selectAll&&/^select all$/i.test(el.textContent.trim())&&el.id!=='selectHeader');
    for(const duplicate of duplicates)duplicate.hidden=true;
const actions=section.querySelector('.v3-actions');
    if(actions){
      const hint=actions.querySelector('.v3-selection-hint');
      if(hint)hint.hidden=true;
      for(const el of Array.from(actions.querySelectorAll('button'))){
        if(/clear all tasks/i.test(el.textContent))el.hidden=true;
      }
    }
    for(const el of Array.from(section.querySelectorAll('a,button'))){
      if(/create personal task page/i.test(el.textContent))el.hidden=true;
    }
    const descriptions={
      add:'Add a new task to customize this table.',
      clearDates:'Clear dates without deleting task names.',
      restore:'Restore the original suggested tasks.',
      sort:'Arrange tasks by their due dates.',
      v5SelectAll:'Select all available tasks without deleting or changing their names.',
      rcSaveDraft:'Save the selected tasks under your chosen table name. Unselected tasks remain available.',
      rcLoadTable:'Open the named table selected in My Saved Tables.',
      rcDeleteTable:'Permanently delete the selected saved table after confirmation.',
      v5NameSaveTable:'Go to the name and purpose fields to save this selection.',
      rcCopy:'Preview the formatted table before copying it.',
      rcPrepare:'Prepare an email with the selected tasks and recipient.'
    };
    for(const [id,description] of Object.entries(descriptions)){
      const el=document.getElementById(id);
      if(el){el.title=description;el.setAttribute('aria-description',description);}
    }
    const savedSelect=document.getElementById('rcLibraryList');
    if(savedSelect)savedSelect.title='Choose the saved table to open or delete.';
    const libraryName=document.getElementById('rcTableName');
    if(libraryName)libraryName.title='Give this table a memorable name, such as Buyer Agent — Deadlines.';
    const selectionHeader=document.getElementById('selectHeader');
    if(selectionHeader){
      const cell=selectionHeader.closest('th');
      if(cell){cell.style.setProperty('min-width','60px');cell.style.setProperty('width','60px');cell.style.setProperty('white-space','normal');cell.title='Check the tasks to include in your saved table.';}
      selectionHeader.title='Select all tasks for your saved table.';
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