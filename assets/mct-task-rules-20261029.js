/* My Closing Timeline — shared date and task calculations.
   Used by Real Estate FREE/PRO and Other Projects FREE/PRO preview.
   Pure, date-only UTC calendar logic; no account, network or personal data.
   Deadline adjustment is guidance, never a substitute for the signed contract.
*/
(function(global){
 "use strict";
 const DAY=86400000;
 function parseISO(v){
  if(typeof v!=="string"||!/^\d{4}-\d{2}-\d{2}$/.test(v))return null;
  const n=Date.parse(v+"T12:00:00.000Z");
  if(!Number.isFinite(n))return null;
  const d=new Date(n);
  return d.toISOString().slice(0,10)===v?d:null;
 }
 function stamp(d){return d instanceof Date&&!Number.isNaN(d.getTime())?d.toISOString().slice(0,10):""}
 function addDays(v,n){
  const d=parseISO(v);
  if(!d||!Number.isInteger(Number(n))||Math.abs(Number(n))>36500)return "";
  d.setUTCDate(d.getUTCDate()+Number(n));
  return stamp(d);
 }
 function diffDays(from,to){
  const a=parseISO(from),b=parseISO(to);
  return a&&b?Math.round((b.getTime()-a.getTime())/DAY):null;
 }
 function holiday(d){
  if(!(d instanceof Date)||Number.isNaN(d.getTime()))return false;
  const y=d.getUTCFullYear(),target=stamp(d);
  const at=(year,m,day)=>new Date(Date.UTC(year,m,day,12));
  const observed=(year,m,day)=>{const t=at(year,m,day),w=t.getUTCDay();if(w===6)t.setUTCDate(t.getUTCDate()-1);else if(w===0)t.setUTCDate(t.getUTCDate()+1);return t};
  const nth=(year,m,wd,n)=>{const t=at(year,m,1);t.setUTCDate(1+(wd-t.getUTCDay()+7)%7+7*(n-1));return t};
  const last=(year,m,wd)=>{const t=at(year,m+1,0);t.setUTCDate(t.getUTCDate()-(t.getUTCDay()-wd+7)%7);return t};
  for(const yr of [y-1,y,y+1]){
   const h=[observed(yr,0,1),nth(yr,0,1,3),nth(yr,1,1,3),last(yr,4,1),
    observed(yr,5,19),observed(yr,6,4),nth(yr,8,1,1),nth(yr,9,1,2),
    observed(yr,10,11),nth(yr,10,4,4),observed(yr,11,25)];
   if(h.some(x=>stamp(x)===target))return true;
  }
  return false;
 }
 function businessDay(d){return d instanceof Date&&!Number.isNaN(d.getTime())&&d.getUTCDay()!==0&&d.getUTCDay()!==6&&!holiday(d)}
 function offsetDate(source,days,direction,type,adjust){
  let d=parseISO(source),n=Number(days);
  if(!d||!Number.isInteger(n)||n<0||n>3650)return "";
  const step=direction==="before"?-1:1;
  if(n===0)return stamp(d);
  if(type==="business"){
   while(n>0){d.setUTCDate(d.getUTCDate()+step);if(businessDay(d))n--;}
  }else{
   d.setUTCDate(d.getUTCDate()+step*n);
   if(adjust){while(!businessDay(d))d.setUTCDate(d.getUTCDate()+step);}
  }
  return stamp(d);
 }
 function nextOccurrence(v,frequency,anchor){
  const d=parseISO(v);
  if(!d)return "";
  if(frequency==="daily")return addDays(v,1);
  if(frequency==="weekly")return addDays(v,7);
  if(frequency==="monthly"){
   const yr=d.getUTCFullYear(),mo=d.getUTCMonth()+1;
   const day=Number.isInteger(Number(anchor))&&Number(anchor)>=1&&Number(anchor)<=31?Number(anchor):d.getUTCDate();
   const end=new Date(Date.UTC(yr,mo+1,0,12)).getUTCDate();
   return stamp(new Date(Date.UTC(yr,mo,Math.min(day,end),12)));
  }
  return "";
 }
 function taskStatus(v,done,todayISO){
  if(done)return "done";
  const n=diffDays(todayISO,v);
  return n===null?"pending":n<0?"overdue":n===0?"today":n===1?"tomorrow":"upcoming";
 }
 function withinDays(start,end,days){const n=diffDays(start,end);return n!==null&&n>=0&&n<=days}
 global.MCTTaskRules=Object.freeze({parseISO,stamp,addDays,diffDays,holiday,businessDay,offsetDate,nextOccurrence,taskStatus,withinDays});
})(typeof window!=="undefined"?window:globalThis);
