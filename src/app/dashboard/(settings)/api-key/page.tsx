import { DashboardPage } from '@/components/dashboard-page';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { ApiKeySettings } from './api-key-settings';
import { db } from '@/lib/db';

/**
 * Retrieves and displays the API key settings page for a user.
 *
 * This function checks if the user is authenticated, retrieves the user's information from the database,
 * and renders the API key settings page. If the user is not authenticated or does not exist in the database,
 * it redirects to the sign-in page.
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
    <DashboardPage title="API Key">
      <ApiKeySettings apiKey={user.apiKey ?? ''} />
    </DashboardPage>
  );
};

export default Page;
