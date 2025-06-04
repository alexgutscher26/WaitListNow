// test-resend.js
const { Resend } = require('resend');
const resend = new Resend('YOUR_API_KEY_HERE');
resend.emails
  .send({
    from: 'WaitListNow <noreply@waitlistnow.app>',
    to: 'your@email.com',
    subject: 'Test Email',
    html: '<p>This is a test email.</p>',
  })
  .then(console.log)
  .catch(console.error);
