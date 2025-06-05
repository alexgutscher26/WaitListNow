// @ts-expect-error: node-fetch v2 has no types, but is required for server-side fetch
import fetch from 'node-fetch';

export interface ZeroBounceResult {
  address: string;
  status: string; // valid, invalid, catch-all, unknown, spamtrap, abuse, do_not_mail
  sub_status: string;
  free_email: boolean;
  did_you_mean: string | null;
  domain: string;
  mx_found: boolean;
  mx_record: string | null;
  smtp_provider: string | null;
  firstname?: string;
  lastname?: string;
  gender?: string;
  country?: string;
  reason?: string;
}

export async function validateEmailWithZeroBounce(email: string): Promise<ZeroBounceResult> {
  const apiKey = process.env.ZEROBOUNCE_API_KEY;
  if (!apiKey) throw new Error('ZeroBounce API key not set in environment variables');
  const url = `https://api.zerobounce.net/v2/validate?api_key=${apiKey}&email=${encodeURIComponent(email)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to validate email with ZeroBounce');
  return res.json();
} 