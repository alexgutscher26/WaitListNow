/* eslint-disable import/no-default-export */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { handle } from 'hono/vercel';
import { authRouter } from './routers/auth-router';
import { paymentRouter } from './routers/payment-router';

// Configure CORS with explicit origins and secure defaults
const corsOptions = {
  origin: [
    'http://localhost:3000', // Local development
    'https://your-production-domain.com', // TODO: Replace with your production domain
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400, // 24 hours
};

const app = new Hono().basePath('/api').use(cors(corsOptions));

/**
 * This is the primary router for your server.
 *
 * All routers added in /server/routers should be manually added here.
 */
const appRouter = app.route('/auth', authRouter).route('/payment', paymentRouter);

// The handler Next.js uses to answer API requests
export const httpHandler = handle(app);

/**
 * (Optional)
 * Exporting our API here for easy deployment
 *
 * Run `npm run deploy` for one-click API deployment to Cloudflare's edge network
 */
export default app;

// export type definition of API
export type AppType = typeof appRouter;
