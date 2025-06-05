// @ts-nocheck
const { POST } = require('./route');
const { NextRequest } = require('next/server');
const { db } = require('@/lib/db');

function createRequest(body) {
  return new NextRequest('http://localhost', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  });
}

describe('Widget Submit API - Disposable Email Detection', () => {
  let findUniqueMock;
  beforeAll(() => {
    findUniqueMock = jest.spyOn(db.waitlist, 'findUnique').mockImplementation(async () => ({
      id: 'test-id',
      settings: {},
      userId: 'user-id',
    }));
  });

  afterAll(() => {
    findUniqueMock.mockRestore();
  });

  it('rejects disposable email addresses', async () => {
    const old = Date.now() - 3000;
    const req = createRequest({ email: 'test@mailinator.com', formRenderedAt: old.toString() });
    const res = await POST(req, { params: { id: 'test-id' } });
    const json = await res.json();
    expect(res.status).toBe(400);
    expect(json.error).toMatch(/disposable email/i);
  });

  it('accepts valid non-disposable email addresses', async () => {
    const old = Date.now() - 3000;
    const req = createRequest({ email: 'user@example.com', formRenderedAt: old.toString() });
    const res = await POST(req, { params: { id: 'test-id' } });
    const json = await res.json();
    expect(json.error || '').not.toMatch(/disposable email/i);
  });

  it('rejects invalid email addresses', async () => {
    const old = Date.now() - 3000;
    const req = createRequest({ email: 'not-an-email', formRenderedAt: old.toString() });
    const res = await POST(req, { params: { id: 'test-id' } });
    const json = await res.json();
    expect(res.status).toBe(400);
    expect(json.error).toBeDefined();
  });

  it('rejects bot signups with honeypot field filled', async () => {
    const old = Date.now() - 3000;
    const req = createRequest({
      email: 'user@example.com',
      hp_token: 'I am a bot',
      formRenderedAt: old.toString(),
    });
    const res = await POST(req, { params: { id: 'test-id' } });
    const json = await res.json();
    expect(res.status).toBe(400);
    expect(json.error).toMatch(/bot/i);
  });

  it('accepts signups with honeypot field empty', async () => {
    const old = Date.now() - 3000;
    const req = createRequest({
      email: 'user@example.com',
      hp_token: '',
      formRenderedAt: old.toString(),
    });
    const res = await POST(req, { params: { id: 'test-id' } });
    const json = await res.json();
    expect(json.error || '').not.toMatch(/bot/i);
  });

  it('rejects signups with missing formRenderedAt (intelligent CAPTCHA)', async () => {
    const req = createRequest({ email: 'user@example.com' });
    const res = await POST(req, { params: { id: 'test-id' } });
    const json = await res.json();
    expect(res.status).toBe(400);
    expect(json.error).toMatch(/timestamp/i);
  });

  it('rejects signups with formRenderedAt too recent (intelligent CAPTCHA)', async () => {
    const now = Date.now();
    const req = createRequest({ email: 'user@example.com', formRenderedAt: now.toString() });
    const res = await POST(req, { params: { id: 'test-id' } });
    const json = await res.json();
    expect(res.status).toBe(400);
    expect(json.error).toMatch(/too quickly/i);
  });

  it('accepts signups with formRenderedAt old enough (intelligent CAPTCHA)', async () => {
    const old = Date.now() - 3000;
    const req = createRequest({ email: 'user@example.com', formRenderedAt: old.toString() });
    const res = await POST(req, { params: { id: 'test-id' } });
    const json = await res.json();
    expect(json.error || '').not.toMatch(/timestamp|quickly/i);
  });

  it('rejects signups with invalid email by AI validation', async () => {
    jest
      .spyOn(require('@/lib/validations/emailValidation'), 'validateEmailWithZeroBounce')
      .mockResolvedValueOnce({
        address: 'fake@invalid.com',
        status: 'invalid',
        sub_status: 'mailbox_not_found',
        free_email: false,
        did_you_mean: null,
        domain: 'invalid.com',
        mx_found: false,
        mx_record: null,
        smtp_provider: null,
        reason: 'Mailbox does not exist',
      });
    const old = Date.now() - 3000;
    const req = createRequest({ email: 'fake@invalid.com', formRenderedAt: old.toString() });
    const res = await POST(req, { params: { id: 'test-id' } });
    const json = await res.json();
    expect(res.status).toBe(400);
    expect(json.error).toMatch(/Email rejected: invalid/);
  });
});
