import { __awaiter, __generator, __makeTemplateObject } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { notFound, redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WaitlistSettingsForm } from '@/components/waitlist/waitlist-settings-form';
import { EmailSettingsForm } from '@/components/waitlist/email-settings-form';
import { DangerZone } from '@/components/waitlist/danger-zone';
import { Button } from '@/components/ui/button';
import { Eye, Users, BarChart, Settings, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { SubscriberGrowthChart } from '@/components/subscriber-growth-chart';
import { SubscribersTable } from '@/components/subscribers-table';
export default function WaitlistDetailPage(_a) {
    return __awaiter(this, arguments, void 0, function (_b) {
        var id, user, dbUser, waitlist, oneWeekAgo, oneDayAgo, _c, recentSubscribers, subscriberStats, stats, totalSubscribers, newThisWeek, newToday, lastWeekStart, lastWeekEnd, lastWeekCount, growthRate;
        var params = _b.params;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    id = params.id;
                    return [4 /*yield*/, currentUser()];
                case 1:
                    user = _d.sent();
                    if (!user) {
                        redirect('/sign-in');
                    }
                    return [4 /*yield*/, db.user.findUnique({
                            where: { externalId: user.id },
                        })];
                case 2:
                    dbUser = _d.sent();
                    if (!dbUser) {
                        console.error('User not found in database');
                        notFound();
                    }
                    return [4 /*yield*/, db.waitlist.findFirst({
                            where: {
                                id: id,
                                userId: dbUser.id,
                            },
                            include: {
                                _count: {
                                    select: {
                                        subscribers: true,
                                    },
                                },
                            },
                        })];
                case 3:
                    waitlist = _d.sent();
                    if (!waitlist) {
                        notFound();
                    }
                    oneWeekAgo = new Date();
                    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
                    oneDayAgo = new Date();
                    oneDayAgo.setDate(oneDayAgo.getDate() - 1);
                    return [4 /*yield*/, Promise.all([
                            db.subscriber.findMany({
                                where: {
                                    waitlistId: waitlist.id,
                                },
                                orderBy: {
                                    createdAt: 'desc',
                                },
                                take: 5,
                            }),
                            db.$queryRaw(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      SELECT \n        COUNT(*) as total,\n        SUM(CASE WHEN \"createdAt\" > ", " THEN 1 ELSE 0 END) as new_this_week,\n        SUM(CASE WHEN \"createdAt\" > ", " THEN 1 ELSE 0 END) as new_today\n      FROM \"Subscriber\"\n      WHERE \"waitlistId\" = ", "\n    "], ["\n      SELECT \n        COUNT(*) as total,\n        SUM(CASE WHEN \"createdAt\" > ", " THEN 1 ELSE 0 END) as new_this_week,\n        SUM(CASE WHEN \"createdAt\" > ", " THEN 1 ELSE 0 END) as new_today\n      FROM \"Subscriber\"\n      WHERE \"waitlistId\" = ", "\n    "])), oneWeekAgo, oneDayAgo, waitlist.id),
                        ])];
                case 4:
                    _c = _d.sent(), recentSubscribers = _c[0], subscriberStats = _c[1];
                    stats = subscriberStats[0];
                    totalSubscribers = Number(stats.total);
                    newThisWeek = Number(stats.new_this_week);
                    newToday = Number(stats.new_today);
                    lastWeekStart = new Date();
                    lastWeekStart.setDate(lastWeekStart.getDate() - 14);
                    lastWeekEnd = new Date();
                    lastWeekEnd.setDate(lastWeekEnd.getDate() - 7);
                    return [4 /*yield*/, db.subscriber.count({
                            where: {
                                waitlistId: waitlist.id,
                                createdAt: {
                                    gte: lastWeekStart,
                                    lte: lastWeekEnd,
                                },
                            },
                        })];
                case 5:
                    lastWeekCount = _d.sent();
                    growthRate = lastWeekCount > 0
                        ? Math.round(((newThisWeek - lastWeekCount) / lastWeekCount) * 100)
                        : newThisWeek > 0
                            ? 100
                            : 0;
                    return [2 /*return*/, (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsx(Button, { variant: "ghost", size: "icon", asChild: true, children: _jsx(Link, { href: "/dashboard/waitlists", children: _jsx(ArrowLeft, { className: "h-4 w-4" }) }) }), _jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold", children: waitlist.name }), _jsxs("p", { className: "text-muted-foreground", children: [waitlist._count.subscribers, " total subscribers"] })] })] }), _jsxs("div", { className: "flex space-x-2", children: [_jsx(Button, { variant: "outline", size: "sm", asChild: true, children: _jsxs(Link, { href: "/waitlist/".concat(waitlist.slug), target: "_blank", children: [_jsx(Eye, { className: "mr-2 h-4 w-4" }), "View Live"] }) }), _jsx(Button, { size: "sm", asChild: true, children: _jsxs(Link, { href: "/dashboard/waitlists/".concat(waitlist.id, "/edit"), children: [_jsx(Settings, { className: "mr-2 h-4 w-4" }), "Settings"] }) })] })] }), _jsxs(Tabs, { defaultValue: "overview", className: "space-y-4", children: [_jsxs(TabsList, { children: [_jsxs(TabsTrigger, { value: "overview", children: [_jsx(BarChart, { className: "mr-2 h-4 w-4" }), "Overview"] }), _jsxs(TabsTrigger, { value: "subscribers", children: [_jsx(Users, { className: "mr-2 h-4 w-4" }), "Subscribers"] }), _jsxs(TabsTrigger, { value: "settings", children: [_jsx(Settings, { className: "mr-2 h-4 w-4" }), "Settings"] })] }), _jsxs(TabsContent, { value: "overview", className: "space-y-4", children: [_jsxs("div", { className: "grid gap-4 md:grid-cols-2 lg:grid-cols-4", children: [_jsxs(Card, { children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [_jsx(CardTitle, { className: "text-sm font-medium", children: "Total Subscribers" }), _jsx(Users, { className: "h-4 w-4 text-muted-foreground" })] }), _jsxs(CardContent, { children: [_jsx("div", { className: "text-2xl font-bold", children: totalSubscribers.toLocaleString() }), _jsx("p", { className: "text-xs text-muted-foreground", children: newThisWeek > 0 ? "+".concat(newThisWeek, " this week") : 'No new subscribers this week' })] })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [_jsx(CardTitle, { className: "text-sm font-medium", children: "Growth Rate" }), _jsx(BarChart, { className: "h-4 w-4 text-muted-foreground" })] }), _jsxs(CardContent, { children: [_jsxs("div", { className: "text-2xl font-bold", children: [growthRate >= 0 ? '+' : '', growthRate, "%"] }), _jsx("p", { className: "text-xs text-muted-foreground", children: newThisWeek > 0 ? "+".concat(newThisWeek, " this week") : 'No growth' })] })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [_jsx(CardTitle, { className: "text-sm font-medium", children: "Active Now" }), _jsx("div", { className: "h-2 w-2 rounded-full bg-green-500" })] }), _jsxs(CardContent, { children: [_jsx("div", { className: "text-2xl font-bold", children: newToday }), _jsx("p", { className: "text-xs text-muted-foreground", children: newToday > 0 ? "+".concat(newToday, " today") : 'No new subscribers today' })] })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [_jsx(CardTitle, { className: "text-sm font-medium", children: "Status" }), _jsx("span", { className: "h-4 w-4 text-muted-foreground", children: "\uD83D\uDCCA" })] }), _jsxs(CardContent, { children: [_jsx("div", { className: "text-2xl font-bold capitalize", children: waitlist.status.toLowerCase() }), _jsxs("p", { className: "text-xs text-muted-foreground", children: ["Last updated", ' ', formatDistanceToNow(new Date(waitlist.updatedAt), { addSuffix: true })] })] })] })] }), _jsxs("div", { className: "grid gap-4 md:grid-cols-2 lg:grid-cols-7", children: [_jsx("div", { className: "col-span-4", children: _jsx(SubscriberGrowthChart, { waitlistId: id, className: "w-full", days: 30 }) }), _jsxs(Card, { className: "col-span-3", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Recent Subscribers" }) }), _jsx(CardContent, { children: recentSubscribers.length > 0 ? (_jsx("div", { className: "space-y-4", children: recentSubscribers.map(function (subscriber) { return (_jsx("div", { className: "flex items-center", children: _jsxs("div", { className: "space-y-1", children: [_jsx("p", { className: "text-sm font-medium leading-none", children: subscriber.email }), _jsx("p", { className: "text-sm text-muted-foreground", children: new Date(subscriber.createdAt).toLocaleDateString() })] }) }, subscriber.id)); }) })) : (_jsx("p", { className: "text-sm text-muted-foreground", children: "No subscribers yet" })) })] })] })] }), _jsx(TabsContent, { value: "subscribers", className: "space-y-4", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Subscribers" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "View and manage your waitlist subscribers" })] }), _jsx(CardContent, { children: _jsx(SubscribersTable, { waitlistId: waitlist.id }) })] }) }), _jsx(TabsContent, { value: "settings", className: "space-y-6", children: _jsxs("div", { className: "space-y-6", children: [_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "General Settings" }) }), _jsx(CardContent, { children: _jsx(WaitlistSettingsForm, { waitlist: {
                                                                        id: waitlist.id,
                                                                        name: waitlist.name,
                                                                        slug: waitlist.slug,
                                                                        description: waitlist.description,
                                                                    } }) })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Email Settings" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Customize email notifications and confirmations" })] }), _jsx(CardContent, { children: _jsx(EmailSettingsForm, { waitlist: {
                                                                        id: waitlist.id,
                                                                        customFields: waitlist.customFields,
                                                                    } }) })] }), _jsxs(Card, { className: "border-red-200 bg-red-50", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-red-700", children: "Danger Zone" }), _jsx("p", { className: "text-sm text-red-600", children: "These actions are irreversible. Proceed with caution." })] }), _jsx(CardContent, { children: _jsx(DangerZone, { waitlistId: waitlist.id, waitlistName: waitlist.name }) })] })] }) })] })] }))];
            }
        });
    });
}
var templateObject_1;
//# sourceMappingURL=page.js.map