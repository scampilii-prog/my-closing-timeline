// Read-only deployment gate: checks that the isolated Workers preview serves the branch's V3 assets.
// It never publishes anything or touches production.
const fs=require('node:fs');
const assert=require('node:assert/strict');
const base=process.env.MCT_PREVIEW_URL||'https://plain-mouse-a4cc.scampilii.workers.dev';
const html=fs.readFileSync(__dirname+'/real-estate-pro-v3.html','utf8');
assert.match(html,/>View Formatted Table<\/button>/,'Expected approved V3 button in repository');
const cssVersion=html.match(/shared\/pro-v3\.css\?v=([\w-]+)/)?.[1];
assert.ok(cssVersion,'Expected versioned stylesheet');
const jsVersion=html.match(/shared\/pro-v3\.js\?v=([\w-]+)/)?.[1];
assert.ok(jsVersion,'Expected versioned JavaScript');
const sectionIds=['contract-input','followup-input','contract-summary','followup-summary','closing-progress','today-tomorrow'];
for(const id of sectionIds){
 assert.ok(html.includes('id="'+id+'"'),'Missing section anchor: '+id);
 assert.ok(html.includes('href="#'+id+'"'),'Missing navigation link: '+id);
}
if(process.argv.includes('--source-only')){
 console.log('PASS: source HTML has six matching navigation anchors and versioned assets; deployment not checked');
 process.exit(0);
}
async function check(){
 const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),15000);
 try{
  const response=await fetch(base+'/real-estate-pro-v3?deploy_check='+Date.now(),{signal:controller.signal,headers:{'Cache-Control':'no-cache'}});
  assert.equal(response.status,200,'Preview must return HTTP 200');
  const served=await response.text();
  assert.match(served,/>View Formatted Table<\/button>/,'STALE DEPLOYMENT: preview lacks approved button');
  assert.ok(served.includes('v3-section-groups'),'STALE DEPLOYMENT: preview lacks grouped navigation');
  for(const id of sectionIds){
   assert.ok(served.includes('id="'+id+'"'),'STALE DEPLOYMENT: missing section '+id);
  }
  assert.ok(served.includes('shared/pro-v3.js?v='+jsVersion),'STALE DEPLOYMENT: preview HTML does not reference current JavaScript version '+jsVersion);
  assert.ok(served.includes('shared/pro-v3.css?v='+cssVersion),'STALE DEPLOYMENT: preview HTML does not reference current CSS version '+cssVersion);
  const script=await fetch(base+'/shared/pro-v3.js?deploy_check='+Date.now(),{signal:controller.signal});
  assert.equal(script.status,200,'Preview JavaScript must be accessible');
  const js=await script.text();
  assert.ok(js.includes('name.title=t.name'),'STALE DEPLOYMENT: task-name tooltip code is missing');
  const asset=await fetch(base+'/shared/pro-v3.css?deploy_check='+Date.now(),{signal:controller.signal});
  assert.equal(asset.status,200,'Preview CSS must be accessible');
  const css=await asset.text();
  assert.match(css,/max-width:1140px;margin:24px auto;padding:0/,'STALE DEPLOYMENT: preview CSS does not match approved width');
  assert.doesNotMatch(css,/margin-left:-124px/,'STALE DEPLOYMENT: old logo offset is still served');
  console.log('PASS: isolated preview HTML and CSS contain current V3 updates');
 }finally{clearTimeout(timer)}
}
check().catch(error=>{console.error(error.message);process.exitCode=1});
