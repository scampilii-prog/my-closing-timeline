/* Contract forms per closing; PRO templates live in verified account D1, never in browser-only storage. */
(function(){
 'use strict';
 const $=id=>document.getElementById(id),root=$('contract-deadline-planner');
 let input=$('mct-contract-form-input');const add=$('mct-contract-form-add');
 const list=$('mct-contract-form-list'),feedback=$('mct-contract-form-feedback');
 const status=$('mct-contract-form-account-status'),hidden=$('deadline-contract-form');
 if(!root||!input||!add||!list||!feedback||!status||!hidden)return;
 const formCategories=["Purchase Agreement","Contract Addendum","Condo Rider","HOA Addendum","Financing Addendum","Inspection Addendum","Lead Paint Disclosure","Seller Disclosure","Survey","Title Commitment","Estoppel","Loan Approval","Closing Disclosure","Settlement Statement","Other Generic Form"];
 const templateCategories=["Standard Purchase","Condo / HOA","Cash Purchase","New Construction","Investment Purchase","Other Generic Package",...Array.from({length:20},(_,i)=>"Template Set "+String(i+1).padStart(2,"0"))];
 // Replace free-text document entry with non-identifying categories for FREE and PRO.
 const formSelector=document.createElement('select');formSelector.id=input.id;formSelector.setAttribute('aria-label','Choose a generic document type');
 formSelector.append(new Option('Select document type',''));
 for(const label of formCategories)formSelector.append(new Option(label,label));
 input.replaceWith(formSelector);input=formSelector;
 const isFree=Number(root.dataset.freeTaskLimit||0)>0||location.pathname.endsWith('/free-timeline.html');
 const editor=$('mct-contract-forms-editor'),forms=[],templates=[];
 let authorized=false,revision=0,selectedId='',loading=true,busy=false;
 const clean=value=>{const name=String(value||'').replace(/\s+/g,' ').trim();return formCategories.find(t=>t.toLocaleLowerCase('en')===name.toLocaleLowerCase('en'))||''};
 const contains=s=>forms.some(f=>f.toLocaleLowerCase('en')===s.toLocaleLowerCase('en'));
 const snapshot=()=>forms.slice();
 const tell=(message,state='')=>{status.textContent=message;status.dataset.state=state};
 function redraw(){
  // Names are informational. Never activate form-specific legal rules by default.
  hidden.value='';
  list.replaceChildren();
  for(const form of forms){
   const chip=document.createElement('div');chip.className='mct-contract-form-chip';chip.setAttribute('role','listitem');
   const label=document.createElement('span');label.textContent=form;
   const edit=document.createElement('button');edit.type='button';edit.textContent='✎';
   edit.className='mct-form-rename';edit.setAttribute('aria-label','Edit '+form);
   edit.textContent='Change';
   edit.addEventListener('click',()=>{
    const index=forms.indexOf(form);if(index<0)return;
    forms.splice(index,1);revision++;redraw();input.value=form;input.focus();
    feedback.textContent='Choose a different generic document category and select Add.';
   });
   const del=document.createElement('button');del.type='button';del.textContent='×';
   del.setAttribute('aria-label','Remove '+form);
   del.addEventListener('click',()=>{
    const index=forms.indexOf(form);if(index<0)return;
    forms.splice(index,1);revision++;redraw();feedback.textContent='Removed '+form+' from this closing. Saved PRO templates were not changed.';
   });
   chip.append(label,edit,del);list.append(chip);
  }
 }
 function useForms(values){
  forms.length=0;
  for(const raw of Array.isArray(values)?values:[]){
   const name=clean(raw);if(name&&!contains(name))forms.push(name);
  }
  revision++;redraw();
 }
 function addForm(){
  const name=clean(input.value);
  if(!name){feedback.textContent='Choose a generic document type. Do not enter personal information.';input.focus();return}
  if(contains(name)){feedback.textContent='Already in this closing.';input.focus();return}
  forms.push(name);revision++;redraw();input.value='';
  feedback.textContent='Added '+name+' to this closing.';input.focus();
 }
 add.addEventListener('click',addForm);
 input.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();addForm()}});
 const opts=root.querySelector('.fc-simple-options > summary');
 if(opts){
  opts.replaceChildren();
  const heading=document.createElement('strong');heading.textContent='More Options · Contract Forms, Addenda & Notes';
  const description=document.createElement('span');description.textContent='Click to add your contract documents and additional details.';
  opts.append(heading,description);
 }
 const intro=editor&&editor.querySelector('.mct-contract-form-lead');
 if(intro)intro.textContent='Choose generic contract or addendum types. No buyer, seller or property details are collected here.';
 const hint=$('mct-contract-form-hint');
 if(hint)hint.textContent='Document categories do not change contractual deadlines. Verify dates against the signed agreement.';
 const title=editor&&editor.querySelector('h5');
 if(title)title.firstChild.textContent='Contract Forms & Addenda ';
 window.MCTContractFormsGetLabels=snapshot;
 window.MCTContractFormsGetState=()=>({forms:snapshot(),primary:''});
 window.MCTContractFormsRestore=data=>{
  if(!data||!Array.isArray(data.forms))return;
  useForms(data.forms);
  feedback.textContent='Closing document names restored. PRO templates remain unchanged.';
 };
 if(isFree){
  loading=false;
  tell('FREE · Choose generic document types only. No personal names or addresses; nothing is saved to an account.');
  redraw();return;
 }
 const box=document.createElement('section');box.className='mct-template-tools';box.setAttribute('aria-label','Personal PRO contract form templates');
 box.innerHTML='<div class="mct-template-head"><strong>PRO · My Saved Form Templates</strong><span>Save a named collection to your account and reuse it on future closings.</span></div>'+
 '<div class="mct-template-row"><label>Template category<select id="mct-template-name" aria-label="Choose generic template name"></select></label><button type="button" id="mct-template-save">Save as My Template</button></div>'+
 '<div class="mct-template-row"><label>My saved templates<select id="mct-template-select"><option value="">Select a saved template</option></select></label><button type="button" id="mct-template-load">Load My Template</button><button type="button" id="mct-template-manage-toggle" aria-expanded="false">Manage Templates</button></div>'+
 '<div class="mct-template-manage" id="mct-template-manage" hidden><p>Select a saved template to rename/update, make it the default for new closings, or delete it.</p><div class="mct-template-manage-buttons"><button type="button" id="mct-template-update">Update Selected</button><button type="button" id="mct-template-default">Make Default</button><button type="button" id="mct-template-delete">Delete Template</button></div></div>'+
 '<p class="mct-template-help">Loading a template copies its names into this closing. Editing these names does not alter the saved template until you choose Update Selected.</p>';
 editor.insertBefore(box,status);
 const select=$('mct-template-select'),nameInput=$('mct-template-name'),save=$('mct-template-save');
 nameInput.append(new Option('Choose template category',''));
 for(const label of templateCategories)nameInput.append(new Option(label,label));
 const loadButton=$('mct-template-load'),manageButton=$('mct-template-manage-toggle'),manage=$('mct-template-manage');
 const update=$('mct-template-update'),setDefault=$('mct-template-default'),remove=$('mct-template-delete');
 const buttons=[save,loadButton,update,setDefault,remove];
 const current=()=>templates.find(t=>t.id===select.value)||null;
 function repaint(){
  const keep=selectedId||select.value;
  select.replaceChildren();
  const empty=document.createElement('option');empty.value='';empty.textContent=templates.length?'Select a saved template':'No saved templates yet';
  select.append(empty);
  for(const t of templates){
   const option=document.createElement('option');option.value=t.id;
   option.textContent=t.name+(t.is_default?' · Default':'');select.append(option);
  }
  select.value=templates.some(t=>t.id===keep)?keep:'';
  const enabled=authorized&&!busy;
  save.disabled=!enabled;loadButton.disabled=!enabled||!current();
  update.disabled=!enabled||!current();setDefault.disabled=!enabled||!current()||!!current()?.is_default;
  remove.disabled=!enabled||!current();
 }
 function storeTemplates(data){
  templates.length=0;
  for(const t of Array.isArray(data.templates)?data.templates:[]){
   if(t&&typeof t.id==='string'&&Array.isArray(t.forms))templates.push({...t,forms:t.forms.filter(v=>formCategories.includes(v))});
  }
  repaint();
 }
 async function request(action,extra={}){
  if(!authorized){tell('Sign in to a verified PRO account to save templates.','warn');return null}
  if(busy)return null;
  busy=true;repaint();tell('Updating your personal PRO template library…','pending');
  try{
   const response=await fetch('/api/pro/forms/templates',{
    method:'POST',credentials:'same-origin',cache:'no-store',
    headers:{'Content-Type':'application/json'},body:JSON.stringify({action,...extra})
   });
   const data=await response.json();
   if(!response.ok||!data.ok)throw Error(data.error||'Could not save changes');
   storeTemplates(data);tell('Your PRO template library was saved to your account.');
   return data;
  }catch(e){
   tell('Template was not saved: '+(e&&e.message?e.message:'Server unavailable')+'. Try again before leaving this page.','warn');
   return null;
  }finally{busy=false;repaint()}
 }
 select.addEventListener('change',()=>{
  selectedId=select.value;const t=current();
  nameInput.value=t?t.name:'';
  feedback.textContent=t?'Selected '+t.name+'. Choose Load My Template to use its documents on this closing.':'';
  repaint();
 });
 save.addEventListener('click',async()=>{
  const name=nameInput.value.trim();
  if(!templateCategories.includes(name)){feedback.textContent='Choose a generic template category.';nameInput.focus();return}
  if(!forms.length){feedback.textContent='Add at least one document to this closing before saving a template.';return}
  if(templates.some(t=>t.name.toLocaleLowerCase('en')===name.toLocaleLowerCase('en'))){
   feedback.textContent='That template already exists. Select it and use Manage Templates · Update Selected.';return;
  }
  const data=await request('save',{name,forms:snapshot()});
  if(data){
   const created=templates.find(t=>t.name.toLocaleLowerCase('en')===name.toLocaleLowerCase('en'));
   if(created){selectedId=created.id;repaint()}
   feedback.textContent='Saved "'+name+'" as a reusable PRO template.';
  }
 });
 loadButton.addEventListener('click',()=>{
  const t=current();if(!t)return;
  if(forms.length&&JSON.stringify(forms)!==JSON.stringify(t.forms)&&!confirm('Replace the document names on this closing with the selected template?'))return;
  useForms(t.forms);nameInput.value=t.name;
  feedback.textContent='Loaded '+t.name+' into this closing. Saved template unchanged.';
 });
 manageButton.addEventListener('click',()=>{
  manage.hidden=!manage.hidden;manageButton.setAttribute('aria-expanded',String(!manage.hidden));
 });
 update.addEventListener('click',async()=>{
  const t=current();if(!t)return;
  const name=nameInput.value.trim();if(!templateCategories.includes(name)){feedback.textContent='Choose a generic template category.';return}
  if(!confirm('Update "'+t.name+'" with this closing’s document list and the name "'+name+'"?'))return;
  const data=await request('save',{id:t.id,name,forms:snapshot()});
  if(data){selectedId=t.id;repaint();feedback.textContent='Updated saved template '+name+'.'}
 });
 setDefault.addEventListener('click',async()=>{
  const t=current();if(!t)return;
  const data=await request('set_default',{id:t.id});
  if(data){selectedId=t.id;repaint();feedback.textContent=t.name+' will load automatically on a new PRO closing.'}
 });
 remove.addEventListener('click',async()=>{
  const t=current();if(!t)return;
  if(!confirm('Permanently delete "'+t.name+'" from your saved PRO templates? Documents currently on this closing will remain.'))return;
  const data=await request('delete',{id:t.id});
  if(data){selectedId='';nameInput.value='';repaint();feedback.textContent='Deleted saved template. Current closing documents were not removed.'}
 });
 async function loadTemplates(){
  tell('Checking your personal PRO templates…','pending');
  const atStart=revision;
  try{
   const response=await fetch('/api/pro/forms/templates',{credentials:'same-origin',cache:'no-store'});
   if(response.status===401){tell('Sign in and verify your PRO email to save reusable templates. This closing can still use document names.','warn');return}
   const data=await response.json();
   if(!response.ok||!data.ok)throw Error(data.error||'Unavailable');
   authorized=true;storeTemplates(data);
   const preferred=templates.find(t=>t.is_default);
   // Never overwrite closing data or documents typed while loading.
   if(preferred&&revision===atStart&&forms.length===0){
    selectedId=preferred.id;useForms(preferred.forms);nameInput.value=preferred.name;repaint();
    feedback.textContent='Loaded your default template "'+preferred.name+'". Remove any documents not applicable to this closing.';
   }
   tell(templates.length?'PRO · '+templates.length+' saved template(s) available in your account. The current closing’s list is separate.':'PRO · No templates saved yet. Create and name your first collection.');
  }catch(e){tell('Your PRO library could not be loaded. You can edit this closing, but permanent template storage is not confirmed.','warn')}
  finally{loading=false;repaint()}
 }
 redraw();repaint();loadTemplates();
})();
