(() => {
  const qs=(s,c=document)=>c.querySelector(s); const qsa=(s,c=document)=>[...c.querySelectorAll(s)];
  const menu=qs('.menu-toggle'), links=qs('.nav-links');
  if(menu&&links){menu.addEventListener('click',()=>{const open=links.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});qsa('a',links).forEach(a=>a.addEventListener('click',()=>{links.classList.remove('open');menu.setAttribute('aria-expanded','false')}));}

  const form=qs('#project-form'); if(!form) return;
  const FORMSUBMIT_ENDPOINT='https://formsubmit.co/ajax/gulfcoastorganics@gmail.com';
  const startedAt=qs('#startedAt'); if(startedAt&&!startedAt.value) startedAt.value=String(Date.now());
  const fields=['name','company','email','engagement','timeline','budget','description'];
  const sum={name:qs('#summary-name'),email:qs('#summary-email'),engagement:qs('#summary-engagement'),timeline:qs('#summary-timeline'),budget:qs('#summary-budget')};
  const val=n=>qs('#'+n)?.value?.trim()||'';
  function review(){if(sum.name)sum.name.textContent=[val('name'),val('company')].filter(Boolean).join(' — ')||'—';if(sum.email)sum.email.textContent=val('email')||'—';if(sum.engagement)sum.engagement.textContent=val('engagement')||'—';if(sum.timeline)sum.timeline.textContent=val('timeline')||'—';if(sum.budget)sum.budget.textContent=val('budget')||'—';}
  fields.forEach(n=>qs('#'+n)?.addEventListener('input',review));
  const preset=new URLSearchParams(location.search).get('engagement'); if(preset&&qs('#engagement')){qs('#engagement').value=preset;review();}
  const status=qs('#form-status'), btn=qs('#submit-button');
  form.addEventListener('submit',async e=>{
    e.preventDefault(); status.className='form-status'; if(!form.reportValidity()) return;
    const data=Object.fromEntries(new FormData(form).entries());
    if(data.website){qs('#form-state').hidden=true;qs('#success-state').hidden=false;return;}
    const started=Number(data.startedAt||0); if(started&&Date.now()-started<1800){status.textContent='Please review the form and try again.';status.classList.add('error');return;}
    btn.disabled=true; btn.textContent='SUBMITTING…'; status.textContent='Sending your project for review…';
    const payload={
      name:data.name||'',
      company:data.company||'',
      email:data.email||'',
      engagement:data.engagement||'Not specified',
      timeline:data.timeline||'Not specified',
      budget:data.budget||'Not specified',
      project:data.description||'',
      _replyto:data.email||'',
      _subject:`FULCRUMHAUS inquiry — ${data.company||data.name||'New project'}`,
      _template:'table',
      _captcha:'false',
      _honey:'',
      _url:location.href
    };
    try{
      const r=await fetch(FORMSUBMIT_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(payload)});
      const j=await r.json().catch(()=>({}));
      if(!r.ok||j.success===false) throw new Error(j.message||'Submission failed.');
      qs('#form-state').hidden=true; qs('#success-state').hidden=false; window.scrollTo({top:0,behavior:'smooth'}); window.dispatchEvent(new CustomEvent('fulcrumhaus:lead-submitted',{detail:{engagement:data.engagement||''}}));
    } catch(err){status.textContent=err.message||'Unable to submit right now. Please try again.';status.classList.add('error');btn.disabled=false;btn.textContent='SUBMIT PROJECT →';}
  });
  review();
})();
