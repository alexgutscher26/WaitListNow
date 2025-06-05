import { currentUser } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { router } from '../__internals/router';
import { publicProcedure } from '../procedures';
export const dynamic = 'force-dynamic';

export const authRouter = router<{
  getDatabaseSyncStatus: import('../__internals/types').QueryOperation<
    Record<string, unknown>,
    Record<string, unknown>
  >;
}>({
  getDatabaseSyncStatus: publicProcedure.query(async ({ c }) => {
    const auth = await currentUser();

    if (!auth) {
      return c.superjson({ isSynced: false } as Record<string, unknown>);
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

    return c.superjson({ isSynced: true } as Record<string, unknown>);
  }),
});

// route.ts
