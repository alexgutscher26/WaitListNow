# Intelligent CAPTCHA Alternatives for Better User Experience

## Overview

WaitListNow uses intelligent, invisible CAPTCHA alternatives to block bots while keeping the signup experience seamless for real users. This approach eliminates the need for traditional CAPTCHAs, which can frustrate or slow down genuine signups.

## How It Works

- **Hidden Timestamp Field**: When the signup form is rendered, a hidden field (`formRenderedAt`) records the current time.
- **Behavioral Detection**: On submission, the backend checks how much time has passed since the form was rendered. If the form is submitted too quickly (faster than a human could realistically fill it out), the signup is rejected as likely bot activity.
- **No User Friction**: There are no puzzles, image selections, or extra steps for real users. The process is invisible and automatic.

## Enforcement Points

- **API Endpoints**: All signup/subscriber endpoints enforce the intelligent CAPTCHA check
- **Widget**: The embeddable widget includes the hidden timestamp field automatically
- **Admin Tools**: Manual additions are not subject to CAPTCHA checks (assumed to be trusted)

## User Experience & Error Handling

- Real users never see a CAPTCHA or extra challenge
- If a signup is blocked for being too fast, a clear error message is shown (e.g., "Form submitted too quickly. Please try again.")
- No technical details about timing or detection logic are exposed to end users

## Security & Privacy

- No user data is tracked or shared for CAPTCHA purposes
- All detection is performed securely on the backend
- No cookies or persistent identifiers are used

## Developer Notes

- The minimum time threshold (in milliseconds) can be adjusted in the backend validation logic
- The field is named `formRenderedAt` by default; you can change this in the frontend and backend for extra security
- All logic is in `src/lib/validations/emailValidation.ts` and related API routes

## Example Error Messages

- `Form submitted too quickly. Please try again.`
- `Bot-like activity detected. Please try again.`

## FAQ

**Q: Can real users be blocked by mistake?**
A: The time threshold is set to allow even fast typists. If a user is blocked, they can simply try again after a few seconds.

**Q: Can bots bypass this detection?**
A: Most unsophisticated bots will be blocked. Advanced bots may bypass, but this system stops the majority of automated signups without hurting user experience.

**Q: Can I add a visible CAPTCHA?**
A: Yes, but the current system is designed to be user-friendly and invisible. Contact support if you need to add a visible CAPTCHA.

---

For more details, see the implementation in `src/lib/validations/emailValidation.ts` and the widget code. 