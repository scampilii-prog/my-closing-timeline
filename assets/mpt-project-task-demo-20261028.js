(function(){
"use strict";
// Browser-only demonstration: no API, no account, no payments, no remote storage.
var $ = function(id){return document.getElementById(id)};
var freeTasks = [];
var key = "mpt_other_projects_step3_local_demo_v1";
var memoryOnly = false;
var state = {tasks:[], endDate:""};
function today(){var d=new Date();return iso(d)}
function iso(d){return [d.getFullYear(),String(d.getMonth()+1).padStart(2,"0"),String(d.getDate()).padStart(2,"0")].join("-")}
function parse(v){if(!/^\d{4}-\d{2}-\d{2}$/.test(v||""))return null;var p=v.split("-").map(Number),d=new Date(p[0],p[1]-1,p[2],12);return d.getFullYear()===p[0]&&d.getMonth()===p[1]-1&&d.getDate()===p[2]?d:null}
function datePlus(s,n){var d=parse(s);if(!d)return "";d.setDate(d.getDate()+n);return iso(d)}
function nextDate(s,kind,anchor){
 var d=parse(s);if(!d)return "";
 if(kind==="weekly"){d.setDate(d.getDate()+7);return iso(d)}
 if(kind==="monthly"){var y=d.getFullYear(),m=d.getMonth()+1;var last=new Date(y,m+1,0,12).getDate();return iso(new Date(y,m,Math.min(Number(anchor)||d.getDate(),last),12))}
 return "";
}
function readable(s){var d=parse(s);return d?d.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}):"—"}
function taskId(){return "t"+Date.now().toString(36)+Math.random().toString(36).slice(2,9)}
function notify(id,msg,kind){var el=$(id);if(!el)return;el.textContent=msg;el.dataset.kind=kind||"info"}
function status(t){if(t.finished)return "Completed";if(state.endDate&&t.due>state.endDate)return "After project end";var d=today();return t.due<d?"Overdue":t.due===d?"Due today":"Upcoming"}
function load(){
 try{var val=localStorage.getItem(key);if(!val)return;var a=JSON.parse(val);if(!a||!Array.isArray(a.tasks))return;
 state.endDate=parse(a.endDate)?a.endDate:"";
 state.tasks=a.tasks.filter(function(t){return t&&typeof t.name==="string"&&parse(t.due)&&["once","weekly","monthly"].includes(t.repeat)}).map(function(t){
 return {id:String(t.id||taskId()),name:t.name.slice(0,140),due:t.due,repeat:t.repeat,
 anchor:Number(t.anchor)||parse(t.due).getDate(),doneCount:Math.max(0,Number(t.doneCount)||0),
 lastDone:parse(t.lastDone)?t.lastDone:"",finished:!!t.finished,
 history:Array.isArray(t.history)?t.history.slice(-50):[]};
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
  cell(row,t.name);
  cell(row,readable(t.due));
  var badge=make("span","mpt-demo-status "+(t.done?"is-done":t.due<today()?"is-late":""),t.done?"Done":t.due<today()?"Overdue":"Pending");
  cell(row,badge);
  var actions=make("div","mpt-demo-actions");
  actions.appendChild(button(t.done?"Reopen":"Done","toggle",t.id));
  actions.appendChild(button("Remove","delete",t.id));
  cell(row,actions);body.appendChild(row);
 });
 if(!freeTasks.length){var row=make("tr");var td=cell(row,"No tasks yet. Add your own task above.");td.colSpan=4;td.className="mpt-demo-empty";body.appendChild(row)}
 $("mpt-free-count").textContent=freeTasks.length+" / 8 tasks";
 $("mpt-free-add").disabled=freeTasks.length>=8;
}
function proRender(){
 var body=$("mpt-pro-demo-body");if(!body)return;body.textContent="";
 state.tasks.forEach(function(t){
  var row=make("tr");row.dataset.id=t.id;
  var name=input("text","Task description",t.name);name.className="mpt-demo-task-input";name.dataset.field="name";name.dataset.id=t.id;cell(row,name);
  var due=input("date","Next due date",t.due);due.dataset.field="due";due.dataset.id=t.id;cell(row,due);
  var sel=make("select");sel.dataset.field="repeat";sel.dataset.id=t.id;sel.setAttribute("aria-label","Repeat frequency");
  [["once","One time"],["weekly","Every week"],["monthly","Every month"]].forEach(function(pair){var op=make("option",null,pair[1]);op.value=pair[0];sel.appendChild(op)});sel.value=t.repeat;cell(row,sel);
  var flag=make("span","mpt-demo-status",status(t));if(status(t)==="Overdue")flag.classList.add("is-late");if(status(t)==="Completed")flag.classList.add("is-done");cell(row,flag);
  cell(row,String(t.doneCount));
  var actions=make("div","mpt-demo-actions");actions.appendChild(button(t.finished?"Completed":t.repeat==="once"?"Mark done":"Done · Next","complete",t.id));actions.lastChild.disabled=t.finished||!!(state.endDate&&t.due>state.endDate);
  if(t.history.length)actions.appendChild(button("Undo","undo",t.id));
  actions.appendChild(button("Remove","delete",t.id));cell(row,actions);body.appendChild(row);
 });
 if(!state.tasks.length){var row=make("tr"),td=cell(row,"No follow-up tasks yet. Add one or load optional sample tasks.");td.colSpan=7;td.className="mpt-demo-empty";body.appendChild(row)}
 var overdue=state.tasks.filter(function(t){return status(t)==="Overdue"}).length,completed=state.tasks.filter(function(t){return t.finished}).length;
 var todayCount=state.tasks.filter(function(t){return status(t)==="Due today"}).length;
 $("mpt-pro-total").textContent=String(state.tasks.length);
 $("mpt-pro-due").textContent=String(todayCount);
 $("mpt-pro-overdue").textContent=String(overdue);
 $("mpt-pro-complete").textContent=String(completed);
 $("mpt-pro-completions").textContent=String(state.tasks.reduce(function(a,t){return a+t.doneCount},0));
 if($("mpt-pro-enddate"))$("mpt-pro-enddate").value=state.endDate;
 if($("mpt-pro-ongoing"))$("mpt-pro-ongoing").checked=!state.endDate;
 if($("mpt-pro-enddate"))$("mpt-pro-enddate").disabled=!state.endDate;
 if(memoryOnly)notify("mpt-pro-message","Local storage is unavailable. This demonstration will not be saved after leaving the page.","warn");
}
function freeActions(){
 $("mpt-free-demo-form").addEventListener("submit",function(e){
  e.preventDefault();var name=$("mpt-free-task-name").value.trim(),due=$("mpt-free-task-date").value;
  if(!name||!parse(due)){notify("mpt-free-message","Enter a task name and a valid date.","warn");return}
  if(freeTasks.length>=8){notify("mpt-free-message","FREE demo limit: 8 tasks. Remove one before adding another.","warn");return}
  freeTasks.push({id:taskId(),name:name.slice(0,140),due:due,done:false});
  $("mpt-free-task-name").value="";notify("mpt-free-message","Task added. FREE demo tasks reset when you reload this page.","info");freeRender();
 });
 $("mpt-free-demo-body").addEventListener("click",function(e){
  var b=e.target.closest("button[data-action]");if(!b)return;var ix=freeTasks.findIndex(function(t){return t.id===b.dataset.id});if(ix<0)return;
  if(b.dataset.action==="delete")freeTasks.splice(ix,1);
  if(b.dataset.action==="toggle")freeTasks[ix].done=!freeTasks[ix].done;
  freeRender();
 });
 $("mpt-free-clear").addEventListener("click",function(){if(freeTasks.length&&!window.confirm("Clear all FREE demo tasks?"))return;freeTasks=[];freeRender();notify("mpt-free-message","FREE task list cleared.","info")});
 $("mpt-free-task-date").value=today();freeRender();
}
function proActions(){
 $("mpt-pro-demo-form").addEventListener("submit",function(e){
  e.preventDefault();var name=$("mpt-pro-task-name").value.trim(),due=$("mpt-pro-task-date").value,repeat=$("mpt-pro-repeat").value;
  if(!name||!parse(due)){notify("mpt-pro-message","Enter a task name and its first due date.","warn");return}
  if(state.endDate&&due>state.endDate){notify("mpt-pro-message","This due date is after the chosen project end date.","warn");return}
  state.tasks.push({id:taskId(),name:name.slice(0,140),due:due,repeat:repeat,anchor:parse(due).getDate(),doneCount:0,lastDone:"",finished:false,history:[]});
  $("mpt-pro-task-name").value="";save();proRender();notify("mpt-pro-message","Follow-up task added to this browser-only demo.","info");
 });
 $("mpt-pro-demo-body").addEventListener("change",function(e){
  var el=e.target,id=el.dataset.id,field=el.dataset.field;if(!id||!field)return;var t=state.tasks.find(function(x){return x.id===id});if(!t)return;
  if(field==="name"){if(!el.value.trim()){el.value=t.name;notify("mpt-pro-message","Task name cannot be blank.","warn");return}t.name=el.value.trim().slice(0,140)}
  if(field==="due"){if(!parse(el.value)){el.value=t.due;return}if(state.endDate&&el.value>state.endDate){el.value=t.due;notify("mpt-pro-message","Due date must be on or before project end.","warn");return}t.due=el.value;t.anchor=parse(el.value).getDate();t.finished=false}
  if(field==="repeat"){t.repeat=el.value;t.finished=false}
  save();proRender();
 });
 $("mpt-pro-demo-body").addEventListener("click",function(e){
  var b=e.target.closest("button[data-action]");if(!b)return;var i=state.tasks.findIndex(function(t){return t.id===b.dataset.id});if(i<0)return;var t=state.tasks[i],action=b.dataset.action;
  if(action==="delete"){if(!window.confirm("Remove this follow-up task and its demo history?"))return;state.tasks.splice(i,1)}
  if(action==="complete"&&!t.finished){
   var oldDue=t.due,next=nextDate(t.due,t.repeat,t.anchor),end=state.endDate;
   t.history.push({due:oldDue,at:today(),next:next});if(t.history.length>50)t.history.shift();
   t.lastDone=today();t.doneCount++;
   if(t.repeat==="once"||!next||(end&&next>end))t.finished=true;
   else t.due=next;
   notify("mpt-pro-message",t.finished?"Completed. This task has no further scheduled occurrences.":"Occurrence completed. Next "+t.repeat+" due: "+readable(t.due)+".","info");
  }
  if(action==="undo"&&t.history.length){var prev=t.history.pop();t.due=prev.due;t.finished=false;t.doneCount=Math.max(0,t.doneCount-1);t.lastDone=t.history.length?t.history[t.history.length-1].at:"";notify("mpt-pro-message","Last completion undone.","info")}
  save();proRender();
 });
 $("mpt-pro-ongoing").addEventListener("change",function(e){
  if(e.target.checked){state.endDate="";save();proRender();notify("mpt-pro-message","Ongoing project: no fixed end date.","info")}
  else{var input=$("mpt-pro-enddate");input.disabled=false;input.value=state.endDate||datePlus(today(),30);input.focus();notify("mpt-pro-message","Choose a final project date and click Set end date.","info")}
 });
 $("mpt-pro-set-end").addEventListener("click",function(){
  var e=$("mpt-pro-enddate"),v=e.value;if(!parse(v)){notify("mpt-pro-message","Choose a valid project end date.","warn");return}
  state.endDate=v;save();proRender();notify("mpt-pro-message","Project end date set: "+readable(v)+".","info");
 });
 $("mpt-pro-examples").addEventListener("click",function(){
  if(state.tasks.length&&!window.confirm("Add 20 sample follow-up tasks to your existing demo list?"))return;
  var nodes=document.querySelectorAll("#mpt-followup-showcase .mpt-followup-detail strong"),names=Array.from(nodes).slice(0,20).map(function(x){return x.textContent.trim()});
  if(!names.length){notify("mpt-pro-message","Sample tasks not found.","warn");return}
  names.forEach(function(name,i){
   var repeat=[3,10,11,13,17].includes(i)?([3,17].includes(i)?"monthly":"weekly"):"once",d=datePlus(today(),repeat==="monthly"?28:repeat==="weekly"?7:i+1);
   if(state.endDate&&d>state.endDate)return;
   state.tasks.push({id:taskId(),name:name,due:d,repeat:repeat,anchor:parse(d).getDate(),doneCount:0,lastDone:"",finished:false,history:[]});
  });
  save();proRender();notify("mpt-pro-message","Optional sample tasks added. Edit or remove any task to match your business.","info");
 });
 $("mpt-pro-clear").addEventListener("click",function(){
  if(!window.confirm("Delete all locally saved PRO demo tasks and their completion history from this browser?"))return;
  state={tasks:[],endDate:""};save();proRender();notify("mpt-pro-message","This browser's demo tasks and dates have been cleared.","info");
 });
 $("mpt-pro-task-date").value=today();load();proRender();
}
function start(){if($("mpt-free-demo-form"))freeActions();if($("mpt-pro-demo-form"))proActions()}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start);else start();
})();