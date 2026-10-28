/* Local-only fillable PDF: no upload, network request, email, tracking or remote PDF library. */
(function(){
"use strict";
const clean=s=>String(s==null?'':s).normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^\x20-\x7e]/g,' ').replace(/\s+/g,' ').trim();
const esc=s=>clean(s).replace(/\\/g,'\\\\').replace(/\(/g,'\\(').replace(/\)/g,'\\)');
const safeRef=v=>/^CL-[A-F0-9]{8}$/.test(v)?v:'CL-NOT-SET';
const item=(s,x,y,size=10)=>'BT /F1 '+size+' Tf '+x+' '+y+' Td ('+esc(s)+') Tj ET\n';
const line=(y)=>'0.82 G 43 '+y+' m 570 '+y+' l S 0 G\n';
function createFillablePdf(info){
 // Three-column ACROFORM PDF assembled locally, without calls to a server.
 const other=info.projectType==="other",label=other?"OTHER PROJECTS":"REAL ESTATE";
 const ref=safeRef(String(info.reference||"").toUpperCase());
 const objects=[null],reserve=()=>{objects.push("");return objects.length-1};
 const set=(n,v)=>{objects[n]=v},put=v=>{const n=reserve();set(n,v);return n};
 const catalog=reserve(),pages=reserve(),helvetica=put("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>"),acro=reserve();
 const kids=[],fields=[];
 const ink=(value,x,y,size=9)=>item(String(value),x,y,size);
 const rect=(x,y,w,h,r,g,b)=>[r,g,b].join(" ")+" rg "+[x,y,w,h].join(" ")+" re f 0 g\n";
 const sep=y=>line(y);
 const left=43,total=526,gap=12,cw=(total-2*gap)/3;
 const col=n=>left+n*(cw+gap);
 const width=span=>cw*span+gap*(span-1);
 function pageBase(content,defs){
   const page=reserve(),annotations=[];
   for(const [key,x,y,w,h,multi] of defs){
     const id=put("<< /Type /Annot /Subtype /Widget /FT /Tx /T ("+esc(key)+") /V () /F 4 /Ff "+(multi?4096:0)+" /P "+page+" 0 R /Rect ["+[x,y,x+w,y+h].join(" ")+"] /Border [0 0 1] /MK << /BC [0.69 0.80 0.83] /BG [1 1 1] >> /DA (/F1 10 Tf 0 g) >>");
     annotations.push(id);fields.push(id);
   }
   const bytes=new TextEncoder().encode(content);
   const stream=put("<< /Length "+bytes.length+" >>\nstream\n"+content+"endstream");
   set(page,"<< /Type /Page /Parent "+pages+" 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 "+helvetica+" 0 R >> >> /Contents "+stream+" 0 R"+(annotations.length?" /Annots ["+annotations.map(v=>v+" 0 R").join(" ")+"]":"")+" >>");
   kids.push(page);
 }
 function top(sub,mark){
   return rect(0,708,612,84,.09,.22,.30)+rect(0,705,612,3,.77,.61,.39)+
     "1 1 1 rg "+ink("MY CLOSING TIMELINE",left,749,19)+
     ".92 .79 .57 rg "+ink(sub,left,726,10)+
     "0 0 0 rg "+ink("Private reference: "+ref,left,682,10)+
     ink(other?"START DATE":"EFFECTIVE DATE",left,665,9)+
     ink(other?"TARGET DATE":"CLOSING DATE",col(1),665,9)+
     ink("PROJECT TYPE",col(2),665,9)+
     rect(left,625,total,27,.94,.97,.97)+
     ink(info.effective||"Not entered",left+10,635,12)+
     ink(info.closing||"Not entered",col(1)+10,635,12)+
     ink(label,col(2)+10,635,11)+
     sep(617);
 }
 function editable(content,defs,key,labelText,column,row,widthCols=1,multiline=false,h=24){
   const x=col(column),w=width(widthCols);
   content+=ink(labelText,x,row+h+7,9);
   defs.push([key,x,row,w,h,multiline]);
   return content;
 }
 // Page 1: only selected category's fields appear, never both.
 let first=top("PRIVATE FILLABLE PDF  |  "+label,"cover");
 first+=ink("PERSONAL DETAILS - FILL ONLY IN YOUR SAVED PDF",left,596,11);
 first+=ink("Compact columns. The website does not receive any data typed into PDF fields.",left,579,9);
 const defs=[];
 const realRows=[
  [["Buyer Names","Buyer name(s)",0,1],["Seller Names","Seller name(s)",1,1],["Agent Name","Agent / representative",2,1]],
  [["Property Address","Property address",0,2],["Purchase Price","Purchase price",2,1]],
  [["Closing Company","Closing company",0,1],["Closing Contact","Person in charge",1,1],["Closing Phone","Closing phone",2,1]],
  [["Closing Company Address","Closing company address",0,2],["Closing Contact Email","Contact email",2,1]],
  [["Brokerage","Brokerage / office",0,1],["Lender","Lender / title",1,1],["HOA","Association / HOA",2,1]]
 ];
 const generalRows=[
  [["Project Name","Project name",0,1],["Project Category","Project category",1,1],["Project Lead","Project lead",2,1]],
  [["Project Location","Project location",0,2],["Project Budget","Budget (optional)",2,1]],
  [["Organization","Organization",0,1],["Vendor","Contractor / vendor",1,1],["Project Contact","Project contact",2,1]],
  [["Contact Address","Contact address (optional)",0,2],["Contact Phone","Phone (optional)",2,1]],
  [["Project Reference","Reference / order",0,1],["Project Phase","Project phase",1,1],["Contact Email","Contact email",2,1]]
 ];
 (other?generalRows:realRows).forEach((row,i)=>{
  const y=542-i*49;
  for(const [key,description,n,span] of row)first=editable(first,defs,"Detail "+key,description,n,y,span);
 });
 first+=ink("ADDITIONAL COMMENTS (editable after saving)",left,319,10);
 defs.push(["General Notes",left,160,total,133,true]);
 first+=rect(left,103,total,41,.98,.95,.86);
 first+=ink("PRIVATE BY DESIGN",left+12,128,10);
 first+=ink("Save, reopen and edit on your device. No private entries sync to PRO.",left+12,111,9);
 first+=ink("Planning aid only. Verify dates against the contract or project agreement.",left,67,8);
 pageBase(first,defs);
 // Page 2: all dated milestones, including later-than-closing items. Split large lists.
 const events=Array.isArray(info.entries)?info.entries:[];
 const chunk=14;
 for(let start=0;start<Math.max(1,events.length);start+=chunk){
  let content=top("MILESTONES | ORIGINAL TARGET AND LATER EVENTS", "timeline");
  content+=ink("CONTRACT / PROJECT MILESTONES",left,598,13);
  content+=ink("Events after the original "+(other?"target":"closing")+" date remain visible and are flagged.",left,578,9);
  content+=rect(left,538,total,29,.09,.22,.30);
  content+="1 1 1 rg "+ink("TASK / MILESTONE",left+10,548,9)+ink("DUE",col(2)-36,548,9)+ink("STATUS",col(2)+69,548,9)+"0 0 0 rg ";
  events.slice(start,start+chunk).forEach((row,i)=>{
   const y=516-i*27;
   const due=String(row.date||"TBD").slice(0,12),later=!!(row.date&&info.closing&&String(row.date)>String(info.closing));
   if(later)content+=rect(left,y-9,total,26,.99,.95,.86);
   else if(i%2===0)content+=rect(left,y-9,total,26,.96,.98,.98);
   const name=clean(row.name||row.title||"Task").slice(0,46);
   content+=ink(String(start+i+1).padStart(2,"0")+". "+name,left+10,y,8.7);
   content+=ink(due,col(2)-36,y,9);
   content+=ink(later?"AFTER TARGET":clean(row.status||"Pending").slice(0,13),col(2)+65,y,8.3);
   content+=sep(y-10);
  });
  if(!events.length)content+=ink("No milestones entered yet.",left+10,509,10);
  content+=rect(left,76,total,44,.91,.96,.95)+ink("DATE HISTORY AND EXTENSIONS",left+12,102,10);
  content+=ink("Use the next page for extended dates, later tasks and comments.",left+12,87,9);
  pageBase(content,[]);
 }
 // Final page: 3-column editable extensions, post-closing actions, final notes.
 let last=rect(0,708,612,84,.09,.22,.30)+rect(0,705,612,3,.77,.61,.39)+
  "1 1 1 rg "+ink("MY CLOSING TIMELINE",left,749,18)+
  ".92 .79 .57 rg "+ink(other?"SCHEDULE CHANGES AND ADDITIONAL WORK":"CLOSING EXTENSIONS AND POST-CLOSING",left,726,10)+"0 0 0 rg";
 last+=ink("DATE CHANGES / EXTENSION HISTORY",left,677,13);
 last+=ink("Keep each previous and revised date, with a reason or authorization.",left,658,9);
 const laterDefs=[];
 for(let i=0;i<5;i++){
  const y=620-i*48;
  const fieldsRow=[["Prior "+(i+1),(i+1)+". Previous date",0],["Revised "+(i+1),other?"Revised date":"Extended date",1],["Reason "+(i+1),"Reason / authorization",2]];
  for(const [key,labelText,n] of fieldsRow)last=editable(last,laterDefs,"History "+key,labelText,n,y);
 }
 last+=sep(373);
 last+=ink(other?"AFTER TARGET / ADDITIONAL MILESTONES":"AFTER CLOSING / FOLLOW-UP ITEMS",left,355,12);
 last+=ink("Add late tasks and changes not included in the original timetable.",left,338,9);
 for(let i=0;i<4;i++){
  const y=298-i*46;
  const row=[["Task "+(i+1),(i+1)+". Task / item",0],["Date "+(i+1),"Due / completed",1],["Notes "+(i+1),"Status / notes",2]];
  for(const [key,labelText,n] of row)last=editable(last,laterDefs,"Later "+key,labelText,n,y);
 }
 last+=ink("ADDITIONAL COMMENTS",left,122,10);
 laterDefs.push(["Extension and Follow-up Notes",left,60,total,43,true]);
 last+=ink("Private entries are stored in your saved PDF, not with a cloud transaction.",left,42,8);
 pageBase(last,laterDefs);
 set(pages,"<< /Type /Pages /Count "+kids.length+" /Kids ["+kids.map(i=>i+" 0 R").join(" ")+"] >>");
 set(acro,"<< /Fields ["+fields.map(i=>i+" 0 R").join(" ")+"] /NeedAppearances true /DR << /Font << /F1 "+helvetica+" 0 R >> >> /DA (/F1 10 Tf 0 g) >>");
 set(catalog,"<< /Type /Catalog /Pages "+pages+" 0 R /AcroForm "+acro+" 0 R >>");
 // PDF offsets must be BYTE offsets; all streams and labels use escaped ASCII.
 let pdf="%PDF-1.4\n%MCT-PRIVATE\n",bytePos=new TextEncoder().encode(pdf).length;
 const offsets=[0];
 for(let i=1;i<objects.length;i++){
   offsets.push(bytePos);
   const next=i+" 0 obj\n"+objects[i]+"\nendobj\n";
   bytePos+=new TextEncoder().encode(next).length;pdf+=next;
 }
 const pos=bytePos;
 pdf+="xref\n0 "+objects.length+"\n0000000000 65535 f \n";
 for(let i=1;i<objects.length;i++)pdf+=String(offsets[i]).padStart(10,"0")+" 00000 n \n";
 pdf+="trailer\n<< /Size "+objects.length+" /Root "+catalog+" 0 R >>\nstartxref\n"+pos+"\n%%EOF";
 return new Blob([pdf],{type:"application/pdf"});
}
window.MCTPrivatePDFCreateBlob=function(info){
 const ref=safeRef(String(info?.reference||'').toUpperCase());
 if(ref==='CL-NOT-SET')throw Error('A valid private reference is required');
 return createFillablePdf({...info,reference:ref});
};
window.MCTPrivatePDFDownload=function(info){
  const ref=safeRef(String(info?.reference||'').toUpperCase());
  if(ref==='CL-NOT-SET')throw Error('A valid private reference is required');
  const pdf=createFillablePdf({...info,reference:ref});
  const url=URL.createObjectURL(pdf),link=document.createElement('a');
  link.href=url;link.download=(info?.projectType==='other'?'Private-Project-':'Private-Closing-')+ref+'.pdf';document.body.append(link);link.click();link.remove();
  setTimeout(()=>URL.revokeObjectURL(url),12000);
  return true;
};
function boot(){
 // Only account-backed PRO workspaces expose editable private PDF generation.
 // The FREE timeline does not load this asset, but defend against accidental inclusion.
 if(/\/free-timeline(?:\.html)?\/?$/.test(location.pathname))return;
 const root=document.getElementById('contract-deadline-planner');if(!root)return;
 const fields=root.querySelector('.mct-unified-fields-grid');
 const ref=document.getElementById('mct-private-ref');
 if(!fields||!ref||root.querySelector('.mct-private-export'))return;
 if(!ref.value){const bytes=new Uint8Array(4);crypto.getRandomValues(bytes);ref.value='CL-'+Array.from(bytes,x=>x.toString(16).padStart(2,'0')).join('').toUpperCase()}
 const box=document.createElement('section');box.className='mct-private-export';box.setAttribute('aria-label','Download private fillable PDF');
 const heading=document.createElement('h4');heading.textContent='Private Report · Your Device, Your Details';
 const intro=document.createElement('p');intro.textContent='Download a fillable PDF with your timeline. Buyer/seller names, property address, price and contact fields remain blank until you fill them on your own device. No private fields are uploaded.';
 const row=document.createElement('div');row.className='mct-private-action';
 const button=document.createElement('button');button.type='button';button.textContent='Download Private Fillable PDF';
 if(/\/pro-timeline(?:\.html)?\/?$/.test(location.pathname)){
   button.disabled=true;
   button.setAttribute('aria-disabled','true');
   button.title='Activate a PRO Closing Credit to use this private PDF.';
 }
 const caption=document.createElement('small');caption.textContent='Complete and save in a PDF viewer. Keep a private copy; downloads are not stored in your PRO account.';
 const feedback=document.createElement('p');feedback.setAttribute('role','status');feedback.setAttribute('aria-live','polite');feedback.style.marginTop='8px';
 row.append(button,caption);box.append(heading,intro,row,feedback);fields.insertAdjacentElement('afterend',box);
 button.addEventListener('click',()=>{
   const code=String(ref.value||'').trim().toUpperCase();
   if(!/^CL-[A-F0-9]{8}$/.test(code)){feedback.textContent='Use the private reference format CL-XXXXXXXX (8 hexadecimal characters).';ref.focus();return}
   const data=typeof window.MCTCalendarGetTimeline==='function'?window.MCTCalendarGetTimeline():{};
   const info={reference:code,effective:data.effective||document.getElementById('deadline-effective')?.value||'',closing:data.closing||document.getElementById('deadline-closing')?.value||'',entries:data.entries||[]};
   try{
     window.MCTPrivatePDFDownload(info);
     feedback.textContent='Your fillable PDF has been downloaded locally. Open it to add personal details; nothing is sent back to this website.';
   }catch(e){feedback.textContent='The PDF could not be generated in this browser. Please try another current PDF-capable browser.'}
 });
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
