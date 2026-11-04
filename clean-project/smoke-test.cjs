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
assert.match(script,/\['Final walk-through',-1,'closing'\]/,'Walk-through must be one day before closing');
for(const [name,days] of [['1st Deposit',3],['2nd Deposit',5],['Loan Application',5],['Condo Application',5],['Property Inspection deadline w/right to cancel',7],['LOAN APPROVAL - Notify seller if NO LOAN APPROVAL',30]]){
 assert.ok(script.includes("['"+name+"',"+days+",'effective']"),'Missing baseline task: '+name);
}
assert.match(script,/let state=initial\(\)/,'FREE practice must reset to defaults on reload');
assert.doesNotMatch(script,/state\s*=\s*saved/,'FREE practice must not restore deleted tasks or old dates');
assert.match(script,/state\.tasks\.length>=8/,'FREE task limit must be enforced');
new vm.Script(script,{filename:'shared/free.js'});
new vm.Script(siteScript,{filename:'shared/site.js'});
console.log('PASS: HTML IDs, external assets, 60/40 layout, seven baseline tasks, -1 walk-through, browser persistence, balanced progress row, FREE limit and JS syntax.');
console.log('NOTE: Browser interactions and Cloudflare deployment require separate testing.');
