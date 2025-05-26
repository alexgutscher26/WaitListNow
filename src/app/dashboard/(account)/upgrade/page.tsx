import { DashboardPage } from '@/components/dashboard-page';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Check, CheckCircle, XCircle, Star, Zap, Users, Shield, Crown } from 'lucide-react';
import { db } from '@/lib/db';

const pricingPlans = [
  {
    name: 'Free',
    price: '$0/month',
    originalPrice: null,
    description: 'Perfect for individuals getting started',
    buttonText: 'Current Plan',
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
    name: 'Starter',
    price: '$19/month',
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
      signups: '5,000',
      widget: true,
      referralLinks: true,
      customBranding: true,
      customThankYou: true,
      metrics: 'Full',
      csvExport: true,
      webhooks: true,
      emailNotifications: true,
      emailIntegrations: true,
      rewardMilestones: false,
      leaderboard: false,
      apiAccess: false,
      abTesting: false,
      teamMembers: '1',
      support: 'Email',
    },
  },
  {
    name: 'Growth',
    price: '$49/month',
    originalPrice: '$69',
    description: 'Perfect for scaling businesses',
    buttonText: 'Upgrade Now',
    buttonVariant: 'default',
    featured: false,
    icon: Star,
    color: 'from-green-500 to-emerald-600',
    features: {
      projects: '10',
      signups: '25,000',
      widget: true,
      referralLinks: true,
      customBranding: true,
      customThankYou: true,
      metrics: 'Full',
      csvExport: true,
      webhooks: true,
      emailNotifications: true,
      emailIntegrations: true,
      rewardMilestones: true,
      leaderboard: true,
      apiAccess: true,
      abTesting: false,
      teamMembers: '3',
      support: 'Email',
    },
  },
  {
    name: 'Pro',
    price: '$99/month',
    originalPrice: '$129',
    description: 'Enterprise-grade features',
    buttonText: 'Upgrade Now',
    buttonVariant: 'default',
    featured: false,
    icon: Crown,
    color: 'from-purple-500 to-pink-600',
    features: {
      projects: 'Unlimited',
      signups: '100,000+',
      widget: true,
      referralLinks: true,
      customBranding: true,
      customThankYou: true,
      metrics: 'Advanced',
      csvExport: true,
      webhooks: true,
      emailNotifications: true,
      emailIntegrations: true,
      rewardMilestones: true,
      leaderboard: true,
      apiAccess: true,
      abTesting: true,
      teamMembers: '10+',
      support: 'Chat & Email',
    },
  },
];

const features = [
  { key: 'projects', name: 'Projects', category: 'Core' },
  { key: 'signups', name: 'Waitlist Signups', category: 'Core' },
  { key: 'widget', name: 'Embeddable Widget', category: 'Core' },
  { key: 'referralLinks', name: 'Unique Referral Links', category: 'Core' },
  { key: 'customBranding', name: 'Custom Branding (Logo & Colors)', category: 'Customization' },
  { key: 'customThankYou', name: 'Custom Thank You Page URL', category: 'Customization' },
  { key: 'metrics', name: 'Referral Metrics Dashboard', category: 'Analytics' },
  { key: 'csvExport', name: 'CSV Export', category: 'Analytics' },
  { key: 'webhooks', name: 'Webhooks', category: 'Integrations' },
  { key: 'emailNotifications', name: 'Email Notifications', category: 'Integrations' },
  {
    key: 'emailIntegrations',
    name: 'Email Integrations (Mailchimp, ConvertKit)',
    category: 'Integrations',
  },
  {
    key: 'rewardMilestones',
    name: 'Reward Milestones (e.g., Refer 5 = gift)',
    category: 'Advanced',
  },
  { key: 'leaderboard', name: 'Public Leaderboard', category: 'Advanced' },
  { key: 'apiAccess', name: 'API Access', category: 'Advanced' },
  { key: 'abTesting', name: 'A/B Test Widget Variants', category: 'Advanced' },
  { key: 'teamMembers', name: 'Team Members (admin access)', category: 'Team' },
  { key: 'support', name: 'Priority Support', category: 'Support' },
];

const addOns = [
  {
    title: 'Extra 10,000 signups',
    description: 'Additional capacity for your waitlist',
    price: '+$10/month',
    type: 'recurring',
  },
  {
    title: 'Remove "Powered by WaitlistNow"',
    description: 'White-label your waitlist completely',
    price: '+$5/month',
    type: 'recurring',
  },
  {
    title: 'One-time export of all user data',
    description: 'Get a complete backup of your waitlist',
    price: '$10',
    type: 'one-time',
  },
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
 * Renders the pricing page for a dashboard application.
 *
 * This function first checks if the user is authenticated and redirects to the sign-in page if not.
 * It then retrieves the user data from the database. The function renders various sections including:
 * hero, pricing cards, social proof, add-ons, feature comparison table, and FAQ section. Each section
 * displays different aspects of pricing plans, features, testimonials, and additional options.
 *
 * @returns A JSX component representing the pricing page.
 */
const Page = async () => {
  const auth = await currentUser();

  if (!auth) {
    redirect('/sign-in');
  }

  const user = await db.user.findUnique({
    where: { externalId: auth.id },
  });

  if (!user) {
    redirect('/sign-in');
  }

  return (
    <DashboardPage title="Upgrade Plan">
      <div className="space-y-16">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
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
          <div className="mt-6 flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              14-day free trial
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              No setup fees
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              Cancel anytime
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {pricingPlans.map((plan) => {
            const IconComponent = plan.icon;
            return (
              <div
                key={plan.name}
                className={`relative rounded-2xl border bg-card text-card-foreground shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                  plan.featured ? 'ring-2 ring-primary scale-105 lg:scale-110' : ''
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <span
                      className={`bg-gradient-to-r ${plan.color} text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg`}
                    >
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="p-8">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${plan.color} mb-6`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>

                  <h3 className="text-xl font-bold">{plan.name}</h3>

                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-4xl font-bold">{plan.price.split('/')[0]}</span>
                    <span className="text-muted-foreground">/month</span>
                    {plan.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through ml-2">
                        {plan.originalPrice}
                      </span>
                    )}
                  </div>

                  <p className="mt-3 text-muted-foreground">{plan.description}</p>

                  <Button
                    className={`w-full mt-8 h-12 font-semibold ${
                      plan.featured
                        ? `bg-gradient-to-r ${plan.color} hover:opacity-90 text-white border-0`
                        : ''
                    }`}
                    variant={plan.buttonVariant as any}
                    size="lg"
                  >
                    {plan.buttonText}
                  </Button>
                </div>

                <div className="border-t bg-muted/30 p-8 pt-6 rounded-b-2xl">
                  <ul className="space-y-4">
                    {features.slice(0, 6).map((feature) => (
                      <li
                        key={feature.key}
                        className="flex items-start gap-3 text-sm"
                      >
                        {typeof plan.features[feature.key as keyof typeof plan.features] ===
                        'boolean' ? (
                          plan.features[feature.key as keyof typeof plan.features] ? (
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          ) : (
                            <XCircle className="h-5 w-5 text-muted-foreground/40 mt-0.5 flex-shrink-0" />
                          )
                        ) : (
                          <div className="flex items-center gap-3">
                            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                            <span className="font-semibold text-primary">
                              {plan.features[feature.key as keyof typeof plan.features]}
                            </span>
                          </div>
                        )}
                        {typeof plan.features[feature.key as keyof typeof plan.features] ===
                          'boolean' && <span className="leading-relaxed">{feature.name}</span>}
                        {typeof plan.features[feature.key as keyof typeof plan.features] !==
                          'boolean' && <span className="leading-relaxed">{feature.name}</span>}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant="ghost"
                    className="mt-6 p-0 h-auto text-sm font-medium text-primary hover:text-primary/80"
                  >
                    View all features →
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Social Proof */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 p-8 rounded-2xl">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">Trusted by 10,000+ businesses</h3>
            <p className="text-muted-foreground">See what our customers are saying</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-background p-6 rounded-xl shadow-sm"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold text-sm">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add-ons Section */}
        <div className="bg-muted/30 p-8 rounded-2xl">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">Powerful Add-ons</h3>
            <p className="text-muted-foreground">Extend your plan with additional features</p>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="grid gap-4">
              {addOns.map((addon, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-6 bg-background rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold">{addon.title}</h4>
                      {addon.type === 'one-time' && (
                        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                          One-time
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{addon.description}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-lg">{addon.price}</span>
                    <Button
                      variant="outline"
                      size="sm"
                    >
                      Add
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Feature Comparison Table */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Compare all features</h2>
            <p className="text-muted-foreground">Everything you need to know about our plans</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2">
                  <th className="py-4 text-left font-semibold">Feature</th>
                  {pricingPlans.map((plan) => (
                    <th
                      key={plan.name}
                      className="py-4 font-semibold text-center min-w-[120px]"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div
                          className={`inline-flex p-2 rounded-lg bg-gradient-to-r ${plan.color}`}
                        >
                          <plan.icon className="h-4 w-4 text-white" />
                        </div>
                        {plan.name}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map((feature, index) => (
                  <tr
                    key={feature.key}
                    className={`border-b hover:bg-muted/50 transition-colors ${
                      index % 5 === 0 && index > 0 ? 'border-t-2 border-muted' : ''
                    }`}
                  >
                    <td className="py-4 pr-4 font-medium">{feature.name}</td>
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
                          <span className="font-semibold text-primary">
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

        {/* FAQ Section */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/50 p-8 rounded-2xl">
          <div className="text-center mb-8">
            <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Questions? We're here to help</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our team is here to help you find the perfect solution for your business needs.
              Contact us for a personalized recommendation or if you have any questions.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              size="lg"
              className="font-semibold"
            >
              Contact Sales
            </Button>
            <Button
              variant="default"
              size="lg"
              className="font-semibold"
            >
              Start Free Trial
            </Button>
          </div>
        </div>
      </div>
    </DashboardPage>
  );
};

export default Page;
