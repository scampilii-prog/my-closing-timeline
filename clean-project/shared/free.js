(()=>{
'use strict';
const $=id=>document.getElementById(id), IS_PRO=location.pathname.includes('real-estate-pro'), KEY=IS_PRO?'mct-clean-pro-step2-v1':'mct-clean-free-v13';
const defaults=[['1st Deposit',3,'effective'],['2nd Deposit',5,'effective'],['Loan Application',5,'effective'],['Condo Application',5,'effective'],['Property Inspection deadline w/right to cancel',7,'effective'],['LOAN APPROVAL - Notify seller if NO LOAN APPROVAL',30,'effective']];
const initial=()=>({effective:'',closing:'',propertyReference:'',transactionSide:'',confirmed:false,counting:'calendar',activity:[],tasks:defaults.map((x,i)=>({id:'base'+i,name:x[0],days:x[1],basis:x[2],done:false,completedAt:''}))});
// Restore the browser's saved practice, including both transaction dates.
// A refresh must never erase the user's changes.
let state=initial();
try {
  const stored=JSON.parse(localStorage.getItem(KEY)||'null');
  if(stored && typeof stored==='object' && Array.isArray(stored.tasks) && (IS_PRO || stored.tasks.length<=8) &&
     typeof stored.effective==='string' && typeof stored.closing==='string') {
    state={...initial(),...stored,tasks:stored.tasks};
    // Do not carry legacy property names or addresses into the anonymous closing reference.
    if(!/^CL-[A-Z0-9-]{4,24}$/.test(state.propertyReference||''))state.propertyReference='';
  }
} catch (_) { /* Keep defaults if browser storage is unavailable. */ }
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(state))}catch{}};
const iso=d=>[d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-');
const addDays=(date,n)=>{if(!date)return '';const [y,m,d]=date.split('-').map(Number),x=new Date(y,m-1,d,12);x.setDate(x.getDate()+Number(n));return iso(x)};
const addBusinessDays=(date,n)=>{if(!date)return '';const [y,m,d]=date.split('-').map(Number),x=new Date(y,m-1,d,12);let remaining=Math.abs(Number(n)),step=Number(n)<0?-1:1;while(remaining>0){x.setDate(x.getDate()+step);if(x.getDay()!==0&&x.getDay()!==6)remaining--}return iso(x)};
const due=t=>t.manualDue||((state.counting==='business'?addBusinessDays:addDays)(state[t.basis],t.days));
const offsetBetween=(base,target)=>{if(!base||!target)return 0;if(state.counting!=='business')return Math.round((Date.parse(target+'T12:00:00')-Date.parse(base+'T12:00:00'))/86400000);const sign=target>=base?1:-1;let n=0,cursor=base;while(cursor!==target&&Math.abs(n)<366){cursor=addDays(cursor,sign);const day=new Date(cursor+'T12:00:00').getDay();if(day!==0&&day!==6)n+=sign}return n};
const fmt=d=>d?new Date(d+'T12:00:00').toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}):'—';
const recordActivity=(action,task,detail='')=>{state.activity=Array.isArray(state.activity)?state.activity:[];state.activity.unshift({action,task,detail,at:new Date().toISOString()});state.activity=state.activity.slice(0,50)};
const change=()=>{save();render()};
let freezeOrder=false;
let visibleIds=[];
// Stable baseline order: contractual offsets first, closing-relative final steps last.
// Explicit task dates take precedence only when the user has supplied both contract dates.
const originalRank=t=>{const match=/^base(\d+)$/.exec(t.id||'');return match?Number(match[1]):defaults.length+state.tasks.findIndex(x=>x.id===t.id)};
const recommendedRank=t=>t.basis==='closing'?10000+Number(t.days||0):Number(t.days||0);
const dateSorted=()=>state.tasks.slice().sort((a,b)=>{
  const da=state.effective&&state.closing?due(a):'',db=state.effective&&state.closing?due(b):'';
  if(da&&db&&da!==db)return da.localeCompare(db);
  if(da&&!db)return -1;if(db&&!da)return 1;
  return recommendedRank(a)-recommendedRank(b)||originalRank(a)-originalRank(b);
});
const ordered=()=>{
  if(!freezeOrder){visibleIds=dateSorted().map(t=>t.id);}
  const rank=new Map(visibleIds.map((id,i)=>[id,i]));
  return state.tasks.slice().sort((a,b)=>(rank.get(a.id)??999)-(rank.get(b.id)??999));
};
$('taskRows').addEventListener('pointerenter',()=>{freezeOrder=true;});
$('taskRows').addEventListener('pointerleave',()=>{if(freezeOrder){freezeOrder=false;render();}});

const taskStatus=t=>{if(t.done)return 'DONE';const d=due(t),today=iso(new Date());if(!d)return 'SET DATES';if(d<today)return 'OVERDUE';if(d===today)return 'DUE TODAY';return 'PENDING'};
for(const id of ['propertyReference','transactionSide']){$(id)?.addEventListener('change',e=>{if(id==='propertyReference'){const value=e.target.value.trim().toUpperCase();if(value&&!/^CL-[A-Z0-9-]{4,24}$/.test(value)){e.target.setCustomValidity('Use an anonymous ID such as CL-7C2D9A04. No names or addresses.');e.target.reportValidity();return}e.target.setCustomValidity('');state[id]=value;e.target.value=value}else{state[id]=e.target.value}save()})}
function render(){
$('propertyReference').value=state.propertyReference||'';$('transactionSide').value=state.transactionSide||'';
$('effective').value=state.effective;$('closing').value=state.closing;$('dayCounting').value=state.counting||'calendar';
$('effective').disabled=false;$('start').disabled=false;
$('start').textContent=state.confirmed?'Timeline started':'Confirm & Start';
const days=state.effective&&state.closing?Math.round((Date.parse(state.closing+'T12:00:00')-Date.parse(state.effective+'T12:00:00'))/86400000):null;
$('overviewDays').textContent=days===null?'—':String(days);$('overviewMethod').textContent=state.counting==='business'?'Business Days (Mon–Fri)':'Calendar Days';$('overviewStatus').textContent=days===null?'Waiting for Contract Dates':days<0?'Check Closing Date':state.confirmed?'Active · Auto-updating':'Ready to Confirm';
$('dateInfo').textContent=days===null?'Choose both dates to calculate your timeline.':days<0?'Closing Date must not precede Effective Date.':days+' calendar days between Effective Date and Closing Date.';
const done=state.tasks.filter(t=>t.done).length;
$('totalCount').textContent=state.tasks.length;$('openCount').textContent=state.tasks.length-done;$('doneCount').textContent=done;
$('taskRows').replaceChildren();
for(const t of ordered()){
const row=document.createElement('div');row.className='task-row'+(t.done?' done':'');
const name=document.createElement('input');name.type='text';name.className='task-label';name.value=t.name;name.disabled=t.done;name.setAttribute('aria-label','Contract task name');name.addEventListener('change',()=>{t.name=name.value.trim()||'Unnamed task';recordActivity('Renamed',t.name);change()});
const numWrap=document.createElement('div');numWrap.className='days-control';const num=document.createElement('input');num.type='number';num.value=t.days;num.min=-365;num.max=365;num.disabled=t.done;num.setAttribute('aria-label','Days offset for '+t.name);num.addEventListener('change',()=>{const before=due(t);const next=Math.max(-365,Math.min(365,Number(num.value)||0));if(next===Number(t.days))return;t.days=next;delete t.manualDue;recordActivity('Rescheduled',t.name,fmt(before)+' → '+fmt(due(t)));change()});const stepper=document.createElement('div');stepper.className='days-stepper';for(const [symbol,delta] of [['▲',1],['▼',-1]]){const btn=document.createElement('button');btn.type='button';btn.textContent=symbol;btn.setAttribute('aria-label',(delta>0?'Increase':'Decrease')+' days for '+t.name);btn.disabled=t.done;btn.addEventListener('click',()=>{const before=due(t);const next=Math.max(-365,Math.min(365,Number(t.days)+delta));if(next===Number(t.days))return;t.days=next;delete t.manualDue;recordActivity('Rescheduled',t.name,fmt(before)+' → '+fmt(due(t)));change()});stepper.append(btn)}numWrap.append(num,stepper);
const date=document.createElement('div');date.className='due';const dueLabel=document.createElement('span');dueLabel.textContent='Due';const dateInput=document.createElement('input');dateInput.type='date';dateInput.value=due(t);dateInput.disabled=t.done||!state[t.basis];dateInput.setAttribute('aria-label','Due date for '+t.name);dateInput.addEventListener('change',()=>{const base=state[t.basis];if(!base||!dateInput.value)return;const selected=dateInput.value;const before=due(t);if(selected===before)return;const delta=offsetBetween(base,selected);t.days=delta;t.manualDue=selected;recordActivity('Rescheduled',t.name,fmt(before)+' → '+fmt(selected));change()});dateInput.addEventListener('click',()=>{if(!dateInput.disabled&&typeof dateInput.showPicker==='function')try{dateInput.showPicker()}catch{}});const dateStepper=document.createElement('div');dateStepper.className='date-stepper';for(const [symbol,delta] of [['▲',1],['▼',-1]]){const b=document.createElement('button');b.type='button';b.textContent=symbol;b.setAttribute('aria-label',(delta>0?'Next':'Previous')+' due date for '+t.name);b.disabled=dateInput.disabled;b.addEventListener('click',()=>{const current=due(t);if(!current)return;const next=(state.counting==='business'?addBusinessDays:addDays)(current,delta);t.days=offsetBetween(state[t.basis],next);t.manualDue=next;recordActivity('Rescheduled',t.name,fmt(current)+' → '+fmt(next));change()});dateStepper.append(b)}date.append(dueLabel,dateInput,dateStepper);date.addEventListener('click',e=>{if(e.target!==date&&e.target!==dueLabel)return;if(!dateInput.disabled){dateInput.focus();if(typeof dateInput.showPicker==='function')try{dateInput.showPicker()}catch{}}});
const status=document.createElement('span');status.className='task-status'+(t.done?' completed':'');status.textContent=taskStatus(t);
const doneBtn=document.createElement('button');doneBtn.type='button';doneBtn.className='done-btn';doneBtn.textContent=t.done?'Reopen':'Done';doneBtn.addEventListener('click',()=>{t.done=!t.done;t.completedAt=t.done?iso(new Date()):'';recordActivity(t.done?'Completed':'Reopened',t.name);change()});
row.append(name,numWrap,date,status,doneBtn);
const remove=document.createElement('button');remove.type='button';remove.className='remove-task';remove.textContent='Remove';remove.disabled=t.done;remove.addEventListener('click',()=>{if(confirm('Remove this task?')){state.tasks=state.tasks.filter(x=>x.id!==t.id);recordActivity('Removed',t.name);change()}});row.append(remove);$('taskRows').append(row);

}
const list=ordered();
$('closingSummary').replaceChildren();
const summaryHead=document.createElement('div');summaryHead.className='summary-keydates';
for(const [label,value] of [['Effective Date',state.effective],['Closing Date',state.closing]]){const item=document.createElement('div');item.className='summary-keydate';const name=document.createElement('strong');name.textContent=label;const val=document.createElement('span');val.textContent=fmt(value);item.append(name,val);summaryHead.append(item)}
$('closingSummary').append(summaryHead);
const instruction=document.createElement('p');instruction.className='summary-instruction';instruction.textContent=state.effective&&state.closing?'All deadlines update and reorder automatically when either date changes.':'Enter both dates in Step 1 to calculate the complete timeline.';$('closingSummary').append(instruction);
const ul=document.createElement('ol');ul.className='summary-items summary-live';
for(const t of list){const li=document.createElement('li');li.className='summary-live-row'+(t.done?' done':'');
const label=document.createElement('div');label.className='summary-live-task';const taskName=document.createElement('strong');taskName.textContent=t.name;const basis=document.createElement('small');basis.textContent=t.basis==='closing'?(t.days<0?Math.abs(t.days)+' days before closing':t.days+' days after closing'):(t.days<0?Math.abs(t.days)+' days before effective':t.days+' days after effective');label.append(taskName,basis);
const right=document.createElement('div');right.className='summary-live-right';const when=document.createElement('span');when.className='summary-live-date';when.textContent=fmt(due(t));const status=document.createElement('span');status.className='summary-live-status';status.textContent=taskStatus(t);right.append(when,status);
const toggle=document.createElement('input');toggle.type='checkbox';toggle.checked=!!t.done;toggle.setAttribute('aria-label','Mark '+t.name+' done');toggle.addEventListener('change',()=>{t.done=toggle.checked;t.completedAt=t.done?iso(new Date()):'';recordActivity(t.done?'Completed':'Reopened',t.name);change()});
li.append(label,right,toggle);ul.append(li)}$('closingSummary').append(ul);
const t0=iso(new Date()),t1=addDays(t0,1);
for(const [id,items] of [['today',state.tasks.filter(t=>!t.done&&due(t)===t0)],['tomorrow',state.tasks.filter(t=>!t.done&&due(t)===t1)],['overdue',state.tasks.filter(t=>!t.done&&due(t)&&due(t)<t0)]]){
$(id+'Count').textContent=items.length;$(id+'List').replaceChildren();
if(!items.length){$(id+'List').textContent='No '+id+' tasks.';continue}
const ul=document.createElement('ul');for(const t of items){const li=document.createElement('li');li.textContent=t.name;ul.append(li)}$(id+'List').append(ul)
}
const total=state.tasks.length,completed=state.tasks.filter(t=>t.done).length,remaining=total-completed,percent=total?Math.round(completed/total*100):0;
$('progressTotal').textContent=total;$('progressDone').textContent=completed;$('progressRemaining').textContent=remaining;
$('progressPercent').textContent=percent+'%';$('progressFill').style.width=percent+'%';$('progressTrack').setAttribute('aria-valuenow',String(percent));
const activity=Array.isArray(state.activity)?state.activity:[];
$('activityCount').textContent=activity.length+' '+(activity.length===1?'update':'updates');
const activityRow=entry=>{const row=document.createElement('div');row.className='activity-entry';const dot=document.createElement('span');dot.className='activity-dot';dot.textContent=entry.action==='Completed'?'✓':'•';const content=document.createElement('div');const label=document.createElement('strong');label.textContent=entry.task;const meta=document.createElement('small');const date=new Date(entry.at);const stamp=Number.isNaN(date.getTime())?'':date.toLocaleString('en-US',{month:'short',day:'numeric',year:'numeric',hour:'numeric',minute:'2-digit'});meta.textContent=entry.action+(entry.detail?' · '+entry.detail:'')+(stamp?' · '+stamp:'');content.append(label,meta);row.append(dot,content);return row};
$('recentActivity').replaceChildren();if(!activity.length){const empty=document.createElement('p');empty.className='muted';empty.textContent='Activity will appear when tasks are completed or updated.';$('recentActivity').append(empty)}else activity.slice(0,2).forEach(x=>$('recentActivity').append(activityRow(x)));
$('activityToggle').hidden=activity.length<=2;
$('activityHistory').replaceChildren();activity.forEach(x=>$('activityHistory').append(activityRow(x)));
$('taskMessage').textContent=IS_PRO?'PRO preview: unlimited contract tasks. Changes are saved only in this browser.':(state.tasks.length>=8?'FREE limit reached: 8 tasks. Registration is required to continue in PRO.':'FREE practice: '+(8-state.tasks.length)+' additional tasks available.');
}
function timelineText(){
const lines=[IS_PRO?'MY CLOSING TIMELINE · PRO PREVIEW':'MY CLOSING TIMELINE · FREE PRACTICE','Effective Date: '+fmt(state.effective),'Closing Date: '+fmt(state.closing),''];
for(const t of ordered())lines.push((due(t)?fmt(due(t)):'Date not set')+' | '+t.name+' | '+(t.done?'Done':'Pending'));
lines.push('','Planning assistance only. Verify all dates against your signed contract.');
return lines.join('\n');
}
$('dayCounting').addEventListener('change',e=>{state.counting=e.target.value;state.tasks.forEach(t=>delete t.manualDue);recordActivity('Updated','Deadline counting');freezeOrder=false;change()});
$('resetTasks').addEventListener('click',()=>{if(!confirm('Restore the 6 original contract tasks and day offsets? Your edited tasks and their completion status will be replaced.'))return;state.tasks=initial().tasks;recordActivity('Restored','Original task list');freezeOrder=false;change();$('summaryFeedback').textContent='Original task list restored.'});
$('sortTasks').addEventListener('click',()=>{freezeOrder=false;render();$('summaryFeedback').textContent='Tasks automatically sorted by due date.'});
$('updateTable').addEventListener('click',()=>{freezeOrder=false;change();$('summaryFeedback').textContent='Table updated.'});
$('toggleAddTask').addEventListener('click',()=>{$('addTaskPanel').hidden=!$('addTaskPanel').hidden});
$('copyTimeline').addEventListener('click',async()=>{
const value=timelineText();
try{await navigator.clipboard.writeText(value);$('summaryFeedback').textContent='Timeline copied.'}
catch{const area=document.createElement('textarea');area.value=value;document.body.append(area);area.select();const ok=document.execCommand('copy');area.remove();$('summaryFeedback').textContent=ok?'Timeline copied.':'Copy unavailable in this browser.'}
});
$('mailTimeline').addEventListener('click',()=>{
const subject='My Closing Timeline — FREE Practice';
const url='mailto:?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(timelineText());
if(url.length>1800){$('summaryFeedback').textContent='Email is too long for a mail link. Use Copy Timeline instead.';return}
window.location.href=url;
});
for(const id of ['effective','closing']) {
  const el=$(id);
  // Persist immediately when the date changes, not only after confirming.
  el.addEventListener('change',()=>{
    if(state[id]===el.value)return;
    const before=state[id];state[id]=el.value;
    state.tasks.forEach(t=>delete t.manualDue);
    recordActivity('Updated',id==='effective'?'Effective Date':'Closing Date',fmt(before)+' → '+fmt(el.value));
    freezeOrder=false;
    change();
  });
}
for(const id of ['effective','closing']){const el=$(id);el.addEventListener('click',()=>{if(typeof el.showPicker==='function'){try{el.showPicker()}catch(_){}}});}
$('resetDates').addEventListener('click',()=>{
  if(!state.effective&&!state.closing)return;
  if(!confirm('Clear Effective Date and Closing Date? Your task names, day offsets, and completion status will be kept.'))return;
  state.effective='';state.closing='';state.confirmed=false;
  state.tasks.forEach(t=>delete t.manualDue);
  freezeOrder=false;change();
  $('dateInfo').textContent='Dates cleared. Choose new dates to calculate your timeline.';
});
$('start').addEventListener('click',()=>{if(!state.effective||!state.closing||state.closing<state.effective){$('dateInfo').textContent='Enter valid dates. Closing must not precede Effective Date.';return}state.confirmed=true;change()});
$('addTask').addEventListener('click',()=>{if(!IS_PRO && state.tasks.length>=8){render();return}const name=$('taskName').value.trim();if(!name){$('taskMessage').textContent='Enter a task name.';return}const days=Math.max(-365,Math.min(365,Number($('taskDays').value)||0));state.tasks.push({id:'custom'+Date.now(),name,days,basis:days<0?'closing':'effective',done:false,completedAt:''});recordActivity('Added',name);$('taskName').value='';$('addTaskPanel').hidden=true;change()});
$('activityToggle').addEventListener('click',()=>{const panel=$('activityHistory');panel.hidden=!panel.hidden;$('activityToggle').textContent=panel.hidden?'View Activity History':'Hide Activity History'});
render();
})();