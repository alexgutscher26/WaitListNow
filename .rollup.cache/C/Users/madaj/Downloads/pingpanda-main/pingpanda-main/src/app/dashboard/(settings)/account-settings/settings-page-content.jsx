'use client';
import { __assign, __awaiter, __generator } from "tslib";
import React from "react";
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useUser } from '@clerk/nextjs';
import { Bell, Lock, User, CheckCircle2, Users, TrendingUp, Zap, Crown, AlertCircle, Copy, ExternalLink, ArrowUp, ArrowRight, ListChecks, } from 'lucide-react';
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
var AccountSettingsContent = function () {
    var _a;
    var router = useRouter();
    var toast = useToast().toast;
    var user = useUser().user;
    var _b = useState(true), isLoading = _b[0], setIsLoading = _b[1];
    var _c = useState(false), isSaving = _c[0], setIsSaving = _c[1];
    var _d = useState({
        name: '',
        email: ((_a = user === null || user === void 0 ? void 0 : user.emailAddresses[0]) === null || _a === void 0 ? void 0 : _a.emailAddress) || '',
        company: '',
        website: '',
        bio: '',
        timezone: 'UTC',
    }), formData = _d[0], setFormData = _d[1];
    var _e = useState({
        defaultWaitlistLimit: 1,
        autoApproveSubscribers: true,
        emailNotifications: true,
        maxSubscribers: 1000,
        requireEmailVerification: false,
    }), waitlistPrefs = _e[0], setWaitlistPrefs = _e[1];
    var _f = useState(false), isSavingPrefs = _f[0], setIsSavingPrefs = _f[1];
    var _g = useState({
        email: true,
        waitlistMilestones: true,
        dailyReports: true,
        weeklyDigest: true,
        signupAlerts: false,
        integrationUpdates: true,
        securityAlerts: true,
        marketing: false,
    }), notifications = _g[0], setNotifications = _g[1];
    var _h = useState(false), isSavingNotifications = _h[0], setIsSavingNotifications = _h[1];
    var _j = useState({
        defaultView: 'overview',
        autoArchive: false,
        publicProfile: true,
        allowReferrals: true,
    }), preferences = _j[0], setPreferences = _j[1];
    var _k = useState(false), isSaved = _k[0], setIsSaved = _k[1];
    // Plan configurations - must match Prisma schema enum values exactly
    var planConfigs = {
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
    };
    // Initialize metrics with defaults
    var _l = useState({
        activeWaitlists: 0,
        totalSignups: 0,
        conversionRate: 0,
        plan: 'FREE',
    }), metrics = _l[0], setMetrics = _l[1];
    // Get current plan config
    var currentPlan = planConfigs[metrics.plan] || planConfigs.FREE;
    var _m = useState(0), lastUpdate = _m[0], setLastUpdate = _m[1]; // Used to force re-renders
    var _o = useState({
        waitlistUsage: 0,
        signupUsage: 0,
        storageUsage: 0,
        lastBillingDate: new Date().toISOString().split('T')[0],
        nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    }), usage = _o[0], setUsage = _o[1];
    // Fetch profile and preferences data on component mount
    useEffect(function () {
        var fetchData = function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, profileRes, prefsRes, profileData_1, prefsData_1, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!user)
                            return [2 /*return*/];
                        setIsLoading(true);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 7, 8, 9]);
                        return [4 /*yield*/, Promise.all([
                                fetch('/api/account/profile'),
                                fetch('/api/account/waitlist-preferences'),
                            ])];
                    case 2:
                        _a = _b.sent(), profileRes = _a[0], prefsRes = _a[1];
                        if (!profileRes.ok) return [3 /*break*/, 4];
                        return [4 /*yield*/, profileRes.json()];
                    case 3:
                        profileData_1 = _b.sent();
                        setFormData(function (prev) {
                            var _a;
                            return (__assign(__assign({}, prev), { name: profileData_1.name || '', email: profileData_1.email || ((_a = user.emailAddresses[0]) === null || _a === void 0 ? void 0 : _a.emailAddress) || '', company: profileData_1.company || '', website: profileData_1.website || '', bio: profileData_1.bio || '', timezone: profileData_1.timezone || 'UTC' }));
                        });
                        _b.label = 4;
                    case 4:
                        if (!prefsRes.ok) return [3 /*break*/, 6];
                        return [4 /*yield*/, prefsRes.json()];
                    case 5:
                        prefsData_1 = _b.sent();
                        setWaitlistPrefs(function (prev) { return (__assign(__assign(__assign({}, prev), prefsData_1), { maxSubscribers: prefsData_1.maxSubscribers || 1000 })); });
                        _b.label = 6;
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        error_1 = _b.sent();
                        console.error('Error loading data:', error_1);
                        toast({
                            title: 'Error',
                            description: 'Failed to load profile data',
                            variant: 'destructive',
                        });
                        return [3 /*break*/, 9];
                    case 8:
                        setIsLoading(false);
                        return [7 /*endfinally*/];
                    case 9: return [2 /*return*/];
                }
            });
        }); };
        fetchData();
    }, [user, toast]);
    // Handle form input changes with null check
    var handleChange = function (e) {
        var _a = e.target, name = _a.name, value = _a.value;
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[name] = value !== null && value !== void 0 ? value : '', _a)));
        });
    };
    // Handle timezone select change
    var handleTimezoneChange = function (value) {
        setFormData(function (prev) { return (__assign(__assign({}, prev), { timezone: value })); });
    };
    // Handle profile form submission
    var handleSubmit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var response, data_1, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    setIsSaving(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, fetch('/api/account/profile', {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(formData),
                        })];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Failed to update profile');
                    }
                    return [4 /*yield*/, response.json()];
                case 3:
                    data_1 = _a.sent();
                    // Update form with potentially sanitized data from server
                    setFormData(function (prev) { return (__assign(__assign({}, prev), data_1)); });
                    // Show success message
                    toast({
                        title: 'Success',
                        description: 'Your profile has been updated',
                    });
                    // Refresh the page to ensure all data is up to date
                    router.refresh();
                    return [3 /*break*/, 6];
                case 4:
                    error_2 = _a.sent();
                    console.error('Error updating profile:', error_2);
                    toast({
                        title: 'Error',
                        description: 'Failed to update profile. Please try again.',
                        variant: 'destructive',
                    });
                    return [3 /*break*/, 6];
                case 5:
                    setIsSaving(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    // Handle waitlist preferences change
    var handlePrefsChange = function (field, value) {
        setWaitlistPrefs(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[field] = value, _a)));
        });
    };
    // Handle waitlist preferences submission
    var handleSavePrefs = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, data_2, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsSavingPrefs(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, fetch('/api/account/waitlist-preferences', {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(waitlistPrefs),
                        })];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Failed to update waitlist preferences');
                    }
                    return [4 /*yield*/, response.json()];
                case 3:
                    data_2 = _a.sent();
                    // Update prefs with potentially sanitized data from server
                    setWaitlistPrefs(function (prev) { return (__assign(__assign({}, prev), data_2)); });
                    // Show success message
                    toast({
                        title: 'Success',
                        description: 'Your waitlist preferences have been updated',
                    });
                    return [3 /*break*/, 6];
                case 4:
                    error_3 = _a.sent();
                    console.error('Error updating waitlist preferences:', error_3);
                    toast({
                        title: 'Error',
                        description: 'Failed to update waitlist preferences. Please try again.',
                        variant: 'destructive',
                    });
                    return [3 /*break*/, 6];
                case 5:
                    setIsSavingPrefs(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    // Fetch notification preferences on component mount
    var fetchNotificationPreferences = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, data_3, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 5]);
                    setIsLoading(true);
                    return [4 /*yield*/, fetch('/api/account/notification-preferences', {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            cache: 'no-store',
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("HTTP error! status: ".concat(response.status));
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    data_3 = _a.sent();
                    setNotifications(function (prev) { return (__assign(__assign({}, prev), data_3)); });
                    return [3 /*break*/, 5];
                case 3:
                    error_4 = _a.sent();
                    console.error('Error fetching notification preferences:', error_4);
                    toast({
                        title: 'Error',
                        description: 'Failed to load notification preferences. Please refresh the page to try again.',
                        variant: 'destructive',
                    });
                    return [3 /*break*/, 5];
                case 4:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    // Save notification preferences
    var saveNotificationPreferences = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, errorData, updatedPrefs, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (isSavingNotifications)
                        return [2 /*return*/];
                    setIsSavingNotifications(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, 7, 8]);
                    return [4 /*yield*/, fetch('/api/account/notification-preferences', {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(notifications),
                            cache: 'no-store',
                        })];
                case 2:
                    response = _a.sent();
                    if (Boolean(response.ok)) return [3 /*break*/, 4];
                    return [4 /*yield*/, response.json().catch(function () { return ({}); })];
                case 3:
                    errorData = _a.sent();
                    throw new Error(errorData.error || 'Failed to update notification preferences');
                case 4: return [4 /*yield*/, response.json()];
                case 5:
                    updatedPrefs = _a.sent();
                    // Update local state with the server response
                    setNotifications(updatedPrefs);
                    toast({
                        title: 'Success',
                        description: 'Your notification preferences have been updated',
                    });
                    return [2 /*return*/, true];
                case 6:
                    error_5 = _a.sent();
                    console.error('Error updating notification preferences:', error_5);
                    toast({
                        title: 'Error',
                        description: error_5 instanceof Error ? error_5.message : 'Failed to update notification preferences',
                        variant: 'destructive',
                    });
                    return [2 /*return*/, false];
                case 7:
                    setIsSavingNotifications(false);
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/];
            }
        });
    }); };
    // Fetch metrics on component mount and when the plan changes
    useEffect(function () {
        var fetchMetrics = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, data, validPlan, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, 6, 7]);
                        setIsLoading(true);
                        return [4 /*yield*/, fetch('/api/account/metrics', {
                                cache: 'no-store', // Prevent caching to get fresh data
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        validPlan = data.plan && Object.keys(planConfigs).includes(data.plan)
                            ? data.plan
                            : 'FREE';
                        setMetrics({
                            activeWaitlists: data.activeWaitlists || 0,
                            totalSignups: data.totalSignups || 0,
                            conversionRate: data.conversionRate || 0,
                            plan: validPlan,
                        });
                        // Force a re-render to ensure UI updates with new plan
                        setLastUpdate(Date.now());
                        return [3 /*break*/, 4];
                    case 3:
                        console.error('Failed to fetch metrics:', response.status);
                        _a.label = 4;
                    case 4: return [3 /*break*/, 7];
                    case 5:
                        error_6 = _a.sent();
                        console.error('Error fetching metrics:', error_6);
                        return [3 /*break*/, 7];
                    case 6:
                        setIsLoading(false);
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        fetchMetrics();
        fetchNotificationPreferences();
        // Refresh metrics every 30 seconds
        var interval = setInterval(fetchMetrics, 30000);
        return function () { return clearInterval(interval); };
    }, []);
    // Get the next plan for upgrade
    var getNextPlan = function () {
        var planOrder = ['FREE', 'STARTER', 'GROWTH', 'PRO'];
        var currentIndex = planOrder.indexOf(metrics.plan);
        return currentIndex < planOrder.length - 1 ? planOrder[currentIndex + 1] : null;
    };
    var nextPlan = getNextPlan();
    var nextPlanConfig = nextPlan ? planConfigs[nextPlan] : null;
    /**
     * Manages save process with loading and saved state transitions.
     */
    var handleSave = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsSaving(true);
                    // Simulate API call
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1500); })];
                case 1:
                    // Simulate API call
                    _a.sent();
                    setIsSaving(false);
                    setIsSaved(true);
                    setTimeout(function () { return setIsSaved(false); }, 3000);
                    return [2 /*return*/];
            }
        });
    }); };
    /**
     * Toggles the notification state for a specified key.
     */
    var handleNotificationToggle = function (key) { return __awaiter(void 0, void 0, void 0, function () {
        var newValue, newNotifications, error_7;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    newValue = !notifications[key];
                    newNotifications = __assign(__assign({}, notifications), (_a = {}, _a[key] = newValue, _a));
                    // If turning off email, also turn off all email-based notifications
                    if (key === 'email' && !newValue) {
                        Object.keys(newNotifications).forEach(function (k) {
                            if (k !== 'email') {
                                newNotifications[k] = false;
                            }
                        });
                    }
                    // Update local state immediately for better UX
                    setNotifications(newNotifications);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, saveNotificationPreferences()];
                case 2:
                    _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_7 = _b.sent();
                    // Revert the UI if save fails
                    setNotifications(function (prev) {
                        var _a;
                        return (__assign(__assign({}, prev), (_a = {}, _a[key] = !newValue, _a)));
                    });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    /**
     * Toggles the boolean value of a specified preference key.
     */
    var handlePreferenceToggle = function (key) {
        setPreferences(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[key] = !prev[key], _a)));
        });
    };
    /**
     * Copies a predefined referral link to the clipboard.
     */
    var copyReferralLink = function () {
        navigator.clipboard.writeText('https://yourwaitlist.com/ref/user123');
    };
    return (<div className="space-y-6">
      {/* Account Overview */}
      <Card className={"border-l-4 border-l-".concat(currentPlan.color, "-500")}>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                {currentPlan.name} Plan Dashboard
                <Badge className={"ml-2 bg-gradient-to-r from-".concat(currentPlan.color, "-600 to-").concat(currentPlan.color === 'gray' ? 'gray' : 'purple', "-600 text-white")}>
                  {metrics.plan === 'PRO' && <Crown className="w-3 h-3 mr-1"/>}
                  {currentPlan.name.toUpperCase()}
                </Badge>
              </CardTitle>
              <CardDescription className="mt-1">
                {metrics.plan !== 'FREE' ? (<>
                    Next billing date: {usage.nextBillingDate} •
                    <Button variant="link" className="h-auto p-0 ml-1 text-indigo-600">
                      Manage subscription
                    </Button>
                  </>) : (<span>Start your free trial today!</span>)}
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="gap-2">
                <TrendingUp className="h-4 w-4"/>
                Usage Analytics
              </Button>
              {nextPlan && (<Button variant="default" size="sm" className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90">
                  <ArrowUp className="h-4 w-4"/>
                  Upgrade to {nextPlan}
                </Button>)}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Usage Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className={"flex items-center gap-3 p-4 bg-gradient-to-br from-".concat(currentPlan.color, "-50 to-white rounded-lg border border-").concat(currentPlan.color, "-100")}>
                <div className={"p-2 bg-".concat(currentPlan.color, "-100 rounded-lg")}>
                  <Users className={"h-6 w-6 text-".concat(currentPlan.color, "-600")}/>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-medium text-gray-700">Active Waitlists</p>
                    <span className={"text-xs bg-".concat(currentPlan.color, "-100 text-").concat(currentPlan.color, "-800 px-2 py-0.5 rounded-full")}>
                      {(metrics.activeWaitlists || 0).toLocaleString()} /{' '}
                      {currentPlan.maxWaitlists.toLocaleString()}
                    </span>
                  </div>
                  <div className="mt-1">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className={"bg-".concat(currentPlan.color, "-600 h-2 rounded-full")} style={{
            width: "".concat(Math.min(100, (Number(metrics.activeWaitlists || 0) / currentPlan.maxWaitlists) * 100), "%"),
        }}/>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {Math.max(0, currentPlan.maxWaitlists - Number(metrics.activeWaitlists || 0))}{' '}
                    waitlists remaining
                    {metrics.plan !== 'PRO' && nextPlan && (<Button variant="link" className="h-auto p-0 ml-1 text-blue-600 text-xs">
                        ({currentPlan.upgradeText})
                      </Button>)}
                  </p>
                </div>
              </div>

              <div className={'flex items-center gap-3 p-4 bg-gradient-to-br from-green-50 to-white rounded-lg border border-green-100'}>
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-green-600"/>
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
                      <div className="bg-green-600 h-2 rounded-full" style={{
            width: "".concat(Math.min(100, (Number(metrics.totalSignups || 0) / currentPlan.maxSignups) * 100), "%"),
        }}/>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {Math.max(0, currentPlan.maxSignups - Number(metrics.totalSignups || 0)).toLocaleString()}{' '}
                    signups remaining
                    {metrics.plan !== 'PRO' && nextPlan && (<Button variant="link" className="h-auto p-0 ml-1 text-blue-600 text-xs">
                        ({currentPlan.upgradeText})
                      </Button>)}
                  </p>
                </div>
              </div>

              <div className={'flex items-center gap-3 p-4 bg-gradient-to-br from-purple-50 to-white rounded-lg border border-purple-100'}>
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Zap className="h-6 w-6 text-purple-600"/>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Conversion Rate</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {isLoading ? '...' : "".concat(Number(metrics.conversionRate || 0).toFixed(1), "%")}
                  </p>
                  <p className="text-xs text-gray-500">
                    {isLoading ? 'Calculating...' : 'Based on last 30 days'}
                  </p>
                </div>
              </div>
            </div>

            {/* Plan Features */}
            <div className={"bg-".concat(currentPlan.color, "-50 rounded-lg p-4 border border-").concat(currentPlan.color, "-100")}>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium text-gray-900">{currentPlan.name} Plan Features</h3>
                {nextPlan && (<Button variant="link" className="h-auto p-0 text-sm text-blue-600">
                    Compare plans <ArrowRight className="ml-1 h-4 w-4"/>
                  </Button>)}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {currentPlan.features.map(function (feature, index) { return (<div key={index} className="flex items-start">
                    <CheckCircle2 className={"h-4 w-4 text-".concat(currentPlan.color, "-600 mt-0.5 mr-2 flex-shrink-0")}/>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>); })}
                {nextPlan && (<div className="flex items-center mt-2 pt-2 border-t border-gray-200">
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">{currentPlan.upgradeText}</p>
                      <Button variant="link" className="h-auto p-0 text-sm font-medium text-blue-600">
                        Upgrade to {nextPlan} <ArrowRight className="ml-1 h-4 w-4"/>
                      </Button>
                    </div>
                  </div>)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Waitlist Preferences make sure they are updated and carried over to the waitlist page*/}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ListChecks className="h-5 w-5"/>
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
              <Switch id="auto-approve" checked={waitlistPrefs.autoApproveSubscribers} onCheckedChange={function (checked) { return handlePrefsChange('autoApproveSubscribers', checked); }}/>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-verification">Require Email Verification</Label>
                <p className="text-sm text-muted-foreground">
                  Require subscribers to verify their email address
                </p>
              </div>
              <Switch id="email-verification" checked={waitlistPrefs.requireEmailVerification} onCheckedChange={function (checked) {
            return handlePrefsChange('requireEmailVerification', checked);
        }}/>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive email notifications for new subscribers
                </p>
              </div>
              <Switch id="email-notifications" checked={waitlistPrefs.emailNotifications} onCheckedChange={function (checked) { return handlePrefsChange('emailNotifications', checked); }}/>
            </div>

            <div className="space-y-2">
              <Label htmlFor="default-limit">Default Waitlist Limit</Label>
              <Input id="default-limit" type="number" min="1" max="100" value={waitlistPrefs.defaultWaitlistLimit} onChange={function (e) {
            return handlePrefsChange('defaultWaitlistLimit', parseInt(e.target.value) || 1);
        }} className="max-w-[120px]"/>
              <p className="text-sm text-muted-foreground">
                Default maximum number of waitlists you can create
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="max-subscribers">Maximum Subscribers</Label>
              <Input id="max-subscribers" type="number" min="100" max="10000" step="100" value={waitlistPrefs.maxSubscribers} onChange={function (e) {
            return handlePrefsChange('maxSubscribers', Math.min(10000, Math.max(100, parseInt(e.target.value) || 1000)));
        }} className="max-w-[150px]"/>
              <p className="text-sm text-muted-foreground">
                Maximum number of subscribers allowed per waitlist (100-10,000)
              </p>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button onClick={handleSavePrefs} disabled={isSavingPrefs}>
              {isSavingPrefs ? (<>
                  <span className="opacity-0">Saving...</span>
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"/>
                  </span>
                </>) : ('Save Preferences')}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Profile Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5"/>
            Profile Information
          </CardTitle>
          <CardDescription>Update your account details and public profile</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (<div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"/>
            </div>) : (<form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Your full name" required/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" value={formData.email} disabled className="bg-gray-100"/>
                  <p className="text-xs text-muted-foreground">
                    Contact support to change your email
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Company/Organization</Label>
                  <Input id="company" name="company" value={formData.company} onChange={handleChange} placeholder="Your company name"/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" name="website" type="url" value={formData.website} onChange={handleChange} placeholder="https://yourwebsite.com"/>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" name="bio" value={formData.bio} onChange={handleChange} placeholder="Tell us about yourself or your project..." className="min-h-[100px]"/>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select value={formData.timezone} onValueChange={handleTimezoneChange}>
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
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? (<>
                      <span className="opacity-0">Saving...</span>
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"/>
                      </span>
                    </>) : ('Save Changes')}
                </Button>
              </div>
            </form>)}
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5"/>
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
            <Switch id="email-notifications" checked={notifications.email} onCheckedChange={function () { return handleNotificationToggle('email'); }}/>
          </div>

          <div className="ml-4 space-y-4 border-l-2 border-gray-100 pl-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="signup-alerts">Real-time Signup Alerts</Label>
                <p className="text-sm text-muted-foreground">Get notified for each new signup</p>
              </div>
              <Switch id="signup-alerts" checked={notifications.signupAlerts} onCheckedChange={function () { return handleNotificationToggle('signupAlerts'); }} disabled={!notifications.email}/>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="waitlist-milestones">Waitlist Milestones</Label>
                <p className="text-sm text-muted-foreground">
                  Celebrate reaching signup milestones
                </p>
              </div>
              <Switch id="waitlist-milestones" checked={notifications.waitlistMilestones} onCheckedChange={function () { return handleNotificationToggle('waitlistMilestones'); }} disabled={!notifications.email}/>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="daily-reports">Daily Reports</Label>
                <p className="text-sm text-muted-foreground">
                  Daily summary of your waitlist activity
                </p>
              </div>
              <Switch id="daily-reports" checked={notifications.dailyReports} onCheckedChange={function () { return handleNotificationToggle('dailyReports'); }} disabled={!notifications.email}/>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="weekly-digest">Weekly Digest</Label>
                <p className="text-sm text-muted-foreground">Weekly analytics and insights</p>
              </div>
              <Switch id="weekly-digest" checked={notifications.weeklyDigest} onCheckedChange={function () { return handleNotificationToggle('weeklyDigest'); }} disabled={!notifications.email}/>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="integration-updates">Integration Updates</Label>
              <p className="text-sm text-muted-foreground">
                Updates about third-party integrations
              </p>
            </div>
            <Switch id="integration-updates" checked={notifications.integrationUpdates} onCheckedChange={function () { return handleNotificationToggle('integrationUpdates'); }}/>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5 flex items-center gap-2">
              <Label htmlFor="security-alerts">Security Alerts</Label>
              <AlertCircle className="h-4 w-4 text-orange-500"/>
              <p className="text-sm text-muted-foreground">
                Important security notifications (recommended)
              </p>
            </div>
            <Switch id="security-alerts" checked={notifications.securityAlerts} onCheckedChange={function () { return handleNotificationToggle('securityAlerts'); }}/>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="marketing">Marketing Emails</Label>
              <p className="text-sm text-muted-foreground">
                Product updates and promotional content
              </p>
            </div>
            <Switch id="marketing" checked={notifications.marketing} onCheckedChange={function () { return handleNotificationToggle('marketing'); }}/>
          </div>
        </CardContent>
      </Card>

      {/* Referral Program */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5"/>
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
                <Copy className="h-4 w-4"/>
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
            <Lock className="h-5 w-5"/>
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
            <Button variant="outline" size="sm">
              Change Password
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
            </div>
            <Button variant="outline" size="sm">
              Set Up 2FA
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>API Keys</Label>
              <p className="text-sm text-muted-foreground">Manage your API access tokens</p>
            </div>
            <Button variant="outline" size="sm">
              <ExternalLink className="h-4 w-4 mr-2"/>
              Manage Keys
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Active Sessions</Label>
              <p className="text-sm text-muted-foreground">View and manage your active sessions</p>
            </div>
            <Button variant="outline" size="sm">
              View Sessions
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">Changes are saved automatically</div>
        <div className="flex items-center gap-4">
          {isSaved && (<div className="flex items-center gap-2 text-sm text-green-600">
              <CheckCircle2 className="h-4 w-4"/>
              <span>Changes saved successfully!</span>
            </div>)}
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </div>);
};
/**
 * Renders account settings component once mounted.
 */
export var AccountSettings = function () {
    var _a = useState(false), isMounted = _a[0], setIsMounted = _a[1];
    useEffect(function () {
        setIsMounted(true);
    }, []);
    if (!isMounted) {
        return null;
    }
    return <AccountSettingsContent />;
};
//# sourceMappingURL=settings-page-content.jsx.map