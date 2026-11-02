// Project Timeline regression tests. Run: node --test tests/project-date-rules.test.cjs
// No accounts, D1, Stripe, or production data are accessed.
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const source=fs.readFileSync(path.join(__dirname,'../assets/mct-task-rules-20261029.js'),'utf8');
const context=vm.createContext({Date,Math,Object,Number,String,Array,RegExp});
vm.runInContext(source.replace('typeof window!=="undefined"?window:globalThis','globalThis'),context);
const rules=context.MCTTaskRules;
const cases=[
 ['leap year',()=>rules.addDays('2028-02-28',1),'2028-02-29'],
 ['non leap year',()=>rules.addDays('2027-02-28',1),'2027-03-01'],
 ['year boundary',()=>rules.addDays('2026-12-31',1),'2027-01-01'],
 ['DST unaffected',()=>rules.addDays('2026-03-07',2),'2026-03-09'],
 ['business weekend skip',()=>rules.offsetDate('2026-11-06',1,'after','business',true),'2026-11-09'],
 ['Thanksgiving skip',()=>rules.offsetDate('2026-11-25',1,'after','business',true),'2026-11-27'],
 ['Christmas skip',()=>rules.offsetDate('2026-12-24',1,'after','business',true),'2026-12-28'],
 ['before basis',()=>rules.offsetDate('2026-12-01',5,'before','calendar',false),'2026-11-26'],
 ['manual exact date stays fixed',()=>{const exact='2026-12-10';rules.offsetDate('2026-11-15',10,'after','calendar',false);return exact},'2026-12-10'],
 ['monthly Jan 31',()=>rules.nextOccurrence('2026-01-31','monthly',31),'2026-02-28'],
 ['monthly Feb rollover',()=>rules.nextOccurrence('2026-02-28','monthly',31),'2026-03-31'],
 ['weekly recurrence',()=>rules.nextOccurrence('2026-11-01','weekly'),'2026-11-08'],
 ['daily recurrence',()=>rules.nextOccurrence('2026-11-01','daily'),'2026-11-02'],
 ['invalid date',()=>rules.parseISO('2026-02-30'),null],
 ['invalid negative offset',()=>rules.offsetDate('2026-11-01',-1,'after','calendar',false),''],
 ['today',()=>rules.taskStatus('2026-11-01',false,'2026-11-01'),'today'],
 ['tomorrow',()=>rules.taskStatus('2026-11-02',false,'2026-11-01'),'tomorrow'],
 ['overdue',()=>rules.taskStatus('2026-10-31',false,'2026-11-01'),'overdue'],
 ['done overrides overdue',()=>rules.taskStatus('2026-10-31',true,'2026-11-01'),'done'],
 ['60 day window',()=>rules.withinDays('2026-11-01','2026-12-31',60),true],
 ['61 days exceeds window',()=>rules.withinDays('2026-11-01','2027-01-01',60),false],
 ['date difference',()=>rules.diffDays('2026-11-01','2026-12-01'),30]
];
for(const [name,actual,expected] of cases)test(name,()=>assert.equal(actual(),expected));
