(()=>{'use strict';
const $=id=>document.getElementById(id);
const templates={
buyer:['Confirm executed contract and addenda','Verify escrow deposit instructions','Schedule inspection and review results','Follow up with lender on financing','Confirm appraisal status if applicable','Verify insurance and HOA requirements','Arrange final walkthrough','Confirm closing appointment and verified funds instructions'],
seller:['Confirm fully executed contract and disclosures','Verify escrow receipt with closing agent','Coordinate inspection access','Follow up on negotiated repairs','Confirm title, payoff and lien requirements','Deliver HOA/condo documents if applicable','Confirm property condition and possession details','Coordinate keys and closing appointment'],
both:['Confirm signed contract and effective date','Verify escrow deposit','Monitor inspection deadlines','Check financing and appraisal milestones','Confirm title and association requirements','Coordinate walkthrough and final arrangements','Confirm closing date and signing logistics']
};
const rows=[];let serial=0;
function localDate(v){return v?new Date(v+'T12:00:00'):null}
function iso(d){return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
function due(row){if(row.date)return row.date;if(!row.days||!$('effective').value)return '';const d=localDate($('effective').value);d.setDate(d.getDate()+Number(row.days));return iso(d)}
function escape(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function refresh(){const now=localDate(iso(new Date()));const tomorrow=new Date(now);tomorrow.setDate(now.getDate()+1);const today=iso(now),next=iso(tomorrow);
const state={today:0,next:0,overdue:0,upcoming:0,done:0};const items=rows.map(row=>({...row,due:due(row)})).map(row=>{row.status=row.done?'done':!row.due?'unset':row.due<today?'overdue':row.due===today?'today':row.due===next?'next':'upcoming';if(row.status!=='unset')state[row.status]++;return row}).filter(row=>$('filter').value==='all'||$('filter').value===row.status);
items.sort((a,b)=>(a.done-b.done)||(a.due||'9999').localeCompare(b.due||'9999'));
$('stats').innerHTML=[['Due today',state.today],['Tomorrow',state.next],['Overdue',state.overdue],['Upcoming',state.upcoming],['Completed',state.done]].map(([n,v])=>'<div class="daily-stat"><strong>'+v+'</strong><span>'+n+'</span></div>').join('');
$('tasks').innerHTML=items.map(row=>'<tr><td><input type="checkbox" aria-label="Complete '+escape(row.name)+'" data-check="'+row.id+'" '+(row.done?'checked':'')+'></td><td>'+escape(row.name)+'</td><td><input type="number" min="0" max="365" placeholder="Days" aria-label="Days from effective date" data-days="'+row.id+'" value="'+escape(row.days)+'"></td><td><input type="date" aria-label="Due date" data-date="'+row.id+'" value="'+escape(row.date)+'"></td><td>'+ (row.due?escape(row.due):'Set date')+'</td><td><span class="daily-status status-'+row.status+'">'+({next:'Tomorrow',unset:'Set date',done:'Done',overdue:'Overdue',upcoming:'Upcoming',today:'Today'}[row.status])+'</span></td><td><button class="daily-remove" data-remove="'+row.id+'" aria-label="Remove '+escape(row.name)+'">×</button></td></tr>').join('')||'<tr><td colspan="7">No tasks in this category.</td></tr>';
$('note').textContent='This is a temporary browser session. Nothing is saved to an account. Enter contractual deadlines from your signed agreement; day calculations are calendar days only.';
}
function load(){rows.length=0;for(const name of templates[$('role').value])rows.push({id:++serial,name,days:'',date:'',done:false});refresh()}
$('role').addEventListener('change',load);$('effective').addEventListener('change',refresh);$('filter').addEventListener('change',refresh);
$('tasks').addEventListener('change',e=>{let id=e.target.dataset.check;if(id){const row=rows.find(x=>x.id===Number(id));if(row)row.done=e.target.checked;refresh();return}id=e.target.dataset.date;if(id){const row=rows.find(x=>x.id===Number(id));if(row)row.date=e.target.value;refresh();}});
$('tasks').addEventListener('input',e=>{let id=e.target.dataset.days;if(id){const row=rows.find(x=>x.id===Number(id));if(row){row.days=e.target.value;row.date=''}refresh()}});
$('tasks').addEventListener('click',e=>{const id=e.target.dataset.remove;if(id){const i=rows.findIndex(x=>x.id===Number(id));if(i>=0)rows.splice(i,1);refresh()}});
$('addtask').addEventListener('click',()=>{const v=$('newtask').value.trim();if(!v)return;rows.push({id:++serial,name:v,days:'',date:'',done:false});$('newtask').value='';refresh()});
$('printtasks').addEventListener('click',()=>window.print());load();
})();