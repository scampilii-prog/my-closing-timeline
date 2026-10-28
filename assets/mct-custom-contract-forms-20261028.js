/* Shared contract form labels: blank by default; independent of task limits and date calculations. */
(function(){
 'use strict';
 const select=document.getElementById('deadline-contract-form');
 const input=document.getElementById('mct-contract-form-input');
 const add=document.getElementById('mct-contract-form-add');
 const list=document.getElementById('mct-contract-form-list');
 const feedback=document.getElementById('mct-contract-form-feedback');
 if(!select||!input||!add||!list||!feedback)return;
 const names=[];
 const note=(message)=>{feedback.textContent=message;};
 const listSnapshot=()=>names.slice();
 const active=()=>select.value;
 function render(){
  const previous=active();
  select.replaceChildren();
  const placeholder=document.createElement('option');
  placeholder.value='';placeholder.textContent='No primary form selected';
  select.append(placeholder);
  for(const name of names){
   const option=document.createElement('option');option.value=name;option.textContent=name;
   select.append(option);
  }
  select.value=names.includes(previous)?previous:'';
  list.replaceChildren();
  for(const name of names){
   const item=document.createElement('div');item.className='mct-contract-form-chip';item.setAttribute('role','listitem');
   item.dataset.primary=String(name===select.value);
   const label=document.createElement('span');label.textContent=name;
   const remove=document.createElement('button');
   remove.type='button';remove.textContent='×';remove.setAttribute('aria-label','Remove '+name);
   remove.addEventListener('click',()=>{
    const position=names.indexOf(name);if(position<0)return;
    names.splice(position,1);
    const wasSelected=select.value===name;
    render();
    if(wasSelected){select.value='';select.dispatchEvent(new Event('change',{bubbles:true}));}
    note('Removed '+name+'. '+names.length+' form(s) remaining.');
   });
   item.append(label,remove);list.append(item);
  }
 }
 function addName(){
  const name=input.value.replace(/\s+/g,' ').trim();
  if(!name){note('Enter a contract, rider or addendum name first.');input.focus();return}
  if(names.some(n=>n.toLocaleLowerCase()===name.toLocaleLowerCase())){
   note('This form is already in your list.');input.select();return
  }
  names.push(name);render();
  select.value=name;
  select.dispatchEvent(new Event('change',{bubbles:true}));
  input.value='';
  note('Added '+name+'. '+names.length+' form(s) listed. You can add more.');
  input.focus();
 }
 add.addEventListener('click',addName);
 input.addEventListener('keydown',(event)=>{
  if(event.key==='Enter'){event.preventDefault();addName()}
 });
 select.addEventListener('change',()=>{
  for(const chip of list.children){
   const text=chip.querySelector('span')?.textContent;
   chip.dataset.primary=String(text===select.value);
  }
 });
 window.MCTContractFormsGetLabels=listSnapshot;
 window.MCTContractFormsGetState=()=>({forms:listSnapshot(),primary:active()});
 window.MCTContractFormsRestore=(data)=>{
  if(!data||!Array.isArray(data.forms))return;
  names.length=0;
  for(const value of data.forms){
   const name=String(value||'').replace(/\s+/g,' ').trim().slice(0,160);
   if(name&&!names.some(n=>n.toLocaleLowerCase()===name.toLocaleLowerCase()))names.push(name);
  }
  render();
  if(names.includes(data.primary)){select.value=data.primary;select.dispatchEvent(new Event('change',{bubbles:true}))}
 };
 render();
})();