import { redirect } from 'next/navigation';

interface RefPageProps {
  params: { referralCode: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

/**
 * Redirects to the main signup page with the referral code as a query parameter.
 */
export default function RefPage({ params }: RefPageProps) {
  // Redirect to the main signup page with the referralCode as a query param
  redirect(`/sign-up?referralCode=${encodeURIComponent(params.referralCode)}`);
  return null;
} 