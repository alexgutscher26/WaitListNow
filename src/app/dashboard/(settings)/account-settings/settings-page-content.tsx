'use client';

import React from 'react';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
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
import { useUser, useSession } from '@clerk/nextjs';
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
  ListChecks,
  Save,
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
// @ts-expect-error: No types for canvas-confetti
import confetti from 'canvas-confetti';
import { SocialShareButtons } from '@/components/ui/SocialShareButtons';

/**
 * @file SettingsPage Component
 * @description A React component representing the settings page for a user's account.
 *              This component includes various sections such as profile, notification preferences,
 *              referral program, account security, and active sessions management.
 *
 * @exports {React.FC} - The functional component representing the settings page.
 *
 * @requires {useState, useEffect} from 'react' - React hooks for managing state and side effects.
 * @requires {useRouter} from 'next/router' - Next.js hook for routing and navigation.
 * @requires {useAuth} from '@/context/auth' - Custom hook for authentication context.
 * @requires {toast} from 'react-toastify' - Utility for showing toast notifications.
 * @requires {axios} from 'axios' - HTTP client for making API requests.
 * @requires {User, Session, ReferralInfo} from '@/types/types' - Type definitions for user, session, and referral information.
 *
 * @function SettingsPage
 * @returns {JSX.Element} - The rendered JSX element representing the settings page.
 */
const AccountSettingsContent = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useUser();
  const { session: currentSession } = useSession();

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Profile form state with proper type and default values
  type FormData = {
    name: string;
    email: string;
    company: string;
    website: string;
    bio: string;
    timezone: string;
  };

  // Waitlist preferences state
  type WaitlistPreferences = {
    defaultWaitlistLimit: number;
    autoApproveSubscribers: boolean;
    emailNotifications: boolean;
    maxSubscribers: number;
    requireEmailVerification: boolean;
  };

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: user?.emailAddresses[0]?.emailAddress || '',
    company: '',
    website: '',
    bio: '',
    timezone: 'UTC',
  });

  const [waitlistPrefs, setWaitlistPrefs] = useState<WaitlistPreferences>({
    defaultWaitlistLimit: 1,
    autoApproveSubscribers: true,
    emailNotifications: true,
    maxSubscribers: 1000,
    requireEmailVerification: false,
  });
  const [isSavingPrefs, setIsSavingPrefs] = useState(false);

  const [notifications, setNotifications] = useState({
    email: true,
    waitlistMilestones: true,
    dailyReports: true,
    weeklyDigest: true,
    signupAlerts: true,
    integrationUpdates: true,
    securityAlerts: true,
    marketing: false,
  });
  const [isSavingNotifications, setIsSavingNotifications] = useState(false);

  const [preferences, setPreferences] = useState({
    defaultView: 'overview',
    autoArchive: true,
    publicProfile: true,
    allowReferrals: true,
  });

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
        'Basic branding',
      ],
      upgradeText: 'Upgrade to Starter for more',
      color: 'gray',
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
        'Basic custom domains',
      ],
      upgradeText: 'Upgrade to Growth for more',
      color: 'blue',
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
        'Custom branding',
      ],
      upgradeText: 'Upgrade to Pro for unlimited',
      color: 'indigo',
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
        'Priority feature requests',
      ],
      upgradeText: 'You have the best plan!',
      color: 'purple',
    },
  } as const;

  // Initialize metrics with defaults
  const [metrics, setMetrics] = useState({
    activeWaitlists: 0,
    totalSignups: 0,
    conversionRate: 0,
    plan: 'FREE' as keyof typeof planConfigs,
  });

  // Get current plan config
  const currentPlan = planConfigs[metrics.plan] || planConfigs.FREE;
  const [lastUpdate, setLastUpdate] = useState(0); // Used to force re-renders
  const [usage, setUsage] = useState({
    waitlistUsage: 0,
    signupUsage: 0,
    storageUsage: 0,
    lastBillingDate: new Date().toISOString().split('T')[0],
    nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  });

  // Modal state for Account Security
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [show2FA, setShow2FA] = useState(false);
  const [showSessions, setShowSessions] = useState(false);

  // Active Sessions state
  type SessionInfo = {
    id: string;
    lastActiveAt: number | null;
    userAgent: string | null;
    ipAddress: string | null;
    isCurrent: boolean;
  };
  const [sessions, setSessions] = useState<SessionInfo[]>([]);
  const [isLoadingSessions, setIsLoadingSessions] = useState(false);
  const [revokingSessionId, setRevokingSessionId] = useState<string | null>(null);

  // Referral state
  const [referralInfo, setReferralInfo] = useState<{
    referralLink: string;
    referralCode: string;
    referralCount: number;
    rewards: { name: string; count: number; reward: string }[];
    nextReward: {
      name: string;
      count: number;
      reward: string;
      referralsToNext: number;
      progress: number;
      message: string;
    } | null;
    progress: number;
    topReferrer: boolean;
  } | null>(null);
  const [referralLoading, setReferralLoading] = useState(true);
  const [referralError, setReferralError] = useState<string | null>(null);

  const prevRewardsCount = useRef<number>(0);

  // Fetch profile and preferences data on component mount
  useEffect(() => {
    /**
     * Fetches and processes user profile and waitlist preferences data asynchronously.
     *
     * This function first checks if a user is present. If not, it returns immediately.
     * It sets the loading state to true and fetches both the profile and preferences in parallel.
     * Upon receiving responses, it processes each response:
     * - For the profile, it updates form data with relevant fields from the profile data or default values.
     * - For preferences, it updates waitlist preferences with data from the preferences response or default values.
     * If any error occurs during fetching or processing, it logs the error and shows a toast notification.
     * Finally, it sets the loading state to false regardless of the outcome.
     */
    const fetchData = async () => {
      if (!user) return;
      setIsLoading(true);
      try {
        // Fetch both profile and preferences in parallel
        const [profileRes, prefsRes] = await Promise.all([
          fetch('/api/account/profile'),
          fetch('/api/account/waitlist-preferences'),
        ]);

        // Handle profile response
        if (profileRes.ok) {
          const profileData = await profileRes.json();
          setFormData((prev) => ({
            ...prev,
            name: profileData.name || '',
            email: profileData.email || user.emailAddresses[0]?.emailAddress || '',
            company: profileData.company || '',
            website: profileData.website || '',
            bio: profileData.bio || '',
            timezone: profileData.timezone || 'UTC',
          }));
        }

        // Handle waitlist preferences response
        if (prefsRes.ok) {
          const prefsData = await prefsRes.json();
          setWaitlistPrefs((prev) => ({
            ...prev,
            ...prefsData,
            maxSubscribers: prefsData.maxSubscribers || 1000,
          }));
        }
      } catch (error) {
        console.error('Error loading data:', error);
        toast({
          title: 'Error',
          description: 'Failed to load profile data',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [user, toast]);

  // Confetti on milestone unlock
  useEffect(() => {
    if (referralInfo && referralInfo.rewards) {
      if (referralInfo.rewards.length > prevRewardsCount.current) {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.7 },
        });
      }
      prevRewardsCount.current = referralInfo.rewards.length;
    }
  }, [referralInfo?.rewards?.length]);

  // Handle form input changes with null check
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value ?? '', // Ensure value is never null
    }));
  };

  // Handle timezone select change
  const handleTimezoneChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      timezone: value,
    }));
  };

  // Handle profile form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const response = await fetch('/api/account/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const data = await response.json();

      // Update form with potentially sanitized data from server
      setFormData((prev) => ({
        ...prev,
        ...data,
      }));

      // Show success message
      toast({
        title: 'Success',
        description: 'Your profile has been updated',
      });

      // Refresh the page to ensure all data is up to date
      router.refresh();
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to update profile. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Handle waitlist preferences change
  const handlePrefsChange = (field: keyof WaitlistPreferences, value: any) => {
    setWaitlistPrefs((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle waitlist preferences submission
  const handleSavePrefs = async () => {
    setIsSavingPrefs(true);

    try {
      const response = await fetch('/api/account/waitlist-preferences', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(waitlistPrefs),
      });

      if (!response.ok) {
        throw new Error('Failed to update waitlist preferences');
      }

      const data = await response.json();

      // Update prefs with potentially sanitized data from server
      setWaitlistPrefs((prev) => ({
        ...prev,
        ...data,
      }));

      // Show success message
      toast({
        title: 'Success',
        description: 'Your waitlist preferences have been updated',
      });
    } catch (error) {
      console.error('Error updating waitlist preferences:', error);
      toast({
        title: 'Error',
        description: 'Failed to update waitlist preferences. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSavingPrefs(false);
    }
  };

  // Fetch notification preferences on component mount
  const fetchNotificationPreferences = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/account/notification-preferences', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setNotifications((prev) => ({
        ...prev,
        ...data,
      }));
    } catch (error) {
      console.error('Error fetching notification preferences:', error);
      toast({
        title: 'Error',
        description:
          'Failed to load notification preferences. Please refresh the page to try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Save notification preferences
  const saveNotificationPreferences = async () => {
    if (isSavingNotifications) return;

    setIsSavingNotifications(true);
    try {
      const response = await fetch('/api/account/notification-preferences', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(notifications),
        cache: 'no-store',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to update notification preferences');
      }

      const updatedPrefs = await response.json();

      // Update local state with the server response
      setNotifications(updatedPrefs);

      toast({
        title: 'Success',
        description: 'Your notification preferences have been updated',
      });

      return true;
    } catch (error) {
      console.error('Error updating notification preferences:', error);
      toast({
        title: 'Error',
        description:
          error instanceof Error ? error.message : 'Failed to update notification preferences',
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsSavingNotifications(false);
    }
  };

  // Fetch metrics on component mount and when the plan changes
  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/account/metrics', {
          cache: 'no-store', // Prevent caching to get fresh data
        });

        if (response.ok) {
          const data = await response.json();

          // Ensure we have a valid plan from the server
          const validPlan =
            data.plan && Object.keys(planConfigs).includes(data.plan)
              ? (data.plan as keyof typeof planConfigs)
              : 'FREE';

          setMetrics({
            activeWaitlists: data.activeWaitlists || 0,
            totalSignups: data.totalSignups || 0,
            conversionRate: data.conversionRate || 0,
            plan: validPlan,
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
    fetchNotificationPreferences();

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
  const handleNotificationToggle = async (key: keyof typeof notifications) => {
    // Create the new state
    const newValue = !notifications[key];
    const newNotifications = {
      ...notifications,
      [key]: newValue,
    };

    // If turning off email, also turn off all email-based notifications
    if (key === 'email' && !newValue) {
      Object.keys(newNotifications).forEach((k) => {
        if (k !== 'email') {
          newNotifications[k as keyof typeof notifications] = false;
        }
      });
    }

    // Update local state immediately for better UX
    setNotifications(newNotifications);

    // Save to the server
    try {
      await saveNotificationPreferences();
    } catch (error) {
      // Revert the UI if save fails
      setNotifications((prev) => ({
        ...prev,
        [key]: !newValue, // Revert the toggle
      }));
    }
  };

  // Fetch sessions when modal opens
  useEffect(() => {
    if (!showSessions || !user) return;
    let isMounted = true;
    setIsLoadingSessions(true);
    user
      .getSessions()
      .then((clerkSessions) => {
        if (!isMounted) return;
        setSessions(
          clerkSessions.map((s) => ({
            id: s.id,
            lastActiveAt: s.lastActiveAt
              ? typeof s.lastActiveAt === 'string'
                ? Date.parse(s.lastActiveAt)
                : s.lastActiveAt instanceof Date
                  ? s.lastActiveAt.getTime()
                  : null
              : null,
            userAgent: s.latestActivity?.browserName
              ? `${s.latestActivity.browserName}${s.latestActivity.deviceType ? ' (' + s.latestActivity.deviceType + ')' : ''}`
              : 'Unknown device',
            ipAddress: s.latestActivity?.ipAddress || null,
            isCurrent: currentSession?.id === s.id,
          })),
        );
      })
      .catch(() => {
        if (isMounted) {
          toast({
            title: 'Error',
            description: 'Failed to load sessions',
            variant: 'destructive',
          });
        }
      })
      .finally(() => {
        if (isMounted) setIsLoadingSessions(false);
      });
    return () => {
      isMounted = false;
    };
  }, [showSessions, user, currentSession, toast]);

  // Revoke session handler
  const handleRevokeSession = async (sessionId: string) => {
    setRevokingSessionId(sessionId);
    try {
      const clerkSessions = await user?.getSessions();
      const sessionToRevoke = clerkSessions?.find((s) => s.id === sessionId);
      if (!sessionToRevoke) throw new Error('Session not found');
      await sessionToRevoke.revoke();
      setSessions((prev) => prev.filter((s) => s.id !== sessionId));
      toast({
        title: 'Session revoked',
        description: 'The session has been signed out.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to revoke session',
        variant: 'destructive',
      });
    } finally {
      setRevokingSessionId(null);
    }
  };

  useEffect(() => {
    /**
     * Fetches referral information from the server and updates the state accordingly.
     *
     * This function sets the loading state to true, attempts to fetch referral data,
     * and handles any errors that occur during the process. It updates the referral
     * info or error message in the state based on the response and ensures the loading
     * state is set back to false regardless of the outcome.
     */
    const fetchReferral = async () => {
      setReferralLoading(true);
      setReferralError(null);
      try {
        const res = await fetch('/api/account/referral');
        if (!res.ok) throw new Error('Failed to fetch referral info');
        const data = await res.json();
        setReferralInfo(data);
      } catch (err: any) {
        setReferralError(err.message || 'Error fetching referral info');
      } finally {
        setReferralLoading(false);
      }
    };
    fetchReferral();
  }, []);

  /**
   * Copies the referral link to the clipboard and shows a success notification.
   */
  const copyReferralLink = () => {
    if (referralInfo?.referralLink) {
      navigator.clipboard.writeText(referralInfo.referralLink);
      toast({ title: 'Copied!', description: 'Referral link copied to clipboard.' });
    }
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
                <Badge
                  className={`ml-2 bg-gradient-to-r from-${currentPlan.color}-600 to-${currentPlan.color === 'gray' ? 'gray' : 'purple'}-600 text-white`}
                >
                  {metrics.plan === 'PRO' && <Crown className="w-3 h-3 mr-1" />}
                  {currentPlan.name.toUpperCase()}
                </Badge>
              </CardTitle>
              <CardDescription className="mt-1">
                {metrics.plan !== 'FREE' ? (
                  <>
                    Next billing date: {usage.nextBillingDate} •
                    <Button
                      variant="link"
                      className="h-auto p-0 ml-1 text-indigo-600"
                    >
                      Manage subscription
                    </Button>
                  </>
                ) : (
                  <span>Start your free trial today!</span>
                )}
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <TrendingUp className="h-4 w-4" />
                Usage Analytics
              </Button>
              {nextPlan && (
                <Button
                  variant="default"
                  size="sm"
                  className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90"
                >
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
              <div
                className={`flex items-center gap-3 p-4 bg-gradient-to-br from-${currentPlan.color}-50 to-white rounded-lg border border-${currentPlan.color}-100`}
              >
                <div className={`p-2 bg-${currentPlan.color}-100 rounded-lg`}>
                  <Users className={`h-6 w-6 text-${currentPlan.color}-600`} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-medium text-gray-700">Active Waitlists</p>
                    <span
                      className={`text-xs bg-${currentPlan.color}-100 text-${currentPlan.color}-800 px-2 py-0.5 rounded-full`}
                    >
                      {(metrics.activeWaitlists || 0).toLocaleString()} /{' '}
                      {currentPlan.maxWaitlists.toLocaleString()}
                    </span>
                  </div>
                  <div className="mt-1">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`bg-${currentPlan.color}-600 h-2 rounded-full`}
                        style={{
                          width: `${Math.min(
                            100,
                            (Number(metrics.activeWaitlists || 0) / currentPlan.maxWaitlists) * 100,
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {Math.max(0, currentPlan.maxWaitlists - Number(metrics.activeWaitlists || 0))}{' '}
                    waitlists remaining
                    {metrics.plan !== 'PRO' && nextPlan && (
                      <Button
                        variant="link"
                        className="h-auto p-0 ml-1 text-blue-600 text-xs"
                      >
                        ({currentPlan.upgradeText})
                      </Button>
                    )}
                  </p>
                </div>
              </div>

              <div
                className={
                  'flex items-center gap-3 p-4 bg-gradient-to-br from-green-50 to-white rounded-lg border border-green-100'
                }
              >
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-medium text-gray-700">Monthly Signups</p>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                      {(metrics.totalSignups || 0).toLocaleString()} /{' '}
                      {currentPlan.maxSignups.toLocaleString()}
                    </span>
                  </div>
                  <div className="mt-1">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{
                          width: `${Math.min(
                            100,
                            (Number(metrics.totalSignups || 0) / currentPlan.maxSignups) * 100,
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {Math.max(
                      0,
                      currentPlan.maxSignups - Number(metrics.totalSignups || 0),
                    ).toLocaleString()}{' '}
                    signups remaining
                    {metrics.plan !== 'PRO' && nextPlan && (
                      <Button
                        variant="link"
                        className="h-auto p-0 ml-1 text-blue-600 text-xs"
                      >
                        ({currentPlan.upgradeText})
                      </Button>
                    )}
                  </p>
                </div>
              </div>

              <div
                className={
                  'flex items-center gap-3 p-4 bg-gradient-to-br from-purple-50 to-white rounded-lg border border-purple-100'
                }
              >
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
            <div
              className={`bg-${currentPlan.color}-50 rounded-lg p-4 border border-${currentPlan.color}-100`}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium text-gray-900">{currentPlan.name} Plan Features</h3>
                {nextPlan && (
                  <Button
                    variant="link"
                    className="h-auto p-0 text-sm text-blue-600"
                  >
                    Compare plans <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {currentPlan.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start"
                  >
                    <CheckCircle2
                      className={`h-4 w-4 text-${currentPlan.color}-600 mt-0.5 mr-2 flex-shrink-0`}
                    />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
                {nextPlan && (
                  <div className="flex items-center mt-2 pt-2 border-t border-gray-200">
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">{currentPlan.upgradeText}</p>
                      <Button
                        variant="link"
                        className="h-auto p-0 text-sm font-medium text-blue-600"
                      >
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

      {/* Waitlist Preferences make sure they are updated and carried over to the waitlist page*/}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ListChecks className="h-5 w-5" />
            Waitlist Preferences
          </CardTitle>
          <CardDescription>Configure default settings for your waitlists</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-approve">Auto-approve Subscribers</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically approve new subscribers without manual review
                </p>
              </div>
              <Switch
                id="auto-approve"
                checked={waitlistPrefs.autoApproveSubscribers}
                onCheckedChange={(checked) => handlePrefsChange('autoApproveSubscribers', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-verification">Require Email Verification</Label>
                <p className="text-sm text-muted-foreground">
                  Require subscribers to verify their email address
                </p>
              </div>
              <Switch
                id="email-verification"
                checked={waitlistPrefs.requireEmailVerification}
                onCheckedChange={(checked) =>
                  handlePrefsChange('requireEmailVerification', checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive email notifications for new subscribers
                </p>
              </div>
              <Switch
                id="email-notifications"
                checked={waitlistPrefs.emailNotifications}
                onCheckedChange={(checked) => handlePrefsChange('emailNotifications', checked)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="default-limit">Default Waitlist Limit</Label>
              <Input
                id="default-limit"
                type="number"
                min="1"
                max="100"
                value={waitlistPrefs.defaultWaitlistLimit}
                onChange={(e) =>
                  handlePrefsChange('defaultWaitlistLimit', parseInt(e.target.value) || 1)
                }
                className="max-w-[120px]"
              />
              <p className="text-sm text-muted-foreground">
                Default maximum number of waitlists you can create
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="max-subscribers">Maximum Subscribers</Label>
              <Input
                id="max-subscribers"
                type="number"
                min="100"
                max="10000"
                step="100"
                value={waitlistPrefs.maxSubscribers}
                onChange={(e) =>
                  handlePrefsChange(
                    'maxSubscribers',
                    Math.min(10000, Math.max(100, parseInt(e.target.value) || 1000)),
                  )
                }
                className="max-w-[150px]"
              />
              <p className="text-sm text-muted-foreground">
                Maximum number of subscribers allowed per waitlist (100-10,000)
              </p>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button
              onClick={handleSavePrefs}
              disabled={isSavingPrefs}
            >
              {isSavingPrefs ? (
                <>
                  <span className="opacity-0">Saving...</span>
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                  </span>
                </>
              ) : (
                'Save Preferences'
              )}
            </Button>
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
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    disabled
                    className="bg-gray-100"
                  />
                  <p className="text-xs text-muted-foreground">
                    Contact support to change your email
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Company/Organization</Label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your company name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    name="website"
                    type="url"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="https://yourwebsite.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell us about yourself or your project..."
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select
                  value={formData.timezone}
                  onValueChange={handleTimezoneChange}
                >
                  <SelectTrigger className="max-w-md">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UTC">UTC (Coordinated Universal Time)</SelectItem>
                    <SelectItem value="America/New_York">EST (Eastern Standard Time)</SelectItem>
                    <SelectItem value="America/Los_Angeles">PST (Pacific Standard Time)</SelectItem>
                    <SelectItem value="America/Chicago">CST (Central Standard Time)</SelectItem>
                    <SelectItem value="America/Denver">MST (Mountain Standard Time)</SelectItem>
                    <SelectItem value="Europe/London">GMT (Greenwich Mean Time)</SelectItem>
                    <SelectItem value="Europe/Paris">CET (Central European Time)</SelectItem>
                    <SelectItem value="Asia/Tokyo">JST (Japan Standard Time)</SelectItem>
                    <SelectItem value="Australia/Sydney">AEST (Australian Eastern Time)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end pt-4">
                <Button
                  type="submit"
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <span className="opacity-0">Saving...</span>
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                      </span>
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </Button>
              </div>
            </form>
          )}
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
            {referralInfo?.topReferrer && (
              <Badge className="ml-2 bg-gradient-to-r from-yellow-400 to-pink-500 text-white animate-pulse">
                Top 1% Referrer
              </Badge>
            )}
          </CardTitle>
          <CardDescription>Share your referral link and earn rewards</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
            {referralLoading ? (
              <div className="text-sm text-muted-foreground">Loading referral info...</div>
            ) : referralError ? (
              <div className="text-sm text-red-500">{referralError}</div>
            ) : referralInfo ? (
              <>
                {/* Milestone Stepper */}
                <div className="mb-6">
                  <div className="flex items-center justify-between relative">
                    {/* Stepper Circles */}
                    {referralInfo.rewards.map((reward, idx) => (
                      <div
                        key={reward.count}
                        className="flex-1 flex flex-col items-center group"
                      >
                        <div className="relative z-10">
                          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold shadow-lg border-2 border-green-600">
                            <span>{idx + 1}</span>
                          </div>
                          <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-max text-xs text-green-700 font-semibold whitespace-nowrap">
                            {reward.name}
                          </div>
                          <div className="absolute left-1/2 -translate-x-1/2 mt-8 w-max text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity bg-white border rounded px-2 py-1 shadow-lg">
                            {reward.reward}
                          </div>
                        </div>
                        {/* Connector */}
                        {idx < referralInfo.rewards.length - 1 && (
                          <div
                            className="absolute top-1/2 left-full w-full h-1 bg-green-400 z-0"
                            style={{ width: '100%', height: 4, marginLeft: -8 }}
                          />
                        )}
                      </div>
                    ))}
                    {/* Next Reward Circle */}
                    {referralInfo.nextReward && (
                      <div className="flex-1 flex flex-col items-center group">
                        <div className="relative z-10">
                          <div className="w-8 h-8 rounded-full border-2 border-blue-400 flex items-center justify-center text-blue-600 font-bold bg-white animate-pulse shadow-lg">
                            <span>{referralInfo.rewards.length + 1}</span>
                          </div>
                          <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-max text-xs text-blue-700 font-semibold whitespace-nowrap">
                            {referralInfo.nextReward.name}
                          </div>
                          <div className="absolute left-1/2 -translate-x-1/2 mt-8 w-max text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity bg-white border rounded px-2 py-1 shadow-lg">
                            {referralInfo.nextReward.reward}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* Progress Bar Under Stepper */}
                  {referralInfo.nextReward && (
                    <div className="relative mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="absolute left-0 top-0 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full transition-all"
                        style={{ width: `${referralInfo.progress}%` }}
                      />
                    </div>
                  )}
                </div>
                {/* Urgency Message */}
                {referralInfo.nextReward && (
                  <div className="text-sm font-medium text-blue-700 mb-2">
                    {referralInfo.nextReward.message}
                  </div>
                )}
                {/* Unlocked Rewards List */}
                {referralInfo.rewards.length > 0 && (
                  <div className="mb-2 flex flex-wrap gap-2">
                    {referralInfo.rewards.map((reward) => (
                      <Badge
                        key={reward.count}
                        className="bg-green-600 text-white"
                      >
                        {reward.name}
                      </Badge>
                    ))}
                  </div>
                )}
                {/* Referral Link */}
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Your Referral Link</h4>
                  <Badge variant="secondary">
                    {referralInfo.referralCount} referral
                    {referralInfo.referralCount === 1 ? '' : 's'}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <code className="flex-1 p-2 bg-white rounded border text-sm overflow-x-auto">
                    {referralInfo.referralLink}
                  </code>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={copyReferralLink}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <SocialShareButtons
                  url={referralInfo.referralLink}
                  message={`🌟 WaitListNow Early Access! 🌟\n\n🚀 Skip the line and unlock rewards!\n\n👇 Tap to join:\n${referralInfo.referralLink}\n\n━━━━━━━━━━━━━━\n#WaitListNow #EarlyAccess`}
                  className="mt-2"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Share your link to earn rewards for successful referrals!
                </p>
              </>
            ) : null}
          </div>
        </CardContent>
      </Card>

      {/* Referral Badges Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-yellow-500" />
            Your Referral Badges
          </CardTitle>
          <CardDescription>Celebrate your referral achievements!</CardDescription>
        </CardHeader>
        <CardContent>
          {referralLoading ? (
            <div className="text-sm text-muted-foreground">Loading badges...</div>
          ) : referralError ? (
            <div className="text-sm text-red-500">{referralError}</div>
          ) : referralInfo && referralInfo.rewards.length > 0 ? (
            <div className="flex flex-wrap gap-4">
              {referralInfo.rewards.map((badge, idx) => (
                <div
                  key={badge.count}
                  className="flex flex-col items-center bg-gradient-to-br from-green-100 to-blue-100 border border-green-300 rounded-xl p-4 shadow-md min-w-[140px] max-w-[180px]"
                >
                  <div className="text-3xl mb-2">
                    {/* Use different icons or emojis for each tier if desired */}
                    {idx === 0 && '🥉'}
                    {idx === 1 && '🥈'}
                    {idx === 2 && '🥇'}
                    {idx === 3 && '🚀'}
                    {idx === 4 && '🎉'}
                    {idx === 5 && '👑'}
                    {idx === 6 && '🏆'}
                  </div>
                  <div className="font-bold text-green-700 text-lg mb-1">{badge.name}</div>
                  <div className="text-xs text-gray-600 text-center mb-1">{badge.reward}</div>
                  <div className="text-xs text-blue-700 font-semibold">{badge.count} referrals</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-gray-500">
              You haven&apos;t unlocked any referral badges yet. Start sharing your link to earn
              rewards!
            </div>
          )}
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
              <Label>Active Sessions</Label>
              <p className="text-sm text-muted-foreground">View and manage your active sessions</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSessions(true)}
            >
              View Sessions
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Active Sessions Modal */}
      <Dialog
        open={showSessions}
        onOpenChange={setShowSessions}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Active Sessions</DialogTitle>
            <DialogDescription>View and revoke your active sessions/devices.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2 min-h-[120px]">
            {isLoadingSessions ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
              </div>
            ) : sessions.length === 0 ? (
              <div className="text-center text-gray-500">No active sessions found.</div>
            ) : (
              <ul className="divide-y divide-gray-100">
                {sessions.map((session) => (
                  <li
                    key={session.id}
                    className="flex items-center justify-between py-2"
                  >
                    <div>
                      <div className="font-medium text-gray-900">
                        {session.isCurrent ? 'This device' : 'Other device'}
                        {session.isCurrent && (
                          <span className="ml-2 text-xs text-green-600">(Current)</span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500">
                        {session.userAgent || 'Unknown device'}
                        {session.ipAddress && <span className="ml-2">IP: {session.ipAddress}</span>}
                      </div>
                      <div className="text-xs text-gray-400">
                        Last active:{' '}
                        {session.lastActiveAt
                          ? new Date(session.lastActiveAt).toLocaleString()
                          : 'Unknown'}
                      </div>
                    </div>
                    {!session.isCurrent && (
                      <Button
                        size="sm"
                        variant="destructive"
                        disabled={revokingSessionId === session.id}
                        onClick={() => handleRevokeSession(session.id)}
                      >
                        {revokingSessionId === session.id ? 'Signing out...' : 'Sign out'}
                      </Button>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowSessions(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
