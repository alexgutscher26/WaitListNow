'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useUser } from '@clerk/nextjs';
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
  ExternalLink,
  ArrowUp,
  ArrowRight,
} from 'lucide-react';
import { useState, useEffect } from 'react';

/**
 * A React component that renders a user's account settings page.
 *
 * This component includes sections for profile information, notification preferences,
 * referral program details, and security settings. Users can update their personal
 * details, manage how they receive notifications about their waitlists, share their
 * referral link, and enhance the security of their account.
 *
 * Features include:
 * - Editing profile information such as name and email.
 * - Toggling various notification types via switches.
 * - Copying a referral link for sharing with others.
 * - Changing passwords and setting up two-factor authentication.
 *
 * @returns {JSX.Element} The rendered component displaying the user's account settings page.
 */
const AccountSettingsContent = () => {
  const { user } = useUser();
  const [email, setEmail] = useState(user?.emailAddresses[0]?.emailAddress || '');
  const [name, setName] = useState(`${user?.firstName || ''} ${user?.lastName || ''}`.trim());
  const [company, setCompany] = useState('');
  const [website, setWebsite] = useState('');
  const [bio, setBio] = useState('');
  const [timezone, setTimezone] = useState('UTC');

  const [notifications, setNotifications] = useState({
    email: true,
    waitlistMilestones: true,
    dailyReports: true,
    weeklyDigest: true,
    signupAlerts: false,
    integrationUpdates: true,
    securityAlerts: true,
    marketing: false,
  });

  const [preferences, setPreferences] = useState({
    defaultView: 'overview',
    autoArchive: false,
    publicProfile: true,
    allowReferrals: true,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  // Plan configurations - must match Prisma schema enum values exactly
  const planConfigs = {
    FREE: {
      name: 'Free',
      maxWaitlists: 1,
      maxSignups: 100,
      features: [
        '1 active waitlist',
        '100 signups per month',
        'Basic analytics',
        'Email support',
        'Basic branding'
      ],
      upgradeText: 'Upgrade to Starter for more',
      color: 'gray'
    },
    STARTER: {
      name: 'Starter',
      maxWaitlists: 3,
      maxSignups: 1000,
      features: [
        '3 active waitlists',
        '1,000 signups per month',
        'Basic analytics',
        'Email support',
        'Remove branding',
        'Basic custom domains'
      ],
      upgradeText: 'Upgrade to Growth for more',
      color: 'blue'
    },
    GROWTH: {
      name: 'Growth',
      maxWaitlists: 10,
      maxSignups: 10000,
      features: [
        '10 active waitlists',
        '10,000 signups per month',
        'Advanced analytics',
        'Priority support',
        'Custom domains',
        'API access',
        'Custom branding'
      ],
      upgradeText: 'Upgrade to Pro for unlimited',
      color: 'indigo'
    },
    PRO: {
      name: 'Pro',
      maxWaitlists: 50,
      maxSignups: 50000,
      features: [
        '50 active waitlists',
        '50,000 signups per month',
        'Advanced analytics',
        'Priority 24/7 support',
        'Custom domains',
        'API access',
        'Dedicated account manager',
        'Custom integrations',
        'White-labeling',
        'Priority feature requests'
      ],
      upgradeText: 'You have the best plan!',
      color: 'purple'
    }
  } as const;
  
  // Initialize metrics with defaults
  const [metrics, setMetrics] = useState({
    activeWaitlists: 0,
    totalSignups: 0,
    conversionRate: 0,
    plan: 'FREE' as keyof typeof planConfigs
  });
  
  // Get current plan config
  const currentPlan = planConfigs[metrics.plan] || planConfigs.FREE;
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(0); // Used to force re-renders
  const [usage, setUsage] = useState({
    waitlistUsage: 0,
    signupUsage: 0,
    storageUsage: 0,
    lastBillingDate: new Date().toISOString().split('T')[0],
    nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  });

  // Fetch metrics on component mount and when the plan changes
  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/account/metrics', {
          cache: 'no-store' // Prevent caching to get fresh data
        });
        
        if (response.ok) {
          const data = await response.json();
          
          // Ensure we have a valid plan from the server
          const validPlan = data.plan && Object.keys(planConfigs).includes(data.plan)
            ? data.plan as keyof typeof planConfigs
            : 'FREE';
            
          setMetrics({
            activeWaitlists: data.activeWaitlists || 0,
            totalSignups: data.totalSignups || 0,
            conversionRate: data.conversionRate || 0,
            plan: validPlan
          });
          
          // Force a re-render to ensure UI updates with new plan
          setLastUpdate(Date.now());
        } else {
          console.error('Failed to fetch metrics:', response.status);
        }
      } catch (error) {
        console.error('Error fetching metrics:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetrics();
    
    // Refresh metrics every 30 seconds
    const interval = setInterval(fetchMetrics, 30000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Get the next plan for upgrade
  const getNextPlan = () => {
    const planOrder = ['FREE', 'STARTER', 'GROWTH', 'PRO'] as const;
    const currentIndex = planOrder.indexOf(metrics.plan);
    return currentIndex < planOrder.length - 1 ? planOrder[currentIndex + 1] : null;
  };
  
  const nextPlan = getNextPlan();
  const nextPlanConfig = nextPlan ? planConfigs[nextPlan] : null;

  /**
   * Manages save process with loading and saved state transitions.
   */
  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSaving(false);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  /**
   * Toggles the notification state for a specified key.
   */
  const handleNotificationToggle = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  /**
   * Toggles the boolean value of a specified preference key.
   */
  const handlePreferenceToggle = (key: keyof typeof preferences) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  /**
   * Copies a predefined referral link to the clipboard.
   */
  const copyReferralLink = () => {
    navigator.clipboard.writeText('https://yourwaitlist.com/ref/user123');
  };

  return (
    <div className="space-y-6">
      {/* Account Overview */}
      <Card className={`border-l-4 border-l-${currentPlan.color}-500`}>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                {currentPlan.name} Plan Dashboard
                <Badge className={`ml-2 bg-gradient-to-r from-${currentPlan.color}-600 to-${currentPlan.color === 'gray' ? 'gray' : 'purple'}-600 text-white`}>
                  {metrics.plan === 'PRO' && <Crown className="w-3 h-3 mr-1" />}
                  {currentPlan.name.toUpperCase()}
                </Badge>
              </CardTitle>
              <CardDescription className="mt-1">
                {metrics.plan !== 'FREE' ? (
                  <>
                    Next billing date: {usage.nextBillingDate} • 
                    <Button variant="link" className="h-auto p-0 ml-1 text-indigo-600">
                      Manage subscription
                    </Button>
                  </>
                ) : (
                  <span>Start your free trial today!</span>
                )}
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="gap-2">
                <TrendingUp className="h-4 w-4" />
                Usage Analytics
              </Button>
              {nextPlan && (
                <Button variant="default" size="sm" className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90">
                  <ArrowUp className="h-4 w-4" />
                  Upgrade to {nextPlan}
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Usage Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className={`flex items-center gap-3 p-4 bg-gradient-to-br from-${currentPlan.color}-50 to-white rounded-lg border border-${currentPlan.color}-100`}>
                <div className={`p-2 bg-${currentPlan.color}-100 rounded-lg`}>
                  <Users className={`h-6 w-6 text-${currentPlan.color}-600`} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-medium text-gray-700">Active Waitlists</p>
                    <span className={`text-xs bg-${currentPlan.color}-100 text-${currentPlan.color}-800 px-2 py-0.5 rounded-full`}>
                      {(metrics.activeWaitlists || 0).toLocaleString()} / {currentPlan.maxWaitlists.toLocaleString()}
                    </span>
                  </div>
                  <div className="mt-1">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`bg-${currentPlan.color}-600 h-2 rounded-full`} 
                        style={{ 
                          width: `${Math.min(100, 
                            (Number(metrics.activeWaitlists || 0) / currentPlan.maxWaitlists) * 100
                          )}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {Math.max(0, currentPlan.maxWaitlists - Number(metrics.activeWaitlists || 0))} waitlists remaining
                    {metrics.plan !== 'PRO' && nextPlan && (
                      <Button variant="link" className="h-auto p-0 ml-1 text-blue-600 text-xs">
                        ({currentPlan.upgradeText})
                      </Button>
                    )}
                  </p>
                </div>
              </div>

              <div className={`flex items-center gap-3 p-4 bg-gradient-to-br from-green-50 to-white rounded-lg border border-green-100`}>
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-medium text-gray-700">Monthly Signups</p>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                      {(metrics.totalSignups || 0).toLocaleString()} / {currentPlan.maxSignups.toLocaleString()}
                    </span>
                  </div>
                  <div className="mt-1">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ 
                          width: `${Math.min(100, 
                            (Number(metrics.totalSignups || 0) / currentPlan.maxSignups) * 100
                          )}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {Math.max(0, currentPlan.maxSignups - Number(metrics.totalSignups || 0)).toLocaleString()} signups remaining
                    {metrics.plan !== 'PRO' && nextPlan && (
                      <Button variant="link" className="h-auto p-0 ml-1 text-blue-600 text-xs">
                        ({currentPlan.upgradeText})
                      </Button>
                    )}
                  </p>
                </div>
              </div>

              <div className={`flex items-center gap-3 p-4 bg-gradient-to-br from-purple-50 to-white rounded-lg border border-purple-100`}>
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Zap className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Conversion Rate</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {isLoading ? '...' : `${Number(metrics.conversionRate || 0).toFixed(1)}%`}
                  </p>
                  <p className="text-xs text-gray-500">
                    {isLoading ? 'Calculating...' : 'Based on last 30 days'}
                  </p>
                </div>
              </div>
            </div>

            {/* Plan Features */}
            <div className={`bg-${currentPlan.color}-50 rounded-lg p-4 border border-${currentPlan.color}-100`}>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium text-gray-900">{currentPlan.name} Plan Features</h3>
                {nextPlan && (
                  <Button variant="link" className="h-auto p-0 text-sm text-blue-600">
                    Compare plans <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {currentPlan.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle2 className={`h-4 w-4 text-${currentPlan.color}-600 mt-0.5 mr-2 flex-shrink-0`} />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
                {nextPlan && (
                  <div className="flex items-center mt-2 pt-2 border-t border-gray-200">
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">{currentPlan.upgradeText}</p>
                      <Button variant="link" className="h-auto p-0 text-sm font-medium text-blue-600">
                        Upgrade to {nextPlan} <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
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
            <Select
              value={timezone}
              onValueChange={setTimezone}
            >
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
              <p className="text-sm text-muted-foreground">
                Allow others to discover your waitlists
              </p>
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
              <p className="text-sm text-muted-foreground">
                Enable referral system for your waitlists
              </p>
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
              <p className="text-sm text-muted-foreground">
                Automatically archive waitlists after launch
              </p>
            </div>
            <Switch
              id="auto-archive"
              checked={preferences.autoArchive}
              onCheckedChange={() => handlePreferenceToggle('autoArchive')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="default-view">Default Dashboard View</Label>
            <Select
              value={preferences.defaultView}
              onValueChange={(value) => setPreferences((prev) => ({ ...prev, defaultView: value }))}
            >
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
              <p className="text-sm text-muted-foreground">
                Master toggle for all email notifications
              </p>
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
                <p className="text-sm text-muted-foreground">
                  Celebrate reaching signup milestones
                </p>
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
                <p className="text-sm text-muted-foreground">
                  Daily summary of your waitlist activity
                </p>
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
              <p className="text-sm text-muted-foreground">
                Updates about third-party integrations
              </p>
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
              <p className="text-sm text-muted-foreground">
                Important security notifications (recommended)
              </p>
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
              <p className="text-sm text-muted-foreground">
                Product updates and promotional content
              </p>
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
              <Button
                size="sm"
                variant="outline"
                onClick={copyReferralLink}
              >
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
            <Button
              variant="outline"
              size="sm"
            >
              Change Password
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
            </div>
            <Button
              variant="outline"
              size="sm"
            >
              Set Up 2FA
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>API Keys</Label>
              <p className="text-sm text-muted-foreground">Manage your API access tokens</p>
            </div>
            <Button
              variant="outline"
              size="sm"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Manage Keys
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Active Sessions</Label>
              <p className="text-sm text-muted-foreground">View and manage your active sessions</p>
            </div>
            <Button
              variant="outline"
              size="sm"
            >
              View Sessions
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">Changes are saved automatically</div>
        <div className="flex items-center gap-4">
          {isSaved && (
            <div className="flex items-center gap-2 text-sm text-green-600">
              <CheckCircle2 className="h-4 w-4" />
              <span>Changes saved successfully!</span>
            </div>
          )}
          <Button
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </div>
  );
};

/**
 * Renders account settings component once mounted.
 */
export const AccountSettings = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <AccountSettingsContent />;
};
