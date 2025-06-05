# AI-Powered Email and Domain Validation

## Overview

WaitListNow uses advanced, AI-powered email and domain validation to ensure only real, high-quality signups are accepted. This protects your waitlist from fake, disposable, or risky email addresses, improving deliverability and reducing abuse.

## How It Works

- The platform integrates with [ZeroBounce](https://zerobounce.net/), a leading email validation API powered by AI and large-scale data analysis.
- When a user submits their email (via the widget or API), the backend:
  1. Checks for valid email format (RFC-compliant)
  2. Detects disposable/temporary email addresses
  3. Uses ZeroBounce to verify:
     - Deliverability (can the email receive mail?)
     - Domain reputation (is the domain trustworthy?)
     - Spam traps, abuse, and blacklist status
     - Role-based or generic addresses (e.g., admin@, info@)
     - Recent activity and risk signals
- If the email is not valid, disposable, or risky, the signup is rejected with a clear error message.

## What Is Validated?

- **Email Syntax**: Must be a valid, RFC-compliant email address
- **Disposable/Temporary Email**: Blocked using both local and ZeroBounce blocklists
- **Deliverability**: Checked via ZeroBounce (must be deliverable)
- **Domain Reputation**: Low-reputation or blacklisted domains are blocked
- **Spam/Abuse**: Known spam traps and abusive addresses are blocked
- **Role-Based Addresses**: Optionally blocked (configurable)

## Enforcement Points

- **API Endpoints**: All signup and subscriber endpoints enforce validation
- **Widget**: The embeddable widget automatically submits to validated endpoints; users see errors if their email is blocked
- **Admin Tools**: Manual additions via dashboard are also validated

## Error Handling & User Experience

- Users receive clear, actionable error messages (e.g., "Disposable emails are not allowed", "Email address is not deliverable")
- Errors are surfaced in the widget UI and API responses
- No sensitive details about validation logic are exposed to end users

## Security & Privacy

- Email addresses are sent securely to ZeroBounce for validation
- No email content or user data is shared beyond what is required for validation
- API keys are stored securely in environment variables (`ZEROBOUNCE_API_KEY`)
- Validation results are not used for marketing or shared with third parties

## Configuration

1. **Get a ZeroBounce API Key**: [Sign up at ZeroBounce](https://zerobounce.net/)
2. **Set the API Key**: Add `ZEROBOUNCE_API_KEY=your_key_here` to your `.env.local` file
3. **Deploy/Restart**: Restart your server to apply changes

## Example Error Messages

- `Disposable emails are not allowed`
- `Email address is not deliverable`
- `Email domain is blocked or has poor reputation`
- `Invalid email address format`
- `Role-based email addresses are not allowed`

## FAQ

**Q: Can I disable AI-powered validation?**
A: No, this is a core anti-abuse feature. Contact support for enterprise exceptions.

**Q: Will this block all valid users?**
A: Only emails that are undeliverable, disposable, or high-risk are blocked. Most real users will not be affected.

**Q: Is my data safe?**
A: Yes. Only the email address is sent to ZeroBounce, and only for validation. No marketing or sharing occurs.

**Q: How do I troubleshoot validation errors?**
A: Check the error message shown to the user. If you believe a valid email is blocked, contact support with details.

---

For more details, see the [ZeroBounce API documentation](https://zerobounce.net/docs/).
