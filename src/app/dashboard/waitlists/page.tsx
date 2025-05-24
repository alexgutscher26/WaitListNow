"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Users, Eye, Copy, Trash2, MoreVertical } from "lucide-react"
import Link from "next/link"
import { DashboardPage } from "@/components/dashboard-page"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data - replace with real data from your database
const waitlists = [
  {
    id: "1",
    name: "Early Access",
    description: "Be the first to try our new product",
    subscribers: 1245,
    status: "active" as const,
    createdAt: "2023-05-15T10:30:00Z",
    updatedAt: "2023-05-20T14:45:00Z"
  },
  {
    id: "2",
    name: "Beta Testers",
    description: "Help us test new features",
    subscribers: 842,
    status: "active" as const,
    createdAt: "2023-04-10T09:15:00Z",
    updatedAt: "2023-05-18T11:20:00Z"
  },
  {
    id: "3",
    name: "VIP Access",
    description: "Exclusive features for VIP members",
    subscribers: 156,
    status: "paused" as const,
    createdAt: "2023-03-22T16:20:00Z",
    updatedAt: "2023-05-10T13:10:00Z"
  }
]

// Custom Badge component since shadcn/ui Badge isn't available
const Badge = ({ 
  variant = 'default', 
  className = '', 
  children, 
  ...props 
}: { 
  variant?: 'default' | 'secondary' | 'outline' | 'destructive' | 'success', 
  className?: string, 
  children: React.ReactNode 
} & React.HTMLAttributes<HTMLSpanElement>) => {
  const baseStyles = 'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2';
  
  const variantStyles = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/80 border-transparent',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 border-transparent',
    outline: 'text-foreground border-border',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/80 border-transparent',
    success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 border-transparent'
  };

  return (
    <span 
      className={`${baseStyles} ${variantStyles[variant as keyof typeof variantStyles] || variantStyles.default} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

export default function WaitlistsPage() {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <DashboardPage title="Waitlists" cta={
      <Button asChild>
        <Link href="/dashboard/waitlists/new">
          <Plus className="mr-2 h-4 w-4" />
          New Waitlist
        </Link>
      </Button>
    }>
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Waitlists
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{waitlists.length}</div>
              <p className="text-xs text-muted-foreground">
                +2 from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Subscribers
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {waitlists.reduce((sum, wl) => sum + wl.subscribers, 0).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                +180.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active</CardTitle>
              <div className="h-4 w-4 rounded-full bg-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {waitlists.filter(wl => wl.status === 'active').length}
              </div>
              <p className="text-xs text-muted-foreground">
                {Math.round((waitlists.filter(wl => wl.status === 'active').length / waitlists.length) * 100)}% of total
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Last Updated
              </CardTitle>
              <span className="h-4 w-4 text-muted-foreground">🔄</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatDate(waitlists[0]?.updatedAt || new Date().toISOString())}
              </div>
              <p className="text-xs text-muted-foreground">
                Just now
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Your Waitlists</CardTitle>
                <CardDescription>
                  Manage your waitlists and view subscriber analytics
                </CardDescription>
              </div>
              <Button asChild>
                <Link href="/dashboard/waitlists/new">
                  <Plus className="mr-2 h-4 w-4" />
                  New Waitlist
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {waitlists.map((waitlist) => (
                <div key={waitlist.id} className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50">
                  <div className="flex items-center space-x-4">
                    <div className="rounded-md bg-primary/10 p-2">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <Link href={`/dashboard/waitlists/${waitlist.id}`} className="font-medium hover:underline">
                          {waitlist.name}
                        </Link>
                        <Badge variant={waitlist.status === 'active' ? 'default' : 'outline'}>
                          {waitlist.status.charAt(0).toUpperCase() + waitlist.status.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {waitlist.description}
                      </p>
                      <div className="mt-1 flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>{waitlist.subscribers.toLocaleString()} subscribers</span>
                        <span>•</span>
                        <span>Created {formatDate(waitlist.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/waitlist/${waitlist.id}`} target="_blank">
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Link>
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">More options</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Copy className="mr-2 h-4 w-4" />
                          Copy Link
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
              
              {waitlists.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Users className="mb-4 h-12 w-12 text-muted-foreground" />
                  <h3 className="mb-1 text-lg font-medium">No waitlists yet</h3>
                  <p className="mb-4 max-w-md text-sm text-muted-foreground">
                    Create your first waitlist to start collecting subscribers and growing your audience.
                  </p>
                  <Button asChild>
                    <Link href="/dashboard/waitlists/new">
                      <Plus className="mr-2 h-4 w-4" />
                      New Waitlist
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardPage>
  )
}
