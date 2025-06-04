import { format } from 'date-fns';

interface ConfirmationEmailParams {
  name?: string;
  waitlistName?: string;
  message?: string;
}

export function getConfirmationEmail({ name, waitlistName, message }: ConfirmationEmailParams) {
  const displayName = name ? `Hi ${name}! 👋` : 'Hi there! 👋';
  const wlName = waitlistName || 'our waitlist';
  const year = format(new Date(), 'yyyy');
  const confirmationMessage =
    message || `Thank you for signing up for ${wlName}. Your spot is confirmed!`;

  const html = `
    <!DOCTYPE html>
    <html lang=\"en\">
    <head>
      <meta charset=\"UTF-8\">
      <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">
      <title>Confirmation - ${wlName}</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; background: #f9fafb; color: #374151; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 24px; }
        .email-wrapper { background: #fff; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); overflow: hidden; }
        .header { background: linear-gradient(135deg, #6366f1 0%, #a21caf 100%); padding: 32px 24px; text-align: center; color: #fff; }
        .header h1 { margin: 0; font-size: 28px; font-weight: 700; }
        .content { padding: 32px 24px; }
        .content h2 { color: #111827; font-size: 22px; font-weight: 700; margin: 0 0 16px 0; text-align: center; }
        .content p { color: #6b7280; font-size: 16px; margin: 0 0 20px 0; line-height: 1.7; }
        .footer { background: #f9fafb; border-top: 1px solid #e5e7eb; padding: 24px; text-align: center; }
        .footer p { margin: 0 0 8px 0; font-size: 14px; color: #6b7280; }
        .footer .email-address { font-weight: 600; color: #374151; }
        @media only screen and (max-width: 600px) { .container { padding: 10px; } .content, .header, .footer { padding: 24px 12px; } .header h1 { font-size: 22px; } .content h2 { font-size: 18px; } }
      </style>
    </head>
    <body>
      <div class=\"container\">
        <div class=\"email-wrapper\">
          <div class=\"header\">
            <h1>You're on the list!</h1>
          </div>
          <div class=\"content\">
            <h2>${displayName}</h2>
            <p>${confirmationMessage}</p>
            <p>We'll keep you posted with updates and news.</p>
            <p>If you have any questions, just reply to this email or contact us at <a href=\"mailto:support@waitlistnow.app\">support@waitlistnow.app</a>.</p>
          </div>
          <div class=\"footer\">
            <p>&copy; ${year} WaitListNow. All rights reserved.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
${displayName}

${confirmationMessage}

We'll keep you posted with updates and news.

If you have any questions, just reply to this email or contact us at support@waitlistnow.app

© ${year} WaitListNow. All rights reserved.
  `;

  return { html, text };
}
