/* Isolated recipient summary composer; browser-preview only. */
(()=>{'use strict';
const $=id=>document.getElementById(id), key='mct-clean-v3-step1-demo',prefsKey='mct-clean-v4-recipient-summary';
const purposes=['Action Required','Please Confirm','For Review','For Information','Completed','Custom Instruction'];
let prefs={};try{prefs=JSON.parse(localStorage.getItem(prefsKey)||'{}')||{}}catch{}
const save=()=>localStorage.setItem(prefsKey,JSON.stringify(prefs));
const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function state(){try{return JSON.parse(localStorage.getItem(key)||'{}')}catch{return {}}}
function date(iso){if(!iso)return 'Not set';const [y,m,d]=iso.split('-');return m+'/'+d+'/'+y}
function add(iso,n,business){if(!iso)return '';let d=new Date(iso+'T12:00:00');if(!Number.isFinite(d.getTime()))return '';const dir=n<0?-1:1;for(let i=0;i<Math.abs(n);){d.setDate(d.getDate()+dir);if(!business||![0,6].includes(d.getDay()))i++}return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-')}
function rows(){const s=state(),trs=[...document.querySelectorAll('#rows tr')];return trs.map((tr,i)=>{const t=s.tasks?.[i];if(!t)return null;const check=tr.querySelector('td.sel input[type=checkbox]');return {...t,selected:!!check?.checked,due:add(s[t.basis],Number(t.days)||0,s.counting==='business')}}).filter(Boolean).sort((a,b)=>(a.due||'9999').localeCompare(b.due||'9999'))}

function contacts(){try{const v=JSON.parse(localStorage.getItem('mct-clean-v3-recipients-demo')||'[]');return Array.isArray(v)?v.filter(x=>x&&x.name&&x.email):[]}catch{return []}}
function recipientKey(){return ($('rcRecipient')?.value||'default').trim().toLowerCase()}
function draftKey(){return 'draft:'+recipientKey()}
function saveDraft(){prefs[draftKey()]={subject:$('rcSubject').value,body:$('rcBody').value};save()}
function loadDraft(){const d=prefs[draftKey()]||{};$('rcSubject').value=d.subject||'Closing Timeline Summary';$('rcBody').value=d.body||'Please review the selected closing milestones and instructions below.'}
function setting(t){const k=recipientKey()+':'+t.id;return prefs[k]||(prefs[k]={send:true,purpose:'Action Required',note:''})}
function selected(){return rows().filter(t=>t.selected&&setting(t).send)}

const libraryKey='mct-clean-v5-table-library';
function library(){try{const v=JSON.parse(localStorage.getItem(libraryKey)||'[]');return Array.isArray(v)?v:[]}catch{return []}}
function saveLibrary(v){localStorage.setItem(libraryKey,JSON.stringify(v))}
function libraryStatus(msg){const e=$('rcStatus');if(e){e.hidden=false;e.textContent=msg}}
function renderLibrary(){const list=$('rcLibraryList');if(!list)return;const entries=library();list.replaceChildren();for(const item of entries){const option=document.createElement('option');option.value=item.id;option.textContent=item.name+' · '+item.tasks.length+' tasks'+(item.role?' · '+item.role:'');list.append(option)}if(!entries.length){const option=document.createElement('option');option.value='';option.textContent='No saved tables yet';list.append(option)}}
function saveNamedTable(){
 const name=$('rcTableName').value.trim(),role=$('rcTableRole').value.trim();if(!name){libraryStatus('Enter a table name before saving.');$('rcTableName').focus();return}
 const tasks=selected().map(t=>{const p=setting(t);return {id:t.id,name:t.name,purpose:p.purpose,note:p.note,send:true}});
 if(!tasks.length){libraryStatus('Select at least one task to save this table.');return}
 const entries=library(),old=entries.findIndex(x=>x.name.toLowerCase()===name.toLowerCase());if(old>=0&&!window.confirm('Replace the saved table named '+name+'?'))return;
 const item={id:old>=0?entries[old].id:'table-'+Date.now(),name,role,recipient:$('rcRecipient').value.trim(),subject:$('rcSubject').value,body:$('rcBody').value,tasks,updated:new Date().toISOString()};
 if(old>=0)entries[old]=item;else entries.push(item);saveLibrary(entries);renderLibrary();$('rcLibraryList').value=item.id;libraryStatus('Saved "'+name+'" in My Table Library on this browser. Dates will be recalculated from the current closing.')}
function loadNamedTable(){
 const item=library().find(x=>x.id===$('rcLibraryList').value);if(!item){libraryStatus('Choose a saved table.');return}
 $('rcTableName').value=item.name;$('rcTableRole').value=item.role||'';$('rcRecipient').value=item.recipient||'';prefs._recipient=$('rcRecipient').value;save();$('rcSubject').value=item.subject||'Closing Timeline Summary';$('rcBody').value=item.body||'';saveDraft();
 const source=[...document.querySelectorAll('#rows tr')],s=state(),ids=new Set(item.tasks.map(t=>String(t.id)));let matched=0;
 source.forEach((tr,i)=>{const task=s.tasks?.[i],cb=tr.querySelector('td.sel input[type=checkbox]');if(!task||!cb)return;const included=ids.has(String(task.id));if(cb.checked!==included){cb.checked=included;cb.dispatchEvent(new Event('change',{bubbles:true}))}if(included)matched++});
 for(const task of item.tasks){const actual=s.tasks?.find(t=>String(t.id)===String(task.id));if(!actual)continue;const p=setting(actual);p.purpose=task.purpose||'Action Required';p.note=task.note||'';p.send=task.send!==false}save();render();libraryStatus('Loaded "'+item.name+'": '+matched+' of '+item.tasks.length+' tasks matched this closing. Review current dates before emailing.')}
function deleteNamedTable(){const id=$('rcLibraryList').value,item=library().find(x=>x.id===id);if(!item)return;if(!window.confirm('Delete saved table "'+item.name+'"?'))return;saveLibrary(library().filter(x=>x.id!==id));renderLibrary();libraryStatus('Saved table deleted.')}

function tableHTML(){return copyHTML();}

// The email clipboard uses exactly the same HTML as the approved on-page preview.
function copyHTML(){
 const s=state(),items=selected(),navy='#193d52',gold='#c5a164',line='#dce4e8';
 const font='font-family:Arial,Helvetica,sans-serif;';
 const base=font+'font-size:15px;line-height:1.35;font-weight:700;color:'+navy+';vertical-align:middle;';
 const circ=n=>'<span style="display:inline-block;width:27px;height:27px;line-height:27px;text-align:center;border:2px solid '+gold+';border-radius:50%;color:'+navy+';'+font+'font-size:14px;font-weight:700;">'+n+'</span>';
 const px={8:61,59:448,11:84,22:167};
 const td=(v,w,extra='')=>'<td width="'+px[w]+'" style="width:'+px[w]+'px;border:1px solid '+line+';padding:13px 12px;'+base+extra+'">'+v+'</td>';
 const row=(n,name,days,due,bg)=>'<tr bgcolor="'+bg+'" style="background-color:'+bg+';">'+td(circ(n),8,'text-align:center;')+td(name,59,'text-align:left;overflow-wrap:break-word;word-break:normal;')+td(days,11,'text-align:center;white-space:nowrap;')+td(due,22,'text-align:center;white-space:nowrap;')+'</tr>';
 const th=(v,w,a)=>'<th width="'+px[w]+'" style="width:'+px[w]+'px;border:1px solid '+line+';padding:14px 12px;background:#fff;color:#a47b3e;'+font+'font-size:13px;font-weight:700;text-align:'+a+';">'+v+'</th>';
 const tasks=items.map((t,i)=>row(i+1,escape(t.name),escape(String(t.days)),escape(date(t.due)),i%2?'#f9fbfc':'#ffffff')).join('');
 const days=s.effective&&s.closing?Math.round((new Date(s.closing+'T12:00:00')-new Date(s.effective+'T12:00:00'))/86400000):'—';
 // Single email-safe table: all cells use explicit pixel widths in both HTML attributes and inline CSS for email paste.
 // The footer is in the same table, so copying it cannot detach it from the report.
 return '<table role="presentation" width="760" cellpadding="0" cellspacing="0" border="0" align="center" style="width:760px;max-width:100%;table-layout:fixed;border-collapse:collapse;background-color:#fff;'+font+'">'

 +'<thead><tr><th colspan="4" bgcolor="'+navy+'" style="background-color:'+navy+';padding:25px 22px;text-align:left;color:white;'+font+'font-size:27px;line-height:1.35;font-weight:700;">'
 +'<span style="display:inline-block;background-color:#008b99;border-radius:9px;padding:9px 12px;margin-right:16px;color:white;font-size:24px;">☑</span> Closing Timeline <span style="color:#e6b35e;font-family:Georgia,Times New Roman,serif;font-size:29px;font-style:italic;font-weight:700;">Summary</span></th></tr>'
 +'<tr>'+th('#',8,'center')+th('TASK / MILESTONE',59,'left')+th('DAYS',11,'center')+th('DUE DATE',22,'center')+'</tr></thead>'
 +'<tbody>'+row('–','Effective date','0',escape(date(s.effective)),'#e7f1fa')+tasks+row('–','Closing date',escape(String(days)),escape(date(s.closing)),'#faeef0')+'</tbody>'
 +'<tfoot><tr><td colspan="4" style="border:0;padding:17px 12px 5px;color:#687e8b;'+font+'font-size:13px;font-style:italic;font-weight:400;">Dates and deadlines must follow the signed contract.</td></tr></tfoot></table>';
}

// One canvas renderer powers BOTH the visible preview and the clipboard PNG.
function reportPng(){
 const s=state(),tasks=selected(),w=760,scale=2,x=[0,61,509,593,760],navy='#193d52';
 const measure=document.createElement('canvas').getContext('2d');
 measure.font='bold 15px Arial';
 const wrap=(text,max)=>{const words=String(text).split(/\s+/),out=[];let line='';for(const word of words){const next=line?line+' '+word:word;if(measure.measureText(next).width>max&&line){out.push(line);line=word}else line=next}if(line)out.push(line);return out.length?out:['']};
 const data=[{name:'Effective date',days:'0',due:date(s.effective),kind:'effective'},...tasks.map(t=>({name:t.name,days:String(t.days),due:date(t.due),purpose:setting(t).purpose||'',note:[t.notes,setting(t).note].map(v=>String(v||'').trim()).filter((v,i,a)=>v&&a.indexOf(v)===i).join(' · '),kind:'task'})),{name:'Closing date',days:s.effective&&s.closing?String(Math.round((new Date(s.closing+'T12:00:00')-new Date(s.effective+'T12:00:00'))/86400000)):'—',due:date(s.closing),kind:'closing'}];
 const heights=data.map(r=>{const title=wrap(r.name,418).length*21;measure.font='13px Arial';const purpose=r.kind==='task'&&r.purpose?wrap('Purpose: '+r.purpose,418).length*18:0;const note=r.kind==='task'&&r.note?wrap('Note: '+r.note,418).length*18:0;measure.font='bold 15px Arial';return Math.max(51,title+purpose+note+25+(purpose||note?8:0))});const h=102+44+heights.reduce((a,b)=>a+b,0)+49;
 const outputWidth=620,ratio=outputWidth/w;const canvas=document.createElement('canvas');canvas.width=outputWidth*scale;canvas.height=Math.ceil(h*ratio*scale);const ctx=canvas.getContext('2d');ctx.scale(scale*ratio,scale*ratio);
 ctx.fillStyle='#fff';ctx.fillRect(0,0,w,h);ctx.fillStyle=navy;ctx.fillRect(0,0,w,102);
 ctx.fillStyle='#008b99';ctx.beginPath();ctx.roundRect(22,25,54,52,9);ctx.fill();
 ctx.fillStyle='#fff';ctx.font='bold 30px Arial';ctx.textAlign='center';ctx.fillText('✓',49,61);
 ctx.textAlign='left';ctx.font='bold 27px Arial';ctx.fillText('Closing Timeline',95,62);
 ctx.fillStyle='#e6b35e';ctx.font='bold italic 29px Georgia';ctx.fillText('Summary',323,62);
 ctx.fillStyle='#fff';ctx.fillRect(0,102,w,44);ctx.strokeStyle='#dce4e8';ctx.lineWidth=1;
 ctx.fillStyle='#a47b3e';ctx.font='bold 13px Arial';const heads=['#','TASK / MILESTONE','DAYS','DUE DATE'];
 heads.forEach((t,i)=>{ctx.textAlign=i===1?'left':'center';ctx.fillText(t,i===1?x[1]+12:(x[i]+x[i+1])/2,130)});
 let y=146,taskN=0;
 data.forEach((r,i)=>{const rh=heights[i];ctx.fillStyle=r.kind==='effective'?'#e7f1fa':r.kind==='closing'?'#faeef0':i%2?'#fff':'#f9fbfc';ctx.fillRect(0,y,w,rh);
 ctx.strokeStyle='#dce4e8';ctx.beginPath();ctx.moveTo(0,y+rh-.5);ctx.lineTo(w,y+rh-.5);ctx.stroke();
 ctx.strokeStyle='#c5a164';ctx.lineWidth=2;ctx.beginPath();ctx.arc(30,y+rh/2,14,0,Math.PI*2);ctx.stroke();ctx.fillStyle=navy;ctx.font='bold 14px Arial';ctx.textAlign='center';ctx.fillText(r.kind==='task'?String(++taskN):'–',30,y+rh/2+5);
 ctx.font='bold 15px Arial';ctx.textAlign='left';const lines=wrap(r.name,418);let detail=[];if(r.kind==='task'){ctx.font='13px Arial';if(r.purpose)detail.push(...wrap('Purpose: '+r.purpose,418));if(r.note)detail.push(...wrap('Note: '+r.note,418))}const total=lines.length*21+detail.length*18+(detail.length?7:0);let top=y+(rh-total)/2+15;ctx.font='bold 15px Arial';ctx.fillStyle=navy;lines.forEach(t=>{ctx.fillText(t,73,top);top+=21});if(detail.length){top+=7;ctx.font='13px Arial';ctx.fillStyle='#557082';detail.forEach(t=>{ctx.fillText(t,73,top);top+=18})}
 ctx.textAlign='center';ctx.fillText(r.days,(x[2]+x[3])/2,y+rh/2+5);ctx.fillText(r.due,(x[3]+x[4])/2,y+rh/2+5);y+=rh});
 ctx.strokeStyle='#dce4e8';ctx.lineWidth=1;for(const xx of x){ctx.beginPath();ctx.moveTo(xx,102);ctx.lineTo(xx,y);ctx.stroke()}
 ctx.fillStyle='#687e8b';ctx.textAlign='left';ctx.font='italic 13px Arial';ctx.fillText('Dates and deadlines must follow the signed contract.',12,y+29);
 return new Promise((resolve,reject)=>canvas.toBlob(blob=>blob?resolve(blob):reject(Error('PNG unavailable')),'image/png'));
}
async function copyImage(statusId){
 const status=$(statusId);if(!selected().length){if(status)status.textContent='Select at least one task to send.';return}
 try{const blob=await reportPng();await navigator.clipboard.write([new ClipboardItem({'image/png':blob})]);if(status){status.hidden=false;status.textContent='Table copied as an image. Paste into your email.'}}
 catch{if(status){status.hidden=false;status.textContent='Image clipboard unavailable in this browser. Use the HTML preview instead.'}}
}
async function showReportImage(){
 const report=$('copyReport');if(!report)return;
 try{const blob=await reportPng(),url=URL.createObjectURL(blob),img=document.createElement('img');img.src=url;img.alt='Closing Timeline Summary';img.style.cssText='display:block;width:100%;height:auto';img.onload=()=>URL.revokeObjectURL(url);report.replaceChildren(img)}
 catch{report.innerHTML=tableHTML()}
}
function plain(){return ['Closing Timeline Summary',...selected().map(t=>{const p=setting(t);return t.name+' | '+date(t.due)+' | '+p.purpose+(p.note?' — '+p.note:'')}),'Verify dates against the signed contract.'].join('\n')}
async function copy(){await copyImage('rcStatus')}
function refreshPreview(){const d=document.querySelector('#recipientComposer details');if(d?.open)$('rcPreview').innerHTML=tableHTML()}
function render(){const host=$('rcRows');if(!host)return;const tasks=rows().filter(t=>t.selected);host.replaceChildren();for(const t of tasks){const p=setting(t),line=document.createElement('div');line.className='rc-row';const choose=document.createElement('input');choose.type='checkbox';choose.checked=t.selected;choose.setAttribute('aria-label','Select task '+t.name);choose.onchange=()=>{const s=state(),index=s.tasks.findIndex(x=>x.id===t.id),tr=document.querySelectorAll('#rows tr')[index],cb=tr?.querySelector('td.sel input[type=checkbox]');if(cb){cb.checked=choose.checked;cb.dispatchEvent(new Event('change',{bubbles:true}))}render()};const title=document.createElement('div');title.innerHTML='<strong>'+escape(t.name)+'</strong>';const days=document.createElement('span');days.className='rc-days-value';days.textContent=String(t.days);const dueDate=document.createElement('span');dueDate.className='rc-due-value';dueDate.textContent=date(t.due);const select=document.createElement('select');select.setAttribute('aria-label','Purpose for '+t.name);for(const name of purposes){const o=document.createElement('option');o.value=name;o.textContent=name;select.append(o)}select.value=p.purpose;select.onchange=()=>{p.purpose=select.value;save();render()};const note=document.createElement('input');note.placeholder='Optional instruction';note.value=p.note;note.setAttribute('aria-label','Recipient note for '+t.name);note.oninput=()=>{p.note=note.value;save();refreshPreview()};const send=document.createElement('input');send.type='checkbox';send.checked=p.send;send.disabled=!t.selected;send.setAttribute('aria-label','Send '+t.name);send.onchange=()=>{p.send=send.checked;save();render()};line.append(choose,title,days,dueDate,select,note,send);host.append(line)}if(!tasks.length){const empty=document.createElement('p');empty.className='rc-empty';empty.textContent='Select tasks in Step 1 to display them here.';host.append(empty)}$('rcCount').textContent=tasks.filter(t=>t.selected).length+' selected · '+selected().length+' to send';$('rcCopy').disabled=!selected().length;$('rcPrepare').disabled=!selected().length;refreshPreview()}
function init(){const summary=$('contract-summary');if(!summary||$('recipientComposer'))return;const box=document.createElement('section');box.id='recipientComposer';box.className='rc-composer';box.innerHTML='<div class="rc-title"><div class="rc-title-top">RESULT 01 · LINKED TO TABLE 01</div><h3>Closing Timeline <em>Summary</em></h3><p>Selected contract tasks · Choose instructions and mark the tasks to send.</p></div><div class="rc-recipient"><label>Saved contact <select id="rcSavedContact"><option value="">Choose saved contact…</option></select></label><label>Recipient email <input type="email" id="rcRecipient" placeholder="name@example.com"></label><label>Email subject <input id="rcSubject" value="Closing Timeline Summary"></label></div><label>Email message <textarea id="rcBody" rows="3">Please review the selected closing milestones and instructions below.</textarea></label><div class="rc-head"><span>✓</span><span>TASK / MILESTONE</span><span>DAYS</span><span>DUE DATE</span><span>PURPOSE / INSTRUCTION</span><span>NOTE</span><span>SEND ✓</span></div><div id="rcRows"></div><section id="rcTableLibrary" style="border:1px solid #c9dce6;border-radius:12px;padding:15px;margin:14px 0;background:#f8fbfc"><strong style="color:#193d52">My Table Library · Buyer Agent — Deadlines</strong><p style="font-size:12px;color:#557082">Save reusable task selections and recipient instructions. Current closing dates are not stored in templates.</p><div style="display:grid;grid-template-columns:1fr 1fr;gap:9px"><label>Table name<input id="rcTableName" value="Buyer Agent — Deadlines" placeholder="Buyer Agent — Deadlines"></label><label>Prepared for / role<input id="rcTableRole" value="Buyer Agent" placeholder="Buyer Agent"></label><label>My Saved Tables<select id="rcLibraryList"></select></label></div><div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px"><button type="button" id="rcLoadTable">Load Selected Table</button><button type="button" id="rcDeleteTable">Delete Saved Table</button></div></section><div class="rc-actions"><strong id="rcCount"></strong><button type="button" id="rcSaveDraft">Save Table</button><button type="button" id="rcCopy">View Formatted Table</button><button type="button" id="rcPrepare">Open Email Draft</button></div><div class="rc-preview-heading"><details><summary>Preview formatted table</summary><div id="rcPreview"></div></details></div><p id="rcStatus" role="status" class="rc-feedback" hidden></p>';summary.append(box);
const saved=$('rcSavedContact');contacts().forEach((contact,i)=>{const opt=document.createElement('option');opt.value=String(i);opt.textContent=contact.name+' · '+contact.role+' · '+contact.email;saved.append(opt)});saved.onchange=()=>{const contact=contacts()[Number(saved.value)];if(!contact||saved.value==='')return;$('rcRecipient').value=contact.email;prefs._recipient=contact.email;save();loadDraft();render()};$('rcRecipient').value=prefs._recipient||'';loadDraft();
$('rcRecipient').onchange=()=>{prefs._recipient=$('rcRecipient').value;save();loadDraft();render()};
for(const id of ['rcSubject','rcBody'])$(id).oninput=saveDraft;
$('rcSaveDraft').onclick=saveNamedTable;$('rcLoadTable').onclick=loadNamedTable;$('rcDeleteTable').onclick=deleteNamedTable;renderLibrary();
$('rcCopy').onclick=openApprovedReport;
$('rcPrepare').onclick=()=>{const email=$('rcRecipient').value.trim();if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){$('rcStatus').hidden=false;$('rcStatus').textContent='Enter a valid recipient email first.';return}saveDraft();const body=$('rcBody').value+'\n\n'+plain();window.location.href='mailto:'+encodeURIComponent(email)+'?subject='+encodeURIComponent($('rcSubject').value)+'&body='+encodeURIComponent(body);$('rcStatus').hidden=false;$('rcStatus').textContent='Email draft opened. Use Copy Formatted Table to paste the styled table.'};
box.querySelector('details').addEventListener('toggle',e=>{if(e.target.open)$('rcPreview').innerHTML=tableHTML()});
let pending=false;const observer=new MutationObserver(()=>{if(pending)return;pending=true;requestAnimationFrame(()=>{pending=false;render()})});const source=$('rows');if(source)observer.observe(source,{childList:true});source?.addEventListener('change',()=>setTimeout(render,0));for(const id of ['effective','closing','counting'])$(id)?.addEventListener('change',()=>setTimeout(render,0));render()}
/* V4: one approved report for the legacy preview and recipient email. */
function openApprovedReport(){
 if(!selected().length){if($('rcStatus')){$('rcStatus').hidden=false;$('rcStatus').textContent='Select at least one Step 1 task and enable Send.';}return}
 const dialog=$('copyDialog'),report=$('copyReport');if(!dialog||!report)return;
 showReportImage();report.style.cssText='width:100%;max-width:1100px;background:#fff;overflow:auto;border:0';
 const feedback=$('copyFeedback');if(feedback)feedback.textContent='Approved Closing Timeline Summary · Selected tasks only.';
 const slider=$('reportSize'),value=$('reportSizeValue');if(slider)slider.value='100';if(value)value.textContent='100%';
 if(!dialog.open)dialog.showModal();
}
async function copyApprovedReport(){await copyImage('copyFeedback')}
document.addEventListener('click',e=>{
 const trigger=e.target.closest?.('#copy,#copyFormatted');if(!trigger)return;
 e.preventDefault();e.stopImmediatePropagation();
 if(trigger.id==='copy')openApprovedReport();else copyApprovedReport();
},true);
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();