(() => {
  const qs = (selector, context = document) => context.querySelector(selector);
  const qsa = (selector, context = document) => [...context.querySelectorAll(selector)];

  const menu = qs('.menu-toggle');
  const links = qs('.nav-links');
  if (menu && links) {
    menu.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      menu.setAttribute('aria-expanded', String(open));
    });
    qsa('a', links).forEach((link) => link.addEventListener('click', () => {
      links.classList.remove('open');
      menu.setAttribute('aria-expanded', 'false');
    }));
  }

  const form = qs('#project-form');
  if (!form) return;

  const FORMSUBMIT_ENDPOINT = 'https://formsubmit.co/ajax/gulfcoastorganics@gmail.com';
  const CONTACT_EMAIL = 'gulfcoastorganics@gmail.com';
  const SUBMISSION_TIMEOUT_MS = 12000;

  const startedAt = qs('#startedAt');
  if (startedAt && !startedAt.value) startedAt.value = String(Date.now());

  const fields = ['name', 'company', 'email', 'engagement', 'timeline', 'budget', 'description'];
  const summary = {
    name: qs('#summary-name'),
    email: qs('#summary-email'),
    engagement: qs('#summary-engagement'),
    timeline: qs('#summary-timeline'),
    budget: qs('#summary-budget'),
  };
  const value = (name) => qs(`#${name}`)?.value?.trim() || '';

  function review() {
    if (summary.name) summary.name.textContent = [value('name'), value('company')].filter(Boolean).join(' — ') || '—';
    if (summary.email) summary.email.textContent = value('email') || '—';
    if (summary.engagement) summary.engagement.textContent = value('engagement') || '—';
    if (summary.timeline) summary.timeline.textContent = value('timeline') || '—';
    if (summary.budget) summary.budget.textContent = value('budget') || '—';
  }

  fields.forEach((name) => qs(`#${name}`)?.addEventListener('input', review));

  const preset = new URLSearchParams(location.search).get('engagement');
  if (preset && qs('#engagement')) {
    qs('#engagement').value = preset;
    review();
  }

  const status = qs('#form-status');
  const button = qs('#submit-button');

  function setSubmissionError(message) {
    status.className = 'form-status error';
    status.replaceChildren();
    status.append(document.createTextNode(`${message} `));
    const fallback = document.createElement('a');
    fallback.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('FULCRUMHAUS project inquiry')}`;
    fallback.textContent = 'Email the project directly.';
    fallback.style.textDecoration = 'underline';
    fallback.style.textUnderlineOffset = '3px';
    status.append(fallback);
    button.disabled = false;
    button.textContent = 'SUBMIT PROJECT →';
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    status.className = 'form-status';
    status.replaceChildren();
    if (!form.reportValidity()) return;

    const data = Object.fromEntries(new FormData(form).entries());
    if (data.website) {
      qs('#form-state').hidden = true;
      qs('#success-state').hidden = false;
      return;
    }

    const started = Number(data.startedAt || 0);
    if (started && Date.now() - started < 1800) {
      status.textContent = 'Please review the form and try again.';
      status.classList.add('error');
      return;
    }

    button.disabled = true;
    button.textContent = 'SUBMITTING…';
    status.textContent = 'Sending your project for review…';

    const payload = {
      name: data.name || '',
      company: data.company || '',
      email: data.email || '',
      engagement: data.engagement || 'Not specified',
      timeline: data.timeline || 'Not specified',
      budget: data.budget || 'Not specified',
      project: data.description || '',
      _replyto: data.email || '',
      _subject: `FULCRUMHAUS inquiry — ${data.company || data.name || 'New project'}`,
      _template: 'table',
      _captcha: 'false',
      _honey: '',
      _url: location.href,
    };

    const controller = typeof AbortController === 'function' ? new AbortController() : null;
    const timeout = controller ? window.setTimeout(() => controller.abort(), SUBMISSION_TIMEOUT_MS) : null;

    try {
      const response = await fetch(FORMSUBMIT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
        signal: controller?.signal,
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || result.success === false) {
        throw new Error(result.message || 'Submission failed.');
      }

      qs('#form-state').hidden = true;
      qs('#success-state').hidden = false;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.dispatchEvent(new CustomEvent('fulcrumhaus:lead-submitted', {
        detail: { engagement: data.engagement || '' },
      }));
    } catch (error) {
      const message = error?.name === 'AbortError'
        ? 'The submission service did not respond in time.'
        : (error?.message || 'Unable to submit right now.');
      setSubmissionError(message);
    } finally {
      if (timeout) window.clearTimeout(timeout);
    }
  });

  review();
})();
