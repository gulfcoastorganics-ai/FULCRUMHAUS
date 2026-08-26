const test = require('node:test');
const assert = require('node:assert/strict');

function loadHandler() {
  delete require.cache[require.resolve('../api/submit.js')];
  return require('../api/submit.js');
}

function makeReq({ method = 'POST', headers = { 'content-type': 'application/json' }, body = {} } = {}) {
  return { method, headers, body };
}

function makeRes() {
  const headers = {};
  return {
    headers,
    statusCode: 200,
    payload: undefined,
    setHeader(name, value) { headers[String(name).toLowerCase()] = String(value); },
    status(code) { this.statusCode = code; return this; },
    json(payload) { this.payload = payload; return this; },
  };
}

const validBody = {
  name: 'Ada Lovelace',
  company: 'Analytical Engines',
  email: 'ada@example.com',
  engagement: 'Digital Foundation',
  budget: '$5,000–$10,000',
  timeline: 'This quarter',
  description: 'Build a production-ready website.',
  startedAt: Date.now() - 5000,
};

test('rejects non-POST requests', async () => {
  const res = makeRes();
  await loadHandler()(makeReq({ method: 'GET' }), res);
  assert.equal(res.statusCode, 405);
  assert.equal(res.headers.allow, 'POST');
});

test('requires JSON content type', async () => {
  const res = makeRes();
  await loadHandler()(makeReq({ headers: { 'content-type': 'text/plain' } }), res);
  assert.equal(res.statusCode, 415);
});

test('rejects missing required fields before delivery', async () => {
  const res = makeRes();
  await loadHandler()(makeReq({ body: { company: 'Example' } }), res);
  assert.equal(res.statusCode, 400);
  assert.match(res.payload.error, /Missing name/);
});

test('honeypot submissions are acknowledged without delivery', async () => {
  const originalFetch = global.fetch;
  let called = false;
  global.fetch = async () => { called = true; throw new Error('should not be called'); };
  try {
    const res = makeRes();
    await loadHandler()(makeReq({ body: { ...validBody, website: 'https://spam.invalid' } }), res);
    assert.equal(res.statusCode, 200);
    assert.deepEqual(res.payload, { ok: true });
    assert.equal(called, false);
  } finally {
    global.fetch = originalFetch;
  }
});

test('returns 503 when delivery secrets are not configured', async () => {
  const saved = {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    LEADS_TO_EMAIL: process.env.LEADS_TO_EMAIL,
    LEADS_FROM_EMAIL: process.env.LEADS_FROM_EMAIL,
  };
  delete process.env.RESEND_API_KEY;
  delete process.env.LEADS_TO_EMAIL;
  delete process.env.LEADS_FROM_EMAIL;
  try {
    const res = makeRes();
    await loadHandler()(makeReq({ body: validBody }), res);
    assert.equal(res.statusCode, 503);
  } finally {
    for (const [key, value] of Object.entries(saved)) {
      if (value === undefined) delete process.env[key]; else process.env[key] = value;
    }
  }
});

test('delivers a validated inquiry through Resend', async () => {
  const savedEnv = {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    LEADS_TO_EMAIL: process.env.LEADS_TO_EMAIL,
    LEADS_FROM_EMAIL: process.env.LEADS_FROM_EMAIL,
  };
  const originalFetch = global.fetch;
  process.env.RESEND_API_KEY = 'test-key';
  process.env.LEADS_TO_EMAIL = 'leads@example.com';
  process.env.LEADS_FROM_EMAIL = 'Site <site@example.com>';
  let request;
  global.fetch = async (url, init) => {
    request = { url, init };
    return { ok: true, text: async () => '' };
  };
  try {
    const res = makeRes();
    await loadHandler()(makeReq({ body: validBody }), res);
    assert.equal(res.statusCode, 200);
    assert.deepEqual(res.payload, { ok: true });
    assert.equal(request.url, 'https://api.resend.com/emails');
    const payload = JSON.parse(request.init.body);
    assert.equal(payload.reply_to, validBody.email);
    assert.deepEqual(payload.to, ['leads@example.com']);
    assert.match(payload.subject, /Analytical Engines/);
  } finally {
    global.fetch = originalFetch;
    for (const [key, value] of Object.entries(savedEnv)) {
      if (value === undefined) delete process.env[key]; else process.env[key] = value;
    }
  }
});
