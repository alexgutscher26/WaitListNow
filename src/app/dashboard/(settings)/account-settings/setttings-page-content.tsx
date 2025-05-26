"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useUser } from "@clerk/nextjs"
import { 
  Mail, 
  Bell, 
  Lock, 
  User, 
  CheckCircle2, 
  Users, 
  TrendingUp, 
  Calendar,
  Globe,
  Zap,
  Crown,
  AlertCircle,
  Copy,
  ExternalLink
} from "lucide-react"
import { useState, useEffect } from "react"

const AccountSettingsContent = () => {
  const { user } = useUser()
  const [email, setEmail] = useState(user?.emailAddresses[0]?.emailAddress || "")
  const [name, setName] = useState(`${user?.firstName || ""} ${user?.lastName || ""}`.trim())
  const [company, setCompany] = useState("")
  const [website, setWebsite] = useState("")
  const [bio, setBio] = useState("")
  const [timezone, setTimezone] = useState("UTC")
  
  const [notifications, setNotifications] = useState({
    email: true,
    waitlistMilestones: true,
    dailyReports: true,
    weeklyDigest: true,
    signupAlerts: false,
    integrationUpdates: true,
    securityAlerts: true,
    marketing: false
  })
  
  const [preferences, setPreferences] = useState({
    defaultView: "overview",
    autoArchive: false,
    publicProfile: true,
    allowReferrals: true
  })
  
  const [isSaving, setIsSaving] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [activeWaitlists] = useState(3)
  const [totalSignups] = useState(1247)
  const [accountTier] = useState("Pro")

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSaving(false)
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 3000)
  }

  const handleNotificationToggle = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const handlePreferenceToggle = (key: keyof typeof preferences) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const copyReferralLink = () => {
    navigator.clipboard.writeText("https://yourwaitlist.com/ref/user123")
  }

  return (
    <div className="space-y-6">
      {/* Account Overview */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                Account Overview
                <Badge variant={accountTier === "Pro" ? "default" : "secondary"} className="ml-2">
                  {accountTier === "Pro" && <Crown className="w-3 h-3 mr-1" />}
                  {accountTier}
                </Badge>
              </CardTitle>
              <CardDescription>Your waitlist management dashboard summary</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-blue-900">Active Waitlists</p>
                <p className="text-2xl font-bold text-blue-600">{activeWaitlists}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm font-medium text-green-900">Total Signups</p>
                <p className="text-2xl font-bold text-green-600">{totalSignups.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
              <Zap className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-purple-900">Conversion Rate</p>
                <p className="text-2xl font-bold text-purple-600">12.4%</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile Information
          </CardTitle>
          <CardDescription>Update your account details and public profile</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">Company/Organization</Label>
              <Input 
                id="company" 
                value={company} 
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Your company name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input 
                id="website" 
                value={website} 
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://yourwebsite.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea 
              id="bio" 
              value={bio} 
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about yourself or your project..."
              className="min-h-[80px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="timezone">Timezone</Label>
            <Select value={timezone} onValueChange={setTimezone}>
              <SelectTrigger className="max-w-md">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="UTC">UTC (Coordinated Universal Time)</SelectItem>
                <SelectItem value="EST">EST (Eastern Standard Time)</SelectItem>
                <SelectItem value="PST">PST (Pacific Standard Time)</SelectItem>
                <SelectItem value="GMT">GMT (Greenwich Mean Time)</SelectItem>
                <SelectItem value="CET">CET (Central European Time)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Waitlist Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Waitlist Preferences
          </CardTitle>
          <CardDescription>Configure your waitlist management settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="public-profile">Public Profile</Label>
              <p className="text-sm text-muted-foreground">Allow others to discover your waitlists</p>
            </div>
            <Switch 
              id="public-profile" 
              checked={preferences.publicProfile} 
              onCheckedChange={() => handlePreferenceToggle('publicProfile')} 
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="allow-referrals">Allow Referrals</Label>
              <p className="text-sm text-muted-foreground">Enable referral system for your waitlists</p>
            </div>
            <Switch 
              id="allow-referrals" 
              checked={preferences.allowReferrals} 
              onCheckedChange={() => handlePreferenceToggle('allowReferrals')} 
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-archive">Auto-archive Completed</Label>
              <p className="text-sm text-muted-foreground">Automatically archive waitlists after launch</p>
            </div>
            <Switch 
              id="auto-archive" 
              checked={preferences.autoArchive} 
              onCheckedChange={() => handlePreferenceToggle('autoArchive')} 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="default-view">Default Dashboard View</Label>
            <Select value={preferences.defaultView} onValueChange={(value) => setPreferences(prev => ({ ...prev, defaultView: value }))}>
              <SelectTrigger className="max-w-md">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="overview">Overview</SelectItem>
                <SelectItem value="analytics">Analytics</SelectItem>
                <SelectItem value="waitlists">Waitlists</SelectItem>
                <SelectItem value="subscribers">Subscribers</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Preferences
          </CardTitle>
          <CardDescription>Manage how you receive updates about your waitlists</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">Master toggle for all email notifications</p>
            </div>
            <Switch 
              id="email-notifications" 
              checked={notifications.email} 
              onCheckedChange={() => handleNotificationToggle('email')} 
            />
          </div>

          <div className="ml-4 space-y-4 border-l-2 border-gray-100 pl-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="signup-alerts">Real-time Signup Alerts</Label>
                <p className="text-sm text-muted-foreground">Get notified for each new signup</p>
              </div>
              <Switch 
                id="signup-alerts" 
                checked={notifications.signupAlerts} 
                onCheckedChange={() => handleNotificationToggle('signupAlerts')}
                disabled={!notifications.email}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="waitlist-milestones">Waitlist Milestones</Label>
                <p className="text-sm text-muted-foreground">Celebrate reaching signup milestones</p>
              </div>
              <Switch 
                id="waitlist-milestones" 
                checked={notifications.waitlistMilestones} 
                onCheckedChange={() => handleNotificationToggle('waitlistMilestones')}
                disabled={!notifications.email}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="daily-reports">Daily Reports</Label>
                <p className="text-sm text-muted-foreground">Daily summary of your waitlist activity</p>
              </div>
              <Switch 
                id="daily-reports" 
                checked={notifications.dailyReports} 
                onCheckedChange={() => handleNotificationToggle('dailyReports')}
                disabled={!notifications.email}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="weekly-digest">Weekly Digest</Label>
                <p className="text-sm text-muted-foreground">Weekly analytics and insights</p>
              </div>
              <Switch 
                id="weekly-digest" 
                checked={notifications.weeklyDigest} 
                onCheckedChange={() => handleNotificationToggle('weeklyDigest')}
                disabled={!notifications.email}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="integration-updates">Integration Updates</Label>
              <p className="text-sm text-muted-foreground">Updates about third-party integrations</p>
            </div>
            <Switch 
              id="integration-updates" 
              checked={notifications.integrationUpdates} 
              onCheckedChange={() => handleNotificationToggle('integrationUpdates')} 
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5 flex items-center gap-2">
              <Label htmlFor="security-alerts">Security Alerts</Label>
              <AlertCircle className="h-4 w-4 text-orange-500" />
              <p className="text-sm text-muted-foreground">Important security notifications (recommended)</p>
            </div>
            <Switch 
              id="security-alerts" 
              checked={notifications.securityAlerts} 
              onCheckedChange={() => handleNotificationToggle('securityAlerts')} 
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="marketing">Marketing Emails</Label>
              <p className="text-sm text-muted-foreground">Product updates and promotional content</p>
            </div>
            <Switch 
              id="marketing" 
              checked={notifications.marketing} 
              onCheckedChange={() => handleNotificationToggle('marketing')} 
            />
          </div>
        </CardContent>
      </Card>

      {/* Referral Program */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Referral Program
          </CardTitle>
          <CardDescription>Share your referral link and earn rewards</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">Your Referral Link</h4>
              <Badge variant="secondary">5 referrals</Badge>
            </div>
            <div className="flex items-center gap-2">
              <code className="flex-1 p-2 bg-white rounded border text-sm">
                https://yourwaitlist.com/ref/user123
              </code>
              <Button size="sm" variant="outline" onClick={copyReferralLink}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Earn 10% commission on all referral subscriptions
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Account Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Account Security
          </CardTitle>
          <CardDescription>Manage your account security settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Password</Label>
              <p className="text-sm text-muted-foreground">Last changed 3 months ago</p>
            </div>
            <Button variant="outline" size="sm">Change Password</Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
            </div>
            <Button variant="outline" size="sm">Set Up 2FA</Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>API Keys</Label>
              <p className="text-sm text-muted-foreground">Manage your API access tokens</p>
            </div>
            <Button variant="outline" size="sm">
              <ExternalLink className="h-4 w-4 mr-2" />
              Manage Keys
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Active Sessions</Label>
              <p className="text-sm text-muted-foreground">View and manage your active sessions</p>
            </div>
            <Button variant="outline" size="sm">View Sessions</Button>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          Changes are saved automatically
        </div>
        <div className="flex items-center gap-4">
          {isSaved && (
            <div className="flex items-center gap-2 text-sm text-green-600">
              <CheckCircle2 className="h-4 w-4" />
              <span>Changes saved successfully!</span>
            </div>
          )}
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  )
}

export const AccountSettings = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return <AccountSettingsContent />
}