import { DashboardPage } from '@/components/dashboard-page';
import { db } from '@/lib/db';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { AccountSettings } from './setttings-page-content';

/**
 * Handles the rendering of the Account Settings page.
 *
 * This function first checks if the user is authenticated by calling `currentUser()`.
 * If the user is not authenticated, it redirects to the sign-in page.
 * It then retrieves the user's details from the database using their external ID.
 * If the user's details are not found, it again redirects to the sign-in page.
 * Finally, it renders the Account Settings page within a DashboardPage component.
 */
const Page = async () => {
  const auth = await currentUser();

  if (!auth) {
    redirect('/sign-in');
  }

  const user = await db.user.findUnique({
    where: { externalId: auth.id },
  });

  if (!user) {
    redirect('/sign-in');
  }

  return (
    <DashboardPage title="Account Settings">
      <AccountSettings />
    </DashboardPage>
  );
};

export default Page;
