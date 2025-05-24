import { DashboardPage } from "@/components/dashboard-page"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, BarChart3, Clock, Users, Zap, CheckCircle2, Bell, Settings } from "lucide-react"
import { createCheckoutSession } from "@/lib/stripe"
import { PaymentSuccessModal } from "@/components/payment-success-modal"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { db } from "../../../db"

// Mock data - replace with real data from your database
const stats = {
  totalSubscribers: 1245,
  newThisWeek: 42,
  activeWaitlists: 3,
  averageWaitTime: '2.5 days',
  recentActivity: [
    { id: 1, type: 'new_subscriber', name: 'John Doe', email: 'john@example.com', time: '2 minutes ago' },
    { id: 2, type: 'waitlist_created', name: 'Beta Launch', time: '1 hour ago' },
    { id: 3, type: 'referral', referrer: 'Jane Smith', referred: 'jane@example.com', time: '3 hours ago' },
  ]
}

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

const Page = async ({ searchParams }: PageProps) => {
  const auth = await currentUser()

  if (!auth) {
    redirect("/sign-in")
  }

  const user = await db.user.findUnique({
    where: { externalId: auth.id },
  })

  if (!user) {
    return redirect("/welcome")
  }

  const intent = searchParams.intent

  if (intent === "upgrade") {
    const session = await createCheckoutSession({
      userEmail: user.email,
      userId: user.id,
    })

    if (session.url) redirect(session.url)
  }

  const success = searchParams.success

  return (
    <DashboardPage 
      title="Dashboard"
      cta={
        <Button asChild>
          <Link href="/dashboard/waitlists/new" className="gap-2">
            <Zap className="h-4 w-4" />
            New Waitlist
          </Link>
        </Button>
      }
    >
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalSubscribers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +{stats.newThisWeek} this week
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Waitlists</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeWaitlists}</div>
              <p className="text-xs text-muted-foreground">
                <Link href="/dashboard/waitlists" className="text-primary hover:underline flex items-center gap-1">
                  View all <ArrowUpRight className="h-3 w-3" />
                </Link>
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Wait Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.averageWaitTime}</div>
              <p className="text-xs text-muted-foreground">
                Across all waitlists
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Status</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">Active</div>
              <p className="text-xs text-muted-foreground">
                All systems operational
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          {/* Recent Activity */}
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                What's been happening in your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-4 p-2 hover:bg-muted/50 rounded-md">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <Bell className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      {activity.type === 'new_subscriber' && (
                        <p className="text-sm font-medium">
                          New subscriber: {activity.name} ({activity.email})
                        </p>
                      )}
                      {activity.type === 'waitlist_created' && (
                        <p className="text-sm font-medium">
                          New waitlist created: {activity.name}
                        </p>
                      )}
                      {activity.type === 'referral' && (
                        <p className="text-sm font-medium">
                          {activity.referrer} referred {activity.referred}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Get started with these common tasks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start gap-2">
                <Users className="h-4 w-4" />
                View All Subscribers
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <BarChart3 className="h-4 w-4" />
                View Analytics
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Settings className="h-4 w-4" />
                Account Settings
              </Button>
              <Button className="w-full gap-2">
                <Zap className="h-4 w-4" />
                Create New Waitlist
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardPage>
  )
}

export default Page
