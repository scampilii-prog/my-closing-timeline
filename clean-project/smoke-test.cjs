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
assert.match(script,/\$\('todayCount'\)\.textContent/,'Today counter must rerender');
assert.match(script,/\$\('tomorrowCount'\)\.textContent/,'Tomorrow counter must rerender');
assert.match(script,/\$\('overdueCount'\)\.textContent/,'Overdue counter must rerender');

new vm.Script(script,{filename:'shared/free.js'});
new vm.Script(siteScript,{filename:'shared/site.js'});
console.log('PASS: HTML IDs, external assets, 60/40 layout, six baseline tasks, browser persistence, balanced progress row, FREE limit and JS syntax.');
console.log('NOTE: Browser interactions and Cloudflare deployment require separate testing.');
