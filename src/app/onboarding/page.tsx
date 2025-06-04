'use client';

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
import React, { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

import { onboardingCompleteSchema } from '@/lib/validations/onboarding';

// Fixed interfaces with proper type
type ReferralRewardType = 'position' | 'custom';

interface ReferralReward {
  type: ReferralRewardType;
  message?: string;
}

interface WaitlistSettings {
  emailVerification?: boolean;
  allowDuplicates?: boolean;
  referralEnabled?: boolean;
  referralReward?: ReferralReward;
  referralMessage?: string;
}

interface WaitlistStyle {
  buttonText?: string;
  buttonColor?: string;
  buttonTextColor?: string;
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: number;
  fontFamily?: string;
  showLabels?: boolean;
  formLayout?: string;
}

// Main form data interface
export interface OnboardingFormData {
  name: string;
  description?: string;
  websiteUrl?: string;
  redirectUrl?: string;
  customFields?: any[];
  style?: WaitlistStyle;
  settings?: WaitlistSettings;
  termsAccepted: boolean;
  emailNotifications: boolean;
  marketingEmails: boolean;
  launchDate?: string;
}

interface FormErrors {
  name?: string;
  websiteUrl?: string;
  redirectUrl?: string;
}

interface ContentProps {
  formData: OnboardingFormData;
  setFormData: React.Dispatch<React.SetStateAction<OnboardingFormData>>;
  errors: FormErrors;
  showPreview?: boolean;
  setShowPreview?: (value: boolean) => void;
  copied?: string | null;
  setCopied?: React.Dispatch<React.SetStateAction<string | null>>;
}

const onboardingSteps = [
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
          ].map((feature, index) => (
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
          ))}
        </div>
      </div>
    ),
  },
  {
    title: 'Set Up Your Waitlist',
    description: 'Customize your waitlist to match your brand and goals.',
    icon: <Settings className="h-8 w-8 text-blue-500" />,
    content: ({ formData, setFormData, errors = {} }: ContentProps) => (
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
              className={`w-full rounded-lg border-2 p-3 transition-colors focus:outline-none focus:ring-0 ${
                errors.name
                  ? 'border-red-300 focus:border-red-500'
                  : 'border-gray-200 focus:border-blue-500'
              }`}
              placeholder="e.g., Early Access"
              value={formData.name || ''}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
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
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
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
              className={`w-full rounded-lg border-2 p-3 transition-colors focus:outline-none focus:ring-0 ${
                errors.websiteUrl
                  ? 'border-red-300 focus:border-red-500'
                  : 'border-gray-200 focus:border-blue-500'
              }`}
              placeholder="https://yourapp.com"
              value={formData.websiteUrl || ''}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  websiteUrl: e.target.value,
                }))
              }
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
              className={`w-full rounded-lg border-2 p-3 transition-colors focus:outline-none focus:ring-0 ${
                errors.redirectUrl
                  ? 'border-red-300 focus:border-red-500'
                  : 'border-gray-200 focus:border-blue-500'
              }`}
              placeholder="https://yourapp.com/thank-you"
              value={formData.redirectUrl || ''}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  redirectUrl: e.target.value,
                }))
              }
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
    ),
  },
  {
    title: 'Configure Referral System',
    description: 'Turn your waitlist into a viral growth engine.',
    icon: <Users className="h-8 w-8 text-blue-500" />,
    content: ({ formData, setFormData }: ContentProps) => (
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
                checked={formData.settings?.referralEnabled || false}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    settings: {
                      ...(prev.settings || {}),
                      referralEnabled: e.target.checked,
                    },
                  }))
                }
              />
              <div className="peer h-6 w-11 rounded-full bg-gray-200 transition-all after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-500/20" />
            </label>
          </div>

          {formData.settings?.referralEnabled && (
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
                  value={formData.settings?.referralReward?.type || 'position'}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      settings: {
                        ...(prev.settings || {}),
                        referralReward: {
                          ...(prev.settings?.referralReward || {}),
                          type: e.target.value as 'position' | 'custom',
                        },
                      },
                    }))
                  }
                >
                  <option value="position">Move up waitlist position</option>
                  <option value="custom">Custom reward</option>
                </select>
              </div>

              {formData.settings?.referralReward?.type === 'custom' && (
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
                    value={formData.settings?.referralReward?.message || ''}
                    onChange={(e) =>
                      setFormData((prev) => {
                        const currentSettings = prev.settings || {};
                        const currentReward = currentSettings.referralReward || {
                          type: 'position' as const,
                        };

                        return {
                          ...prev,
                          settings: {
                            ...currentSettings,
                            referralReward: {
                              ...currentReward,
                              message: e.target.value,
                            },
                          },
                        };
                      })
                    }
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
                  value={formData.settings?.referralMessage || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      settings: {
                        ...(prev.settings || {}),
                        referralMessage: e.target.value,
                      },
                    }))
                  }
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
                Enabling referrals can increase your signup rate by up to 50% through viral growth!
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'Get Your Embed Code',
    description: 'Add your waitlist to your website with simple copy-paste.',
    icon: <LinkIcon className="h-8 w-8 text-blue-500" />,
    content: (props: ContentProps) => {
      const {
        formData,
        setFormData,
        showPreview = false,
        setShowPreview,
        copied = null,
        setCopied,
      } = props;
      const waitlistId = `wl_${Math.random().toString(36).substr(2, 9)}`;

      const handleCopy = (text: string, type: 'script' | 'div') => {
        navigator.clipboard.writeText(text);
        if (setCopied) {
          setCopied(type);
          setTimeout(() => setCopied(null), 2000);
        }
      };

      return (
        <div className="space-y-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Integration Options</h3>
              <button
                onClick={() => setShowPreview?.(!showPreview)}
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
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          termsAccepted: e.target.checked,
                        }))
                      }
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
                      onChange={(e) =>
                        setFormData((prev: unknown) => ({
                          ...prev,
                          emailNotifications: e.target.checked,
                        }))
                      }
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
                      onChange={(e) =>
                        setFormData((prev: unknown) => ({
                          ...prev,
                          marketingEmails: e.target.checked,
                        }))
                      }
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
                  onClick={() =>
                    handleCopy(
                      `<script src="${typeof window !== 'undefined' ? window.location.origin : 'https://yoursite.com'}/embed.js" data-waitlist="${waitlistId}" async></script>`,
                      'script',
                    )
                  }
                  className={`flex items-center gap-1 px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    copied === 'script'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                  }`}
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
                  {`<script src="${typeof window !== 'undefined' ? window.location.origin : 'https://yoursite.com'}/embed.js" data-waitlist="${waitlistId}" async></script>`}
                </code>
              </pre>
            </div>

            <div className="rounded-lg bg-gray-50 p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900">2. Add where you want the form</h4>
                <button
                  onClick={() => handleCopy('<div data-waitlist-embed></div>', 'div')}
                  className={`flex items-center gap-1 px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    copied === 'div'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                  }`}
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

/**
 * Manages the onboarding process for creating a waitlist.
 *
 * This component maintains state for the current step, form data, errors,
 * and loading status. It validates user input at each step, updates the UI accordingly,
 * and handles navigation between steps. Upon completing all steps, it submits the form
 * data to an API endpoint to finalize onboarding.
 *
 * @returns A React component that renders the onboarding interface.
 */
export default function ImprovedOnboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<OnboardingFormData>({
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
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPreview, setShowPreview] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const currentStepData = onboardingSteps[currentStep];
  const progress = ((currentStep + 1) / onboardingSteps.length) * 100;
  const [canProceed, setCanProceed] = useState(true);

  // Update canProceed when formData or currentStep changes
  useEffect(() => {
    if (currentStep === 0) {
      // First step is welcome screen, always allow proceeding
      setCanProceed(true);
    } else if (currentStep === 1) {
      // Second step requires name
      const hasName = Boolean(formData.name && formData.name.length >= 3);
      setCanProceed(hasName);
    } else if (currentStep === onboardingSteps.length - 1) {
      // On the last step, can proceed if terms are accepted
      setCanProceed(Boolean(formData.termsAccepted));
    } else {
      // For other steps, can proceed by default
      setCanProceed(true);
    }
  }, [formData, currentStep]);

  // Update errors when form data changes
  useEffect(() => {
    if (currentStep === 1) {
      // Only validate on the second step (Set Up Your Waitlist)
      const newErrors: FormErrors = {};

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
  }, [formData, currentStep]);

  const router = useRouter();

  /**
   * Validates the current step in a form based on specific criteria.
   *
   * For `currentStep` 0, it always returns true as the welcome screen is valid.
   * For `currentStep` 1, it checks if the name is provided and has at least 3 characters,
   * and validates that the websiteUrl and redirectUrl (if provided) start with http:// or https://.
   * Errors are collected in `newErrors` and set using `setErrors`.
   *
   * @returns True if the current step is valid, otherwise false.
   */
  const validateCurrentStep = (): boolean => {
    if (currentStep === 0) {
      // Welcome screen is always valid
      return true;
    } else if (currentStep === 1) {
      // Second step requires name
      const newErrors: FormErrors = {};
      let hasErrors = false;

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

  /**
   * Handles navigation to the next step in the onboarding process or finalizes the onboarding if it's the last step.
   *
   * This function validates the current step, prepares and validates the submission data according to a schema,
   * and either moves to the next step or completes the onboarding by calling an API. It handles errors gracefully
   * and updates UI states such as loading and error messages accordingly.
   *
   * @returns void
   */
  const handleNext = async () => {
    // Validate current step before proceeding
    const isValid = validateCurrentStep();
    if (!isValid) {
      console.log('Validation failed, cannot proceed');
      return;
    }

    console.log('Validation passed, proceeding to next step');

    if (currentStep === onboardingSteps.length - 1) {
      setIsLoading(true);
      setError('');

      try {
        // Validate all required fields before submission
        if (!formData.termsAccepted) {
          throw new Error('You must accept the terms and conditions');
        }

        // Prepare the data according to the onboardingCompleteSchema
        const submissionData = {
          name: formData.name,
          description: formData.description,
          websiteUrl: formData.websiteUrl || '',
          redirectUrl: formData.redirectUrl || '',
          customFields: formData.customFields || [],
          style: formData.style || {},
          settings: {
            emailVerification: formData.settings?.emailVerification ?? true,
            allowDuplicates: formData.settings?.allowDuplicates ?? false,
            referralEnabled: formData.settings?.referralEnabled ?? false,
            ...(formData.settings?.referralReward && {
              referralReward: formData.settings.referralReward,
            }),
            ...(formData.settings?.referralMessage && {
              referralMessage: formData.settings.referralMessage,
            }),
          },
          termsAccepted: formData.termsAccepted,
          emailNotifications: formData.emailNotifications,
          marketingEmails: formData.marketingEmails,
          ...(formData.launchDate && { launchDate: formData.launchDate }),
        };

        // Validate against the schema
        const result = onboardingCompleteSchema.safeParse(submissionData);

        if (!result.success) {
          const errorMessages = result.error.errors
            .map((err: { message: string }) => err.message)
            .join('\n');
          throw new Error(errorMessages);
        }

        // Call the API to mark onboarding as complete and create the waitlist
        const response = await fetch('/api/onboarding/complete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(submissionData),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || 'Failed to complete onboarding');
        }

        // Show success toast
        toast({
          title: '🎉 Onboarding completed!',
          description: 'Your waitlist is now ready to use.',
          variant: 'default',
        });

        // Redirect to dashboard after successful onboarding
        router.push('/dashboard');
      } catch (error) {
        console.error('Error completing onboarding:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        setError(errorMessage);

        // Show error toast
        toast({
          title: 'Error',
          description: errorMessage,
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {onboardingSteps.map((_, index) => (
              <div
                key={index}
                className="flex items-center"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                    index <= currentStep ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {index < currentStep ? <Check className="h-4 w-4" /> : index + 1}
                </div>
                {index < onboardingSteps.length - 1 && (
                  <div
                    className={`h-1 w-16 mx-2 rounded-full transition-all ${
                      index < currentStep ? 'bg-blue-500' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
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
                    formData,
                    setFormData,
                    errors,
                    showPreview,
                    setShowPreview,
                    copied,
                    setCopied,
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
