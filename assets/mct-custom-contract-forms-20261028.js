/* Contract documents library: FREE in-session; verified PRO accounts in Cloudflare D1. */
(function(){
 'use strict';
 const $=id=>document.getElementById(id),root=$('contract-deadline-planner');
 const input=$('mct-contract-form-input'),add=$('mct-contract-form-add');
 const list=$('mct-contract-form-list'),feedback=$('mct-contract-form-feedback');
 const status=$('mct-contract-form-account-status'),hidden=$('deadline-contract-form');
 if(!root||!input||!add||!list||!feedback||!status||!hidden)return;
 const isFree=Number(root.dataset.freeTaskLimit||0)>0,forms=[];
 let authorized=false,loading=!isFree,saving=false,pending=false,revision=0;
 const clean=s=>String(s||'').replace(/\s+/g,' ').trim().slice(0,160);
 const contains=s=>forms.some(f=>f.toLowerCase()===s.toLowerCase());
 const snapshot=()=>forms.slice();
 function tell(msg,state=''){status.textContent=msg;status.dataset.state=state}
 function redraw(){
  hidden.value=''; // No automatic form-specific legal guidance.
  list.replaceChildren();
  for(const form of forms){
   const chip=document.createElement('div');chip.className='mct-contract-form-chip';chip.setAttribute('role','listitem');
   const label=document.createElement('span');label.textContent=form;
   const del=document.createElement('button');del.type='button';del.textContent='×';del.setAttribute('aria-label','Delete '+form);
   del.addEventListener('click',()=>{
    const index=forms.indexOf(form);if(index<0)return;
    forms.splice(index,1);revision++;redraw();feedback.textContent='Deleted '+form+'.';
    if(!isFree)queueSave();
   });
   chip.append(label,del);list.append(chip);
  }
 }
 async function queueSave(){
  if(!authorized){tell(loading?'Checking PRO account…':'Sign in to a verified PRO account to save these names for future closings.','warn');return}
  pending=true;if(saving)return;
  saving=true;
  while(pending){
   pending=false;
   const copy=snapshot(),stamp=revision;
   tell('Saving document names to your PRO account…','pending');
   try{
    const resp=await fetch('/api/pro/forms/library',{
     method:'POST',credentials:'same-origin',cache:'no-store',
     headers:{'Content-Type':'application/json'},body:JSON.stringify({forms:copy})
    });
    const result=await resp.json();
    if(!resp.ok||!result.ok)throw Error(result.error||'Save failed');
    if(stamp!==revision)pending=true;
    else tell('Saved in your PRO account · '+copy.length+' name(s). Available when you open another closing.');
   }catch(err){
    tell('Unable to save in your PRO account right now. These names are visible only on this page until a successful save.','warn');
    break;
   }
  }
  saving=false;
 }
 function addForm(){
  const name=clean(input.value);
  if(!name){feedback.textContent='Enter a document name before adding.';input.focus();return}
  if(contains(name)){feedback.textContent='Already in your list.';input.select();return}
  forms.push(name);revision++;redraw();feedback.textContent='Added '+name+'.';
  input.value='';if(!isFree)queueSave();input.focus();
 }
 async function load(){
  if(isFree){loading=false;tell('FREE: names are editable here but are not saved to an account. PRO users can reuse saved document names.');return}
  tell('Checking your PRO account for saved document names…','pending');
  const atStart=revision;
  try{
   const resp=await fetch('/api/pro/forms/library',{credentials:'same-origin',cache:'no-store'});
   if(resp.status===401){loading=false;tell('Sign in to your verified PRO account to save and reuse this document list.','warn');return}
   const result=await resp.json();if(!resp.ok||!result.ok)throw Error(result.error||'Unavailable');
   const inPage=snapshot();
   forms.length=0;
   for(const raw of [...(Array.isArray(result.forms)?result.forms:[]),...inPage]){
    const name=clean(raw);if(name&&!contains(name))forms.push(name);
   }
   authorized=true;loading=false;redraw();
   if(revision!==atStart||inPage.length){revision++;await queueSave()}
   else tell(forms.length?'Loaded '+forms.length+' saved name(s) from your PRO account. Check that they apply to this closing.':'Your PRO document list is empty. Add documents and they will save to your account.');
  }catch(err){loading=false;tell('PRO library is temporarily unavailable; you can edit here, but saving to your account is not confirmed.','warn')}
 }
 add.addEventListener('click',addForm);
 input.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();addForm()}});
 window.MCTContractFormsGetLabels=snapshot;
 window.MCTContractFormsGetState=()=>({forms:snapshot(),primary:''});
 window.MCTContractFormsRestore=data=>{
  if(!data||!Array.isArray(data.forms))return;
  forms.length=0;
  for(const raw of data.forms){const name=clean(raw);if(name&&!contains(name))forms.push(name)}
  revision++;redraw();if(!isFree)queueSave();
 };
 redraw();load();
})();