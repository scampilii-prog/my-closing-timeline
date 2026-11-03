// Run: node clean-project/smoke-test.cjs
// Dependency-free structural and script-syntax checks for the isolated FREE page.
const fs=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const html=fs.readFileSync(__dirname+'/free-real-estate.html','utf8');
const ids=['effective','closing','confirmDates','days','add','sort','reset','contractRows','followRows','total','open','done','summary','copy','feedback','today','tomorrow','overdue','addFollow'];
for(const id of ids){const occurrences=html.match(new RegExp('id="'+id+'"','g'))||[];assert.equal(occurrences.length,1,'Expected exactly one #'+id);}
assert.equal((html.match(/<script>/g)||[]).length,1,'Only one application script');
assert.equal((html.match(/<style>/g)||[]).length,1,'Only one stylesheet');
assert.match(html,/grid-template-columns:minmax\(0,3fr\) minmax\(0,2fr\)/);
assert.match(html,/localStorage\.setItem/);
assert.match(html,/const defaults=\[/);
assert.match(html,/Closing Follow-Up/);
const match=html.match(/<script>([\s\S]*?)<\/script>/);
assert.ok(match,'Application script exists');
new vm.Script(match[1],{filename:'free-real-estate.inline.js'});
console.log('PASS: unique IDs, one stylesheet, one script, 60/40 layout, defaults, follow-up and JavaScript syntax');
console.log('NOTE: browser interaction and Cloudflare deployment still require separate testing.');
