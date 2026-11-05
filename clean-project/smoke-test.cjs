// Dependency-free structural checks for the isolated FREE Real Estate page.
const fs=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const read=path=>fs.readFileSync(__dirname+'/'+path,'utf8');
const html=read('free-real-estate.html');
const css=read('shared/free.css');
const script=read('shared/free.js');
const siteScript=read('shared/site.js');
const ids=['effective','closing','start','dayCounting','taskRows','resetTasks','sortTasks','updateTable','toggleAddTask','addTaskPanel','taskName','taskDays','addTask','totalCount','openCount','doneCount','closingSummary','copyTimeline','mailTimeline','summaryFeedback','todayCount','tomorrowCount','overdueCount','todayList','tomorrowList','overdueList','progressTotal','progressDone','progressRemaining','progressPercent','progressTrack','progressFill','activityCount','recentActivity','activityToggle','activityHistory','resetDates'];
for(const id of ids){
 const occurrences=html.match(new RegExp('id="'+id+'"','g'))||[];
 assert.equal(occurrences.length,1,'Expected exactly one #'+id);
}
for(const src of ['shared/site.js','shared/free.js']){
 assert.ok(html.includes('src="'+src+'"'),'Missing script '+src);
}
for(const href of ['shared/site.css','shared/free.css']){
 assert.ok(html.includes('href="'+href+'"'),'Missing stylesheet '+href);
}
assert.match(css,/grid-template-columns:\s*3fr\s+2fr/,'Step 2 / Summary layout must remain 60/40');
assert.doesNotMatch(script,/\['Final walk-through',-1,'closing'\]/,'Walk-through is not one of the six original defaults');
for(const [name,days] of [['1st Deposit',3],['2nd Deposit',5],['Loan Application',5],['Condo Application',5],['Property Inspection deadline w/right to cancel',7],['LOAN APPROVAL - Notify seller if NO LOAN APPROVAL',30]]){
 assert.ok(script.includes("['"+name+"',"+days+",'effective']"),'Missing baseline task: '+name);
}
assert.match(script,/let state=initial\(\)/,'Practice initializes from the original defaults');
assert.match(script,/localStorage\.getItem\(KEY\)/,'Browser-only practice state must persist on reload');
assert.match(script,/state\.tasks\.length>=8/,'FREE task limit must be enforced');

// PRO-specific regression checks: six original tasks and the side-by-side summary must not disappear.
const proHtml=read('real-estate-pro.html');
const proFollowups=read('shared/pro-followups.js');
assert.match(proHtml,/<section class="free-grid">[\s\S]*?<div class="free-left">[\s\S]*?<aside class="free-right">/,'PRO must retain contract tasks left and summary right');
assert.match(proHtml,/id="restoreOriginalSetup"/,'PRO must offer full original setup restoration');
assert.match(proHtml,/id="proFollowupRows"/,'PRO must contain Step 3');
assert.match(css,/@media\(min-width:1001px\)\{body:has\(#proFollowupRows\) \.free-grid\{grid-template-columns:minmax\(0,3fr\) minmax\(0,2fr\)\}\}/,'PRO desktop layout must be two columns');
assert.match(css,/@media\(max-width:1000px\)\{body:has\(#proFollowupRows\) \.free-grid\{grid-template-columns:minmax\(0,1fr\)\}\}/,'PRO small-screen layout must stack');
assert.match(script,/const defaults=\[\['1st Deposit',3,'effective'\]/,'PRO/FREE baseline begins with the approved first task');
assert.match(script,/IS_PRO\?'mct-clean-pro-step2-v1'/,'PRO Step 2 storage must remain distinct from FREE');
assert.match(proFollowups,/const defaults=\[/,'PRO Step 3 must retain suggested follow-ups');

// Full restore must discard only PRO browser-preview data, not the FREE practice or paid records.
const restoreBlock=proHtml.slice(proHtml.indexOf("const button=document.getElementById('restoreOriginalSetup')"));
for(const key of ['mct-clean-pro-step2-v1','mct-clean-pro-followups-demo-v2','mct-clean-pro-followups-demo-v1','mct-clean-pro-demo-completed-v1']){
 assert.ok(restoreBlock.includes("'"+key+"'"),'Restore must clear '+key);
}
assert.doesNotMatch(restoreBlock,/mct-clean-free-v13/,'Restore must never delete FREE practice');
assert.match(restoreBlock,/window\.confirm\([\s\S]*?window\.confirm\(/,'Full restore requires two confirmations');
assert.match(restoreBlock,/window\.location\.reload\(\)/,'Full restore must reload defaults');
assert.match(script,/const defaults=\[\['1st Deposit',3,'effective'\]/,'Step 2 restores six approved baseline tasks');
const defaultTaskCount=(script.match(/\['(?:1st Deposit|2nd Deposit|Loan Application|Condo Application|Property Inspection deadline w\/right to cancel|LOAN APPROVAL - Notify seller if NO LOAN APPROVAL)',(?:3|5|7|30),'effective'\]/g)||[]).length;
assert.equal(defaultTaskCount,6,'Exactly six contract defaults must exist');
const followDefaultLine=proFollowups.match(/const defaults=(\[[^;]+\]);const defaultOffsets=/);
assert.ok(followDefaultLine,'Follow-up defaults must be declared');
assert.equal(JSON.parse(followDefaultLine[1]).length,44,'Step 3 must restore exactly 44 original follow-ups');


// A post-closing follow-up is not a pre-closing task.
assert.match(proFollowups,/basis:i===43\?'afterClosing':/,'Final follow-up must use a distinct after-closing basis');
assert.match(proFollowups,/\['afterClosing','After Closing Date'\]/,'Step 3 must expose after-closing basis');
assert.match(proFollowups,/row\.basis==='closing'\|\|row\.basis==='afterClosing'\?'closing':'effective'/,'Both closing-relative bases must use Closing Date');
assert.match(proFollowups,/\(row\.basis==='closing'\?-1:1\)\*Number\(row\.days\|\|0\)/,'Only pre-closing tasks subtract days');
assert.match(proFollowups,/29,29,1\];const closingOffsets=/,'Post-closing default must be one day');

new vm.Script(proFollowups,{filename:'shared/pro-followups.js'});


// Date changes must invalidate manual due-date overrides and refresh all summaries.
assert.match(script,/for\(const id of \['effective','closing'\]\) \{[\s\S]*?el\.addEventListener\('change',[\s\S]*?state\[id\]=el\.value;[\s\S]*?state\.tasks\.forEach\(t=>delete t\.manualDue\);[\s\S]*?change\(\);/,'Contract date changes must recalculate tasks');
assert.match(script,/const due=t=>t\.manualDue\|\|/,'Due dates must use manual override or calculated offset');
assert.match(script,/\$\('closingSummary'\)\.replaceChildren\(\)/,'Closing summary must rerender');
assert.match(script,/\['today',state\.tasks\.filter/,'Today tasks must be recalculated');
assert.match(script,/\['tomorrow',state\.tasks\.filter/,'Tomorrow tasks must be recalculated');
assert.match(script,/\['overdue',state\.tasks\.filter/,'Overdue tasks must be recalculated');
assert.match(script,/\$\(id\+'Count'\)\.textContent=items\.length/,'Daily counters must rerender from their computed groups');

new vm.Script(script,{filename:'shared/free.js'});
new vm.Script(siteScript,{filename:'shared/site.js'});

// V3 Step 1 is intentionally isolated from the legacy V2 styles and storage.
const v3Html=read('real-estate-pro-v3.html');
const v3Css=read('shared/pro-v3.css');
const v3Js=read('shared/pro-v3.js');
for(const id of ['effective','closing','counting','restore','rows','selectedCount','email','copy','clear','add','sort','total']){
 assert.equal((v3Html.match(new RegExp('id="'+id+'"','g'))||[]).length,1,'V3 must have one '+id);
}
assert.match(v3Html,/shared\/pro-v3\.css/);
assert.match(v3Html,/shared\/pro-v3\.js/);
assert.doesNotMatch(v3Html,/shared\/free\.css|shared\/free\.js|shared\/pro-v2\.css/,'V3 must not load legacy CSS/JS');
assert.match(v3Css,/\.v3-scroll\{max-height:610px;overflow:auto/,'V3 task list scrolls inside its frame');
assert.match(v3Css,/thead th\{position:sticky/,'V3 table header remains visible');
assert.match(v3Js,/mct-clean-v3-step1-demo/,'V3 has its own browser practice key');
assert.match(v3Js,/localStorage\.setItem\(key/,'V3 saves changes locally');
assert.match(v3Js,/selected\.clear\(\)/,'V3 supports deselect all');
assert.match(v3Js,/mailto:/,'V3 email prepares a draft');
assert.match(v3Js,/t\.done=done\.checked/,'V3 Done is independent of selection');
assert.match(v3Js,/state\.tasks=fresh\(\)\.tasks/,'V3 can restore six original tasks');
const v3Defaults=v3Js.match(/const baseline=(\[[^;]+\]);const fresh=/);
assert.ok(v3Defaults,'V3 must declare six contract defaults');
assert.equal(JSON.parse(v3Defaults[1].replace(/'/g,'"')).length,6,'V3 must start with six contract tasks');
for(const id of ['emailDialog','recipientList','addRecipient','saveRecipient','recipientName','recipientEmail','recipientRole','emailSubject','emailMessage','includeCongrats','emailPreview','openMail'])assert.equal((v3Html.match(new RegExp('id="'+id+'"','g'))||[]).length,1,'V3 composer must have '+id);
assert.match(v3Js,/mct-clean-v3-recipients-demo/,'V3 demo contacts use separate local storage');
assert.match(v3Js,/chosenRecipients/,'V3 supports multiple recipients');
assert.match(v3Html,/id="clearDates"/,'V3 must provide Clear Dates');
assert.match(v3Html,/id="dateHint"/,'V3 must explain the closing date range');
assert.match(v3Js,/addDays\(state\.effective,60,false\)/,'Closing Date must use 60 calendar days');
assert.match(v3Js,/state\.effective='';state\.closing='';save\(\);render\(\)/,'Clear Dates must clear both dates');
assert.match(v3Js,/state\.effective='';state\.closing='';const selected=new Set\(\)/,'V3 preview must reopen with blank dates after refresh');
assert.match(v3Js,/field\.addEventListener\('mouseenter'/,'Date picker must attempt hover opening');
assert.match(v3Js,/\$\('closing'\)\.min=state\.effective/,'Closing Date must be bounded by Effective Date');
assert.match(v3Js,/const validEmail=value=>\/\^\[\^\\s@\]\+@\[\^\\s@\]\+\\\.\[\^\\s@\]\+\$\//,'Email validation must use real whitespace escapes');
assert.match(v3Html,/class="v3-dialog-footer"/,'Composer must show a persistent footer');
assert.match(v3Css,/\.v3-dialog-footer\{position:sticky/,'Composer actions must remain visible while scrolling');
new vm.Script(v3Js,{filename:'shared/pro-v3.js'});
console.log('PASS: isolated V3 Step 1 assets, six original tasks, selection, Done, restore and JS syntax.');

console.log('PASS: HTML IDs, external assets, 60/40 layout, six baseline tasks, browser persistence, balanced progress row, FREE limit and JS syntax.');
console.log('NOTE: Browser interactions and Cloudflare deployment require separate testing.');
