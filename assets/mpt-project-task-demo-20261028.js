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
// Business/personal project tasks use the very same date-only formulas as
// Real Estate FREE and PRO. Keep account and local demo storage separate.
var rules=window.MCTTaskRules;
if(!rules)throw Error("Task date calculations are not available. Refresh the page.");
function datePlus(s,n){return rules.addDays(s,n)}
function nextDate(s,kind,anchor){return rules.nextOccurrence(s,kind,anchor)}
function readable(s){var d=parse(s);return d?d.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}):"—"}
function taskId(){return "t"+Date.now().toString(36)+Math.random().toString(36).slice(2,9)}
function notify(id,msg,kind){var el=$(id);if(!el)return;el.textContent=msg;el.dataset.kind=kind||"info"}
function status(t){if(t.finished)return "Completed";if((state.endDate&&t.due>state.endDate)||(t.until&&t.due>t.until))return "After task end";var current=rules.taskStatus(t.due,false,today());return current==="overdue"?"Overdue":current==="today"?"Due today":"Upcoming"}
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

/* Other Projects FREE uses the same date-only engine and side-by-side
   Step 1 / Step 2 / live preview structure as Real Estate FREE.
   Unlike Real Estate, all eight tasks are created by the customer. */
function freeTaskDue(t){
 if(t.exact&&parse(t.due))return t.due;
 var anchor=t.base==="end"?freeProject.end:freeProject.start;
 if(!parse(anchor))return "";
 return rules.offsetDate(anchor,Number(t.days),t.direction,t.dayType,true);
}
function freeStatus(t){
 if(t.done)return "Done";
 if(!t.due)return "Set date";
 if(t.due<today())return "Overdue";
 if(t.due===today())return "Due today";
 if(t.due===datePlus(today(),1))return "Tomorrow";
 return "Pending";
}
function freeDatesOK(due){return !!parse(due)&&!(freeProject.start&&due<freeProject.start)&&!(freeProject.end&&due>freeProject.end)}
function freeSorted(){return freeTasks.slice().sort(function(a,b){return String(a.due||"9999").localeCompare(String(b.due||"9999"))||a.name.localeCompare(b.name)})}
function freeSelect(items,value,label){
 var el=make("select");el.setAttribute("aria-label",label);
 items.forEach(function(item){var opt=make("option",null,item[1]);opt.value=item[0];el.appendChild(opt)});
 el.value=value;return el;
}
function freeRender(){
 var body=$("mpt-free-demo-body");if(!body)return;body.textContent="";
 freeSorted().forEach(function(t,i){
  var row=make("tr",t.done?"mpt-free-done":t.due&&t.due<today()?"mpt-free-overdue":"");
  cell(row,String(i+1));
  var name=input("text","Edit task / reminder",t.name);name.className="mpt-free-col-name";name.dataset.field="name";name.dataset.id=t.id;cell(row,name);
  var days=input("number","Days",String(t.days));days.min="0";days.max="3650";days.step="1";days.className="mpt-free-col-days";days.dataset.field="days";days.dataset.id=t.id;cell(row,days);
  var kind=freeSelect([["calendar","Calendar Days"],["business","Business Days"]],t.dayType,"Calendar or business days");kind.className="mpt-free-col-type";kind.dataset.field="dayType";kind.dataset.id=t.id;cell(row,kind);
  var base=freeSelect([["start","Project Start"],["end","Project Finish"]],t.base,"Start or finish date");base.className="mpt-free-col-base";base.dataset.field="base";base.dataset.id=t.id;cell(row,base);
  var direction=freeSelect([["after","After"],["before","Before"]],t.direction,"Before or after base date");direction.className="mpt-free-col-direction";direction.dataset.field="direction";direction.dataset.id=t.id;cell(row,direction);
  var due=input("date","Exact task due date",t.due);due.className="mpt-free-col-date";due.dataset.field="due";due.dataset.id=t.id;due.title=t.exact?"Exact date selected. Change days to recalculate.":"Calculated from "+t.base+". You may enter an exact date.";cell(row,due);
  cell(row,make("span","mpt-demo-status "+(t.done?"is-done":t.due<today()?"is-late":""),freeStatus(t)));
  var actions=make("div","mpt-demo-actions");actions.appendChild(button(t.done?"Reopen":"Done","toggle",t.id));actions.appendChild(button("Remove","delete",t.id));cell(row,actions);Array.from(row.cells).forEach(function(td,j){td.dataset.label=["#","Task / reminder","Days","Day count","Based on","When","Due date","Status","Actions"][j]});body.appendChild(row);
 });
 if(!freeTasks.length){var empty=make("tr");var td=cell(empty,"No tasks yet. Enter your first task above — all eight tasks are yours to create.");td.colSpan=9;td.className="mpt-demo-empty";body.appendChild(empty)}
 $("mpt-free-count").textContent=freeTasks.length+" / 8 tasks";
 var sub=$("mpt-free-tasks-step").querySelector(".mpt-free-tasks-header small");if(sub)sub.textContent=freeTasks.length+" of 8";
 $("mpt-free-add").disabled=freeTasks.length>=8;
 $("mpt-free-reset-last").disabled=!freeTasks.length;
 $("mpt-free-sort").disabled=freeTasks.length<2;
 freeSummary();
}
function freeSummaryText(){
 var lines=["OTHER PROJECTS FREE TIMELINE","",
 "Private reference: "+(freeProject.ref||"Not entered"),
 "Project start: "+(freeProject.start||"Not selected"),
 "Project finish: "+(freeProject.end||"Not selected"),"",
 "TASK / REMINDER | DAYS | DUE DATE | STATUS",
 "------------------------------------------------------------"];
 freeSorted().forEach(function(t,i){lines.push((i+1)+". "+t.name+" | "+t.days+" "+t.dayType+" days | "+(t.due||"TBD")+" | "+freeStatus(t))});
 return lines.join("\n");
}
function freeSummary(){
 var el=$("mpt-free-summary");if(!el)return;
 var completed=freeTasks.filter(function(t){return t.done}).length;
 el.textContent=(freeProject.ref||"Your project")+" · "+freeTasks.length+" of 8 tasks · "+completed+" completed · "+(freeProject.end?"Finish "+readable(freeProject.end):"No finish date selected")+".";
 var list=$("mpt-free-live-list");if(!list)return;list.textContent="";
 freeSorted().forEach(function(t,i){
  var li=make("li"),badge=make("b",null,String(i+1)),wrap=make("div"),title=make("strong",null,t.name);
  var detail=make("span",null,(t.due?readable(t.due):"Due date not entered")+" · "+freeStatus(t));
  wrap.append(title,detail);li.append(badge,wrap);list.appendChild(li);
 });
 if(!freeTasks.length){list.appendChild(make("li",null,"Add a task in Step 2 to see your live project timeline here."))}
}
function freeMeta(){
 var oldStart=freeProject.start,oldEnd=freeProject.end;
 freeProject.ref=($("mpt-free-project-ref").value||"").trim().slice(0,40);
 freeProject.start=parse($("mpt-free-project-start").value)?$("mpt-free-project-start").value:"";
 freeProject.end=parse($("mpt-free-project-end").value)?$("mpt-free-project-end").value:"";
 if(freeProject.start&&freeProject.end&&freeProject.end<freeProject.start){
  notify("mpt-free-message","The project finish cannot be before its start.","warn");
  freeProject.end=oldEnd; $("mpt-free-project-end").value=oldEnd;
 }
 if(oldStart!==freeProject.start||oldEnd!==freeProject.end){
  freeTasks.forEach(function(t){if(!t.exact)t.due=freeTaskDue(t)});
  if(freeTasks.some(function(t){return t.due&&!freeDatesOK(t.due)}))notify("mpt-free-message","Some calculated deadlines fall outside the selected project dates. Review Step 2.","warn");
 }
 freeRender();
}
function escapeICS(value){return String(value||"").replace(/\\/g,"\\\\").replace(/\r?\n/g,"\\n").replace(/[,;]/g,function(c){return "\\"+c})}
function freeCalendar(){
 if(!freeTasks.some(function(t){return parse(t.due)})){notify("mpt-free-message","Enter at least one valid due date to create a calendar.","warn");return}
 var lines=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//My Closing Timeline//Other Projects FREE//EN","CALSCALE:GREGORIAN","METHOD:PUBLISH"];
 freeTasks.filter(function(t){return parse(t.due)}).forEach(function(t){lines.push("BEGIN:VEVENT","UID:"+t.id+"@myclosingtimeline.com","DTSTAMP:"+new Date().toISOString().replace(/[-:]/g,"").replace(/\.\d{3}/,""),"DTSTART;VALUE=DATE:"+t.due.replace(/-/g,""),"DTEND;VALUE=DATE:"+datePlus(t.due,1).replace(/-/g,""),"SUMMARY:"+escapeICS(t.name),"DESCRIPTION:"+escapeICS("Private project reference: "+(freeProject.ref||"Not entered")),"END:VEVENT")});
 lines.push("END:VCALENDAR");
 var blob=new Blob([lines.join("\r\n")+"\r\n"],{type:"text/calendar;charset=utf-8"}),url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download="other-projects-free-timeline.ics";document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(url)},1200);
 notify("mpt-free-message","Calendar created on your device. Import it in your calendar app; nothing was sent by this website.","info");
}
function freePicture(){
 var list=freeSorted(),canvas=document.createElement("canvas"),ctx=canvas.getContext("2d");
 var width=1020,rowH=86;canvas.width=width;canvas.height=183+Math.max(1,list.length)*rowH+45;
 ctx.fillStyle="#ffffff";ctx.fillRect(0,0,width,canvas.height);
 ctx.fillStyle="#143b54";ctx.fillRect(0,0,width,107);
 ctx.fillStyle="#ffffff";ctx.font="bold 30px Arial";ctx.fillText("OTHER PROJECTS FREE TIMELINE",27,45);
 ctx.fillStyle="#d6ecdf";ctx.font="18px Arial";ctx.fillText("Your Projects. Your Tasks. Your Timeline.",27,81);
 ctx.fillStyle="#214c5e";ctx.font="bold 19px Arial";ctx.fillText("Reference: "+String(freeProject.ref||"Not entered").slice(0,40),27,140);
 ctx.fillStyle="#466c78";ctx.font="16px Arial";ctx.fillText("Start: "+(freeProject.start||"Not entered")+"   |   Finish: "+(freeProject.end||"Not selected"),27,166);
 if(!list.length){ctx.fillText("Add your tasks before copying this timeline.",27,222)}
 list.forEach(function(t,i){
  var y=185+i*rowH;ctx.fillStyle=i%2===0?"#f2f8f7":"#fffaf1";ctx.fillRect(16,y,width-32,rowH-6);
  ctx.fillStyle="#1f5065";ctx.font="bold 20px Arial";ctx.fillText((i+1)+". "+t.name.slice(0,68),28,y+30);
  ctx.fillStyle="#567481";ctx.font="16px Arial";ctx.fillText("Due: "+(t.due||"To be confirmed")+"     "+t.days+" "+t.dayType+" days     Status: "+freeStatus(t),28,y+58);
 });
 ctx.fillStyle="#71818c";ctx.font="14px Arial";ctx.fillText("Please verify the project dates and task requirements before sharing.",27,canvas.height-20);
 return canvas;
}
function freeCopyPicture(){
 var fallback=function(){
  if(!navigator.clipboard||!navigator.clipboard.writeText){notify("mpt-free-message","This browser cannot copy the image. Use the summary preview or calendar download.","warn");return}
  navigator.clipboard.writeText(freeSummaryText()).then(function(){notify("mpt-free-message","Timeline text copied. Paste it into your email.","info")}).catch(function(){notify("mpt-free-message","Clipboard access was blocked. Please copy from the on-page timeline.","warn")});
 };
 if(!freeTasks.length){notify("mpt-free-message","Add at least one task before copying the timeline.","warn");return}
 if(!navigator.clipboard||!navigator.clipboard.write||!window.ClipboardItem){fallback();return}
 try{
  var png=new Promise(function(resolve,reject){freePicture().toBlob(function(blob){blob?resolve(blob):reject(Error("Image unavailable"))},"image/png")});
  navigator.clipboard.write([new ClipboardItem({"image/png":png})]).then(function(){notify("mpt-free-message","Timeline copied as an image. Open Mail and paste it between the markers using ⌘V or Ctrl+V.","info")}).catch(fallback);
 }catch(e){fallback()}
}
function freeOpenMail(){
 var content=["Hello,","","I hope you are doing well.","",
  "I am sharing our Project Timeline Summary to help us stay coordinated on the next steps, deadlines, and progress.","",
  "================ PROJECT TIMELINE SUMMARY ================","",
  ">>> PASTE YOUR COPIED PROJECT TIMELINE TABLE HERE <<<","",
  "==========================================================","",
  "Please review the dates and let me know if any milestones or requirements need to be updated.","",
  "Thank you for your time and cooperation. I look forward to working together toward a successful project.","",
  "Best regards,",""].join("\n");
 notify("mpt-free-message","Mail draft opened. Paste the copied table between the markers. No email is sent automatically.","info");
 window.location.href="mailto:?subject="+encodeURIComponent("Project Timeline Summary | Please Review Dates")+"&body="+encodeURIComponent(content);
}

function proRender(){
 var body=$("mpt-pro-demo-body");if(!body)return;body.textContent="";
 state.tasks.forEach(function(t){
  var row=make("tr");row.dataset.id=t.id;var expired=t.due<today();if(expired)row.classList.add("mpt-expired-locked");
  var name=input("text","Task description",t.name);name.disabled=expired;name.className="mpt-demo-task-input";name.dataset.field="name";name.dataset.id=t.id;
  var nameWrap=make("div","mpt-pro-task-title");nameWrap.appendChild(name);
  if(t.history.length){var details=make("details","mpt-demo-history"),summary=make("summary",null,"History · "+t.history.length+" completed");details.appendChild(summary);
   var list=make("ol");t.history.slice().reverse().forEach(function(h){list.appendChild(make("li",null,"Due "+readable(h.due)+" · done "+readable(h.at)))});details.appendChild(list);nameWrap.appendChild(details)}
  cell(row,nameWrap);
  var due=input("date","Next due date",t.due);due.dataset.field="due";due.dataset.id=t.id;due.disabled=expired;cell(row,due);
  var sel=make("select");sel.dataset.field="repeat";sel.dataset.id=t.id;sel.setAttribute("aria-label","Repeat frequency");
  [["once","One time"],["daily","Every day"],["weekly","Every week"],["monthly","Every month"]].forEach(function(pair){var op=make("option",null,pair[1]);op.value=pair[0];sel.appendChild(op)});sel.value=t.repeat;sel.disabled=expired;cell(row,sel);
  var owner=input("text","Responsible role (no person names)",t.owner||"");owner.maxLength=60;owner.dataset.field="owner";owner.dataset.id=t.id;owner.disabled=expired;cell(row,owner);
  var note=input("text","Generic note (no private information)",t.note||"");note.maxLength=180;note.dataset.field="note";note.dataset.id=t.id;note.disabled=expired;cell(row,note);
  var until=input("date","Optional end date for this task",t.until||"");until.dataset.field="until";until.dataset.id=t.id;until.disabled=expired;cell(row,until);
  var flag=make("span","mpt-demo-status",status(t));if(status(t)==="Overdue")flag.classList.add("is-late");if(status(t)==="Completed")flag.classList.add("is-done");cell(row,flag);
  cell(row,String(t.doneCount));
  var actions=make("div","mpt-demo-actions");actions.appendChild(button(t.finished?"Completed":t.repeat==="once"?"Mark done":"Done · Next","complete",t.id));actions.lastChild.disabled=expired||t.finished||!!(state.endDate&&t.due>state.endDate)||!!(t.until&&t.due>t.until);
  if(t.history.length){actions.appendChild(button("Undo","undo",t.id));actions.lastChild.disabled=expired;}
  actions.appendChild(button("Remove","delete",t.id));actions.lastChild.disabled=expired;cell(row,actions);body.appendChild(row);
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
 // No account, cookies or remote storage: the user owns these eight
 // in-memory tasks. Re-loading clears them as advertised.
 $("mpt-free-demo-form").addEventListener("submit",function(e){
  e.preventDefault();
  var name=$("mpt-free-task-name").value.trim(),days=Number($("mpt-free-task-days").value),exact=$("mpt-free-task-date").value;
  if(freeTasks.length>=8){notify("mpt-free-message","Eight tasks is the FREE limit. Remove one before adding another.","warn");return}
  if(!name||!Number.isInteger(days)||days<0||days>3650){notify("mpt-free-message","Enter a task name and between 0 and 3650 days.","warn");return}
  if(exact&&!parse(exact)){notify("mpt-free-message","Enter a valid exact date.","warn");return}
  if(!exact&&!freeProject.start){notify("mpt-free-message","Select the project start date in Step 1, or enter an exact due date.","warn");return}
  var kind=$("mpt-free-day-count").value==="business"?"business":"calendar";
  var item={id:taskId(),name:name.slice(0,140),days:days,dayType:kind,base:"start",direction:"after",exact:!!exact,due:exact||"",done:false};
  if(!item.exact)item.due=freeTaskDue(item);
  if(!item.due||!freeDatesOK(item.due)){notify("mpt-free-message","Task due date must be inside your selected project period. Check your days or exact date.","warn");return}
  freeTasks.push(item);
  $("mpt-free-task-name").value="";$("mpt-free-task-date").value="";
  notify("mpt-free-message","Task added. Dates recalculate automatically; eight FREE tasks maximum.","info");
  freeRender();
 });
 ["mpt-free-project-ref","mpt-free-project-start","mpt-free-project-end"].forEach(function(id){$(id).addEventListener("change",freeMeta)});
 $("mpt-free-day-count").addEventListener("change",function(){
  var kind=this.value==="business"?"business":"calendar";
  freeTasks.forEach(function(t){t.dayType=kind;if(!t.exact)t.due=freeTaskDue(t)});
  freeRender();notify("mpt-free-message",kind==="business"?"Business Days: skip weekends and observed U.S. federal holidays.":"Calendar Days: include all days and adjust weekend/holiday deadlines.","info");
 });
 $("mpt-free-demo-body").addEventListener("change",function(e){
  var el=e.target,id=el.dataset.id,field=el.dataset.field;
  if(!id||!field)return;
  var t=freeTasks.find(function(x){return x.id===id});if(!t)return;
  var candidate=Object.assign({},t),v=el.value;
  if(field==="name"){
   if(!v.trim()){notify("mpt-free-message","A task name cannot be empty.","warn");freeRender();return}
   candidate.name=v.trim().slice(0,140);
  }else if(field==="due"){
   if(!parse(v)){notify("mpt-free-message","Enter a valid due date.","warn");freeRender();return}
   candidate.due=v;candidate.exact=true;
  }else if(field==="days"){
   if(v.trim()===""||!Number.isInteger(Number(v))||Number(v)<0||Number(v)>3650){notify("mpt-free-message","Days must be a whole number between 0 and 3650.","warn");freeRender();return}
   candidate.days=Number(v);candidate.exact=false;candidate.due=freeTaskDue(candidate);
  }else{
   if(field==="dayType"&&!["calendar","business"].includes(v))return;
   if(field==="base"&&!["start","end"].includes(v))return;
   if(field==="direction"&&!["before","after"].includes(v))return;
   candidate[field]=v;candidate.exact=false;candidate.due=freeTaskDue(candidate);
  }
  if(!candidate.due||!freeDatesOK(candidate.due)){
   notify("mpt-free-message","The date falls outside your project, or its Start/Finish date is missing. Change the settings and try again.","warn");
   freeRender();return;
  }
  Object.assign(t,candidate);
  freeRender();
  notify("mpt-free-message","Task updated; the live timeline reflects your changes.","info");
 });
 $("mpt-free-demo-body").addEventListener("click",function(e){
  var b=e.target.closest("button[data-action]");if(!b)return;
  var ix=freeTasks.findIndex(function(t){return t.id===b.dataset.id});if(ix<0)return;
  if(b.dataset.action==="delete")freeTasks.splice(ix,1);
  if(b.dataset.action==="toggle")freeTasks[ix].done=!freeTasks[ix].done;
  freeRender();
 });
 $("mpt-free-reset-last").addEventListener("click",function(){
  if(!freeTasks.length)return;freeTasks.pop();freeRender();notify("mpt-free-message","Most recently added task removed.","info");
 });
 $("mpt-free-sort").addEventListener("click",function(){
  freeRender();notify("mpt-free-message","Tasks displayed in due-date order.","info");
 });
 $("mpt-free-clear").addEventListener("click",function(){
  if(freeTasks.length&&!window.confirm("Clear all eight FREE project tasks from this page?"))return;
  freeTasks=[];freeRender();notify("mpt-free-message","Your FREE task list is clear.","info");
 });
 $("mpt-free-copy").addEventListener("click",freeCopyPicture);
 $("mpt-free-mail").addEventListener("click",freeOpenMail);
 $("mpt-free-calendar").addEventListener("click",freeCalendar);
 // Do not fill up the table with defaults: Other Projects tasks belong to
 // each individual customer, unlike six suggested Real Estate milestones.
 $("mpt-free-project-start").value=today();
 $("mpt-free-task-date").value="";
 freeMeta();freeRender();
}

function proActions(){
 $("mpt-pro-demo-form").addEventListener("submit",function(e){
  e.preventDefault();var name=$("mpt-pro-task-name").value.trim(),due=$("mpt-pro-task-date").value,repeat=$("mpt-pro-repeat").value;
  if(!name||!parse(due)){notify("mpt-pro-message","Enter a task name and its first due date.","warn");return}
  if(due<today()){notify("mpt-pro-message","Past due dates are locked. Choose today or a future date.","warn");return}
  if(state.endDate&&due>state.endDate){notify("mpt-pro-message","This due date is after the chosen project end date.","warn");return}
  var until=$("mpt-pro-task-until").value,owner=$("mpt-pro-task-owner").value.trim(),note=$("mpt-pro-task-note").value.trim();
  if(until&&(!parse(until)||until<due)){notify("mpt-pro-message","The task's last occurrence must be on or after its first date.","warn");return}
  if(state.endDate&&until&&until>state.endDate){notify("mpt-pro-message","The task cannot extend beyond the project end date.","warn");return}
  state.tasks.push({id:taskId(),name:name.slice(0,140),due:due,repeat:repeat,anchor:parse(due).getDate(),owner:owner.slice(0,60),note:note.slice(0,180),until:until,doneCount:0,lastDone:"",finished:false,history:[]});
  $("mpt-pro-task-name").value="";$("mpt-pro-task-owner").value="";$("mpt-pro-task-note").value="";save();proRender();notify("mpt-pro-message","Follow-up task added to this browser-only demo.","info");
 });
 $("mpt-pro-demo-body").addEventListener("change",function(e){
  var el=e.target,id=el.dataset.id,field=el.dataset.field;if(!id||!field)return;var t=state.tasks.find(function(x){return x.id===id});if(!t)return;
  if(t.due<today()){notify("mpt-pro-message","This overdue task is locked. Its history is preserved.","warn");proRender();return}
  if(field==="name"){if(!el.value.trim()){el.value=t.name;notify("mpt-pro-message","Task name cannot be blank.","warn");return}t.name=el.value.trim().slice(0,140)}
  if(field==="due"){if(!parse(el.value)){el.value=t.due;return}if((state.endDate&&el.value>state.endDate)||(t.until&&el.value>t.until)){el.value=t.due;notify("mpt-pro-message","Due date must not exceed the project or task end date.","warn");return}t.due=el.value;t.anchor=parse(el.value).getDate();t.finished=false}
  if(field==="repeat"){if(!["once","daily","weekly","monthly"].includes(el.value))return;t.repeat=el.value;t.finished=false}
  if(field==="owner")t.owner=el.value.trim().slice(0,60);
  if(field==="note")t.note=el.value.trim().slice(0,180);
  if(field==="until"){if(el.value&&(!parse(el.value)||el.value<t.due||(state.endDate&&el.value>state.endDate))){el.value=t.until||"";notify("mpt-pro-message","Task end date must follow its due date and not exceed project end.","warn");return}t.until=el.value;t.finished=false}
  save();proRender();
 });
 $("mpt-pro-demo-body").addEventListener("click",function(e){
  var b=e.target.closest("button[data-action]");if(!b)return;var i=state.tasks.findIndex(function(t){return t.id===b.dataset.id});if(i<0)return;var t=state.tasks[i],action=b.dataset.action;if(t.due<today()){notify("mpt-pro-message","Overdue tasks are read-only, just as in Real Estate PRO.","warn");return}
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
 // This is a local PRO demonstration, not a paid account. The final
 // account feature will use saved, read-only records after expiration.
 // PDF access must never require an active plan or a fresh payment.
 $("mpt-pro-demo-pdf").addEventListener("click",function(){
  if(typeof window.MCTPrivatePDFDownload!=="function"){notify("mpt-pro-message","The private PDF generator is unavailable. Reload the page and try again.","warn");return}
  try{
   var code="CL-"+Array.from(crypto.getRandomValues(new Uint8Array(4)),function(x){return x.toString(16).padStart(2,"0")}).join("").toUpperCase();
   var tasks=[];
   state.tasks.forEach(function(t){
    tasks.push({name:t.name,date:t.due,status:t.finished?"Completed":status(t)});
    (t.history||[]).forEach(function(h){tasks.push({name:t.name+" - completed occurrence",date:h.due,status:"Done "+h.at})});
   });
   window.MCTPrivatePDFDownload({projectType:"other",reference:code,effective:state.planStart||today(),closing:state.endDate||"",entries:tasks});
   notify("mpt-pro-message","Demo PDF downloaded locally. Your actual future PRO account will keep PDF access after expiry without renewal.","info");
  }catch(err){notify("mpt-pro-message","PDF export was not completed: "+String(err&&err.message||"Please try again."),"warn")}
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