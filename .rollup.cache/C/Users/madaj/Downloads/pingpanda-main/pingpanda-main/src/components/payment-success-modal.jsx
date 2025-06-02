'use client';
import { __awaiter, __generator } from "tslib";
import React, { useState } from 'react';
import { client } from '@/lib/client';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
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
export var PaymentSuccessModal = function () {
    var router = useRouter();
    var _a = useState(true), isOpen = _a[0], setIsOpen = _a[1];
    var _b = useQuery({
        queryKey: ['user-plan'],
        queryFn: function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, client.payment.getUserPlan.$get({})];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        }); },
        refetchInterval: function (query) {
            var _a;
            return ((_a = query.state.data) === null || _a === void 0 ? void 0 : _a.plan) === 'PRO' ? false : 1000;
        },
    }), data = _b.data, isPending = _b.isPending;
    /**
     * Closes the modal and navigates to the dashboard.
     */
    var handleClose = function () {
        setIsOpen(false);
        router.push('/dashboard');
    };
    var isPaymentSuccessful = (data === null || data === void 0 ? void 0 : data.plan) === 'PRO';
    return (<Modal showModal={isOpen} setShowModal={setIsOpen} onClose={handleClose} className="px-6 pt-6" preventDefaultClose={!isPaymentSuccessful}>
      <div className="flex flex-col items-center">
        {isPending || !isPaymentSuccessful ? (<div className="flex flex-col items-center justify-center h-64">
            <LoadingSpinner className="mb-4"/>
            <p className="text-lg/7 font-medium text-gray-900">Upgrading your account...</p>
            <p className="text-gray-600 text-sm/6 mt-2 text-center text-pretty">
              Please wait while we process your upgrade. This may take a moment.
            </p>
          </div>) : (<>
            <div className="relative aspect-video border border-gray-200 w-full overflow-hidden rounded-lg bg-gray-50">
              <Image src="/brand-asset-heart.png" alt="Payment success" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" priority/>
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
              <Button onClick={handleClose} className="h-12 w-full">
                <CheckIcon className="mr-2 size-5"/>
                Go to Dashboard
              </Button>
            </div>
          </>)}
      </div>
    </Modal>);
};
//# sourceMappingURL=payment-success-modal.jsx.map