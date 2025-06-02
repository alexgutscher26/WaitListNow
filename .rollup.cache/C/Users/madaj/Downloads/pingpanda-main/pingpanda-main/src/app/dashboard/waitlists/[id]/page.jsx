import { __awaiter, __generator, __makeTemplateObject } from "tslib";
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
                    return [2 /*return*/, (<div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard/waitlists">
              <ArrowLeft className="h-4 w-4"/>
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{waitlist.name}</h1>
            <p className="text-muted-foreground">{waitlist._count.subscribers} total subscribers</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={"/waitlist/".concat(waitlist.slug)} target="_blank">
              <Eye className="mr-2 h-4 w-4"/>
              View Live
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link href={"/dashboard/waitlists/".concat(waitlist.id, "/edit")}>
              <Settings className="mr-2 h-4 w-4"/>
              Settings
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">
            <BarChart className="mr-2 h-4 w-4"/>
            Overview
          </TabsTrigger>
          <TabsTrigger value="subscribers">
            <Users className="mr-2 h-4 w-4"/>
            Subscribers
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="mr-2 h-4 w-4"/>
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground"/>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalSubscribers.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  {newThisWeek > 0 ? "+".concat(newThisWeek, " this week") : 'No new subscribers this week'}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground"/>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {growthRate >= 0 ? '+' : ''}
                  {growthRate}%
                </div>
                <p className="text-xs text-muted-foreground">
                  {newThisWeek > 0 ? "+".concat(newThisWeek, " this week") : 'No growth'}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Now</CardTitle>
                <div className="h-2 w-2 rounded-full bg-green-500"/>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{newToday}</div>
                <p className="text-xs text-muted-foreground">
                  {newToday > 0 ? "+".concat(newToday, " today") : 'No new subscribers today'}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Status</CardTitle>
                <span className="h-4 w-4 text-muted-foreground">📊</span>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold capitalize">{waitlist.status.toLowerCase()}</div>
                <p className="text-xs text-muted-foreground">
                  Last updated{' '}
                  {formatDistanceToNow(new Date(waitlist.updatedAt), { addSuffix: true })}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <div className="col-span-4">
              <SubscriberGrowthChart waitlistId={id} className="w-full" days={30}/>
            </div>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Subscribers</CardTitle>
              </CardHeader>
              <CardContent>
                {recentSubscribers.length > 0 ? (<div className="space-y-4">
                    {recentSubscribers.map(function (subscriber) { return (<div key={subscriber.id} className="flex items-center">
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">{subscriber.email}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(subscriber.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>); })}
                  </div>) : (<p className="text-sm text-muted-foreground">No subscribers yet</p>)}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="subscribers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Subscribers</CardTitle>
              <p className="text-sm text-muted-foreground">
                View and manage your waitlist subscribers
              </p>
            </CardHeader>
            <CardContent>
              <SubscribersTable waitlistId={waitlist.id}/>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="space-y-6">
            {/* General Settings */}
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <WaitlistSettingsForm waitlist={{
                                id: waitlist.id,
                                name: waitlist.name,
                                slug: waitlist.slug,
                                description: waitlist.description,
                            }}/>
              </CardContent>
            </Card>

            {/* Email Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Email Settings</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Customize email notifications and confirmations
                </p>
              </CardHeader>
              <CardContent>
                <EmailSettingsForm waitlist={{
                                id: waitlist.id,
                                customFields: waitlist.customFields,
                            }}/>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="text-red-700">Danger Zone</CardTitle>
                <p className="text-sm text-red-600">
                  These actions are irreversible. Proceed with caution.
                </p>
              </CardHeader>
              <CardContent>
                <DangerZone waitlistId={waitlist.id} waitlistName={waitlist.name}/>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>)];
            }
        });
    });
}
var templateObject_1;
//# sourceMappingURL=page.jsx.map