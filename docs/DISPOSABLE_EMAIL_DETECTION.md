# Detection of Disposable Email Addresses

## Overview

WaitListNow protects your waitlist from fake or low-quality signups by blocking disposable (temporary) email addresses. This ensures your audience is real and improves deliverability and engagement.

## How It Works

- The backend uses a combination of:
  - The `is-disposable-email` package (local, regularly updated blocklist of disposable domains)
  - [ZeroBounce](https://zerobounce.net/) API for advanced disposable detection and global blocklists
- When a user submits an email (via widget, API, or admin dashboard), the system:
  1. Checks the domain against the local disposable email blocklist
  2. Optionally checks with ZeroBounce for additional disposable/risk signals
  3. If the email is disposable, the signup is rejected with a clear error message

## Enforcement Points

- **API Endpoints**: All signup/subscriber endpoints block disposable emails
- **Widget**: The embeddable widget submits to validated endpoints; users see errors if their email is disposable
- **Admin Tools**: Manual additions are also checked for disposable emails

## User Experience & Error Handling

- Users are shown a clear error message if they try to sign up with a disposable email (e.g., "Disposable emails are not allowed")
- The widget and API both return actionable errors
- No technical details about the blocklist or detection logic are exposed to end users

## Security & Privacy

- Only the email address is checked; no other user data is used
- Blocklists are updated regularly to catch new disposable providers
- ZeroBounce checks are performed securely and only for validation

## Developer Notes

- The `is-disposable-email` package is used for fast, local detection
- ZeroBounce provides a second layer of detection for new or obscure disposable domains
- To update the local blocklist, update the `is-disposable-email` package version in `package.json` and run `pnpm install`
- For custom blocklists, you can extend the logic in `src/lib/validations/emailValidation.ts`

## Example Error Messages

- `Disposable emails are not allowed`
- `Email address is temporary or blocked`

## FAQ

**Q: Can I allow disposable emails for testing?**
A: No, disposable emails are always blocked in production. For development, you may mock or bypass validation in test environments only.

**Q: How often is the blocklist updated?**
A: The local blocklist is updated with each new release of `is-disposable-email`. ZeroBounce uses a continuously updated global list.

**Q: What if a real user is blocked?**
A: Rarely, a legitimate domain may be flagged. Contact support with the email/domain for review.

---

For more details, see the [ZeroBounce documentation](https://zerobounce.net/docs/) and the [`is-disposable-email` package](https://www.npmjs.com/package/is-disposable-email).
