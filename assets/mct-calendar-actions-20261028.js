/* My Closing Timeline · calendar and reminder tools · 2026-10-28.
   No scheduled messages or backend delivery: calendar notifications depend on calendar app.
   Email and SMS actions open user-controlled drafts, never send automatically. */
(()=>{'use strict';
 function init(){
  const root=document.getElementById('contract-deadline-planner');
  const calendar=document.getElementById('mct-calendar-action');
  const alertButton=document.getElementById('mct-alert-action');
  const panel=document.getElementById('mct-calendar-panel');
  if(!root||!calendar||!alertButton||!panel)return;
  const $=id=>document.getElementById(id);
  const choose=$('mct-calendar-task'),note=$('mct-calendar-status');
  const feedback=(message,kind='')=>{note.textContent=message;note.dataset.state=kind};
  const localToday=()=>{const d=new Date();return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-')};
  const validDate=s=>/^\d{4}-\d{2}-\d{2}$/.test(s)&&!Number.isNaN(new Date(s+'T12:00:00Z').valueOf())&&new Date(s+'T12:00:00Z').toISOString().slice(0,10)===s;
  const data=()=>typeof window.MCTCalendarGetTimeline==='function'?window.MCTCalendarGetTimeline():null;
  const upcoming=()=>{
   const d=data(),today=localToday();
   return {info:d,dates:(d?.entries||[]).filter(x=>validDate(x.date)&&x.date>=today&&x.status!=='done'&&x.status!=='na').sort((a,b)=>a.date.localeCompare(b.date)||a.name.localeCompare(b.name))};
  };
  let selectedKey='';
  function refresh(){
   const {dates}=upcoming();
   choose.replaceChildren();
   if(!dates.length){const opt=document.createElement('option');opt.value='';opt.textContent='Enter future contract dates first';choose.append(opt);choose.disabled=true;return false}
   choose.disabled=false;
   for(const task of dates){
    const opt=document.createElement('option');
    opt.value=task.date+'|'+task.kind+'|'+task.name;
    opt.textContent=task.date+' · '+task.name;
    choose.append(opt);
   }
   if([...choose.options].some(x=>x.value===selectedKey))choose.value=selectedKey;
   else selectedKey=choose.value;
   return true;
  }
  const selected=()=>{
   const {info,dates}=upcoming();
   const item=dates.find(d=>d.date+'|'+d.kind+'|'+d.name===choose.value);
   return {info,item,dates};
  };
  const labelDate=date=>{const d=new Date(date+'T12:00:00Z');return new Intl.DateTimeFormat('en-US',{month:'long',day:'numeric',year:'numeric',timeZone:'UTC'}).format(d)};
  function showPanel(mode){
   const open=panel.hidden||panel.dataset.mode!==mode;
   panel.hidden=!open;panel.dataset.mode=mode;
   calendar.setAttribute('aria-expanded',String(open));
   alertButton.setAttribute('aria-expanded',String(open));
   if(!open)return;
   const available=refresh();
   $('mct-calendar-title').textContent=mode==='calendar'?'Add dates & reminders to your calendar':'Prepare an email or text reminder';
   feedback(available?
    'Choose a deadline below. Calendar downloads can include all upcoming dates; email and text open a draft for one selected date.':
    'Enter the contract Effective Date and your task deadlines first.','');
   panel.scrollIntoView({behavior:'smooth',block:'nearest'});
  }
  calendar.addEventListener('click',()=>showPanel('calendar'));
  alertButton.addEventListener('click',()=>showPanel('alert'));
  choose.addEventListener('change',()=>{selectedKey=choose.value;feedback('Deadline selected. Choose a calendar or message option below.');});
  const escaped=s=>String(s||'').replace(/\\/g,'\\\\').replace(/\r?\n/g,'\\n').replace(/;/g,'\\;').replace(/,/g,'\\,');
  const fold=line=>{
   let out='',part='',size=0;
   for(const char of line){
    const byteCount=typeof TextEncoder!=='undefined'?new TextEncoder().encode(char).length:char.length;
    if(size+byteCount>73){out+=part+'\r\n ';part=char;size=1+byteCount}else{part+=char;size+=byteCount}
   }
   return out+part;
  };
  const nextDay=day=>{const d=new Date(day+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+1);return d.toISOString().slice(0,10)};
  const hash=s=>{let n=2166136261;for(const ch of s){n^=ch.codePointAt(0);n=Math.imul(n,16777619)}return (n>>>0).toString(16)};
  const reminderDays=()=>Number($('mct-calendar-lead').value||0);
  const reminderText=(item,info)=>'My Closing Timeline reminder: '+item.name+' is due '+labelDate(item.date)+'.'+(info?.property?' Property: '+info.property+'.':'')+' Verify the signed contract and any amendments.';
  function buildICS(items,info){
   const stamp=new Date().toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'');
   const head=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//My Closing Timeline//Contract Deadline Reminder//EN','CALSCALE:GREGORIAN','METHOD:PUBLISH','X-WR-CALNAME:My Closing Timeline Deadlines'];
   const lines=[...head];
   for(const item of items){
    const name='Closing · '+item.name;
    const descr='Planning reminder. Verify deadlines against the signed contract and amendments.'+(item.detail?' '+item.detail+'.':'')+(info.property?' Property: '+info.property+'.':'');
    const uid='mct-'+hash(item.date+'|'+item.name+'|'+info.property)+'@myclosingtimeline.com';
    lines.push('BEGIN:VEVENT','UID:'+uid,'DTSTAMP:'+stamp,
     'DTSTART;VALUE=DATE:'+item.date.replace(/-/g,''),
     'DTEND;VALUE=DATE:'+nextDay(item.date).replace(/-/g,''),
     'SUMMARY:'+escaped(name),'DESCRIPTION:'+escaped(descr),
     'BEGIN:VALARM','ACTION:DISPLAY','DESCRIPTION:'+escaped('Closing deadline: '+item.name),
     'TRIGGER:'+(reminderDays()?' -P'+reminderDays()+'D':'-PT0M').trim(),
     'END:VALARM','END:VEVENT');
   }
   lines.push('END:VCALENDAR');
   return lines.map(fold).join('\r\n')+'\r\n';
  }
  $('mct-calendar-download').addEventListener('click',()=>{
   const {info,dates}=upcoming();
   if(!dates.length){feedback('No upcoming dated milestones. Enter Effective Date, Closing Date and contract deadlines first.','error');return}
   const content=buildICS(dates,info),blob=new Blob([content],{type:'text/calendar;charset=utf-8'});
   const url=URL.createObjectURL(blob),a=document.createElement('a');
   a.href=url;a.download='My-Closing-Timeline-Reminders.ics';document.body.appendChild(a);a.click();a.remove();
   setTimeout(()=>URL.revokeObjectURL(url),30000);
   feedback('Calendar file prepared with '+dates.length+' upcoming dated milestone(s). Open or import the .ics file in Apple Calendar, Outlook, Google Calendar or your calendar app. Enable notifications there.','success');
  });
  $('mct-calendar-google').addEventListener('click',()=>{
   const {info,item}=selected();
   if(!item){feedback('Select a dated future deadline first.','error');return}
   const dates=item.date.replace(/-/g,'')+'/'+nextDay(item.date).replace(/-/g,'');
   const title='Closing · '+item.name;
   const details=reminderText(item,info)+' Set your preferred notification inside Google Calendar.';
   const url='https://calendar.google.com/calendar/render?action=TEMPLATE&text='+encodeURIComponent(title)+'&dates='+dates+'&details='+encodeURIComponent(details);
   // Google is external; keep FREE's unsaved timeline available in this tab.
   const other=window.open(url,'_blank');
   if(other){other.opener=null;feedback('Google Calendar opened separately. Save the selected date there and set your notification. Your timeline remains here.','success')}
   else feedback('Allow the Google Calendar tab from your browser to continue, or download the .ics file above.','error');
  });
  $('mct-reminder-email').addEventListener('click',()=>{
   const {info,item}=selected();
   if(!item){feedback('Choose a future contract deadline.','error');return}
   const recipient=$('deadline-email')?.value?.trim()||'';
   if(recipient&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipient)){feedback('Correct the recipient email or leave it blank.','error');return}
   const subject='Closing reminder · '+item.name+' · '+item.date;
   const url='mailto:'+encodeURIComponent(recipient)+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(reminderText(item,info)+'\n\nPlease verify the signed contract dates before acting.');
   window.location.href=url;
   feedback('An email draft should open in your mail app. Review and send it yourself; nothing was automatically delivered.');
  });
  $('mct-reminder-sms').addEventListener('click',()=>{
   const {info,item}=selected();
   if(!item){feedback('Choose a future contract deadline.','error');return}
   const phone=$('mct-reminder-phone').value.trim();
   if(phone&&!/^\+?[0-9() .-]{7,24}$/.test(phone)){feedback('Enter a valid mobile number or leave it empty to choose a recipient in Messages.','error');return}
   const to=phone.replace(/[^\d+]/g,'');
   window.location.href='sms:'+to+'?&body='+encodeURIComponent(reminderText(item,info));
   feedback('A text draft may open if your device supports SMS. Review and tap Send; no text was sent by the website.');
  });
  $('mct-reminder-copy').addEventListener('click',async()=>{
   const {info,item}=selected();
   if(!item){feedback('Choose a future contract deadline.','error');return}
   const value=reminderText(item,info);
   try{await navigator.clipboard.writeText(value);feedback('Reminder copied. Paste it into your preferred messaging app.','success')}
   catch(e){window.prompt('Copy this reminder:',value);feedback('Copy the displayed reminder and paste it into your chosen app.')}
  });
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();