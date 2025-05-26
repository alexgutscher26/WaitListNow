'use client';

import { Button } from '@/components/ui/button';
import { client } from '@/lib/client';
import { useUser } from '@clerk/nextjs';
import { useMutation } from '@tanstack/react-query';
import { Check, CheckCircle, XCircle, Star, Zap, Users, Shield, Crown } from 'lucide-react';
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
    color: 'from-gray-500 to-gray-600',
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
    color: 'from-blue-500 to-purple-600',
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
    color: 'from-purple-500 to-pink-600',
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
    color: 'from-amber-500 to-orange-600',
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
 * Renders a pricing page with various plans and features.
 *
 * This component fetches user data and router information using hooks.
 * It defines a mutation function to create a checkout session, which is triggered when a user selects a plan.
 * The `handleGetAccess` function handles the logic for navigating based on the selected plan and user authentication status.
 * The page displays pricing cards, feature comparison tables, testimonials, and FAQs. Each section dynamically renders content based on predefined data structures.
 *
 * @returns A React component representing the pricing page.
 */
const Page = () => {
  const { user } = useUser();
  const router = useRouter();

  const { mutate: createCheckoutSession } = useMutation<{ url: string | null }, Error>({
    mutationFn: async () => {
      const res = await client.payment.createCheckoutSession.$post();
      return await res.json();
    },
    onSuccess: (data) => {
      if (data?.url) {
        router.push(data.url);
      } else {
        console.error('No URL returned from checkout session creation');
        // Optionally show an error message to the user
      }
    },
    onError: (error) => {
      console.error('Error creating checkout session:', error);
      // Optionally show an error message to the user
    },
  });

  /**
   * Handles access based on the plan name and user authentication status.
   */
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
    <div className="min-h-screen bg-gray-50">
      <MaxWidthWrapper className="py-12 md:py-20">
        {/* Hero Section */}
        <div className="py-16 sm:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Zap className="h-4 w-4" />
              Limited Time: 30% Off All Paid Plans
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Simple, transparent pricing
            </h1>
            <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect plan for your needs. Start free, scale as you grow. No hidden fees,
              cancel anytime.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                14-day free trial
              </div>
              <div className="hidden sm:block">•</div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                No setup fees
              </div>
              <div className="hidden sm:block">•</div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                Cancel anytime
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {pricingPlans.map((plan) => {
            const IconComponent = plan.icon;
            return (
              <div
                key={plan.name}
                className={`relative rounded-2xl border bg-card text-card-foreground shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                  plan.featured ? 'ring-2 ring-blue-500 scale-105 lg:scale-105' : ''
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <span
                      className={`bg-gradient-to-r ${plan.color} text-white text-sm font-semibold px-4 py-1 rounded-full shadow-lg`}
                    >
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="p-6">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${plan.color} mb-4`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>

                  <h3 className="text-xl font-bold">{plan.name}</h3>

                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.price !== 'Custom' && (
                      <span className="text-muted-foreground">/month</span>
                    )}
                    {plan.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through ml-2">
                        {plan.originalPrice}
                      </span>
                    )}
                  </div>

                  <p className="mt-2 text-muted-foreground">{plan.description}</p>

                  <Button
                    onClick={() => handleGetAccess(plan.name)}
                    className={`w-full mt-6 h-12 font-semibold ${
                      plan.featured
                        ? `bg-gradient-to-r ${plan.color} hover:opacity-90 text-white border-0`
                        : ''
                    }`}
                    variant={plan.buttonVariant}
                    size="lg"
                  >
                    {plan.buttonText}
                  </Button>
                </div>

                <div className="border-t bg-muted/30 p-6 pt-4 rounded-b-2xl">
                  <h4 className="text-sm font-medium mb-4">Key features:</h4>
                  <ul className="space-y-3">
                    {Object.keys(plan.features).map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm"
                      >
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{plan.features[feature as keyof typeof plan.features]}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Feature Comparison Table */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Compare all features</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Everything you need to know about our plans
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b">
                  <th className="py-4 font-medium">Feature</th>
                  {pricingPlans.map((plan) => (
                    <th
                      key={plan.name}
                      className="py-4 font-medium text-center min-w-[150px]"
                    >
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map((feature) => (
                  <tr
                    key={feature.key}
                    className="border-b hover:bg-muted/50"
                  >
                    <td className="py-4 pr-4">{feature.name}</td>
                    {pricingPlans.map((plan) => (
                      <td
                        key={`${plan.name}-${feature.key}`}
                        className="py-4 text-center"
                      >
                        {typeof plan.features[feature.key as keyof typeof plan.features] ===
                        'boolean' ? (
                          plan.features[feature.key as keyof typeof plan.features] ? (
                            <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                          ) : (
                            <XCircle className="h-5 w-5 text-muted-foreground/40 mx-auto" />
                          )
                        ) : (
                          <span className="font-medium">
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

        {/* Testimonials */}
        <div className="mt-24 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">
              Trusted by thousands of businesses
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Join the growing list of successful companies using our platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground italic mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-medium">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold tracking-tight">Frequently asked questions</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Everything you need to know about our pricing and plans
          </p>

          <div className="mt-12 max-w-3xl mx-auto space-y-6 text-left">
            <div className="border-b pb-6">
              <h3 className="text-lg font-medium">What payment methods do you accept?</h3>
              <p className="mt-2 text-muted-foreground">
                We accept all major credit cards including Visa, Mastercard, American Express, and
                Discover. We also support payments through PayPal.
              </p>
            </div>

            <div className="border-b pb-6">
              <h3 className="text-lg font-medium">Can I change plans later?</h3>
              <p className="mt-2 text-muted-foreground">
                Yes, you can upgrade or downgrade your plan at any time. Your subscription will be
                prorated based on your current billing cycle.
              </p>
            </div>

            <div className="border-b pb-6">
              <h3 className="text-lg font-medium">Is there a free trial available?</h3>
              <p className="mt-2 text-muted-foreground">
                Yes, all paid plans come with a 14-day free trial. No credit card is required to
                start your trial.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium">Need more information?</h3>
              <p className="mt-2 text-muted-foreground">
                Contact our sales team at{' '}
                <a
                  href="mailto:sales@waitlistnow.com"
                  className="text-primary hover:underline"
                >
                  sales@waitlistnow.com
                </a>{' '}
                for more information about our enterprise plans.
              </p>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Page;
