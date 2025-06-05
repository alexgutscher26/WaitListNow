# Identification of Bot-Generated Signups

## Overview

WaitListNow uses multiple modern techniques to detect and block automated (bot) signups, ensuring your waitlist is filled with real, engaged users.

## How It Works

- **Honeypot Field**: The signup form includes a hidden field (`hp_token`). Real users never see or fill this field, but bots often do. If the field is filled, the signup is rejected as likely bot activity.
- **Time-Based CAPTCHA**: The form includes a hidden timestamp (`formRenderedAt`). If the form is submitted too quickly after rendering (faster than a human could fill it out), the signup is rejected as likely bot activity.
- **Backend Enforcement**: All validation is performed server-side, so bots cannot bypass detection by manipulating the frontend.

## Enforcement Points

- **API Endpoints**: All signup/subscriber endpoints enforce bot detection
- **Widget**: The embeddable widget includes the honeypot and timestamp fields automatically
- **Admin Tools**: Manual additions are not subject to bot detection (assumed to be trusted)

## User Experience & Error Handling

- Real users are never asked to solve a CAPTCHA or puzzle
- If a signup is blocked as a bot, a clear error message is shown (e.g., "Bot-like activity detected. Please try again.")
- No technical details about detection logic are exposed to end users

## Security & Privacy

- No user data is shared with third parties for bot detection
- All detection is performed securely on the backend
- No cookies or tracking are used for bot detection

## Developer Notes

- The honeypot field is named `hp_token` by default; you can change this in the frontend and backend for extra security
- The minimum time threshold for the time-based CAPTCHA can be adjusted in the backend validation logic
- All detection logic is in `src/lib/validations/emailValidation.ts` and related API routes

## Example Error Messages

- `Bot-like activity detected. Please try again.`
- `Form submitted too quickly. Please try again.`

## FAQ

**Q: Can real users be blocked by mistake?**
A: Very rarely. The time threshold is set to allow fast typists, and the honeypot is invisible to real users. If a user is blocked, they can simply try again.

**Q: Can bots bypass this detection?**
A: Most unsophisticated bots will be blocked. Advanced bots may bypass, but this system stops the vast majority of automated signups without hurting user experience.

**Q: Can I add a traditional CAPTCHA?**
A: Yes, but the current system is designed to be user-friendly and invisible. Contact support if you need to add a visible CAPTCHA.

---

For more details, see the implementation in `src/lib/validations/emailValidation.ts` and the widget code. 