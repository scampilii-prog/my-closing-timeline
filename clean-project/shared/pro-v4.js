/* V4: move existing result cards beside their owning STEP without cloning controls. */
(function(){function reorganize(){const contract=document.getElementById('contract-input'),followup=document.getElementById('followup-input'),contractResult=document.getElementById('contract-summary'),followupResult=document.getElementById('followup-summary');if(!contract||!followup||!contractResult||!followupResult)return;function attach(step,result,label){let host=step.querySelector('.v4-integrated-result');if(!host){host=document.createElement('div');host.className='v4-integrated-result';host.setAttribute('aria-label',label);step.appendChild(host)}host.appendChild(result);result.classList.add('v4-inline-summary');const back=result.querySelector('a[href^="#"]');if(back&&/Back to Table/i.test(back.textContent||''))back.hidden=true;const duplicates=result.querySelectorAll('button[data-action="email"],button[data-action="formatted"]');duplicates.forEach(b=>{b.hidden=true});}attach(contract,contractResult,'Step 1 Closing Timeline Summary');attach(followup,followupResult,'Step 2 Follow-Up Summary');const intro=document.querySelector('.v3-results-intro');if(intro)intro.hidden=true;const dashboard=document.querySelector('.v3-dashboard');if(dashboard){dashboard.classList.add('v4-overview-dashboard');dashboard.setAttribute('aria-label','Step 3 Closing Overview');}const panels=document.querySelectorAll('.v3-actions-organized');panels.forEach(p=>p.classList.add('v4-two-by-two'));}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',reorganize);else reorganize();})();

/* V4-only repair controls. V3 script intentionally unchanged. */
(function(){
 function setup(){
  const dates=document.querySelector('#contract-input .v3-date-tool-buttons');
  if(dates&&!document.getElementById('v4EditDates')){
   const edit=document.createElement('button');edit.type='button';edit.id='v4EditDates';edit.textContent='Edit Closing Dates';edit.title='Unlock the dates in this practice record';
   dates.prepend(edit);
   edit.onclick=()=>{
    const key='mct-clean-v3-step1-demo';let data;
    try{data=JSON.parse(localStorage.getItem(key)||'null')}catch{}
    if(!data||!data.started){document.getElementById('effective')?.focus();return}
    if(!confirm('Unlock Effective Date and Closing Date for this practice closing? Your tasks and notes will remain saved.'))return;
    data.started=false;localStorage.setItem(key,JSON.stringify(data));location.reload();
   };
   const reset=document.createElement('button');reset.type='button';reset.id='v4ResetDates';reset.textContent='Reset Dates';
   dates.append(reset);
   reset.onclick=()=>{
    if(!confirm('Clear both dates and unlock this practice closing? Tasks, notes and Done marks will be preserved.'))return;
    const key='mct-clean-v3-step1-demo';let data;
    try{data=JSON.parse(localStorage.getItem(key)||'null')}catch{}
    if(!data)return;
    data.started=false;data.effective='';data.closing='';
    localStorage.setItem(key,JSON.stringify(data));location.reload();
   };
  }
  const bar=document.querySelector('#contract-input .v3-control-share .v3-control-buttons');
  if(bar&&!document.getElementById('v4CopyForEmail')){
   const copy=document.createElement('button');copy.type='button';copy.id='v4CopyForEmail';copy.textContent='Copy Table for Email';copy.title='Select tasks first, then open the formatted report to copy it';
   bar.append(copy);
   const sync=()=>{copy.disabled=!!document.getElementById('copy')?.disabled;copy.title=copy.disabled?'Select contract tasks first':'Open formatted report and use Copy Formatted Table'};
   sync();document.getElementById('rows')?.addEventListener('change',()=>setTimeout(sync,0));
   document.getElementById('selectHeader')?.addEventListener('click',()=>setTimeout(sync,0));
   copy.onclick=()=>{if(copy.disabled)return;document.getElementById('copy')?.click();};
  }
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setup);else setup();
})();
