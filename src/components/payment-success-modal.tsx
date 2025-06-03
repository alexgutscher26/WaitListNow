'use client';

import React, { useState } from 'react';
import { client } from '@/lib/client';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Modal } from './ui/modal';
import { LoadingSpinner } from './loading-spinner';
import { Button } from './ui/button';
import { CheckIcon } from 'lucide-react';

/**
 * PaymentSuccessModal component
 *
 * This component displays a modal indicating the success of a payment upgrade to the PRO plan.
 * It fetches the user's current plan status and shows a loading state if the plan is still being processed.
 * Once the plan upgrade is confirmed, it displays a success message with an image and a button to redirect to the dashboard.
 *
 * @returns A React component that renders the payment success modal.
 */
export const PaymentSuccessModal = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);

  const { data, isPending } = useQuery({
    queryKey: ['user-plan'],
    queryFn: async () => {
      const res = await client.payment.getUserPlan.$get({});
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

  // Plan configuration for modal content
  const planConfigs = {
    FREE: {
      name: 'Free',
      message: 'You are on the Free plan. Upgrade to unlock more features!',
      success: 'Free Plan',
      image: '/brand-asset-heart.png',
    },
    STARTER: {
      name: 'Starter',
      message: 'Thank you for upgrading to Starter! Enjoy more features and higher limits.',
      success: 'Starter Plan Activated! 🚀',
      image: '/brand-asset-heart.png',
    },
    GROWTH: {
      name: 'Growth',
      message: 'Thank you for upgrading to Growth! You now have access to advanced features.',
      success: 'Growth Plan Activated! 📈',
      image: '/brand-asset-heart.png',
    },
    PRO: {
      name: 'Pro',
      message:
        'Thank you for upgrading to Pro and supporting WaitlistNow. Your account has been upgraded.',
      success: 'Upgrade successful! 🎉',
      image: '/brand-asset-heart.png',
    },
  };

  const plan = data?.plan as keyof typeof planConfigs;
  const planConfig = planConfigs[plan] || planConfigs.FREE;
  const isPaymentSuccessful = plan && plan !== 'FREE';

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
              <Image
                src={planConfig.image}
                alt="Payment success"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                priority
              />
            </div>

            <div className="mt-6 flex flex-col items-center gap-1 text-center">
              <p className="text-lg/7 tracking-tight font-medium text-pretty">
                {planConfig.success}
              </p>
              <p className="text-gray-600 text-sm/6 text-pretty">{planConfig.message}</p>
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
