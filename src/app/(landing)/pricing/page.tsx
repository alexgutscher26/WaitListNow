'use client';

import React, { useState, useEffect } from 'react';
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
  Info,
  ChevronDown,
  ChevronUp,
  Rocket,
  Target,
  BarChart3,
  Globe,
  Lock,
  Clock,
  Mail,
  Headphones
} from 'lucide-react';

// Mock user and router for demonstration
const useUser = () => ({ user: null });
const useRouter = () => ({
  push: (url) => console.log('Navigate to:', url)
});

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
  highlights: string[];
};

const pricingPlans: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    originalPrice: null,
    description: 'Perfect for individuals getting started with their first project',
    buttonText: 'Get Started Free',
    buttonVariant: 'outline',
    featured: false,
    icon: Users,
    color: 'from-slate-500 to-gray-600',
    highlights: ['No credit card required', 'Quick setup', 'Community support'],
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
      support: 'Community',
    },
  },
  {
    id: 'starter',
    name: 'Starter',
    price: '$19',
    originalPrice: '$29',
    description: 'Ideal for growing businesses ready to scale their waitlists',
    buttonText: 'Start Free Trial',
    buttonVariant: 'default',
    featured: true,
    badge: 'Most Popular',
    icon: Zap,
    color: 'from-blue-500 to-cyan-500',
    highlights: ['14-day free trial', 'Advanced analytics', 'Email support'],
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
    description: 'For scaling businesses with advanced marketing needs',
    buttonText: 'Upgrade to Pro',
    buttonVariant: 'default',
    featured: false,
    icon: Shield,
    color: 'from-purple-500 to-pink-500',
    highlights: ['Full API access', 'Advanced integrations', 'Priority support'],
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
    description: 'For large organizations with custom requirements',
    buttonText: 'Contact Sales',
    buttonVariant: 'outline',
    featured: false,
    icon: Crown,
    color: 'from-amber-400 to-orange-500',
    highlights: ['Custom solutions', 'Dedicated support', 'SLA guarantee'],
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
  { key: 'projects', name: 'Active Projects', icon: Target },
  { key: 'signups', name: 'Monthly Signups', icon: TrendingUp },
  { key: 'widget', name: 'Embeddable Widget', icon: Globe },
  { key: 'referralLinks', name: 'Referral Links', icon: Users },
  { key: 'customBranding', name: 'Custom Branding', icon: Award },
  { key: 'customThankYou', name: 'Custom Thank You Page', icon: Mail },
  { key: 'metrics', name: 'Analytics & Metrics', icon: BarChart3 },
  { key: 'csvExport', name: 'CSV Export', icon: TrendingUp },
  { key: 'webhooks', name: 'Webhooks', icon: Zap },
  { key: 'emailNotifications', name: 'Email Notifications', icon: Mail },
  { key: 'emailIntegrations', name: 'Email Integrations', icon: Mail },
  { key: 'rewardMilestones', name: 'Reward Milestones', icon: Award },
  { key: 'leaderboard', name: 'Leaderboard', icon: TrendingUp },
  { key: 'apiAccess', name: 'API Access', icon: Lock },
  { key: 'abTesting', name: 'A/B Testing', icon: Target },
  { key: 'teamMembers', name: 'Team Members', icon: Users },
  { key: 'support', name: 'Support Level', icon: Headphones },
];

const testimonials = [
  {
    quote: 'WaitlistNow helped us build excitement for our launch and collect 10,000+ signups in just 2 weeks. The viral referral system was a game-changer.',
    author: 'Sarah Chen',
    role: 'Founder, TechStart',
    avatar: 'SC',
    company: 'TechStart',
    growth: '+300% signups',
  },
  {
    quote: 'The referral system increased our signup rate by 300%. Amazing tool for viral marketing that actually delivers results.',
    author: 'Mike Rodriguez',
    role: 'Marketing Director, GrowthCo',
    avatar: 'MR',
    company: 'GrowthCo',
    growth: '+10,000 users',
  },
  {
    quote: 'Enterprise features and support helped us launch to 50,000+ users. The custom integrations saved us months of development.',
    author: 'Alex Kim',
    role: 'CTO, ScaleUp',
    avatar: 'AK',
    company: 'ScaleUp',
    growth: '+50,000 users',
  },
];

const faqs = [
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, Mastercard, American Express, Discover) and PayPal. All payments are processed securely through Stripe.',
    icon: Lock,
  },
  {
    question: 'Can I change plans later?',
    answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes are prorated automatically, so you only pay for what you use.',
    icon: TrendingUp,
  },
  {
    question: 'Is there a free trial?',
    answer: 'All paid plans include a 14-day free trial. No credit card required to start. You can cancel anytime during the trial period.',
    icon: Clock,
  },
  {
    question: 'What happens to my data if I cancel?',
    answer: 'Your data remains accessible for 30 days after cancellation. We provide export tools to download all your data before permanent deletion.',
    icon: Shield,
  },
  {
    question: 'Do you offer refunds?',
    answer: 'We offer a 30-day money-back guarantee for all paid plans. If you\'re not satisfied, contact us for a full refund.',
    icon: Award,
  },
];

const PricingPage = () => {
  const { user } = useUser();
  const router = useRouter();
  const [isAnnual, setIsAnnual] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  const handleGetAccess = (planName: string) => {
    if (planName === 'Enterprise') {
      router.push('/contact');
      return;
    }

    if (user) {
      console.log('Creating checkout session for:', planName);
    } else {
      router.push(`/sign-in?intent=upgrade&plan=${encodeURIComponent(planName)}`);
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-purple-600/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-pink-400/30 to-orange-600/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-green-400/20 to-blue-600/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10">
        {/* Enhanced Hero Section */}
        <div className="py-16 sm:py-24">
          <div className="text-center max-w-6xl mx-auto">
            {/* Announcement Banner */}
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-emerald-200/50 text-emerald-700 px-8 py-4 rounded-full text-sm font-medium mb-12 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="relative">
                <Sparkles className="h-5 w-5 text-emerald-500 animate-pulse" />
                <div className="absolute inset-0 h-5 w-5 bg-emerald-400 rounded-full animate-ping opacity-20" />
              </div>
              <span className="bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">
                🎉 Limited Time: Save 35% on Annual Plans - Ends Soon!
              </span>
              <ArrowRight className="h-4 w-4 text-emerald-500 group-hover:translate-x-1 transition-transform" />
            </div>

            {/* Main Heading */}
            <h1 className="text-6xl lg:text-8xl font-bold tracking-tight mb-8 leading-tight">
              <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent block">
                Simple pricing,
              </span>
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent block">
                powerful results
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-8 text-xl lg:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Join thousands of businesses growing faster with our viral waitlist platform.
              <span className="text-blue-600 font-semibold block mt-2">
                Start free, scale as you grow. No surprises, ever.
              </span>
            </p>

            {/* Billing Toggle */}
            <div className="mt-12 flex items-center justify-center">
              <div className="bg-white/80 backdrop-blur-sm p-2 rounded-2xl shadow-lg border border-white/20">
                <div className="flex items-center gap-4">
                  <span className={`px-4 py-2 text-sm font-medium transition-colors ${!isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
                    Monthly
                  </span>
                  <button
                    onClick={() => setIsAnnual(!isAnnual)}
                    className={`relative w-16 h-8 rounded-full transition-all duration-300 ${
                      isAnnual ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${
                        isAnnual ? 'translate-x-9' : 'translate-x-1'
                      }`}
                    />
                  </button>
                  <span className={`px-4 py-2 text-sm font-medium transition-colors ${isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
                    Annual
                    <span className="ml-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-2 py-1 rounded-full">
                      Save 35%
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-base text-slate-600">
              {[
                { icon: Clock, text: '14-day free trial' },
                { icon: Shield, text: 'No setup fees' },
                { icon: Award, text: 'Cancel anytime' },
                { icon: Lock, text: 'SOC 2 compliant' },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-white/70 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
                >
                  <item.icon className="h-5 w-5 text-emerald-500" />
                  <span className="font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Pricing Cards */}
        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {pricingPlans.map((plan, index) => {
            const IconComponent = plan.icon;
            const isHovered = hoveredPlan === plan.id;
            
            return (
              <div
                key={plan.name}
                onMouseEnter={() => setHoveredPlan(plan.id)}
                onMouseLeave={() => setHoveredPlan(null)}
                className={`relative rounded-3xl bg-white/80 backdrop-blur-xl border border-white/30 shadow-xl transition-all duration-500 group ${
                  plan.featured
                    ? 'ring-2 ring-blue-500/50 scale-105 shadow-blue-500/25 hover:shadow-blue-500/40'
                    : 'hover:shadow-slate-500/25'
                } ${isHovered ? 'hover:-translate-y-3 hover:shadow-2xl' : 'hover:-translate-y-2'}`}
                style={{
                  animationDelay: `${index * 150}ms`,
                }}
              >
                {/* Popular badge */}
                {plan.badge && (
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-20">
                    <div
                      className={`bg-gradient-to-r ${plan.color} text-white text-sm font-bold px-6 py-2 rounded-full shadow-lg relative overflow-hidden`}
                    >
                      <span className="relative z-10">{plan.badge}</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-pulse" />
                    </div>
                  </div>
                )}

                <div className="p-8">
                  {/* Icon */}
                  <div
                    className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${plan.color} mb-6 shadow-lg transition-all duration-500 ${
                      isHovered ? 'scale-125 rotate-12' : 'group-hover:scale-110'
                    }`}
                  >
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>

                  {/* Plan name and price */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>

                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-gray-900">
                      {plan.price === 'Custom' ? plan.price : `${plan.price}${isAnnual && plan.price !== '$0' ? '/yr' : '/mo'}`}
                    </span>
                    {plan.originalPrice && (
                      <span className="text-base text-slate-400 line-through ml-3 bg-red-50 px-3 py-1 rounded-full">
                        {isAnnual ? `${plan.originalPrice}/yr` : `${plan.originalPrice}/mo`}
                      </span>
                    )}
                  </div>

                  {isAnnual && plan.price !== '$0' && plan.price !== 'Custom' && (
                    <div className="mt-2 text-sm text-emerald-600 font-medium">
                      Save ${parseInt(plan.originalPrice?.replace('$', '') || '0') - parseInt(plan.price.replace('$', ''))} per month
                    </div>
                  )}

                  <p className="mt-6 text-slate-600 text-lg leading-relaxed">{plan.description}</p>

                  {/* Highlights */}
                  <div className="mt-6 space-y-2">
                    {plan.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => handleGetAccess(plan.name)}
                    className={`w-full mt-8 h-14 font-semibold text-lg rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn ${
                      plan.featured
                        ? `bg-gradient-to-r ${plan.color} hover:opacity-90 text-white border-0 shadow-lg hover:shadow-xl hover:shadow-blue-500/25`
                        : 'bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 hover:border-gray-300 shadow-md hover:shadow-lg'
                    } ${isHovered ? 'scale-105' : 'hover:scale-105'}`}
                  >
                    {plan.buttonText}
                    <ArrowRight className="h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* Features preview */}
                <div className="border-t border-slate-200/50 bg-gradient-to-br from-slate-50/80 to-white/80 backdrop-blur-sm p-8 pt-6 rounded-b-3xl">
                  <h4 className="text-base font-semibold mb-6 text-gray-900 flex items-center gap-2">
                    <Award className="h-5 w-5 text-blue-500" />
                    Key features
                  </h4>
                  <ul className="space-y-4">
                    {Object.entries(plan.features)
                      .slice(0, 5)
                      .map(([key, value], idx) => {
                        const feature = features.find(f => f.key === key);
                        return (
                          <li
                            key={idx}
                            className="flex items-center gap-3 text-sm text-slate-600"
                          >
                            <div className="flex-shrink-0">
                              {feature?.icon ? (
                                <feature.icon className="h-4 w-4 text-blue-500" />
                              ) : (
                                <CheckCircle className="h-4 w-4 text-emerald-500" />
                              )}
                            </div>
                            <span className="font-medium">
                              {feature?.name}: <span className="text-gray-900">{String(value)}</span>
                            </span>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enhanced Feature Comparison */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Compare all features
            </h2>
            <p className="mt-6 text-xl text-slate-600 max-w-3xl mx-auto">
              See exactly what's included in each plan to make the right choice for your business
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-white/30 shadow-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gradient-to-r from-slate-50/80 to-blue-50/80">
                  <tr className="border-b border-slate-200">
                    <th className="py-8 px-6 font-semibold text-left text-gray-900 text-base">
                      Feature
                    </th>
                    {pricingPlans.map((plan) => (
                      <th
                        key={plan.name}
                        className="py-8 px-4 font-semibold text-center min-w-[150px] text-gray-900 text-base"
                      >
                        <div
                          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${plan.color} text-white text-sm shadow-lg`}
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
                      className={`border-b border-slate-100 hover:bg-slate-50/80 transition-colors ${
                        idx % 2 === 0 ? 'bg-white/50' : 'bg-slate-50/50'
                      }`}
                    >
                      <td className="py-6 px-6 font-medium text-gray-900">
                        <div className="flex items-center gap-3">
                          <feature.icon className="h-5 w-5 text-slate-600" />
                          {feature.name}
                        </div>
                      </td>
                      {pricingPlans.map((plan) => (
                        <td
                          key={`${plan.name}-${feature.key}`}
                          className="py-6 px-4 text-center"
                        >
                          {typeof plan.features[feature.key as keyof typeof plan.features] ===
                          'boolean' ? (
                            plan.features[feature.key as keyof typeof plan.features] ? (
                              <CheckCircle className="h-6 w-6 text-emerald-500 mx-auto" />
                            ) : (
                              <XCircle className="h-6 w-6 text-slate-300 mx-auto" />
                            )
                          ) : (
                            <span className="font-semibold text-gray-900 bg-gradient-to-r from-slate-100 to-slate-200 px-4 py-2 rounded-full shadow-sm">
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

        {/* Enhanced Testimonials */}
        <div className="mt-32">
          <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/50 via-transparent to-pink-600/50" />
            
            <div className="relative z-10">
              <div className="text-center mb-20">
                <h2 className="text-4xl lg:text-6xl font-bold tracking-tight text-white mb-6">
                  Join 50,000+ successful businesses
                </h2>
                <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                  See how companies like yours are growing faster with our platform
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/30 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group"
                  >
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    
                    <p className="text-slate-700 text-lg leading-relaxed mb-8 italic">
                      "{testimonial.quote}"
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                          {testimonial.avatar}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 text-lg">
                            {testimonial.author}
                          </div>
                          <div className="text-slate-600">{testimonial.role}</div>
                          <div className="text-xs text-slate-500">{testimonial.company}</div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="bg-gradient-to-r from-emerald-500 to-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                          {testimonial.growth}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced FAQ Section */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Frequently asked questions
            </h2>
            <p className="mt-6 text-xl text-slate-600 max-w-3xl mx-auto">
              Get answers to the most common questions about our pricing and features
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-white/30 shadow-2xl p-8 md:p-12">
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="border border-slate-200/50 rounded-2xl bg-white/50 backdrop-blur-sm transition-all duration-300 hover:shadow-lg"
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full text-left p-6 flex items-center justify-between hover:bg-slate-50/50 rounded-2xl transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                          <faq.icon className="h-5 w-5 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900">{faq.question}</h3>
                      </div>
                      <div className="text-slate-500">
                        {openFaq === index ? (
                          <ChevronUp className="h-6 w-6 transition-transform duration-300" />
                        ) : (
                          <ChevronDown className="h-6 w-6 transition-transform duration-300" />
                        )}
                      </div>
                    </button>
                    
                    {openFaq === index && (
                      <div className="px-6 pb-6 pt-2">
                        <div className="pl-12">
                          <p className="text-slate-600 leading-relaxed text-lg">{faq.answer}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced CTA Section */}
        <div className="mt-32 mb-16">
          <div className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 rounded-3xl p-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23ffffff&quot; fill-opacity=&quot;0.05&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;4&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
            
            <div className="relative z-10 text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-full text-sm font-medium mb-8">
                <Rocket className="h-4 w-4" />
                <span>Ready to get started?</span>
              </div>
              
              <h2 className="text-4xl lg:text-6xl font-bold tracking-tight text-white mb-6">
                Start growing your waitlist today
              </h2>
              
              <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
                Join thousands of businesses using our platform to build excitement, 
                collect signups, and launch successfully.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <button
                  onClick={() => handleGetAccess('Starter')}
                  className="bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-3 group"
                >
                  Start Free Trial
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button
                  onClick={() => handleGetAccess('Enterprise')}
                  className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300 hover:scale-105 flex items-center gap-3 group"
                >
                  <Mail className="h-5 w-5" />
                  Contact Sales
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              
              <div className="mt-8 flex items-center justify-center gap-8 text-sm text-blue-100">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span>Setup in minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust indicators footer */}
        <div className="mt-20 text-center">
          <p className="text-slate-500 text-sm mb-8">Trusted by companies worldwide</p>
          <div className="flex items-center justify-center gap-12 opacity-60">
            {/* Mock company logos - in real implementation, use actual logos */}
            {['TechStart', 'GrowthCo', 'ScaleUp', 'InnovateLab', 'StartupFlow'].map((company, index) => (
              <div
                key={index}
                className="text-slate-400 font-semibold text-lg hover:text-slate-600 transition-colors"
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
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
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        
        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default PricingPage;