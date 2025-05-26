import { httpHandler } from '@/server';

// Using Node.js runtime for Prisma compatibility
export const runtime = 'nodejs'; // or remove this line to use default Node.js runtime

export { httpHandler as GET, httpHandler as POST };
