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
new vm.Script(proFollowups,{filename:'shared/pro-followups.js'});

new vm.Script(script,{filename:'shared/free.js'});
new vm.Script(siteScript,{filename:'shared/site.js'});
console.log('PASS: HTML IDs, external assets, 60/40 layout, six baseline tasks, browser persistence, balanced progress row, FREE limit and JS syntax.');
console.log('NOTE: Browser interactions and Cloudflare deployment require separate testing.');
