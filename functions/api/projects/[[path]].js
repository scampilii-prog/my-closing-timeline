// Project Timeline: account-scoped D1 records. Billing stays OFF until a verified Stripe subscription integration.
// Independent of Real Estate closings, purchases and credits.
const json=(v,s=200)=>Response.json(v,{status:s,headers:{"Cache-Control":"private, no-store","X-Content-Type-Options":"nosniff"}});
const fail=(message,s=400)=>json({ok:false,error:message},s);
const id=()=>crypto.randomUUID();
const hex=async s=>Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256",new TextEncoder().encode(s)))).map(x=>x.toString(16).padStart(2,"0")).join("");
const dateOK=s=>typeof s==="string"&&/^\d{4}-\d{2}-\d{2}$/.test(s)&&!Number.isNaN(Date.parse(s+"T12:00:00Z"))&&new Date(s+"T12:00:00Z").toISOString().slice(0,10)===s;
const iso=()=>new Date().toISOString().slice(0,10);
const plus=(date,days)=>{const d=new Date(date+"T12:00:00Z");d.setUTCDate(d.getUTCDate()+days);return d.toISOString().slice(0,10)};
async function auth(req,db){
 const cookie=(req.headers.get("Cookie")||"").split(";").map(x=>x.trim()).find(x=>x.startsWith("mct_pro_session="));
 if(!cookie)return null;
 const token=cookie.slice("mct_pro_session=".length);
 if(!/^[A-Za-z0-9_-]{40,60}$/.test(token))return null;
 return db.prepare("SELECT u.id FROM sessions s JOIN users u ON u.id=s.user_id WHERE s.token_hash=? AND s.expires_at>? AND u.verified=1").bind(await hex(token),Math.floor(Date.now()/1000)).first();
}
async function ensure(db){
 await db.prepare("CREATE TABLE IF NOT EXISTS mpt_projects(id TEXT PRIMARY KEY,user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,reference TEXT NOT NULL,start_date TEXT NOT NULL,target_date TEXT,status TEXT NOT NULL DEFAULT 'draft' CHECK(status IN ('draft','active','completed','cancelled')),billing_status TEXT NOT NULL DEFAULT 'inactive',completed_at TEXT,created_at TEXT NOT NULL DEFAULT (datetime('now')),updated_at TEXT NOT NULL DEFAULT (datetime('now')))").run();
 await db.prepare("CREATE INDEX IF NOT EXISTS mpt_projects_owner_idx ON mpt_projects(user_id,created_at)").run();
 await db.prepare("CREATE TABLE IF NOT EXISTS mpt_tasks(id TEXT PRIMARY KEY,project_id TEXT NOT NULL REFERENCES mpt_projects(id) ON DELETE CASCADE,user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,title TEXT NOT NULL,date_basis TEXT NOT NULL CHECK(date_basis IN ('start','end','exact')),days INTEGER NOT NULL DEFAULT 0,due_date TEXT NOT NULL,status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','done')),completed_at TEXT,created_at TEXT NOT NULL DEFAULT (datetime('now')),updated_at TEXT NOT NULL DEFAULT (datetime('now')))").run();
 await db.prepare("CREATE INDEX IF NOT EXISTS mpt_tasks_project_idx ON mpt_tasks(project_id,user_id,due_date)").run();
 await db.prepare("CREATE TABLE IF NOT EXISTS mpt_task_events(id TEXT PRIMARY KEY,task_id TEXT NOT NULL REFERENCES mpt_tasks(id) ON DELETE CASCADE,project_id TEXT NOT NULL REFERENCES mpt_projects(id) ON DELETE CASCADE,user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,action TEXT NOT NULL,old_due TEXT,new_due TEXT,occurred_at TEXT NOT NULL DEFAULT (datetime('now')))").run();
}
const originOK=req=>{const o=req.headers.get("Origin");return !!o&&new URL(o).origin===new URL(req.url).origin};
async function body(req){const raw=await req.text();if(raw.length>16000)throw Error("Request too large");return JSON.parse(raw||"{}")}
const shift=(anchor,days)=>plus(anchor,days);
export async function onRequest({request:req,env}){
 try{
  if(!env.PRO_DB)return fail("Database is not configured",503);
  const db=env.PRO_DB,route=new URL(req.url).pathname.replace(/^\/api\/projects\/?/,"").replace(/\/$/,"");
  if(!["GET","POST"].includes(req.method))return fail("Method not allowed",405);
  const user=await auth(req,db);if(!user)return fail("Sign in to your verified account",401);
  if(req.method==="POST"&&!originOK(req))return fail("Origin is not accepted",403);
  await ensure(db);
  if(req.method==="GET"&&route==="list"){
   const items=await db.prepare("SELECT id,reference,start_date,target_date,status,billing_status,completed_at,created_at FROM mpt_projects WHERE user_id=? ORDER BY created_at DESC LIMIT 150").bind(user.id).all();
   return json({ok:true,projects:items.results,billingEnabled:false});
  }
  if(req.method==="GET"&&route==="detail"){
   const pid=new URL(req.url).searchParams.get("id");
   const project=await db.prepare("SELECT * FROM mpt_projects WHERE id=? AND user_id=?").bind(pid,user.id).first();
   if(!project)return fail("Project not found",404);
   const tasks=await db.prepare("SELECT * FROM mpt_tasks WHERE project_id=? AND user_id=? ORDER BY due_date,id").bind(pid,user.id).all();
   const events=await db.prepare("SELECT * FROM mpt_task_events WHERE project_id=? AND user_id=? ORDER BY occurred_at,id LIMIT 2000").bind(pid,user.id).all();
   return json({ok:true,project,tasks:tasks.results,history:events.results});
  }
  if(req.method!=="POST")return fail("Not found",404);
  const input=await body(req);
  if(route==="create"){
   const reference=String(input.reference||"").trim();
   if(!/^[a-zA-Z0-9 _.-]{1,70}$/.test(reference)||!dateOK(input.start_date)||(input.target_date&&!dateOK(input.target_date))||(input.target_date&&input.target_date<input.start_date))return fail("Enter a short private reference and valid project dates");
   const pid=id();
   await db.prepare("INSERT INTO mpt_projects(id,user_id,reference,start_date,target_date,status,billing_status) VALUES(?,?,?,?,?,'draft','inactive')").bind(pid,user.id,reference,input.start_date,input.target_date||null).run();
   return json({ok:true,id:pid,billingEnabled:false},201);
  }
  const pid=String(input.project_id||"");
  const project=await db.prepare("SELECT * FROM mpt_projects WHERE id=? AND user_id=?").bind(pid,user.id).first();
  if(!project)return fail("Project not found",404);
  if(route==="complete"||route==="cancel"){
   if(project.status==="completed"||project.status==="cancelled")return json({ok:true,status:project.status,alreadyFinal:true,billingEnabled:false});
   const status=route==="complete"?"completed":"cancelled";
   await db.prepare("UPDATE mpt_projects SET status=?,billing_status='inactive',completed_at=CASE WHEN ?='completed' THEN datetime('now') ELSE completed_at END,updated_at=datetime('now') WHERE id=? AND user_id=?").bind(status,status,pid,user.id).run();
   return json({ok:true,status,billingEnabled:false});
  }
  if(project.status==="completed"||project.status==="cancelled")return fail("Finished projects are read-only; records are preserved",409);
  if(route==="change-dates"){
   const start=input.start_date||project.start_date,target=input.target_date===undefined?project.target_date:(input.target_date||null);
   if(!dateOK(start)||(target&&!dateOK(target))||(target&&target<start))return fail("Invalid dates");
   const tasks=await db.prepare("SELECT id,date_basis,days,due_date FROM mpt_tasks WHERE project_id=? AND user_id=? AND status='pending'").bind(pid,user.id).all();
   const statements=[db.prepare("UPDATE mpt_projects SET start_date=?,target_date=?,updated_at=datetime('now') WHERE id=? AND user_id=?").bind(start,target,pid,user.id)];
   for(const t of tasks.results){
    if(t.date_basis==="exact")continue;
    const anchor=t.date_basis==="start"?start:target;
    if(!anchor)continue;
    const next=shift(anchor,t.days);
    if(t.due_date===next)continue;
    statements.push(db.prepare("UPDATE mpt_tasks SET due_date=?,updated_at=datetime('now') WHERE id=? AND project_id=? AND user_id=? AND status='pending'").bind(next,t.id,pid,user.id));
    statements.push(db.prepare("INSERT INTO mpt_task_events(id,task_id,project_id,user_id,action,old_due,new_due) VALUES(?,?,?,?,'date_recalculated',?,?)").bind(id(),t.id,pid,user.id,t.due_date,next));
   }
   await db.batch(statements);return json({ok:true,recalculated:(statements.length-1)/2});
  }
  if(route==="task/add"){
   const title=String(input.title||"").trim(),basis=String(input.date_basis||"exact"),days=Number(input.days||0);
   if(!title||title.length>140||!["start","end","exact"].includes(basis)||!Number.isInteger(days)||Math.abs(days)>3650)return fail("Invalid task");
   const anchor=basis==="start"?project.start_date:basis==="end"?project.target_date:input.due_date;
   if(!dateOK(anchor))return fail("A valid date is required");
   const due=basis==="exact"?anchor:shift(anchor,days),tid=id();
   await db.batch([
    db.prepare("INSERT INTO mpt_tasks(id,project_id,user_id,title,date_basis,days,due_date) VALUES(?,?,?,?,?,?,?)").bind(tid,pid,user.id,title,basis,days,due),
    db.prepare("INSERT INTO mpt_task_events(id,task_id,project_id,user_id,action,new_due) VALUES(?,?,?,?,'created',?)").bind(id(),tid,pid,user.id,due)
   ]);return json({ok:true,id:tid,due_date:due},201);
  }
  if(route==="task/done"||route==="task/reopen"){
   const task=await db.prepare("SELECT * FROM mpt_tasks WHERE id=? AND project_id=? AND user_id=?").bind(input.task_id,pid,user.id).first();
   if(!task)return fail("Task not found",404);
   const done=route==="task/done",status=done?"done":"pending";
   if(task.status===status)return json({ok:true,status});
   await db.batch([
    db.prepare("UPDATE mpt_tasks SET status=?,completed_at=CASE WHEN ?='done' THEN datetime('now') ELSE NULL END,updated_at=datetime('now') WHERE id=? AND project_id=? AND user_id=?").bind(status,status,task.id,pid,user.id),
    db.prepare("INSERT INTO mpt_task_events(id,task_id,project_id,user_id,action,old_due,new_due) VALUES(?,?,?,?,?,?,?)").bind(id(),task.id,pid,user.id,done?"completed":"reopened",task.due_date,task.due_date)
   ]);return json({ok:true,status});
  }
  return fail("Not found",404);
 }catch(e){console.error("project-api",String(e).slice(0,170));return fail("Project request could not be completed",500)}
}
