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

function plain(){return ['Closing Timeline Summary',...selected().map(t=>{const p=setting(t);return t.name+' | '+date(t.due)+' | '+p.purpose+(p.note?' — '+p.note:'')}),'Verify dates against the signed contract.'].join('\n')}
async function copy(){if(!selected().length)return;try{if(navigator.clipboard?.write&&window.ClipboardItem){await navigator.clipboard.write([new ClipboardItem({'text/html':new Blob([copyHTML()],{type:'text/html'}),'text/plain':new Blob([plain()],{type:'text/plain'})})]);$('rcStatus').hidden=false;$('rcStatus').textContent='Formatted table copied. Paste into your email.';return}}catch{}try{await navigator.clipboard.writeText(plain());$('rcStatus').hidden=false;$('rcStatus').textContent='Text table copied (formatted clipboard unavailable).'}catch{$('rcStatus').hidden=false;$('rcStatus').textContent='Clipboard blocked. Select and copy the preview manually.'}}
function refreshPreview(){const d=document.querySelector('#recipientComposer details');if(d?.open)$('rcPreview').innerHTML=tableHTML()}
function render(){const host=$('rcRows');if(!host)return;const tasks=rows().filter(t=>t.selected);host.replaceChildren();for(const t of tasks){const p=setting(t),line=document.createElement('div');line.className='rc-row';const choose=document.createElement('input');choose.type='checkbox';choose.checked=t.selected;choose.setAttribute('aria-label','Select task '+t.name);choose.onchange=()=>{const s=state(),index=s.tasks.findIndex(x=>x.id===t.id),tr=document.querySelectorAll('#rows tr')[index],cb=tr?.querySelector('td.sel input[type=checkbox]');if(cb){cb.checked=choose.checked;cb.dispatchEvent(new Event('change',{bubbles:true}))}render()};const title=document.createElement('div');title.innerHTML='<strong>'+escape(t.name)+'</strong>';const days=document.createElement('span');days.className='rc-days-value';days.textContent=String(t.days);const dueDate=document.createElement('span');dueDate.className='rc-due-value';dueDate.textContent=date(t.due);const select=document.createElement('select');select.setAttribute('aria-label','Purpose for '+t.name);for(const name of purposes){const o=document.createElement('option');o.value=name;o.textContent=name;select.append(o)}select.value=p.purpose;select.onchange=()=>{p.purpose=select.value;save();render()};const note=document.createElement('input');note.placeholder='Optional instruction';note.value=p.note;note.setAttribute('aria-label','Recipient note for '+t.name);note.oninput=()=>{p.note=note.value;save();refreshPreview()};const send=document.createElement('input');send.type='checkbox';send.checked=p.send;send.disabled=!t.selected;send.setAttribute('aria-label','Send '+t.name);send.onchange=()=>{p.send=send.checked;save();render()};line.append(choose,title,days,dueDate,select,note,send);host.append(line)}if(!tasks.length){const empty=document.createElement('p');empty.className='rc-empty';empty.textContent='Select tasks in Step 1 to display them here.';host.append(empty)}$('rcCount').textContent=tasks.filter(t=>t.selected).length+' selected · '+selected().length+' to send';$('rcCopy').disabled=!selected().length;$('rcPrepare').disabled=!selected().length;refreshPreview()}
function init(){const summary=$('contract-summary');if(!summary||$('recipientComposer'))return;const box=document.createElement('section');box.id='recipientComposer';box.className='rc-composer';box.innerHTML='<div class="rc-title"><div class="rc-title-top">RESULT 01 · LINKED TO TABLE 01</div><h3>Closing Timeline <em>Summary</em></h3><p>Selected contract tasks · Choose instructions and mark the tasks to send.</p></div><div class="rc-recipient"><label>Saved contact <select id="rcSavedContact"><option value="">Choose saved contact…</option></select></label><label>Recipient email <input type="email" id="rcRecipient" placeholder="name@example.com"></label><label>Email subject <input id="rcSubject" value="Closing Timeline Summary"></label></div><label>Email message <textarea id="rcBody" rows="3">Please review the selected closing milestones and instructions below.</textarea></label><div class="rc-head"><span>✓</span><span>TASK / MILESTONE</span><span>DAYS</span><span>DUE DATE</span><span>PURPOSE / INSTRUCTION</span><span>NOTE</span><span>SEND ✓</span></div><div id="rcRows"></div><div class="rc-actions"><strong id="rcCount"></strong><button type="button" id="rcSaveDraft">Save Draft</button><button type="button" id="rcCopy">Copy Formatted Table</button><button type="button" id="rcPrepare">Open Email Draft</button></div><div class="rc-preview-heading"><details><summary>Preview formatted table</summary><div id="rcPreview"></div></details></div><p id="rcStatus" role="status" class="rc-feedback" hidden></p>';summary.append(box);
const saved=$('rcSavedContact');contacts().forEach((contact,i)=>{const opt=document.createElement('option');opt.value=String(i);opt.textContent=contact.name+' · '+contact.role+' · '+contact.email;saved.append(opt)});saved.onchange=()=>{const contact=contacts()[Number(saved.value)];if(!contact||saved.value==='')return;$('rcRecipient').value=contact.email;prefs._recipient=contact.email;save();loadDraft();render()};$('rcRecipient').value=prefs._recipient||'';loadDraft();
$('rcRecipient').onchange=()=>{prefs._recipient=$('rcRecipient').value;save();loadDraft();render()};
for(const id of ['rcSubject','rcBody'])$(id).oninput=saveDraft;
$('rcSaveDraft').onclick=()=>{saveDraft();$('rcStatus').hidden=false;$('rcStatus').textContent='Draft saved in this browser preview for this recipient.'};
$('rcCopy').onclick=copy;
$('rcPrepare').onclick=()=>{const email=$('rcRecipient').value.trim();if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){$('rcStatus').hidden=false;$('rcStatus').textContent='Enter a valid recipient email first.';return}saveDraft();const body=$('rcBody').value+'\n\n'+plain();window.location.href='mailto:'+encodeURIComponent(email)+'?subject='+encodeURIComponent($('rcSubject').value)+'&body='+encodeURIComponent(body);$('rcStatus').hidden=false;$('rcStatus').textContent='Email draft opened. Use Copy Formatted Table to paste the styled table.'};
box.querySelector('details').addEventListener('toggle',e=>{if(e.target.open)$('rcPreview').innerHTML=tableHTML()});
let pending=false;const observer=new MutationObserver(()=>{if(pending)return;pending=true;requestAnimationFrame(()=>{pending=false;render()})});const source=$('rows');if(source)observer.observe(source,{childList:true});source?.addEventListener('change',()=>setTimeout(render,0));for(const id of ['effective','closing','counting'])$(id)?.addEventListener('change',()=>setTimeout(render,0));render()}
/* V4: one approved report for the legacy preview and recipient email. */
function openApprovedReport(){
 if(!selected().length){if($('rcStatus')){$('rcStatus').hidden=false;$('rcStatus').textContent='Select at least one Step 1 task and enable Send.';}return}
 const dialog=$('copyDialog'),report=$('copyReport');if(!dialog||!report)return;
 report.innerHTML=tableHTML();report.style.cssText='width:100%;max-width:1100px;background:#fff;overflow:auto;border:0';
 const feedback=$('copyFeedback');if(feedback)feedback.textContent='Approved Closing Timeline Summary · Selected tasks only.';
 const slider=$('reportSize'),value=$('reportSizeValue');if(slider)slider.value='100';if(value)value.textContent='100%';
 if(!dialog.open)dialog.showModal();
}
async function copyApprovedReport(){
 if(!selected().length)return;
 try{await navigator.clipboard.write([new ClipboardItem({'text/html':new Blob([tableHTML()],{type:'text/html'}),'text/plain':new Blob([plain()],{type:'text/plain'})})]);$('copyFeedback').textContent='Approved formatted table copied. Paste into your email.'}
 catch{try{await navigator.clipboard.writeText(plain());$('copyFeedback').textContent='Plain text copied; formatted clipboard unavailable.'}catch{$('copyFeedback').textContent='Clipboard unavailable; please copy the preview manually.'}}
}
document.addEventListener('click',e=>{
 const trigger=e.target.closest?.('#copy,#copyFormatted');if(!trigger)return;
 e.preventDefault();e.stopImmediatePropagation();
 if(trigger.id==='copy')openApprovedReport();else copyApprovedReport();
},true);
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();