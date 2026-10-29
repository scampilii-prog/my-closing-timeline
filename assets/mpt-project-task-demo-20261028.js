(function(){
"use strict";
// Browser-only demonstration: no API, no account, no payments, no remote storage.
var $ = function(id){return document.getElementById(id)};
var freeTasks = [];
var key = "mpt_other_projects_step3_local_demo_v1";
var memoryOnly = false;
var state = {tasks:[], endDate:"", planStart:"", planHorizon:"90d"};
var freeProject = {ref:"",start:"",end:""};
function today(){var d=new Date();return iso(d)}
function iso(d){return [d.getFullYear(),String(d.getMonth()+1).padStart(2,"0"),String(d.getDate()).padStart(2,"0")].join("-")}
function parse(v){if(!/^\d{4}-\d{2}-\d{2}$/.test(v||""))return null;var p=v.split("-").map(Number),d=new Date(p[0],p[1]-1,p[2],12);return d.getFullYear()===p[0]&&d.getMonth()===p[1]-1&&d.getDate()===p[2]?d:null}
function datePlus(s,n){var d=parse(s);if(!d)return "";d.setDate(d.getDate()+n);return iso(d)}
function addMonths(s,n){var d=parse(s);if(!d)return "";var day=d.getDate(),year=d.getFullYear(),month=d.getMonth()+Number(n),last=new Date(year,month+1,0,12).getDate();return iso(new Date(year,month,Math.min(day,last),12))}
function nextDate(s,kind,anchor){
 var d=parse(s);if(!d)return "";
 if(kind==="daily"){d.setDate(d.getDate()+1);return iso(d)}
 if(kind==="weekly"){d.setDate(d.getDate()+7);return iso(d)}
 if(kind==="monthly"){var y=d.getFullYear(),m=d.getMonth()+1;var last=new Date(y,m+1,0,12).getDate();return iso(new Date(y,m,Math.min(Number(anchor)||d.getDate(),last),12))}
 return "";
}
function readable(s){var d=parse(s);return d?d.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}):"—"}
function taskId(){return "t"+Date.now().toString(36)+Math.random().toString(36).slice(2,9)}
function notify(id,msg,kind){var el=$(id);if(!el)return;el.textContent=msg;el.dataset.kind=kind||"info"}
function status(t){if(t.finished)return "Completed";if((state.endDate&&t.due>state.endDate)||(t.until&&t.due>t.until))return "After task end";var d=today();return t.due<d?"Overdue":t.due===d?"Due today":"Upcoming"}
function load(){
 try{var val=localStorage.getItem(key);if(!val)return;var a=JSON.parse(val);if(!a||!Array.isArray(a.tasks))return;
 state.endDate=parse(a.endDate)?a.endDate:"";
 state.planStart=parse(a.planStart)?a.planStart:today();
 state.planHorizon=({"1m":"custom","3m":"90d","12m":"365d","6m":"custom"})[a.planHorizon]||(["90d","180d","365d","ongoing","custom"].includes(a.planHorizon)?a.planHorizon:(state.endDate?"custom":"90d"));
 state.tasks=a.tasks.filter(function(t){return t&&typeof t.name==="string"&&parse(t.due)&&["once","daily","weekly","monthly"].includes(t.repeat)}).map(function(t){
 return {id:String(t.id||taskId()),name:t.name.slice(0,140),due:t.due,repeat:t.repeat,
 anchor:Number(t.anchor)||parse(t.due).getDate(),owner:String(t.owner||"").slice(0,60),note:String(t.note||"").slice(0,180),until:parse(t.until)?t.until:"",doneCount:Math.max(0,Number(t.doneCount)||0),
 lastDone:parse(t.lastDone)?t.lastDone:"",finished:!!t.finished,
 history:Array.isArray(t.history)?t.history.filter(function(h){return h&&parse(h.due)&&parse(h.at)}):[]};
 });
 }catch(e){memoryOnly=true}
}
function save(){
 try{localStorage.setItem(key,JSON.stringify(state));memoryOnly=false}
 catch(e){memoryOnly=true;notify("mpt-pro-message","Browser storage is unavailable or full. Your changes remain only until you leave this page.","warn")}
}
function make(tag,cls,txt){var e=document.createElement(tag);if(cls)e.className=cls;if(txt!==undefined)e.textContent=txt;return e}
function cell(row,child){var td=make("td");if(typeof child==="string")td.textContent=child;else td.appendChild(child);row.appendChild(td);return td}
function button(text,action,id){var b=make("button","mpt-demo-btn",text);b.type="button";b.dataset.action=action;b.dataset.id=id;return b}
function input(type,label,val){var e=make("input");e.type=type;e.value=val||"";e.setAttribute("aria-label",label);if(type==="text")e.maxLength=140;return e}
function freeRender(){
 var body=$("mpt-free-demo-body");if(!body)return;body.textContent="";
 freeTasks.forEach(function(t){
  var row=make("tr");
  var name=input("text","Edit FREE task",t.name);name.dataset.field="name";name.dataset.id=t.id;cell(row,name);
  var due=input("date","Edit FREE due date",t.due);due.dataset.field="due";due.dataset.id=t.id;cell(row,due);
  var badge=make("span","mpt-demo-status "+(t.done?"is-done":t.due<today()?"is-late":""),t.done?"Done":t.due<today()?"Overdue":"Pending");
  cell(row,badge);
  var actions=make("div","mpt-demo-actions");
  actions.appendChild(button(t.done?"Reopen":"Done","toggle",t.id));
  actions.appendChild(button("Remove","delete",t.id));
  cell(row,actions);body.appendChild(row);
 });
 if(!freeTasks.length){var row=make("tr");var td=cell(row,"No tasks yet. Add your own task above.");td.colSpan=4;td.className="mpt-demo-empty";body.appendChild(row)}
 $("mpt-free-count").textContent=freeTasks.length+" / 8 tasks";
 freeSummary();
 $("mpt-free-add").disabled=freeTasks.length>=8;
}
function freeSummaryText(){
 var label=freeProject.ref||"Unidentified project",parts=["FREE PROJECT TIMELINE", "Reference: "+label,"Start: "+(freeProject.start||"Not selected"),"Finish: "+(freeProject.end||"Ongoing / not selected"),""];
 freeTasks.slice().sort(function(a,b){return a.due.localeCompare(b.due)}).forEach(function(t,i){parts.push((i+1)+". "+t.name+" | "+t.due+" | "+(t.done?"Done":"Pending"))});
 return parts.join("\n");
}
function freeSummary(){
 var el=$("mpt-free-summary");if(!el)return;
 var n=freeTasks.filter(function(t){return t.done}).length;
 el.textContent=(freeProject.ref||"Your project")+" · "+freeTasks.length+" tasks · "+n+" done · "+(freeProject.end?"Finish "+readable(freeProject.end):"No fixed finish date")+". Dates and task names stay on this page until you reload.";
}
function freeDatesOK(due){return !(freeProject.start&&due<freeProject.start)&&!(freeProject.end&&due>freeProject.end)}
function freeMeta(){
 freeProject.ref=($("mpt-free-project-ref").value||"").trim().slice(0,40);
 freeProject.start=parse($("mpt-free-project-start").value)?$("mpt-free-project-start").value:"";
 freeProject.end=parse($("mpt-free-project-end").value)?$("mpt-free-project-end").value:"";
 if(freeProject.start&&freeProject.end&&freeProject.end<freeProject.start){notify("mpt-free-message","Finish date cannot be before start date.","warn");freeProject.end="";$("mpt-free-project-end").value=""}
 freeSummary();
}
function escapeICS(value){return String(value||"").replace(/\\/g,"\\\\").replace(/\r?\n/g,"\\n").replace(/[,;]/g,function(c){return "\\"+c})}
function freeCalendar(){
 if(!freeTasks.length){notify("mpt-free-message","Add a task before downloading the calendar.","warn");return}
 var lines=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//My Closing Timeline//Other Projects FREE//EN","CALSCALE:GREGORIAN","METHOD:PUBLISH"];
 freeTasks.forEach(function(t){lines.push("BEGIN:VEVENT","UID:"+t.id+"@myclosingtimeline.com","DTSTAMP:"+new Date().toISOString().replace(/[-:]/g,"").replace(/\.\d{3}/,""),"DTSTART;VALUE=DATE:"+t.due.replace(/-/g,""),"DTEND;VALUE=DATE:"+datePlus(t.due,1).replace(/-/g,""),"SUMMARY:"+escapeICS(t.name),"DESCRIPTION:"+escapeICS("Private project reference: "+(freeProject.ref||"Not selected")),"END:VEVENT")});
 lines.push("END:VCALENDAR");
 var blob=new Blob([lines.join("\r\n")+"\r\n"],{type:"text/calendar;charset=utf-8"}),url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download="my-project-timeline.ics";document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(url)},1000);notify("mpt-free-message","Calendar file created locally. Import it into your calendar app.","info");
}
function proRender(){
 var body=$("mpt-pro-demo-body");if(!body)return;body.textContent="";
 state.tasks.forEach(function(t){
  var row=make("tr");row.dataset.id=t.id;
  var name=input("text","Task description",t.name);name.className="mpt-demo-task-input";name.dataset.field="name";name.dataset.id=t.id;
  var nameWrap=make("div","mpt-pro-task-title");nameWrap.appendChild(name);
  if(t.history.length){var details=make("details","mpt-demo-history"),summary=make("summary",null,"History · "+t.history.length+" completed");details.appendChild(summary);
   var list=make("ol");t.history.slice().reverse().forEach(function(h){list.appendChild(make("li",null,"Due "+readable(h.due)+" · done "+readable(h.at)))});details.appendChild(list);nameWrap.appendChild(details)}
  cell(row,nameWrap);
  var due=input("date","Next due date",t.due);due.dataset.field="due";due.dataset.id=t.id;cell(row,due);
  var sel=make("select");sel.dataset.field="repeat";sel.dataset.id=t.id;sel.setAttribute("aria-label","Repeat frequency");
  [["once","One time"],["daily","Every day"],["weekly","Every week"],["monthly","Every month"]].forEach(function(pair){var op=make("option",null,pair[1]);op.value=pair[0];sel.appendChild(op)});sel.value=t.repeat;cell(row,sel);
  var owner=input("text","Responsible role (no person names)",t.owner||"");owner.maxLength=60;owner.dataset.field="owner";owner.dataset.id=t.id;cell(row,owner);
  var note=input("text","Generic note (no private information)",t.note||"");note.maxLength=180;note.dataset.field="note";note.dataset.id=t.id;cell(row,note);
  var until=input("date","Optional end date for this task",t.until||"");until.dataset.field="until";until.dataset.id=t.id;cell(row,until);
  var flag=make("span","mpt-demo-status",status(t));if(status(t)==="Overdue")flag.classList.add("is-late");if(status(t)==="Completed")flag.classList.add("is-done");cell(row,flag);
  cell(row,String(t.doneCount));
  var actions=make("div","mpt-demo-actions");actions.appendChild(button(t.finished?"Completed":t.repeat==="once"?"Mark done":"Done · Next","complete",t.id));actions.lastChild.disabled=t.finished||!!(state.endDate&&t.due>state.endDate)||!!(t.until&&t.due>t.until);
  if(t.history.length)actions.appendChild(button("Undo","undo",t.id));
  actions.appendChild(button("Remove","delete",t.id));cell(row,actions);body.appendChild(row);
 });
 if(!state.tasks.length){var row=make("tr"),td=cell(row,"No follow-up tasks yet. Add one or load optional sample tasks.");td.colSpan=9;td.className="mpt-demo-empty";body.appendChild(row)}
 var overdue=state.tasks.filter(function(t){return status(t)==="Overdue"}).length,completed=state.tasks.filter(function(t){return t.finished}).length;
 var todayCount=state.tasks.filter(function(t){return status(t)==="Due today"}).length;
 $("mpt-pro-total").textContent=String(state.tasks.length);
 $("mpt-pro-due").textContent=String(todayCount);
 $("mpt-pro-overdue").textContent=String(overdue);
 $("mpt-pro-complete").textContent=String(completed);
 $("mpt-pro-completions").textContent=String(state.tasks.reduce(function(a,t){return a+t.doneCount},0));
 if($("mpt-pro-enddate"))$("mpt-pro-enddate").value=state.endDate;
 if($("mpt-pro-plan-start"))$("mpt-pro-plan-start").value=state.planStart||today();
 if($("mpt-pro-ongoing"))$("mpt-pro-ongoing").checked=!state.endDate;
 if($("mpt-pro-enddate"))$("mpt-pro-enddate").disabled=!state.endDate;
 document.querySelectorAll("[data-mpt-horizon]").forEach(function(btn){btn.setAttribute("aria-pressed",String(state.planHorizon===btn.dataset.mptHorizon))});
 if($("mpt-pro-horizon-label"))$("mpt-pro-horizon-label").textContent=state.endDate?"Preview project period ends "+readable(state.endDate):"Ongoing project preview · an eventual paid account would still require renewal";
 if($("mpt-pro-offer-info"))$("mpt-pro-offer-info").textContent="PRO demo only. Proposed project plans: 90 days ($19.90 intro), 180 days ($34.90 intro), or 1 year ($84.90 intro). Account access and renewals are not active.";
 var countdown=$("mpt-pro-renewal-preview");if(countdown){var remain=state.endDate?Math.round((Date.parse(state.endDate+"T00:00:00Z")-Date.parse(today()+"T00:00:00Z"))/86400000):null;countdown.hidden=remain===null||remain>15;if(!countdown.hidden)countdown.textContent=remain<0?"DEMO · Project period ended "+(-remain)+" days ago. Renewing a real account will require a new plan.":remain===0?"DEMO · Your project period ends today. Renewal will be available after PRO launch.":"DEMO · "+remain+" day"+(remain===1?"":"s")+" remaining in the selected period. Future PRO accounts will display a permanent renewal notice here during the last 15 days.";}
 if(memoryOnly)notify("mpt-pro-message","Local storage is unavailable. This demonstration will not be saved after leaving the page.","warn");
}
function freeActions(){
 $("mpt-free-demo-form").addEventListener("submit",function(e){
  e.preventDefault();var name=$("mpt-free-task-name").value.trim(),due=$("mpt-free-task-date").value;
  if(!name||!parse(due)){notify("mpt-free-message","Enter a task name and a valid date.","warn");return}
  if(!freeDatesOK(due)){notify("mpt-free-message","Task date must be within your selected project dates.","warn");return}
  if(freeTasks.length>=8){notify("mpt-free-message","FREE demo limit: 8 tasks. Remove one before adding another.","warn");return}
  freeTasks.push({id:taskId(),name:name.slice(0,140),due:due,done:false});
  $("mpt-free-task-name").value="";notify("mpt-free-message","Task added. FREE demo tasks reset when you reload this page.","info");freeRender();
 });
 ["mpt-free-project-ref","mpt-free-project-start","mpt-free-project-end"].forEach(function(id){$(id).addEventListener("change",freeMeta)});
 $("mpt-free-demo-body").addEventListener("change",function(e){
  var el=e.target,id=el.dataset.id,field=el.dataset.field;if(!id||!field)return;var t=freeTasks.find(function(x){return x.id===id});if(!t)return;
  if(field==="name"){if(!el.value.trim()){el.value=t.name;return}t.name=el.value.trim().slice(0,140)}
  if(field==="due"){if(!parse(el.value)||!freeDatesOK(el.value)){el.value=t.due;notify("mpt-free-message","Use a valid date within the selected project period.","warn");return}t.due=el.value}
  freeRender();
 });
 $("mpt-free-calendar").addEventListener("click",freeCalendar);
 $("mpt-free-copy").addEventListener("click",function(){
  if(!navigator.clipboard||!navigator.clipboard.writeText){notify("mpt-free-message","Copy unavailable. Use the summary below or calendar download.","warn");return}
  navigator.clipboard.writeText(freeSummaryText()).then(function(){notify("mpt-free-message","Project summary copied locally.","info")}).catch(function(){notify("mpt-free-message","Copy not permitted by this browser.","warn")});
 });
 $("mpt-free-demo-body").addEventListener("click",function(e){
  var b=e.target.closest("button[data-action]");if(!b)return;var ix=freeTasks.findIndex(function(t){return t.id===b.dataset.id});if(ix<0)return;
  if(b.dataset.action==="delete")freeTasks.splice(ix,1);
  if(b.dataset.action==="toggle")freeTasks[ix].done=!freeTasks[ix].done;
  freeRender();
 });
 $("mpt-free-clear").addEventListener("click",function(){if(freeTasks.length&&!window.confirm("Clear all FREE demo tasks?"))return;freeTasks=[];freeRender();notify("mpt-free-message","FREE task list cleared.","info")});
 $("mpt-free-task-date").value=today();$("mpt-free-project-start").value=today();freeMeta();freeRender();
}
function proActions(){
 $("mpt-pro-demo-form").addEventListener("submit",function(e){
  e.preventDefault();var name=$("mpt-pro-task-name").value.trim(),due=$("mpt-pro-task-date").value,repeat=$("mpt-pro-repeat").value;
  if(!name||!parse(due)){notify("mpt-pro-message","Enter a task name and its first due date.","warn");return}
  if(state.endDate&&due>state.endDate){notify("mpt-pro-message","This due date is after the chosen project end date.","warn");return}
  var until=$("mpt-pro-task-until").value,owner=$("mpt-pro-task-owner").value.trim(),note=$("mpt-pro-task-note").value.trim();
  if(until&&(!parse(until)||until<due)){notify("mpt-pro-message","The task's last occurrence must be on or after its first date.","warn");return}
  if(state.endDate&&until&&until>state.endDate){notify("mpt-pro-message","The task cannot extend beyond the project end date.","warn");return}
  state.tasks.push({id:taskId(),name:name.slice(0,140),due:due,repeat:repeat,anchor:parse(due).getDate(),owner:owner.slice(0,60),note:note.slice(0,180),until:until,doneCount:0,lastDone:"",finished:false,history:[]});
  $("mpt-pro-task-name").value="";$("mpt-pro-task-owner").value="";$("mpt-pro-task-note").value="";save();proRender();notify("mpt-pro-message","Follow-up task added to this browser-only demo.","info");
 });
 $("mpt-pro-demo-body").addEventListener("change",function(e){
  var el=e.target,id=el.dataset.id,field=el.dataset.field;if(!id||!field)return;var t=state.tasks.find(function(x){return x.id===id});if(!t)return;
  if(field==="name"){if(!el.value.trim()){el.value=t.name;notify("mpt-pro-message","Task name cannot be blank.","warn");return}t.name=el.value.trim().slice(0,140)}
  if(field==="due"){if(!parse(el.value)){el.value=t.due;return}if((state.endDate&&el.value>state.endDate)||(t.until&&el.value>t.until)){el.value=t.due;notify("mpt-pro-message","Due date must not exceed the project or task end date.","warn");return}t.due=el.value;t.anchor=parse(el.value).getDate();t.finished=false}
  if(field==="repeat"){if(!["once","daily","weekly","monthly"].includes(el.value))return;t.repeat=el.value;t.finished=false}
  if(field==="owner")t.owner=el.value.trim().slice(0,60);
  if(field==="note")t.note=el.value.trim().slice(0,180);
  if(field==="until"){if(el.value&&(!parse(el.value)||el.value<t.due||(state.endDate&&el.value>state.endDate))){el.value=t.until||"";notify("mpt-pro-message","Task end date must follow its due date and not exceed project end.","warn");return}t.until=el.value;t.finished=false}
  save();proRender();
 });
 $("mpt-pro-demo-body").addEventListener("click",function(e){
  var b=e.target.closest("button[data-action]");if(!b)return;var i=state.tasks.findIndex(function(t){return t.id===b.dataset.id});if(i<0)return;var t=state.tasks[i],action=b.dataset.action;
  if(action==="delete"){if(!window.confirm("Remove this follow-up task and its demo history?"))return;state.tasks.splice(i,1)}
  if(action==="complete"&&!t.finished&&!(state.endDate&&t.due>state.endDate)&&!(t.until&&t.due>t.until)){
   var oldDue=t.due,next=nextDate(t.due,t.repeat,t.anchor),end=state.endDate;
   t.history.push({due:oldDue,at:today(),next:next});
   t.lastDone=today();t.doneCount++;
   if(t.repeat==="once"||!next||(end&&next>end)||(t.until&&next>t.until))t.finished=true;
   else t.due=next;
   notify("mpt-pro-message",t.finished?"Completed. This task has no further scheduled occurrences.":"Occurrence completed. Next "+t.repeat+" due: "+readable(t.due)+".","info");
  }
  if(action==="undo"&&t.history.length){var prev=t.history.pop();t.due=prev.due;t.finished=false;t.doneCount=Math.max(0,t.doneCount-1);t.lastDone=t.history.length?t.history[t.history.length-1].at:"";notify("mpt-pro-message","Last completion undone.","info")}
  save();proRender();
 });
 $("mpt-pro-ongoing").addEventListener("change",function(e){
  if(e.target.checked){state.endDate="";state.planHorizon="ongoing";save();proRender();notify("mpt-pro-message","Ongoing work preview: the future paid project account will still require a renewal at the end of its purchased term.","info")}
  else{var input=$("mpt-pro-enddate");input.disabled=false;input.value=state.endDate||datePlus(state.planStart||today(),90);input.focus();notify("mpt-pro-message","Choose an end date or select a planning period.","info")}
 });
 document.querySelectorAll("[data-mpt-horizon]").forEach(function(btn){btn.addEventListener("click",function(){
  var v=btn.dataset.mptHorizon,days={"90d":90,"180d":180,"365d":365}[v];if(!days)return;
  state.planStart=parse($("mpt-pro-plan-start").value)?$("mpt-pro-plan-start").value:today();state.planHorizon=v;state.endDate=datePlus(state.planStart,days);
  save();proRender();notify("mpt-pro-message","Preview period: "+days+" calendar days, ending "+readable(state.endDate)+".","info");
 })});
 $("mpt-pro-plan-start").addEventListener("change",function(e){
  if(!parse(e.target.value)){e.target.value=state.planStart||today();return}state.planStart=e.target.value;
  if(["90d","180d","365d"].includes(state.planHorizon))state.endDate=datePlus(state.planStart,{"90d":90,"180d":180,"365d":365}[state.planHorizon]);
  save();proRender();notify("mpt-pro-message","Project start updated. Check your task dates.","info");
 });
 $("mpt-pro-set-end").addEventListener("click",function(){
  var e=$("mpt-pro-enddate"),v=e.value;if(!parse(v)){notify("mpt-pro-message","Choose a valid project end date.","warn");return}
  if(state.planStart&&v<state.planStart){notify("mpt-pro-message","The end date must be on or after the start date.","warn");return}state.endDate=v;state.planHorizon="custom";save();proRender();notify("mpt-pro-message","Custom end date set: "+readable(v)+".","info");
 });
 $("mpt-pro-examples").addEventListener("click",function(){
  if(state.tasks.length&&!window.confirm("Add 20 sample follow-up tasks to your existing demo list?"))return;
  var nodes=document.querySelectorAll("#mpt-followup-showcase .mpt-followup-detail strong"),names=Array.from(nodes).slice(0,20).map(function(x){return x.textContent.trim()});
  if(!names.length){notify("mpt-pro-message","Sample tasks not found.","warn");return}
  names.forEach(function(name,i){
   var repeat=[3,10,11,13,17].includes(i)?([3,17].includes(i)?"monthly":"weekly"):"once",d=datePlus(today(),repeat==="monthly"?28:repeat==="weekly"?7:i+1);
   if(state.endDate&&d>state.endDate)return;
   state.tasks.push({id:taskId(),name:name,due:d,repeat:repeat,anchor:parse(d).getDate(),owner:"",note:"",until:"",doneCount:0,lastDone:"",finished:false,history:[]});
  });
  save();proRender();notify("mpt-pro-message","Optional sample tasks added. Edit or remove any task to match your business.","info");
 });
 $("mpt-pro-clear").addEventListener("click",function(){
  if(!window.confirm("Delete all locally saved PRO demo tasks and their completion history from this browser?"))return;
  state={tasks:[],endDate:datePlus(today(),90),planStart:today(),planHorizon:"90d"};save();proRender();notify("mpt-pro-message","Demo reset to a 90-day planning period.","info");
 });
 $("mpt-pro-task-date").value=today();load();if(!state.planStart)state.planStart=today();if(!state.endDate&&["90d","180d","365d"].includes(state.planHorizon))state.endDate=datePlus(state.planStart,{"90d":90,"180d":180,"365d":365}[state.planHorizon]);proRender();
}
function start(){if($("mpt-free-demo-form"))freeActions();if($("mpt-pro-demo-form"))proActions()}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start);else start();
})();