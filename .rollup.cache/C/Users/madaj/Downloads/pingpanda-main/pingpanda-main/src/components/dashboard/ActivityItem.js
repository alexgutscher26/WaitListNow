'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { formatDistanceToNow } from 'date-fns';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Users, Zap, Mail, DollarSign, TrendingUp, Bell } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
var getActivityIcon = function (type) {
    switch (type) {
        case 'new_subscriber':
            return Users;
        case 'waitlist_created':
            return Zap;
        case 'referral':
            return Mail;
        case 'conversion':
            return DollarSign;
        case 'milestone':
            return TrendingUp;
        default:
            return Bell;
    }
};
var getActivityUrl = function (activity) {
    switch (activity.type) {
        case 'new_subscriber':
            return activity.waitlistId ? "/dashboard/waitlists/".concat(activity.waitlistId) : null;
        case 'waitlist_created':
            return activity.waitlistId ? "/dashboard/waitlists/".concat(activity.waitlistId) : null;
        case 'referral':
            return '/dashboard/referrals';
        case 'conversion':
            return activity.waitlistId ? "/dashboard/waitlists/".concat(activity.waitlistId) : null;
        case 'milestone':
            return null;
        default:
            return null;
    }
};
var ActivityItem = function (_a) {
    var activity = _a.activity, iconType = _a.iconType, message = _a.message;
    var toast = useToast().toast;
    var router = useRouter();
    var Icon = getActivityIcon(iconType);
    var handleViewDetails = function () {
        var url = getActivityUrl(activity);
        if (url) {
            router.push(url);
        }
        else {
            toast({
                title: 'No Details Available',
                description: 'There is no details page for this activity.',
                variant: 'default',
            });
        }
    };
    return (_jsxs("div", { className: "flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors group", children: [_jsx("div", { className: "mt-1", children: _jsx(Icon, { className: "h-6 w-6" }) }), _jsxs("div", { className: "flex-1", children: [message, _jsx("div", { className: "text-xs text-gray-400 mt-1", children: formatDistanceToNow(new Date(activity.time), { addSuffix: true }) })] }), _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx("button", { className: "p-2 rounded-full hover:bg-gray-100 focus:outline-none", children: _jsx(MoreHorizontal, { className: "h-5 w-5 text-gray-500" }) }) }), _jsx(DropdownMenuContent, { align: "end", children: _jsx(DropdownMenuItem, { onClick: handleViewDetails, children: "View Details" }) })] })] }));
};
function getActivitySummary(activity) {
    switch (activity.type) {
        case 'new_subscriber':
            return "".concat(activity.name, " (").concat(activity.email, ") joined ").concat(activity.waitlist);
        case 'waitlist_created':
            return "Waitlist \"".concat(activity.name, "\" created with ").concat(activity.subscribers, " subscribers.");
        case 'referral':
            return "".concat(activity.referrer, " referred ").concat(activity.referred, ". Reward: ").concat(activity.reward);
        case 'conversion':
            return "".concat(activity.name, " converted from ").concat(activity.waitlist, ". Revenue: $").concat(activity.revenue);
        case 'milestone':
            return activity.message;
        default:
            return 'Unknown activity type.';
    }
}
export default ActivityItem;
//# sourceMappingURL=ActivityItem.js.map