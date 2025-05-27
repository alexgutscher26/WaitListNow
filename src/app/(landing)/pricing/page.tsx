'use client';

// TODO: Redesign the pricing page

import { Button } from '@/components/ui/button';
import { client } from '@/lib/client';
import { useUser } from '@clerk/nextjs';
import { useMutation } from '@tanstack/react-query';
import {
  Check,
  CheckCircle,
  XCircle,
  Star,
  Zap,
  Users,
  Shield,
  Crown,
  Sparkles,
  TrendingUp,
  Award,
  ArrowRight,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { MaxWidthWrapper } from '@/components/max-width-wrapper';

type PlanFeatures = {
  projects: string | number;
  signups: string | number;
  widget: boolean;
  referralLinks: boolean;
  customBranding: boolean;
  customThankYou: boolean;
  metrics: string;
  csvExport: boolean;
  webhooks: boolean;
  emailNotifications: boolean;
  emailIntegrations: boolean;
  rewardMilestones: boolean;
  leaderboard: boolean;
  apiAccess: boolean;
  abTesting: boolean;
  teamMembers: string | number;
  support: string;
};

type PricingPlan = {
  id: string;
  name: string;
  price: string;
  originalPrice: string | null;
  description: string;
  buttonText: string;
  buttonVariant: 'default' | 'outline' | 'ghost' | 'link' | 'destructive' | 'secondary';
  featured: boolean;
  badge?: string;
  icon: any;
  color: string;
  features: PlanFeatures;
};

const pricingPlans: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    originalPrice: null,
    description: 'Perfect for individuals getting started',
    buttonText: 'Get Started',
    buttonVariant: 'outline',
    featured: false,
    icon: Users,
    color: 'from-gray-400 to-gray-600',
    features: {
      projects: '1',
      signups: '500',
      widget: true,
      referralLinks: true,
      customBranding: false,
      customThankYou: false,
      metrics: 'Basic',
      csvExport: false,
      webhooks: false,
      emailNotifications: false,
      emailIntegrations: false,
      rewardMilestones: false,
      leaderboard: false,
      apiAccess: false,
      abTesting: false,
      teamMembers: '1',
      support: '❌',
    },
  },
  {
    id: 'starter',
    name: 'Starter',
    price: '$19',
    originalPrice: '$29',
    description: 'Ideal for growing businesses',
    buttonText: 'Upgrade Now',
    buttonVariant: 'default',
    featured: true,
    badge: 'Most Popular',
    icon: Zap,
    color: 'from-blue-500 to-cyan-500',
    features: {
      projects: '3',
      signups: '10,000',
      widget: true,
      referralLinks: true,
      customBranding: true,
      customThankYou: true,
      metrics: 'Advanced',
      csvExport: true,
      webhooks: true,
      emailNotifications: true,
      emailIntegrations: false,
      rewardMilestones: false,
      leaderboard: false,
      apiAccess: false,
      abTesting: false,
      teamMembers: '3',
      support: 'Email',
    },
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$49',
    originalPrice: '$99',
    description: 'For scaling businesses',
    buttonText: 'Get Pro',
    buttonVariant: 'default',
    featured: false,
    icon: Shield,
    color: 'from-purple-500 to-pink-500',
    features: {
      projects: '10',
      signups: '50,000',
      widget: true,
      referralLinks: true,
      customBranding: true,
      customThankYou: true,
      metrics: 'Advanced +',
      csvExport: true,
      webhooks: true,
      emailNotifications: true,
      emailIntegrations: true,
      rewardMilestones: true,
      leaderboard: true,
      apiAccess: true,
      abTesting: false,
      teamMembers: '10',
      support: 'Priority',
    },
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    originalPrice: null,
    description: 'For large organizations',
    buttonText: 'Contact Sales',
    buttonVariant: 'outline',
    featured: false,
    icon: Crown,
    color: 'from-amber-400 to-orange-500',
    features: {
      projects: 'Unlimited',
      signups: 'Unlimited',
      widget: true,
      referralLinks: true,
      customBranding: true,
      customThankYou: true,
      metrics: 'Enterprise',
      csvExport: true,
      webhooks: true,
      emailNotifications: true,
      emailIntegrations: true,
      rewardMilestones: true,
      leaderboard: true,
      apiAccess: true,
      abTesting: true,
      teamMembers: 'Unlimited',
      support: '24/7 Dedicated',
    },
  },
];

const features = [
  { key: 'projects', name: 'Projects' },
  { key: 'signups', name: 'Monthly Signups' },
  { key: 'widget', name: 'Embeddable Widget' },
  { key: 'referralLinks', name: 'Referral Links' },
  { key: 'customBranding', name: 'Custom Branding' },
  { key: 'customThankYou', name: 'Custom Thank You Page' },
  { key: 'metrics', name: 'Analytics & Metrics' },
  { key: 'csvExport', name: 'CSV Export' },
  { key: 'webhooks', name: 'Webhooks' },
  { key: 'emailNotifications', name: 'Email Notifications' },
  { key: 'emailIntegrations', name: 'Email Integrations' },
  { key: 'rewardMilestones', name: 'Reward Milestones' },
  { key: 'leaderboard', name: 'Leaderboard' },
  { key: 'apiAccess', name: 'API Access' },
  { key: 'abTesting', name: 'A/B Testing' },
  { key: 'teamMembers', name: 'Team Members' },
  { key: 'support', name: 'Support' },
];

const testimonials = [
  {
    quote:
      'WaitlistNow helped us build excitement for our launch and collect 10,000+ signups in just 2 weeks.',
    author: 'Sarah Chen',
    role: 'Founder, TechStart',
    avatar: 'SC',
  },
  {
    quote:
      'The referral system increased our signup rate by 300%. Amazing tool for viral marketing.',
    author: 'Mike Rodriguez',
    role: 'Marketing Director, GrowthCo',
    avatar: 'MR',
  },
];

/**
 * Enhanced pricing page with modern styling, animations, and improved visual hierarchy.
 * Features gradient backgrounds, glassmorphism effects, and smooth transitions.
 */
const Page = () => {
  const { user } = useUser();
  const router = useRouter();

  const { mutate: createCheckoutSession } = useMutation<{ url: string | null }, Error>({
    mutationFn: async () => {
      const res = await client.payment.createCheckoutSession.$post({});
      return await res.json();
    },
    onSuccess: (data) => {
      if (data?.url) {
        router.push(data.url);
      } else {
        console.error('No URL returned from checkout session creation');
      }
    },
    onError: (error) => {
      console.error('Error creating checkout session:', error);
    },
  });

  const handleGetAccess = (planName: string) => {
    if (planName === 'Enterprise') {
      router.push('/contact');
      return;
    }

    if (user) {
      createCheckoutSession();
    } else {
      router.push(`/sign-in?intent=upgrade&plan=${encodeURIComponent(planName)}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-orange-600/20 rounded-full blur-3xl" />
      </div>

      <MaxWidthWrapper className="py-12 md:py-20 relative z-10">
        {/* Hero Section */}
        <div className="py-16 sm:py-24">
          <div className="text-center max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-blue-200/50 text-blue-700 px-6 py-3 rounded-full text-sm font-medium mb-8 shadow-lg">
              <Sparkles className="h-4 w-4 text-blue-500" />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">
                Limited Time: 30% Off All Paid Plans
              </span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
                Simple, transparent
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                pricing
              </span>
            </h1>

            <p className="mt-8 text-xl lg:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Choose the perfect plan for your needs. Start free, scale as you grow.
              <span className="text-blue-600 font-medium"> No hidden fees, cancel anytime.</span>
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-base text-slate-600">
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <Check className="h-5 w-5 text-emerald-500" />
                <span className="font-medium">14-day free trial</span>
              </div>
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <Check className="h-5 w-5 text-emerald-500" />
                <span className="font-medium">No setup fees</span>
              </div>
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <Check className="h-5 w-5 text-emerald-500" />
                <span className="font-medium">Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {pricingPlans.map((plan, index) => {
            const IconComponent = plan.icon;
            return (
              <div
                key={plan.name}
                className={`relative rounded-3xl bg-white/70 backdrop-blur-xl border border-white/20 shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group ${
                  plan.featured
                    ? 'ring-2 ring-blue-500/50 scale-105 lg:scale-105 shadow-blue-500/25'
                    : 'hover:shadow-slate-500/25'
                }`}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'fadeInUp 0.6s ease-out forwards',
                }}
              >
                {plan.badge && (
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-10">
                    <div
                      className={`bg-gradient-to-r ${plan.color} text-white text-sm font-bold px-6 py-2 rounded-full shadow-lg relative`}
                    >
                      <span className="relative z-10">{plan.badge}</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />
                    </div>
                  </div>
                )}

                <div className="p-8">
                  <div
                    className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${plan.color} mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className="h-7 w-7 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>

                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                    {plan.price !== 'Custom' && (
                      <span className="text-slate-500 text-lg">/month</span>
                    )}
                    {plan.originalPrice && (
                      <span className="text-base text-slate-400 line-through ml-3 bg-red-50 px-2 py-1 rounded">
                        {plan.originalPrice}
                      </span>
                    )}
                  </div>

                  <p className="mt-4 text-slate-600 text-lg leading-relaxed">{plan.description}</p>

                  <Button
                    onClick={() => handleGetAccess(plan.name)}
                    className={`w-full mt-8 h-14 font-semibold text-lg rounded-xl transition-all duration-300 ${
                      plan.featured
                        ? `bg-gradient-to-r ${plan.color} hover:opacity-90 text-white border-0 shadow-lg hover:shadow-xl hover:scale-105`
                        : 'hover:scale-105 shadow-md hover:shadow-lg'
                    }`}
                    variant={plan.buttonVariant}
                    size="lg"
                  >
                    {plan.buttonText}
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>

                <div className="border-t border-slate-200/50 bg-gradient-to-br from-slate-50/50 to-white/50 backdrop-blur-sm p-8 pt-6 rounded-b-3xl">
                  <h4 className="text-base font-semibold mb-6 text-gray-900 flex items-center gap-2">
                    <Award className="h-5 w-5 text-blue-500" />
                    Key features
                  </h4>
                  <ul className="space-y-4">
                    {Object.entries(plan.features)
                      .slice(0, 6)
                      .map(([key, value], idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-sm text-slate-600"
                        >
                          <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                          <span className="font-medium">{String(value)}</span>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Feature Comparison Table */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Compare all features
            </h2>
            <p className="mt-6 text-xl text-slate-600 max-w-2xl mx-auto">
              Everything you need to know about our plans in one place
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gradient-to-r from-slate-50 to-blue-50">
                  <tr className="border-b border-slate-200">
                    <th className="py-6 px-6 font-semibold text-left text-gray-900 text-base">
                      Feature
                    </th>
                    {pricingPlans.map((plan) => (
                      <th
                        key={plan.name}
                        className="py-6 px-4 font-semibold text-center min-w-[150px] text-gray-900 text-base"
                      >
                        <div
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${plan.color} text-white text-sm`}
                        >
                          <plan.icon className="h-4 w-4" />
                          {plan.name}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {features.map((feature, idx) => (
                    <tr
                      key={feature.key}
                      className={`border-b border-slate-100 hover:bg-slate-50/50 transition-colors ${
                        idx % 2 === 0 ? 'bg-white/30' : 'bg-slate-50/30'
                      }`}
                    >
                      <td className="py-5 px-6 font-medium text-gray-900">{feature.name}</td>
                      {pricingPlans.map((plan) => (
                        <td
                          key={`${plan.name}-${feature.key}`}
                          className="py-5 px-4 text-center"
                        >
                          {typeof plan.features[feature.key as keyof typeof plan.features] ===
                          'boolean' ? (
                            plan.features[feature.key as keyof typeof plan.features] ? (
                              <CheckCircle className="h-6 w-6 text-emerald-500 mx-auto" />
                            ) : (
                              <XCircle className="h-6 w-6 text-slate-300 mx-auto" />
                            )
                          ) : (
                            <span className="font-semibold text-gray-900 bg-slate-100 px-3 py-1 rounded-full">
                              {plan.features[feature.key as keyof typeof plan.features]}
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-32">
          <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10 backdrop-blur-sm" />
            <div className="relative z-10">
              <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
                  Trusted by thousands of businesses
                </h2>
                <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                  Join the growing list of successful companies using our platform
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-6 w-6 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <p className="text-slate-700 text-lg leading-relaxed mb-8 italic">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 text-lg">
                          {testimonial.author}
                        </div>
                        <div className="text-slate-600">{testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Frequently asked questions
            </h2>
            <p className="mt-6 text-xl text-slate-600 max-w-3xl mx-auto">
              Everything you need to know about our pricing and plans
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white/60 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 md:p-12">
              <div className="space-y-8">
                <div className="border-b border-slate-200 pb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                    <TrendingUp className="h-6 w-6 text-blue-500" />
                    What payment methods do you accept?
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    We accept all major credit cards including Visa, Mastercard, American Express,
                    and Discover. We also support payments through PayPal for your convenience.
                  </p>
                </div>

                <div className="border-b border-slate-200 pb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                    <Users className="h-6 w-6 text-green-500" />
                    Can I change plans later?
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    Yes, you can upgrade or downgrade your plan at any time. Your subscription will
                    be prorated based on your current billing cycle, ensuring you only pay for what
                    you use.
                  </p>
                </div>

                <div className="border-b border-slate-200 pb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                    <Zap className="h-6 w-6 text-purple-500" />
                    Is there a free trial available?
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    Yes, all paid plans come with a 14-day free trial. No credit card is required to
                    start your trial, and you can cancel at any time during the trial period.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                    <Shield className="h-6 w-6 text-orange-500" />
                    Need more information?
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    Contact our sales team at{' '}
                    <a
                      href="mailto:sales@waitlistnow.com"
                      className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors"
                    >
                      sales@waitlistnow.com
                    </a>{' '}
                    for more information about our enterprise plans and custom solutions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>

      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `,
        }}
      />
    </div>
  );
};

export default Page;
