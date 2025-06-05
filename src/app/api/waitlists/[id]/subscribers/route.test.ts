// @ts-nocheck
const { POST } = require('./route');
const { NextRequest } = require('next/server');

function createRequest(body) {
  return new NextRequest('http://localhost', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  });
}

describe('Waitlist Subscribers API - Disposable Email Detection', () => {
  it('rejects disposable email addresses', async () => {
    const req = createRequest({ email: 'test@mailinator.com' });
    const res = await POST(req, { params: { id: 'test-id' } });
    const json = await res.json();
    expect(res.status).toBe(400);
    expect(json.error).toMatch(/disposable email/i);
  });

  it('accepts valid non-disposable email addresses', async () => {
    const req = createRequest({ email: 'user@example.com' });
    const res = await POST(req, { params: { id: 'test-id' } });
    const json = await res.json();
    expect(json.error || '').not.toMatch(/disposable email/i);
  });

  it('rejects invalid email addresses', async () => {
    const req = createRequest({ email: 'not-an-email' });
    const res = await POST(req, { params: { id: 'test-id' } });
    const json = await res.json();
    expect(res.status).toBe(422);
    expect(json.errors).toBeDefined();
  });

  it('rejects bot signups with honeypot field filled', async () => {
    const req = createRequest({ email: 'user@example.com', hp_token: 'I am a bot' });
    const res = await POST(req, { params: { id: 'test-id' } });
    const json = await res.json();
    expect(res.status).toBe(400);
    expect(json.error).toMatch(/bot/i);
  });

  it('accepts signups with honeypot field empty', async () => {
    const req = createRequest({ email: 'user@example.com', hp_token: '' });
    const res = await POST(req, { params: { id: 'test-id' } });
    const json = await res.json();
    expect(json.error || '').not.toMatch(/bot/i);
  });
});
