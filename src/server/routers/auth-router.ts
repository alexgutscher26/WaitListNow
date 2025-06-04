import { currentUser } from '@clerk/nextjs/server';
// HTTPException import removed as it's not used
import { db } from '@/lib/db';
import { router } from '../__internals/router';
import { publicProcedure } from '../procedures';
export const dynamic = 'force-dynamic';

export const authRouter = router({
  getDatabaseSyncStatus: publicProcedure.query(async ({ c }) => {
    const auth = await currentUser();

    if (!auth) {
      return c.json({ isSynced: false });
    }

    const user = await db.user.findFirst({
      where: { externalId: auth.id },
    });

    // console.log('USER IN DB:', user);

    if (!user) {
      await db.user.create({
        data: {
          externalId: auth.id,
          email: auth.emailAddresses[0].emailAddress,
        },
      });
    }

    return c.json({ isSynced: true });
  }),
});

// route.ts
