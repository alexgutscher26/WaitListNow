/* eslint-disable import/no-named-as-default */
import dotenv from 'dotenv';
import cron from 'node-cron';
import { Resend } from 'resend';
import { db } from '../../lib/db';

dotenv.config();

// pnpm email:scheduler

const resend = new Resend(process.env.RESEND_API_KEY);

// Schedule: Every day at 9:00 AM
cron.schedule('* * * * *', async () => {
  try {
    const users = await db.user.findMany({
      where: { wantsEmail: true },
    });

    for (const user of users) {
      const { error } = await resend.emails.send({
        from: 'Your App <onboarding@resend.dev>',
        to: 'workinbox69@gmail.com', // todo: replace with user.email
        subject: 'Daily Waitlist Update',
        html: `
          <div style="font-family: Arial, sans-serif; background: #f9f9f9; padding: 32px; border-radius: 8px; max-width: 480px; margin: 0 auto;">
            <h2 style="color: #4F46E5; margin-bottom: 16px;">🚀 WaitListNow Daily Update</h2>
            <p style="font-size: 16px; color: #222; margin-bottom: 24px;">
              Hello,<br/>
              Here is your daily update from the WaitListNow team. Stay tuned for more news and features!
            </p>
            <a href="https://yourdomain.com/dashboard" style="display: inline-block; padding: 12px 24px; background: #4F46E5; color: #fff; border-radius: 4px; text-decoration: none; font-weight: bold; margin-bottom: 24px;">
              Go to your dashboard
            </a>
            <p style="font-size: 13px; color: #888; margin-top: 32px;">
              If you have questions, reply to this email or visit our <a href="https://yourdomain.com/support" style="color: #4F46E5; text-decoration: underline;">support page</a>.<br/>
              <span style="color: #bbb;">&copy; ${new Date().getFullYear()} WaitListNow</span>
            </p>
          </div>
        `,
      });
      if (error) {
        console.error(`Failed to send to ${user.email}:`, error);
      }
    }
  } catch (err) {
    console.error('Scheduler error:', err);
  }
});

console.log('Email scheduler started.'); 