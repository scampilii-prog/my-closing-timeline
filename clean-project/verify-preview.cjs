// Read-only deployment gate: checks that the isolated Workers preview serves the branch's V3 assets.
// It never publishes anything or touches production.
const fs=require('node:fs');
const assert=require('node:assert/strict');
const base='https://plain-mouse-a4cc.scampilii.workers.dev';
const html=fs.readFileSync(__dirname+'/real-estate-pro-v3.html','utf8');
assert.match(html,/>View Formatted Table<\/button>/,'Expected approved V3 button in repository');
assert.match(html,/shared\/pro-v3\.css\?v=20261105-aligned-frame/,'Expected versioned stylesheet');
async function check(){
 const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),15000);
 try{
  const response=await fetch(base+'/real-estate-pro-v3?deploy_check='+Date.now(),{signal:controller.signal,headers:{'Cache-Control':'no-cache'}});
  assert.equal(response.status,200,'Preview must return HTTP 200');
  const served=await response.text();
  assert.match(served,/>View Formatted Table<\/button>/,'STALE DEPLOYMENT: preview still serves old Copy Selected button');
  assert.match(served,/shared\/pro-v3\.css\?v=20261105-aligned-frame/,'STALE DEPLOYMENT: preview HTML does not reference current CSS');
  const asset=await fetch(base+'/shared/pro-v3.css?deploy_check='+Date.now(),{signal:controller.signal});
  assert.equal(asset.status,200,'Preview CSS must be accessible');
  const css=await asset.text();
  assert.match(css,/max-width:1140px;margin:24px auto;padding:0/,'STALE DEPLOYMENT: preview CSS does not match approved width');
  console.log('PASS: isolated preview HTML and CSS contain current V3 updates');
 }finally{clearTimeout(timer)}
}
check().catch(error=>{console.error(error.message);process.exitCode=1});
