# WaitListNow Security Policy

At WaitListNow, we take security seriously. This document outlines our security policies, supported versions, and how to report vulnerabilities.

## Supported Versions

We currently provide security updates for the following versions of WaitListNow:

| Version | Supported          | Notes                                    |
| ------- | ------------------ | ---------------------------------------- |
| 1.x.x   | :white_check_mark: | Current stable release                   |
| 0.9.x   | :white_check_mark: | Beta release with security support       |
| 0.8.x   | :x:                | No longer supported                      |
| < 0.8   | :x:                | No longer supported                      |

We recommend all users to upgrade to the latest stable version to ensure you have the most up-to-date security features and patches.

## Security Features

WaitListNow implements several security measures to protect your data:

### Authentication & Authorization
- Secure authentication via [Clerk](https://clerk.com/)
- Role-based access control for dashboard and API access
- JWT token validation for all API requests
- CSRF protection for form submissions

### Data Protection
- All data encrypted in transit via HTTPS/TLS
- Sensitive data encrypted at rest
- Database access restricted by IP and strong authentication
- Regular security audits and penetration testing

### API Security
- Rate limiting to prevent abuse
- Input validation and sanitization
- Secure headers implementation
- API key rotation capabilities

## Best Practices for Users

To ensure maximum security when using WaitListNow:

1. **Keep your credentials secure**
   - Use strong, unique passwords
   - Enable two-factor authentication
   - Rotate API keys regularly

2. **Implement proper access controls**
   - Only grant necessary permissions to team members
   - Regularly audit user access
   - Remove access for former team members promptly

3. **Keep your integration code secure**
   - Never expose API keys in client-side code
   - Validate and sanitize all user inputs
   - Keep your dependencies updated

## Reporting a Vulnerability

We appreciate the work of security researchers and the community in helping us maintain a secure platform.

### How to Report

If you discover a security vulnerability in WaitListNow, please report it by emailing [security@waitlistnow.com](mailto:security@waitlistnow.com).

Please include the following information:
- A clear description of the vulnerability
- Steps to reproduce the issue
- Potential impact of the vulnerability
- Any suggestions for mitigation
- Your contact information for follow-up questions

### What to Expect

After submitting a report:

1. **Acknowledgment**: We will acknowledge receipt of your report within 48 hours.

2. **Verification**: Our security team will verify the vulnerability and determine its impact.

3. **Updates**: We will provide regular updates about our progress addressing the issue.

4. **Resolution**: Once resolved, we will notify you and provide details about the fix.

5. **Recognition**: With your permission, we will acknowledge your contribution in our security hall of fame.

### Responsible Disclosure

We request that you:
- Allow us reasonable time to investigate and address the vulnerability before any public disclosure
- Make a good faith effort to avoid privacy violations, data destruction, or service interruption during your research
- Do not access or modify data of other users without explicit permission

## Security Updates

We regularly publish security updates and advisories. To stay informed:

- Watch our [GitHub repository](https://github.com/alexgutscher26/WaitListNow)
- Subscribe to our security newsletter at [waitlistnow.com/security](https://waitlistnow.com/security)
- Follow us on Twitter [@WaitListNow](https://twitter.com/waitlistnow)

## Compliance and Certifications

WaitListNow is committed to maintaining compliance with industry security standards:

- GDPR compliant
- CCPA compliant
- Regular third-party security audits
- SOC 2 compliance (in progress)

---

This security policy was last updated on May 26, 2025.
