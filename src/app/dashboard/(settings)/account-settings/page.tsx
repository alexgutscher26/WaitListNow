import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import * as React from 'react';
import { DashboardPage } from '@/components/dashboard-page';
import { db } from '@/lib/db';
import { AccountSettings } from './settings-page-content';

/**
 * Renders the Account Settings page after verifying user authentication.
 *
 * This function checks if the user is authenticated by calling `currentUser()`.
 * If unauthenticated, it redirects to the sign-in page. Otherwise, it fetches
 * the user's details from the database using their external ID. If the user's
 * details are not found, it redirects again to the sign-in page. Finally, it
 * renders the Account Settings page within a DashboardPage component.
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
