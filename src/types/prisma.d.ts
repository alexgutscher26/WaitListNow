import { User as PrismaUser } from '@prisma/client';

declare module '@prisma/client' {
  interface User extends PrismaUser {
    waitlist_preferences: PrismaJson.WaitlistPreferences | null;
  }
}

declare global {
  namespace PrismaJson {
    type WaitlistPreferences = {
      defaultWaitlistLimit: number;
      autoApproveSubscribers: boolean;
      emailNotifications: boolean;
      maxSubscribers: number;
      requireEmailVerification: boolean;
    };
  }
}
