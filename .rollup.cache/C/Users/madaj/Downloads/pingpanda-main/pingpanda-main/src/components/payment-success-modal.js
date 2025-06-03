'use client';
import { __awaiter, __generator } from "tslib";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
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
    // Plan configuration for modal content
    var planConfigs = {
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
            message: 'Thank you for upgrading to Pro and supporting WaitlistNow. Your account has been upgraded.',
            success: 'Upgrade successful! 🎉',
            image: '/brand-asset-heart.png',
        },
    };
    var plan = data === null || data === void 0 ? void 0 : data.plan;
    var planConfig = planConfigs[plan] || planConfigs.FREE;
    var isPaymentSuccessful = plan && plan !== 'FREE';
    return (_jsx(Modal, { showModal: isOpen, setShowModal: setIsOpen, onClose: handleClose, className: "px-6 pt-6", preventDefaultClose: !isPaymentSuccessful, children: _jsx("div", { className: "flex flex-col items-center", children: isPending || !isPaymentSuccessful ? (_jsxs("div", { className: "flex flex-col items-center justify-center h-64", children: [_jsx(LoadingSpinner, { className: "mb-4" }), _jsx("p", { className: "text-lg/7 font-medium text-gray-900", children: "Upgrading your account..." }), _jsx("p", { className: "text-gray-600 text-sm/6 mt-2 text-center text-pretty", children: "Please wait while we process your upgrade. This may take a moment." })] })) : (_jsxs(_Fragment, { children: [_jsx("div", { className: "relative aspect-video border border-gray-200 w-full overflow-hidden rounded-lg bg-gray-50", children: _jsx(Image, { src: planConfig.image, alt: "Payment success", fill: true, sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw", className: "object-cover", priority: true }) }), _jsxs("div", { className: "mt-6 flex flex-col items-center gap-1 text-center", children: [_jsx("p", { className: "text-lg/7 tracking-tight font-medium text-pretty", children: planConfig.success }), _jsx("p", { className: "text-gray-600 text-sm/6 text-pretty", children: planConfig.message })] }), _jsx("div", { className: "mt-8 w-full", children: _jsxs(Button, { onClick: handleClose, className: "h-12 w-full", children: [_jsx(CheckIcon, { className: "mr-2 size-5" }), "Go to Dashboard"] }) })] })) }) }));
};
//# sourceMappingURL=payment-success-modal.js.map