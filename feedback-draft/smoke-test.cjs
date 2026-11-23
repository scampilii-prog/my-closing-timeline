/* Isolated feedback smoke tests. Run locally with Node + Playwright installed.
   Example: node feedback-draft/smoke-test.cjs
   Never points at production and never submits customer data. */
const {chromium}=require('playwright');
const path=require('node:path');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true});
 let passed=0;
 const check=async(name,fn)=>{const page=await browser.newPage();try{await fn(page);passed++;console.log('PASS',name)}finally{await page.close()}};
 try{
  const customer='file://'+path.resolve(__dirname,'feedback-prototype.html');
  const admin='file://'+path.resolve(__dirname,'admin-feedback-review-DEMO.html');
  await check('customer: required description and export fields',async p=>{
   await p.goto(customer);await p.locator('#details').fill('Follow-up summary does not open');
   await p.locator('#steps').fill('Open My Tasks, select a follow-up');
   await p.locator('#expected').fill('Summary should open');
   await p.locator('button[type=submit]').click();
   const status=await p.locator('#status').innerText();assert.match(status,/copied|unavailable/i);
   if(await p.locator('#manual-copy').isVisible()){
    const value=await p.locator('#report-output').inputValue();
    assert.match(value,/Steps to reproduce: Open My Tasks/);
    await p.locator('#details').fill('Changed description');
    assert.equal(await p.locator('#manual-copy').isVisible(),false);
   }
  });
  await check('customer: sensitive pattern warning',async p=>{
   await p.goto(customer);await p.locator('#details').fill('Please email abc@example.com');await p.locator('button[type=submit]').click();
   assert.match(await p.locator('#status').innerText(),/remove emails/i);
  });
  await check('admin: prepare, invalidate, clear',async p=>{
   await p.goto(admin);await p.locator('#report').fill('Type: Problem\\nArea: Real Estate & Closing\\nDescription: test issue');
   await p.locator('#priority').selectOption('P1');await p.locator('#prepare').click();
   assert.equal(await p.locator('#export-section').isVisible(),true);
   assert.match(await p.locator('#export').inputValue(),/Priority: P1/);
   await p.locator('#notes').fill('Investigate summary');assert.equal(await p.locator('#export-section').isVisible(),false);
   await p.locator('#prepare').click();await p.locator('#clear').click();
   assert.equal(await p.locator('#report').inputValue(),'');
   assert.equal(await p.locator('#export-section').isVisible(),false);
  });
  console.log('Feedback smoke tests passed:',passed);
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
