/* Local-only fillable PDF: no upload, network request, email, tracking or remote PDF library. */
(function(){
"use strict";
const clean=s=>String(s==null?'':s).normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^\x20-\x7e]/g,' ').replace(/\s+/g,' ').trim();
const esc=s=>clean(s).replace(/\\/g,'\\\\').replace(/\(/g,'\\(').replace(/\)/g,'\\)');
const safeRef=v=>/^CL-[A-F0-9]{8}$/.test(v)?v:'CL-NOT-SET';
const item=(s,x,y,size=10)=>'BT /F1 '+size+' Tf '+x+' '+y+' Td ('+esc(s)+') Tj ET\n';
const line=(y)=>'0.82 G 43 '+y+' m 570 '+y+' l S 0 G\n';
function createFillablePdf(info){
 // This PDF is assembled as a Blob entirely in the customer's browser.
 const objects=[null];
 const reserve=()=>{objects.push('');return objects.length-1};
 const set=(id,body)=>{objects[id]=body};
 const put=body=>{const id=reserve();set(id,body);return id};
 const catalog=reserve(),pages=reserve(),helvetica=put('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>'),acro=reserve();
 const kids=[],fields=[];
 function pageBase(content,widgetDefs){
   const page=reserve();
   const annotRefs=[];
   for(const def of widgetDefs||[]){
     const [key,x,y,w,h,multiline]=def;
     const ref=put('<< /Type /Annot /Subtype /Widget /FT /Tx /T ('+esc(key)+') /V () /F 4 /Ff '+(multiline?4096:0)+' /P '+page+' 0 R /Rect ['+[x,y,x+w,y+h].join(' ')+'] /Border [0 0 1] /MK << /BC [0.56 0.68 0.72] /BG [1 1 1] >> /DA (/F1 11 Tf 0 g) >>');
     fields.push(ref);annotRefs.push(ref);
   }
   const stream=put('<< /Length '+content.length+' >>\nstream\n'+content+'endstream');
   set(page,'<< /Type /Page /Parent '+pages+' 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 '+helvetica+' 0 R >> >> /Contents '+stream+' 0 R'+(annotRefs.length?' /Annots ['+annotRefs.map(id=>id+' 0 R').join(' ')+']':'')+' >>');
   kids.push(page);
 }
 let first='';
 first+=item('MY CLOSING TIMELINE',43,750,19);
 first+=item('PRIVATE FILLABLE REPORT  |  COMPLETE ON YOUR DEVICE',43,729,10);
 first+=line(718);
 first+=item('Private closing reference: '+safeRef(info.reference),43,694,12);
 first+=item('Effective Date: '+(info.effective||'To be confirmed'),43,676,10);
 first+=item('Closing Date: '+(info.closing||'To be confirmed'),300,676,10);
 first+=item('PERSONAL TRANSACTION DETAILS  |  OPTIONAL',43,645,12);
 first+=item('These fields are intentionally blank. Fill them only after saving the PDF.',43,629,9);
 const definitions=[
 ['Property Address',false],['Buyer Names',false],['Seller Names',false],['Agent Name',false],
 ['Brokerage',false],['Purchase Price',false],['Closing Company',false],['Closing Contact',false],
 ['Closing Phone',false],['Personal Notes',true]
 ];
 const widgets=[];
 definitions.forEach(([label,multi],i)=>{
   const yy=594-i*45,fieldHeight=multi?32:22;
   first+=item(label,43,yy+7,10);
   widgets.push([label,193,yy,367,fieldHeight,multi]);
 });
 first+=line(120);
 first+=item('This form stays on your device. The website receives none of the details you add.',43,105,9);
 first+=item('Validate contractual obligations and notices against the signed agreement.',43,90,9);
 first+=item('Your Clients. Your Records. Your Privacy.',43,67,12);
 pageBase(first,widgets);
 const rows=Array.isArray(info.entries)?info.entries:[];
 const chunkSize=30;
 for(let start=0;start<Math.max(rows.length,1);start+=chunkSize){
   let content=item('CLOSING TIMELINE  |  PLANNING COPY',43,749,16);
   content+=item('Reference: '+safeRef(info.reference)+'   Effective: '+(info.effective||'TBD')+'   Closing: '+(info.closing||'TBD'),43,728,9);
   content+=line(713);
   content+=item('TASK / MILESTONE',43,689,10)+item('DUE',436,689,10)+item('STATUS',518,689,10);
   content+=line(681);
   rows.slice(start,start+chunkSize).forEach((r,i)=>{
     const y=661-i*20;
     const label=clean(r.name||r.title||'Task').slice(0,66);
     content+=item((start+i+1)+'. '+label,43,y,9);
     content+=item((r.date||'TBD').slice(0,12),435,y,9);
     content+=item(clean(r.status||'Pending').slice(0,12),515,y,9);
     content+=line(y-7);
   });
   if(!rows.length)content+=item('No timeline tasks have been entered yet.',43,659,10);
   content+=item('Planning tool only. Verify every due date, amendment and legal notice yourself.',43,42,9);
   pageBase(content,[]);
 }
 set(pages,'<< /Type /Pages /Count '+kids.length+' /Kids ['+kids.map(i=>i+' 0 R').join(' ')+'] >>');
 set(acro,'<< /Fields ['+fields.map(i=>i+' 0 R').join(' ')+'] /NeedAppearances true /DR << /Font << /F1 '+helvetica+' 0 R >> >> /DA (/F1 11 Tf 0 g) >>');
 set(catalog,'<< /Type /Catalog /Pages '+pages+' 0 R /AcroForm '+acro+' 0 R >>');
 let pdf='%PDF-1.4\n%MCT-PRIVATE\n';
 const offsets=[0];
 for(let i=1;i<objects.length;i++){
   offsets.push(pdf.length);
   pdf+=i+' 0 obj\n'+objects[i]+'\nendobj\n';
 }
 const pos=pdf.length;
 pdf+='xref\n0 '+objects.length+'\n0000000000 65535 f \n';
 for(let i=1;i<objects.length;i++)pdf+=String(offsets[i]).padStart(10,'0')+' 00000 n \n';
 pdf+='trailer\n<< /Size '+objects.length+' /Root '+catalog+' 0 R >>\nstartxref\n'+pos+'\n%%EOF';
 return new Blob([pdf],{type:'application/pdf'});
}
function boot(){
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
 const caption=document.createElement('small');caption.textContent='Complete and save in a PDF viewer. Keep a private copy; downloads are not stored in your PRO account.';
 const feedback=document.createElement('p');feedback.setAttribute('role','status');feedback.setAttribute('aria-live','polite');feedback.style.marginTop='8px';
 row.append(button,caption);box.append(heading,intro,row,feedback);fields.insertAdjacentElement('afterend',box);
 button.addEventListener('click',()=>{
   const code=String(ref.value||'').trim().toUpperCase();
   if(!/^CL-[A-F0-9]{8}$/.test(code)){feedback.textContent='Use the private reference format CL-XXXXXXXX (8 hexadecimal characters).';ref.focus();return}
   const data=typeof window.MCTCalendarGetTimeline==='function'?window.MCTCalendarGetTimeline():{};
   const info={reference:code,effective:data.effective||document.getElementById('deadline-effective')?.value||'',closing:data.closing||document.getElementById('deadline-closing')?.value||'',entries:data.entries||[]};
   try{
     const blob=createFillablePdf(info);
     const url=URL.createObjectURL(blob),link=document.createElement('a');
     link.href=url;link.download='Private-Closing-'+code+'.pdf';document.body.append(link);link.click();link.remove();
     setTimeout(()=>URL.revokeObjectURL(url),12000);
     feedback.textContent='Your fillable PDF has been downloaded locally. Open it to add personal details; nothing is sent back to this website.';
   }catch(e){feedback.textContent='The PDF could not be generated in this browser. Please try another current PDF-capable browser.'}
 });
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
