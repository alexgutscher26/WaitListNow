'use client';

import {
  CheckCircle2,
  ArrowRight,
  Link as LinkIcon,
  Users,
  Settings,
  Bell,
  Zap,
  Copy,
  Check,
  AlertCircle,
  Eye,
  EyeOff,
} from 'lucide-react';
import { useState, useEffect } from 'react';

interface FormData {
  waitlistName: string;
  websiteUrl: string;
  launchDate: string;
  referralEnabled: boolean;
  referralReward: string;
}

interface FormErrors {
  waitlistName?: string;
  websiteUrl?: string;
}

interface ContentProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
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
            <label className="text-sm font-semibold text-gray-700">Waitlist Name *</label>
            <input
              type="text"
              className={`w-full rounded-lg border-2 p-3 transition-colors focus:outline-none focus:ring-0 ${
                errors.waitlistName
                  ? 'border-red-300 focus:border-red-500'
                  : 'border-gray-200 focus:border-blue-500'
              }`}
              placeholder="e.g., Get Early Access to SuperApp"
              value={formData.waitlistName}
              onChange={(e) => setFormData((prev) => ({ ...prev, waitlistName: e.target.value }))}
            />
            {errors.waitlistName && (
              <p className="flex items-center gap-1 text-sm text-red-600">
                <AlertCircle className="h-3 w-3" />
                {errors.waitlistName}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Website URL *</label>
            <input
              type="url"
              className={`w-full rounded-lg border-2 p-3 transition-colors focus:outline-none focus:ring-0 ${
                errors.websiteUrl
                  ? 'border-red-300 focus:border-red-500'
                  : 'border-gray-200 focus:border-blue-500'
              }`}
              placeholder="https://yourapp.com"
              value={formData.websiteUrl}
              onChange={(e) => setFormData((prev) => ({ ...prev, websiteUrl: e.target.value }))}
            />
            {errors.websiteUrl && (
              <p className="flex items-center gap-1 text-sm text-red-600">
                <AlertCircle className="h-3 w-3" />
                {errors.websiteUrl}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Expected Launch Date</label>
            <input
              type="date"
              className="w-full rounded-lg border-2 border-gray-200 p-3 transition-colors focus:border-blue-500 focus:outline-none focus:ring-0"
              value={formData.launchDate}
              onChange={(e) => setFormData((prev) => ({ ...prev, launchDate: e.target.value }))}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>

        <div className="rounded-lg bg-blue-50 p-4">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center">
              <Check className="h-3 w-3 text-white" />
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
    ),
  },
  {
    title: 'Configure Referral System',
    description: 'Turn your waitlist into a viral growth engine.',
    icon: <Users className="h-8 w-8 text-blue-500" />,
    content: ({ formData, setFormData, errors = {} }: ContentProps) => (
      <div className="space-y-6">
        <div className="rounded-lg border-2 border-gray-200 p-5 transition-all hover:border-blue-200">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">Enable Referral Rewards</h4>
              <p className="text-sm text-gray-600 mt-1">
                Users move up the waitlist when they successfully refer friends
              </p>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                className="peer sr-only"
                checked={formData.referralEnabled}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, referralEnabled: e.target.checked }))
                }
              />
              <div className="peer h-6 w-11 rounded-full bg-gray-200 transition-all after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-500/20" />
            </label>
          </div>
        </div>

        {formData.referralEnabled && (
          <div className="space-y-4 animate-in slide-in-from-top-2 duration-300">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Positions to Skip</label>
                <select
                  className="w-full rounded-lg border-2 border-gray-200 p-3 transition-colors focus:border-blue-500 focus:outline-none focus:ring-0"
                  value={formData.referralReward}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, referralReward: e.target.value }))
                  }
                >
                  <option value="1">1 position</option>
                  <option value="2">2 positions</option>
                  <option value="3">3 positions</option>
                  <option value="5">5 positions</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Per Referral</label>
                <div className="rounded-lg border-2 border-gray-200 p-3 bg-gray-50">
                  <span className="text-gray-600">Each successful invite</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-green-50 border border-green-200 p-4">
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-green-900">Referral Preview</h4>
                  <p className="text-sm text-green-700">
                    "Invite friends and skip {formData.referralReward} position
                    {formData.referralReward !== '1' ? 's' : ''} in line for each successful
                    referral!"
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    ),
  },
  {
    title: 'Get Your Embed Code',
    description: 'Add your waitlist to your website with simple copy-paste.',
    icon: <LinkIcon className="h-8 w-8 text-blue-500" />,
    content: ({
      showPreview = false,
      setShowPreview = (_value: React.SetStateAction<boolean>) => {},
      copied = null,
      setCopied = (_value: React.SetStateAction<string | null>) => {},
      errors = {},
    }: ContentProps) => {
      const waitlistId = 'wl_' + Math.random().toString(36).substr(2, 9);

      /**
       * Copies text to clipboard and sets copied state with a timeout.
       */
      const handleCopy = (text: string, type: 'script' | 'div') => {
        navigator.clipboard.writeText(text);
        setCopied(type);
        setTimeout(() => setCopied(null), 2000);
      };

      return (
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
                      `<script src="${window.location.origin}/embed.js" data-waitlist="${waitlistId}" async></script>`,
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
                  {`<script src="${window.location.origin}/embed.js" data-waitlist="${waitlistId}" async></script>`}
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
 * Improved onboarding component managing user through multiple steps with validation and preview functionalities.
 *
 * This function renders a multi-step onboarding process, manages form data, validates inputs, and provides navigation controls.
 * It uses React hooks like useState and useEffect to manage state and side effects. The component checks the validity of form
 * data based on the current step and enables or disables the next button accordingly. It also handles asynchronous operations
 * such as simulating an API call upon completing the onboarding process.
 *
 * @returns A JSX element representing the onboarding UI.
 */
export default function ImprovedOnboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    waitlistName: '',
    websiteUrl: '',
    launchDate: '',
    referralEnabled: true,
    referralReward: '2',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPreview, setShowPreview] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const currentStepData = onboardingSteps[currentStep];
  const progress = ((currentStep + 1) / onboardingSteps.length) * 100;
  const [canProceed, setCanProceed] = useState(true);

  useEffect(() => {
    if (currentStep === 0 || currentStep >= 2) {
      setCanProceed(true);
      return;
    }

    const newErrors: FormErrors = {};
    if (currentStep === 1) {
      if (!formData.waitlistName.trim()) {
        newErrors.waitlistName = 'Waitlist name is required';
      } else if (formData.waitlistName.length < 3) {
        newErrors.waitlistName = 'Waitlist name must be at least 3 characters';
      }

      if (!formData.websiteUrl.trim()) {
        newErrors.websiteUrl = 'Website URL is required';
      } else if (!/^https?:\/\/.+/.test(formData.websiteUrl)) {
        newErrors.websiteUrl = 'Please enter a valid URL (starting with http:// or https://)';
      }
    }

    setErrors(newErrors);
    setCanProceed(Object.keys(newErrors).length === 0);
  }, [formData, currentStep]);

  /**
   * Handles the next step in the onboarding process.
   *
   * This function checks if the current step is the last one in the `onboardingSteps` array.
   * If it is, it simulates an API call using a timeout and alerts the user that onboarding is completed.
   * In case of an error during this process, it logs the error to the console.
   * Regardless of the outcome, it sets `isLoading` to false.
   * If the current step is not the last one, it increments the `currentStep` by 1.
   */
  const handleNext = async () => {
    if (currentStep === onboardingSteps.length - 1) {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        alert('🎉 Onboarding completed! Redirecting to dashboard...');
      } catch (error) {
        console.error('Error completing onboarding:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  /**
   * Decrements the current step by one and clears errors.
   */
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
              disabled={isLoading || (currentStep === 1 && !canProceed)}
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
      </div>
    </div>
  );
}
