import { env } from 'process';
import { Worker } from 'bullmq';
import IORedis from 'ioredis';
import { Resend } from 'resend';

//     pnpm email:worker
env.config();

const connection = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379');
const resend = new Resend(process.env.RESEND_API_KEY);

const worker = new Worker(
  'emails',
  async (job) => {
    const { to, subject, html } = job.data;
    await resend.emails.send({
      from: 'Your App <noreply@your-verified-domain.com>',
      to,
      subject,
      html,
    });
  },
  {
    connection,
    limiter: {
      max: 100, // max 100 emails
      duration: 60 * 60 * 1000, // per hour
    },
  },
);

worker.on('completed', (job) => {
  console.log(`Email sent to ${job.data.to}`);
});

worker.on('failed', (job, err) => {
  console.error(`Failed to send email to ${job?.data?.to}:`, err);
});
