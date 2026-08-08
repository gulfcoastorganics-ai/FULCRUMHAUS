const EMAIL_RE=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ENGAGEMENTS=new Set(['','Digital Foundation','Growth System','Digital Infrastructure','Continuity','Not sure yet']);
const BUDGETS=new Set(['','Under $5,000','$5,000–$10,000','$10,000–$20,000','$20,000–$30,000','$30,000+','Not sure yet']);
const LIMITS={name:120,company:160,email:254,engagement:40,timeline:160,budget:40,description:3000,website:200,startedAt:32};
const WINDOW_MS=60*60*1000, MAX_REQUESTS=5;
const rateStore=globalThis.__fulcrumhausRateStore||(globalThis.__fulcrumhausRateStore=new Map());

function clean(value,max){return String(value||'').replace(/[<>]/g,'').trim().slice(0,max);}
function getIP(req){return String(req.headers['x-forwarded-for']||req.headers['x-real-ip']||'unknown').split(',')[0].trim();}
function rateLimited(ip){
  const now=Date.now(); let item=rateStore.get(ip);
  if(!item||now-item.start>=WINDOW_MS){item={start:now,count:0};}
  item.count+=1; rateStore.set(ip,item);
  if(rateStore.size>2000){for(const [key,val] of rateStore){if(now-val.start>=WINDOW_MS)rateStore.delete(key);}}
  return {blocked:item.count>MAX_REQUESTS,retryAfter:Math.max(1,Math.ceil((item.start+WINDOW_MS-now)/1000))};
}

module.exports=async(req,res)=>{
  res.setHeader('Cache-Control','no-store');
  if(req.method!=='POST'){res.setHeader('Allow','POST');return res.status(405).json({error:'Method not allowed.'});}
  const type=String(req.headers['content-type']||'');
  if(!type.toLowerCase().includes('application/json')) return res.status(415).json({error:'Content-Type must be application/json.'});
  const contentLength=Number(req.headers['content-length']||0);
  if(contentLength>12000) return res.status(413).json({error:'Submission is too large.'});

  const ip=getIP(req), rate=rateLimited(ip);
  if(rate.blocked){res.setHeader('Retry-After',String(rate.retryAfter));return res.status(429).json({error:'Too many submissions. Please try again later.'});}

  const b=req.body&&typeof req.body==='object'?req.body:{};
  if(clean(b.website,LIMITS.website)) return res.status(200).json({ok:true});
  const started=Number(b.startedAt||0);
  if(started&&Date.now()-started<1800) return res.status(400).json({error:'Please review the form and try again.'});

  for(const [key,max] of Object.entries(LIMITS)){
    if(key in b && String(b[key]??'').length>max) return res.status(400).json({error:`${key} is too long.`});
  }
  const required=['name','company','email','description'];
  for(const key of required){if(!String(b[key]||'').trim()) return res.status(400).json({error:`Missing ${key}.`});}
  if(!EMAIL_RE.test(String(b.email))) return res.status(400).json({error:'Enter a valid work email.'});
  if(!ENGAGEMENTS.has(String(b.engagement||''))) return res.status(400).json({error:'Choose a valid engagement.'});
  if(!BUDGETS.has(String(b.budget||''))) return res.status(400).json({error:'Choose a valid budget range.'});

  const payload={
    name:clean(b.name,LIMITS.name), company:clean(b.company,LIMITS.company), email:clean(b.email,LIMITS.email),
    engagement:clean(b.engagement,LIMITS.engagement), timeline:clean(b.timeline,LIMITS.timeline), budget:clean(b.budget,LIMITS.budget),
    description:clean(b.description,LIMITS.description)
  };
  const key=process.env.RESEND_API_KEY,to=process.env.LEADS_TO_EMAIL,from=process.env.LEADS_FROM_EMAIL;
  if(!key||!to||!from) return res.status(503).json({error:'Project intake is not configured yet. Please try again later.'});
  const text=`New FULCRUMHAUS project submission\n\nName: ${payload.name}\nCompany: ${payload.company}\nEmail: ${payload.email}\nEngagement: ${payload.engagement||'Not specified'}\nBudget: ${payload.budget||'Not specified'}\nTimeline: ${payload.timeline||'Not specified'}\n\nProject:\n${payload.description}`;
  try{
    const r=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${key}`,'Content-Type':'application/json'},body:JSON.stringify({from,to:[to],reply_to:payload.email,subject:`FULCRUMHAUS inquiry — ${payload.company}`,text})});
    if(!r.ok){console.error('Resend error',await r.text());return res.status(502).json({error:'Unable to send the project right now.'});}
    return res.status(200).json({ok:true});
  }catch(err){console.error(err);return res.status(500).json({error:'Unable to send the project right now.'});}
};
