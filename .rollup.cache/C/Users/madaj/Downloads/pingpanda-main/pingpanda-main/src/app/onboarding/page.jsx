'use client';
import { __assign, __awaiter, __generator } from 'tslib';
import {
  AlertCircle,
  ArrowRight,
  Bell,
  Check,
  Copy,
  Eye,
  EyeOff,
  LinkIcon,
  Settings,
  Users,
  Zap,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';
import { useState, useEffect } from 'react';
import { onboardingCompleteSchema } from '@/lib/validations/onboarding';
var onboardingSteps = [
  {
    title: 'Welcome to WaitlistNow',
    description: "Let's get your waitlist and referral system up and running in minutes.",
    icon: <Zap className="h-8 w-8 text-blue-500" />,
    content: (
      <div className="space-y-6">
        <div className="text-center">
          <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-0.5">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
              <Zap className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          <p className="text-lg font-medium text-gray-700">Transform visitors into a community</p>
        </div>
        <div className="grid gap-4">
          {[
            {
              icon: '📝',
              title: 'Beautiful Forms',
              desc: 'Create stunning, conversion-optimized waitlist forms',
            },
            {
              icon: '🚀',
              title: 'Viral Growth',
              desc: 'Built-in referral system that grows your list automatically',
            },
            {
              icon: '📊',
              title: 'Analytics',
              desc: 'Track signups, referrals, and conversion metrics',
            },
          ].map(function (feature, index) {
            return (
              <div
                key={index}
                className="flex items-start gap-3 rounded-lg border border-gray-100 p-4 transition-all hover:border-blue-200 hover:bg-blue-50/50"
              >
                <span className="text-2xl">{feature.icon}</span>
                <div>
                  <h4 className="font-semibold text-gray-900">{feature.title}</h4>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    ),
  },
  {
    title: 'Set Up Your Waitlist',
    description: 'Customize your waitlist to match your brand and goals.',
    icon: <Settings className="h-8 w-8 text-blue-500" />,
    content: function (_a) {
      var formData = _a.formData,
        setFormData = _a.setFormData,
        _b = _a.errors,
        errors = _b === void 0 ? {} : _b;
      return (
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="waitlist-name"
                className="text-sm font-semibold text-gray-700"
              >
                Waitlist Name *
              </label>
              <input
                id="waitlist-name"
                type="text"
                className={'w-full rounded-lg border-2 p-3 transition-colors focus:outline-none focus:ring-0 '.concat(
                  errors.name
                    ? 'border-red-300 focus:border-red-500'
                    : 'border-gray-200 focus:border-blue-500',
                )}
                placeholder="e.g., Early Access"
                value={formData.name || ''}
                onChange={function (e) {
                  return setFormData(function (prev) {
                    return __assign(__assign({}, prev), { name: e.target.value });
                  });
                }}
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="description"
                className="text-sm font-semibold text-gray-700"
              >
                Description (Optional)
              </label>
              <textarea
                id="description"
                className="w-full rounded-lg border-2 border-gray-200 p-3 transition-colors focus:border-blue-500 focus:outline-none focus:ring-0 min-h-[100px]"
                placeholder="Tell people what they're signing up for"
                value={formData.description || ''}
                onChange={function (e) {
                  return setFormData(function (prev) {
                    return __assign(__assign({}, prev), { description: e.target.value });
                  });
                }}
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="website-url"
                className="text-sm font-semibold text-gray-700"
              >
                Your Website URL (Optional)
              </label>
              <input
                id="website-url"
                type="url"
                className={'w-full rounded-lg border-2 p-3 transition-colors focus:outline-none focus:ring-0 '.concat(
                  errors.websiteUrl
                    ? 'border-red-300 focus:border-red-500'
                    : 'border-gray-200 focus:border-blue-500',
                )}
                placeholder="https://yourapp.com"
                value={formData.websiteUrl || ''}
                onChange={function (e) {
                  return setFormData(function (prev) {
                    return __assign(__assign({}, prev), { websiteUrl: e.target.value });
                  });
                }}
              />
              {errors.websiteUrl && <p className="text-sm text-red-500">{errors.websiteUrl}</p>}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="redirect-url"
                className="text-sm font-semibold text-gray-700"
              >
                Thank You Page URL (Optional)
              </label>
              <input
                id="redirect-url"
                type="url"
                className={'w-full rounded-lg border-2 p-3 transition-colors focus:outline-none focus:ring-0 '.concat(
                  errors.redirectUrl
                    ? 'border-red-300 focus:border-red-500'
                    : 'border-gray-200 focus:border-blue-500',
                )}
                placeholder="https://yourapp.com/thank-you"
                value={formData.redirectUrl || ''}
                onChange={function (e) {
                  return setFormData(function (prev) {
                    return __assign(__assign({}, prev), { redirectUrl: e.target.value });
                  });
                }}
              />
              {errors.redirectUrl && <p className="text-sm text-red-500">{errors.redirectUrl}</p>}
              <p className="text-xs text-gray-500">
                Where should we send users after they sign up? Leave blank to show a success message
                on the same page.
              </p>
            </div>

            <div className="rounded-lg bg-blue-50 p-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500">
                  <Zap className="h-3 w-3 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900">Pro Tip</h4>
                  <p className="text-sm text-blue-700">
                    A clear, compelling waitlist name can increase signups by up to 40%!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    },
  },
  {
    title: 'Configure Referral System',
    description: 'Turn your waitlist into a viral growth engine.',
    icon: <Users className="h-8 w-8 text-blue-500" />,
    content: function (_a) {
      var _b, _c, _d, _e, _f, _g, _h, _j, _k;
      var formData = _a.formData,
        setFormData = _a.setFormData;
      return (
        <div className="space-y-6">
          <div className="rounded-lg border-2 border-gray-200 p-5 transition-all hover:border-blue-200">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">Enable Referral Rewards</h4>
                <p className="mt-1 text-sm text-gray-600">
                  Users move up the waitlist when they successfully refer friends
                </p>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <span className="sr-only">Enable referral rewards</span>
                <input
                  type="checkbox"
                  className="peer sr-only"
                  aria-label="Enable referral rewards"
                  checked={
                    ((_b = formData.settings) === null || _b === void 0
                      ? void 0
                      : _b.referralEnabled) || false
                  }
                  onChange={function (e) {
                    return setFormData(function (prev) {
                      return __assign(__assign({}, prev), {
                        settings: __assign(__assign({}, prev.settings || {}), {
                          referralEnabled: e.target.checked,
                        }),
                      });
                    });
                  }}
                />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 transition-all after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-500/20" />
              </label>
            </div>

            {((_c = formData.settings) === null || _c === void 0 ? void 0 : _c.referralEnabled) && (
              <div className="mt-4 space-y-4 pl-1">
                <div className="space-y-2">
                  <label
                    htmlFor="referral-reward"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Reward Type
                  </label>
                  <select
                    id="referral-reward"
                    className="w-full rounded-lg border-2 border-gray-200 p-3 transition-colors focus:border-blue-500 focus:outline-none focus:ring-0"
                    value={
                      ((_e =
                        (_d = formData.settings) === null || _d === void 0
                          ? void 0
                          : _d.referralReward) === null || _e === void 0
                        ? void 0
                        : _e.type) || 'position'
                    }
                    onChange={function (e) {
                      return setFormData(function (prev) {
                        var _a;
                        return __assign(__assign({}, prev), {
                          settings: __assign(__assign({}, prev.settings || {}), {
                            referralReward: __assign(
                              __assign(
                                {},
                                ((_a = prev.settings) === null || _a === void 0
                                  ? void 0
                                  : _a.referralReward) || {},
                              ),
                              { type: e.target.value },
                            ),
                          }),
                        });
                      });
                    }}
                  >
                    <option value="position">Move up waitlist position</option>
                    <option value="custom">Custom reward</option>
                  </select>
                </div>

                {((_g =
                  (_f = formData.settings) === null || _f === void 0
                    ? void 0
                    : _f.referralReward) === null || _g === void 0
                  ? void 0
                  : _g.type) === 'custom' && (
                  <div className="space-y-2">
                    <label
                      htmlFor="custom-reward"
                      className="text-sm font-semibold text-gray-700"
                    >
                      Custom Reward Message
                    </label>
                    <input
                      id="custom-reward"
                      type="text"
                      className="w-full rounded-lg border-2 border-gray-200 p-3 transition-colors focus:border-blue-500 focus:outline-none focus:ring-0"
                      placeholder="e.g., Get 10% off your first purchase"
                      value={
                        ((_j =
                          (_h = formData.settings) === null || _h === void 0
                            ? void 0
                            : _h.referralReward) === null || _j === void 0
                          ? void 0
                          : _j.message) || ''
                      }
                      onChange={function (e) {
                        return setFormData(function (prev) {
                          var currentSettings = prev.settings || {};
                          var currentReward = currentSettings.referralReward || {
                            type: 'position',
                          };
                          return __assign(__assign({}, prev), {
                            settings: __assign(__assign({}, currentSettings), {
                              referralReward: __assign(__assign({}, currentReward), {
                                message: e.target.value,
                              }),
                            }),
                          });
                        });
                      }}
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <label
                    htmlFor="referral-message"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Custom Referral Message (Optional)
                  </label>
                  <textarea
                    id="referral-message"
                    className="w-full rounded-lg border-2 border-gray-200 p-3 transition-colors focus:border-blue-500 focus:outline-none focus:ring-0"
                    rows={3}
                    placeholder="Join my waitlist and get early access!"
                    value={
                      ((_k = formData.settings) === null || _k === void 0
                        ? void 0
                        : _k.referralMessage) || ''
                    }
                    onChange={function (e) {
                      return setFormData(function (prev) {
                        return __assign(__assign({}, prev), {
                          settings: __assign(__assign({}, prev.settings || {}), {
                            referralMessage: e.target.value,
                          }),
                        });
                      });
                    }}
                  />
                  <p className="text-xs text-gray-500">
                    Customize the message your users see when sharing their referral link
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="rounded-lg bg-blue-50 p-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500">
                <Zap className="h-3 w-3 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-blue-900">Pro Tip</h4>
                <p className="text-sm text-blue-700">
                  Enabling referrals can increase your signup rate by up to 50% through viral
                  growth!
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    },
  },
  {
    title: 'Get Your Embed Code',
    description: 'Add your waitlist to your website with simple copy-paste.',
    icon: <LinkIcon className="h-8 w-8 text-blue-500" />,
    content: function (props) {
      var formData = props.formData,
        setFormData = props.setFormData,
        _a = props.showPreview,
        showPreview = _a === void 0 ? false : _a,
        setShowPreview = props.setShowPreview,
        _b = props.copied,
        copied = _b === void 0 ? null : _b,
        setCopied = props.setCopied;
      var waitlistId = 'wl_'.concat(Math.random().toString(36).substr(2, 9));
      var handleCopy = function (text, type) {
        navigator.clipboard.writeText(text);
        if (setCopied) {
          setCopied(type);
          setTimeout(function () {
            return setCopied(null);
          }, 2000);
        }
      };
      return (
        <div className="space-y-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Integration Options</h3>
              <button
                onClick={function () {
                  return setShowPreview === null || setShowPreview === void 0
                    ? void 0
                    : setShowPreview(!showPreview);
                }}
                className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 transition-colors"
              >
                {showPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                {showPreview ? 'Hide' : 'Show'} Preview
              </button>
            </div>

            {/* Terms and Conditions Section */}
            <div className="pt-4 border-t border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Terms & Conditions</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      checked={formData.termsAccepted}
                      onChange={function (e) {
                        return setFormData(function (prev) {
                          return __assign(__assign({}, prev), { termsAccepted: e.target.checked });
                        });
                      }}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="terms"
                      className="font-medium text-gray-700"
                    >
                      I agree to the{' '}
                      <a
                        href="/terms"
                        className="text-blue-600 hover:text-blue-500"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Terms of Service
                      </a>{' '}
                      and{' '}
                      <a
                        href="/privacy"
                        className="text-blue-600 hover:text-blue-500"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Privacy Policy
                      </a>
                    </label>
                    <p className="text-gray-500">
                      You must accept the terms and conditions to continue.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="email-notifications"
                      name="email-notifications"
                      type="checkbox"
                      checked={formData.emailNotifications}
                      onChange={function (e) {
                        return setFormData(function (prev) {
                          return __assign(__assign({}, prev), {
                            emailNotifications: e.target.checked,
                          });
                        });
                      }}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="email-notifications"
                      className="font-medium text-gray-700"
                    >
                      Receive important email notifications
                    </label>
                    <p className="text-gray-500">
                      Get updates about your waitlist and important account information.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="marketing-emails"
                      name="marketing-emails"
                      type="checkbox"
                      checked={formData.marketingEmails}
                      onChange={function (e) {
                        return setFormData(function (prev) {
                          return __assign(__assign({}, prev), {
                            marketingEmails: e.target.checked,
                          });
                        });
                      }}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="marketing-emails"
                      className="font-medium text-gray-700"
                    >
                      Subscribe to marketing emails
                    </label>
                    <p className="text-gray-500">Get tips, product updates, and special offers.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {showPreview && (
            <div className="rounded-lg border-2 border-dashed border-gray-300 p-6 bg-gray-50 animate-in slide-in-from-top-2 duration-300">
              <div className="text-center">
                <div className="inline-block rounded-lg bg-white border border-gray-200 p-6 shadow-sm">
                  <h4 className="font-semibold text-gray-900 mb-2">Join the Waitlist</h4>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm font-medium hover:bg-blue-600">
                      Join
                    </button>
                  </div>
                  <p className="text-xs text-gray-500">✨ Get early access + exclusive perks</p>
                </div>
                <p className="text-sm text-gray-600 mt-2">This is how your waitlist will appear</p>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div className="rounded-lg bg-gray-50 p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900">
                  1. Add to your website's &lt;head&gt;
                </h4>
                <button
                  onClick={function () {
                    return handleCopy(
                      '<script src="'
                        .concat(
                          typeof window !== 'undefined'
                            ? window.location.origin
                            : 'https://yoursite.com',
                          '/embed.js" data-waitlist="',
                        )
                        .concat(waitlistId, '" async></script>'),
                      'script',
                    );
                  }}
                  className={'flex items-center gap-1 px-3 py-1 rounded-md text-sm font-medium transition-colors '.concat(
                    copied === 'script'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700',
                  )}
                >
                  {copied === 'script' ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                  {copied === 'script' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <pre className="overflow-x-auto rounded-md bg-gray-900 p-3 text-sm">
                <code className="text-green-400">
                  {'<script src="'
                    .concat(
                      typeof window !== 'undefined'
                        ? window.location.origin
                        : 'https://yoursite.com',
                      '/embed.js" data-waitlist="',
                    )
                    .concat(waitlistId, '" async></script>')}
                </code>
              </pre>
            </div>

            <div className="rounded-lg bg-gray-50 p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900">2. Add where you want the form</h4>
                <button
                  onClick={function () {
                    return handleCopy('<div data-waitlist-embed></div>', 'div');
                  }}
                  className={'flex items-center gap-1 px-3 py-1 rounded-md text-sm font-medium transition-colors '.concat(
                    copied === 'div'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700',
                  )}
                >
                  {copied === 'div' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  {copied === 'div' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <pre className="overflow-x-auto rounded-md bg-gray-900 p-3 text-sm">
                <code className="text-blue-400">{'<div data-waitlist-embed></div>'}</code>
              </pre>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <Bell className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-sm font-medium text-blue-900">All set!</p>
              <p className="text-sm text-blue-700">
                Your waitlist is ready to start collecting signups immediately.
              </p>
            </div>
          </div>
        </div>
      );
    },
  },
];
export default function ImprovedOnboarding() {
  var _this = this;
  var _a = useState(0),
    currentStep = _a[0],
    setCurrentStep = _a[1];
  var _b = useState(false),
    isLoading = _b[0],
    setIsLoading = _b[1];
  var _c = useState(null),
    error = _c[0],
    setError = _c[1];
  var _d = useState({
      name: '',
      description: '',
      websiteUrl: '',
      redirectUrl: '',
      customFields: [],
      style: {
        buttonText: 'Join Waitlist',
        buttonColor: '#3b82f6',
        buttonTextColor: '#ffffff',
        backgroundColor: '#ffffff',
        textColor: '#1f2937',
        borderRadius: 8,
        fontFamily: 'Inter',
        showLabels: true,
        formLayout: 'stacked',
      },
      settings: {
        emailVerification: true,
        allowDuplicates: false,
        referralEnabled: false,
      },
      termsAccepted: false,
      emailNotifications: true,
      marketingEmails: false,
    }),
    formData = _d[0],
    setFormData = _d[1];
  var _e = useState({}),
    errors = _e[0],
    setErrors = _e[1];
  var _f = useState(false),
    showPreview = _f[0],
    setShowPreview = _f[1];
  var _g = useState(null),
    copied = _g[0],
    setCopied = _g[1];
  var currentStepData = onboardingSteps[currentStep];
  var progress = ((currentStep + 1) / onboardingSteps.length) * 100;
  var _h = useState(true),
    canProceed = _h[0],
    setCanProceed = _h[1];
  // Update canProceed when formData or currentStep changes
  useEffect(
    function () {
      if (currentStep === 0) {
        // First step is welcome screen, always allow proceeding
        setCanProceed(true);
      } else if (currentStep === 1) {
        // Second step requires name
        var hasName = Boolean(formData.name && formData.name.length >= 3);
        setCanProceed(hasName);
      } else if (currentStep === onboardingSteps.length - 1) {
        // On the last step, can proceed if terms are accepted
        setCanProceed(Boolean(formData.termsAccepted));
      } else {
        // For other steps, can proceed by default
        setCanProceed(true);
      }
    },
    [formData, currentStep],
  );
  // Update errors when form data changes
  useEffect(
    function () {
      if (currentStep === 1) {
        // Only validate on the second step (Set Up Your Waitlist)
        var newErrors = {};
        if (!formData.name) {
          newErrors.name = 'Waitlist name is required';
        } else if (formData.name.length < 3) {
          newErrors.name = 'Waitlist name must be at least 3 characters';
        }
        if (formData.websiteUrl && !/^https?:\/\//.test(formData.websiteUrl)) {
          newErrors.websiteUrl = 'Please enter a valid URL (starting with http:// or https://)';
        }
        if (formData.redirectUrl && !/^https?:\/\//.test(formData.redirectUrl)) {
          newErrors.redirectUrl = 'Please enter a valid URL (starting with http:// or https://)';
        }
        setErrors(newErrors);
      } else {
        // Clear errors for other steps
        setErrors({});
      }
    },
    [formData, currentStep],
  );
  var router = useRouter();
  var validateCurrentStep = function () {
    if (currentStep === 0) {
      // Welcome screen is always valid
      return true;
    } else if (currentStep === 1) {
      // Second step requires name
      var newErrors = {};
      var hasErrors = false;
      if (!formData.name) {
        newErrors.name = 'Waitlist name is required';
        hasErrors = true;
      } else if (formData.name.length < 3) {
        newErrors.name = 'Waitlist name must be at least 3 characters';
        hasErrors = true;
      }
      if (formData.websiteUrl && !/^https?:\/\//.test(formData.websiteUrl)) {
        newErrors.websiteUrl = 'Please enter a valid URL (starting with http:// or https://)';
        hasErrors = true;
      }
      if (formData.redirectUrl && !/^https?:\/\//.test(formData.redirectUrl)) {
        newErrors.redirectUrl = 'Please enter a valid URL (starting with http:// or https://)';
        hasErrors = true;
      }
      setErrors(newErrors);
      return !hasErrors;
    }
    return true;
  };
  var handleNext = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var isValid,
        submissionData,
        result,
        errorMessages,
        response,
        errorData,
        error_1,
        errorMessage;
      var _a, _b, _c, _d, _e, _f, _g, _h;
      return __generator(this, function (_j) {
        switch (_j.label) {
          case 0:
            isValid = validateCurrentStep();
            if (!isValid) {
              console.log('Validation failed, cannot proceed');
              return [2 /*return*/];
            }
            console.log('Validation passed, proceeding to next step');
            if (!(currentStep === onboardingSteps.length - 1)) return [3 /*break*/, 8];
            setIsLoading(true);
            setError('');
            _j.label = 1;
          case 1:
            _j.trys.push([1, 5, 6, 7]);
            // Validate all required fields before submission
            if (!formData.termsAccepted) {
              throw new Error('You must accept the terms and conditions');
            }
            submissionData = __assign(
              {
                name: formData.name,
                description: formData.description,
                websiteUrl: formData.websiteUrl || '',
                redirectUrl: formData.redirectUrl || '',
                customFields: formData.customFields || [],
                style: formData.style || {},
                settings: __assign(
                  __assign(
                    {
                      emailVerification:
                        (_b =
                          (_a = formData.settings) === null || _a === void 0
                            ? void 0
                            : _a.emailVerification) !== null && _b !== void 0
                          ? _b
                          : true,
                      allowDuplicates:
                        (_d =
                          (_c = formData.settings) === null || _c === void 0
                            ? void 0
                            : _c.allowDuplicates) !== null && _d !== void 0
                          ? _d
                          : false,
                      referralEnabled:
                        (_f =
                          (_e = formData.settings) === null || _e === void 0
                            ? void 0
                            : _e.referralEnabled) !== null && _f !== void 0
                          ? _f
                          : false,
                    },
                    ((_g = formData.settings) === null || _g === void 0
                      ? void 0
                      : _g.referralReward) && {
                      referralReward: formData.settings.referralReward,
                    },
                  ),
                  ((_h = formData.settings) === null || _h === void 0
                    ? void 0
                    : _h.referralMessage) && {
                    referralMessage: formData.settings.referralMessage,
                  },
                ),
                termsAccepted: formData.termsAccepted,
                emailNotifications: formData.emailNotifications,
                marketingEmails: formData.marketingEmails,
              },
              formData.launchDate && { launchDate: formData.launchDate },
            );
            result = onboardingCompleteSchema.safeParse(submissionData);
            if (!result.success) {
              errorMessages = result.error.errors
                .map(function (err) {
                  return err.message;
                })
                .join('\n');
              throw new Error(errorMessages);
            }
            return [
              4 /*yield*/,
              fetch('/api/onboarding/complete', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(submissionData),
              }),
            ];
          case 2:
            response = _j.sent();
            if (Boolean(response.ok)) return [3 /*break*/, 4];
            return [
              4 /*yield*/,
              response.json().catch(function () {
                return {};
              }),
            ];
          case 3:
            errorData = _j.sent();
            throw new Error(errorData.error || 'Failed to complete onboarding');
          case 4:
            // Show success toast
            toast({
              title: '🎉 Onboarding completed!',
              description: 'Your waitlist is now ready to use.',
              variant: 'default',
            });
            // Redirect to dashboard after successful onboarding
            router.push('/dashboard');
            return [3 /*break*/, 7];
          case 5:
            error_1 = _j.sent();
            console.error('Error completing onboarding:', error_1);
            errorMessage = error_1 instanceof Error ? error_1.message : 'An unknown error occurred';
            setError(errorMessage);
            // Show error toast
            toast({
              title: 'Error',
              description: errorMessage,
              variant: 'destructive',
            });
            return [3 /*break*/, 7];
          case 6:
            setIsLoading(false);
            return [7 /*endfinally*/];
          case 7:
            return [3 /*break*/, 9];
          case 8:
            setCurrentStep(function (prev) {
              return prev + 1;
            });
            _j.label = 9;
          case 9:
            return [2 /*return*/];
        }
      });
    });
  };
  var handleBack = function () {
    setCurrentStep(function (prev) {
      return Math.max(0, prev - 1);
    });
    setErrors({});
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {onboardingSteps.map(function (_, index) {
              return (
                <div
                  key={index}
                  className="flex items-center"
                >
                  <div
                    className={'w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all '.concat(
                      index <= currentStep ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500',
                    )}
                  >
                    {index < currentStep ? <Check className="h-4 w-4" /> : index + 1}
                  </div>
                  {index < onboardingSteps.length - 1 && (
                    <div
                      className={'h-1 w-16 mx-2 rounded-full transition-all '.concat(
                        index < currentStep ? 'bg-blue-500' : 'bg-gray-200',
                      )}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>
              Step {currentStep + 1} of {onboardingSteps.length}
            </span>
            <span>{Math.round(progress)}% complete</span>
          </div>
        </div>

        {/* Main card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 mb-4">
                {currentStepData.icon}
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{currentStepData.title}</h1>
              <p className="text-gray-600 text-lg">{currentStepData.description}</p>
            </div>

            <div className="min-h-[400px]">
              {typeof currentStepData.content === 'function'
                ? currentStepData.content({
                    formData: formData,
                    setFormData: setFormData,
                    errors: errors,
                    showPreview: showPreview,
                    setShowPreview: setShowPreview,
                    copied: copied,
                    setCopied: setCopied,
                  })
                : currentStepData.content}
            </div>
          </div>

          <div className="bg-gray-50 px-8 py-6 flex justify-between items-center">
            <button
              onClick={handleBack}
              disabled={currentStep === 0 || isLoading}
              className="px-6 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Back
            </button>

            <button
              onClick={handleNext}
              disabled={isLoading || !canProceed}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Setting up...
                </>
              ) : currentStep === onboardingSteps.length - 1 ? (
                'Complete Setup'
              ) : (
                <>
                  Next <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2 text-red-700">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm font-medium">Error: {error}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
//# sourceMappingURL=page.jsx.map
