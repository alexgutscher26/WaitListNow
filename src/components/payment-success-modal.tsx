'use client';

import { client } from '@/lib/client';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Modal } from './ui/modal';
import { LoadingSpinner } from './loading-spinner';
import { Button } from './ui/button';
import { CheckIcon } from 'lucide-react';

// TODO: Need to update this modal to show different content based on the plan plus change for the different plans for this saas

/**
 * PaymentSuccessModal component
 *
 * This component displays a modal indicating the success of a payment upgrade to the PRO plan.
 * It fetches the user's current plan status and shows a loading state if the plan is still being processed.
 * Once the plan upgrade is confirmed, it displays a success message with an image and a button to redirect to the dashboard.
 */
export const PaymentSuccessModal = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);

  const { data, isPending } = useQuery({
    queryKey: ['user-plan'],
    queryFn: async () => {
      const res = await client.payment.getUserPlan.$get();
      return await res.json();
    },
    refetchInterval: (query) => {
      return query.state.data?.plan === 'PRO' ? false : 1000;
    },
  });

  /**
   * Closes the modal and navigates to the dashboard.
   */
  const handleClose = () => {
    setIsOpen(false);
    router.push('/dashboard');
  };

  const isPaymentSuccessful = data?.plan === 'PRO';

  return (
    <Modal
      showModal={isOpen}
      setShowModal={setIsOpen}
      onClose={handleClose}
      className="px-6 pt-6"
      preventDefaultClose={!isPaymentSuccessful}
    >
      <div className="flex flex-col items-center">
        {isPending || !isPaymentSuccessful ? (
          <div className="flex flex-col items-center justify-center h-64">
            <LoadingSpinner className="mb-4" />
            <p className="text-lg/7 font-medium text-gray-900">Upgrading your account...</p>
            <p className="text-gray-600 text-sm/6 mt-2 text-center text-pretty">
              Please wait while we process your upgrade. This may take a moment.
            </p>
          </div>
        ) : (
          <>
            <div className="relative aspect-video border border-gray-200 w-full overflow-hidden rounded-lg bg-gray-50">
              <img
                src="/brand-asset-heart.png"
                className="h-full w-full object-cover"
                alt="Payment success"
              />
            </div>

            <div className="mt-6 flex flex-col items-center gap-1 text-center">
              <p className="text-lg/7 tracking-tight font-medium text-pretty">
                Upgrade successful! 🎉
              </p>
              <p className="text-gray-600 text-sm/6 text-pretty">
                Thank you for upgrading to Pro and supporting PingPanda. Your account has been
                upgraded.
              </p>
            </div>

            <div className="mt-8 w-full">
              <Button
                onClick={handleClose}
                className="h-12 w-full"
              >
                <CheckIcon className="mr-2 size-5" />
                Go to Dashboard
              </Button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};
