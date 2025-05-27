import { Heading } from '@/components/heading';
import { MaxWidthWrapper } from '@/components/max-width-wrapper';
import {
  Check,
  Star,
  Users,
  Zap,
  BarChart3,
  Mail,
  ChevronRight,
  ArrowRight,
  MessageCircle,
  Award,
  Clock,
  BarChart2,
  MailCheck,
  Rocket,
  Trophy,
  Twitter,
  Linkedin,
  MessageSquare,
  Headphones,
  Code,
  Settings,
  Gift,
  Globe,
  Lock,
  Shield,
  TrendingUp,
  ThumbsUp,
  Calendar,
  FileText,
  Video,
  Crown,
  XCircle,
} from 'lucide-react';
import Image from 'next/image';
import { Icons } from '@/components/icons';
import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShinyButton } from '@/components/shiny-button';

export const metadata: Metadata = {
  title: 'WaitlistNow - Build Hype & Convert Interest to Revenue',
  description:
    'Create stunning waitlist pages that capture leads, build anticipation, and convert signups into paying customers from day one.',
  keywords: ['waitlist', 'launch', 'startup', 'saas', 'landing page', 'email marketing'],
  openGraph: {
    title: 'WaitlistNow - Build Hype & Convert Interest to Revenue',
    description:
      'The smartest way to validate and launch your product with beautiful, conversion-optimized waitlist pages.',
    type: 'website',
    locale: 'en_US',
  },
};

const features = [
  {
    icon: <Zap className="size-6 text-brand-600" />,
    title: 'Lightning-Fast Setup',
    description:
      'Launch your waitlist in minutes, not days. Choose from professionally designed templates or customize every detail to match your brand.',
  },
  {
    icon: <Users className="size-6 text-brand-600" />,
    title: 'Viral Referral System',
    description:
      'Turn every signup into multiple signups with built-in referral mechanics, rewards, and leaderboards.',
  },
  {
    icon: <BarChart3 className="size-6 text-brand-600" />,
    title: 'Advanced Analytics',
    description:
      'Track conversion rates, identify your best traffic sources, and segment users by engagement level.',
  },
  {
    icon: <Mail className="size-6 text-brand-600" />,
    title: 'Smart Email Campaigns',
    description:
      'Automated email sequences that nurture leads and convert waitlist subscribers into customers.',
  },
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Founder, TechStart',
    content:
      'WaitlistNow helped us gather 5,000+ signups before launch. The referral system was a game-changer!',
    avatar: '/avatars/sarah.jpg',
  },
  {
    name: 'Michael Chen',
    role: 'Product Manager, LaunchLabs',
    content:
      'The analytics dashboard gave us incredible insights into our audience. We doubled our conversion rate in 2 weeks.',
    avatar: '/avatars/michael.jpg',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Marketing Director, StartupX',
    content:
      'The email automation features saved us countless hours. Our open rates are through the roof!',
    avatar: '/avatars/emily.jpg',
  },
  {
    name: 'David Kim',
    role: 'CEO, LaunchPad',
    content:
      "We tried other waitlist tools, but none matched WaitlistNow's ease of use and powerful features.",
    avatar: '/avatars/david.jpg',
  },
  {
    name: 'Priya Patel',
    role: 'Growth Lead, NextBigThing',
    content:
      'The customer support is exceptional. They helped us customize our waitlist page exactly how we wanted.',
    avatar: '/avatars/priya.jpg',
  },
];

const faqs = [
  {
    category: 'General',
    items: [
      {
        question: 'How quickly can I set up my waitlist?',
        answer:
          'Most users can have their waitlist up and running in under 5 minutes using our pre-designed templates.',
      },
      {
        question: 'Do you offer custom domains?',
        answer:
          'Yes, you can connect your custom domain or use our subdomain. We also support SSL certificates for all waitlist pages.',
      },
      {
        question: 'What payment methods do you accept?',
        answer:
          'We accept all major credit cards and PayPal. You can choose between monthly and annual billing cycles.',
      },
      {
        question: 'Can I export my waitlist data?',
        answer: 'Absolutely! You can export your waitlist data in CSV or JSON format at any time.',
      },
    ],
  },
  {
    category: 'Features',
    items: [
      {
        question: 'Can I customize the waitlist form?',
        answer:
          'Yes, our drag-and-drop editor lets you customize every aspect of your waitlist form to match your brand.',
      },
      {
        question: 'Do you provide analytics?',
        answer:
          "Yes, you'll get detailed analytics on signup rates, traffic sources, and user behavior.",
      },
      {
        question: 'Is there an API available?',
        answer:
          'Yes, we offer a comprehensive API for advanced users who want to build custom integrations.',
      },
      {
        question: 'Can I segment my waitlist?',
        answer:
          'Absolutely! You can create unlimited segments based on user behavior and demographics.',
      },
    ],
  },
];

const pricingPlans = [
  {
    name: 'Starter',
    price: '$29',
    period: '/month',
    description: 'Perfect for solo creators and small projects',
    features: [
      'Up to 1,000 subscribers',
      'Basic analytics',
      'Email support',
      'Custom branding',
      'Basic integrations',
    ],
    cta: 'Start Free Trial',
    popular: false,
  },
  {
    name: 'Growth',
    price: '$99',
    period: '/month',
    description: 'Ideal for growing startups and businesses',
    features: [
      'Up to 10,000 subscribers',
      'Advanced analytics',
      'Priority support',
      'Custom domains',
      'API access',
      'A/B testing',
    ],
    cta: 'Get Started',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For large businesses with custom needs',
    features: [
      'Unlimited subscribers',
      'Dedicated account manager',
      'Custom development',
      'SLA & priority support',
      'Custom integrations',
      'Advanced security',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

const integrations = [
  { name: 'Mailchimp', logo: '/integrations/mailchimp.svg' },
  { name: 'Slack', logo: '/integrations/slack.svg' },
  { name: 'Zapier', logo: '/integrations/zapier.svg' },
  { name: 'HubSpot', logo: '/integrations/hubspot.svg' },
  { name: 'Stripe', logo: '/integrations/stripe.svg' },
  { name: 'Google Analytics', logo: '/integrations/ga.svg' },
  { name: 'Segment', logo: '/integrations/segment.svg' },
  { name: 'Webflow', logo: '/integrations/webflow.svg' },
];

const caseStudies = [
  {
    title: 'How TechStart Grew to 50,000 Waitlist Signups',
    excerpt:
      'Learn how TechStart used our referral system to achieve explosive growth before launch.',
    metrics: '50,000+ signups • 200% referral rate • $500k in pre-launch revenue',
    logo: '/logos/techstart.svg',
  },
  {
    title: "From 0 to 10,000: LaunchPad's Success Story",
    excerpt:
      'Discover how LaunchPad validated their product and secured funding with our waitlist.',
    metrics: '10,000+ signups • 45% conversion rate • $1.2M seed round',
    logo: '/logos/launchpad.svg',
  },
];

const teamMembers = [
  {
    name: 'Alex Johnson',
    role: 'CEO & Co-founder',
    bio: 'Former PM at Google. Loves solving hard problems.',
    image: '/team/alex.jpg',
    social: { twitter: '#', linkedin: '#' },
  },
  {
    name: 'Jamie Smith',
    role: 'CTO & Co-founder',
    bio: 'Ex-engineering lead at Stripe. Full-stack wizard.',
    image: '/team/jamie.jpg',
    social: { twitter: '#', linkedin: '#' },
  },
  {
    name: 'Taylor Chen',
    role: 'Head of Design',
    bio: 'Previously at Airbnb. Makes things beautiful.',
    image: '/team/taylor.jpg',
    social: { twitter: '#', linkedin: '#' },
  },
];

const timeline = [
  {
    date: 'Day 1',
    title: 'Set up your waitlist',
    description: 'Create and customize your waitlist page in minutes.',
    icon: <Zap className="size-5" />,
  },
  {
    date: 'Day 3',
    title: 'Launch your campaign',
    description: 'Share your waitlist and start collecting signups.',
    icon: <Rocket className="size-5" />,
  },
  {
    date: 'Day 7',
    title: 'Engage your audience',
    description: 'Send updates and nurture your leads.',
    icon: <MessageCircle className="size-5" />,
  },
  {
    date: 'Day 14',
    title: 'Launch with confidence',
    description: 'Convert your waitlist into paying customers.',
    icon: <Trophy className="size-5" />,
  },
];

/**
 * This component represents the main landing page of the WaitlistNow application.
 * It includes sections such as a hero section, features overview, customer success stories,
 * and a call-to-action button to start building a waitlist.
 *
 * @returns {JSX.Element} The JSX representation of the landing page.
 */
export default function Page() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-b from-brand-25 to-white">
        <MaxWidthWrapper className="text-center px-4 sm:px-6">
          <div className="relative mx-auto text-center flex flex-col items-center gap-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-100 text-brand-700 text-sm font-medium mb-2">
              <Star className="size-4" />
              Trusted by 5,000+ creators & startups
            </div>

            <div className="space-y-6 max-w-4xl mx-auto">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900">
                <span className="block">Build Hype Before You Launch,</span>
                <span className="relative bg-gradient-to-r from-brand-600 to-brand-800 text-transparent bg-clip-text">
                  Convert Interest to Revenue
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                The smartest way to validate and launch your product. Create stunning waitlist pages
                that{' '}
                <span className="font-semibold text-gray-700">
                  capture leads, build anticipation, and convert signups
                </span>{' '}
                into paying customers from day one.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <ShinyButton
                  href="/sign-up"
                  className="h-14 px-8 text-base font-medium shadow-lg hover:scale-[1.02] bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800"
                >
                  Get Started Free
                </ShinyButton>
                <Link
                  href="#how-it-works"
                  className="inline-flex items-center justify-center h-14 px-6 text-base font-medium text-gray-700 transition-colors duration-200 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  How it works
                  <ChevronRight className="ml-2 size-5" />
                </Link>
              </div>

              {/* Social Proof */}
              <div className="pt-6">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="size-8 rounded-full bg-gray-200 border-2 border-white"
                      />
                    ))}
                  </div>
                  <span>Join 10,000+ businesses growing with WaitlistNow</span>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>

        {/* Hero Image/Video */}
        <div className="mt-16 max-w-6xl mx-auto px-4 sm:px-6">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-white p-1">
            <div className="aspect-video bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-6">
                  <div className="flex space-x-1">
                    <div className="size-3 rounded-full bg-red-500" />
                    <div className="size-3 rounded-full bg-yellow-500" />
                    <div className="size-3 rounded-full bg-green-500" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">waitlist.yourdomain.com</span>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Join the Waitlist</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Be the first to know when we launch. Early adopters get exclusive perks!
                </p>
                <div className="max-w-sm mx-auto space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  />
                  <button className="w-full bg-gradient-to-r from-brand-600 to-brand-700 text-white font-medium py-3 px-6 rounded-lg hover:opacity-90 transition-opacity">
                    Join Waitlist
                  </button>
                </div>
                <p className="mt-4 text-sm text-gray-500">Join 1,247 others on the waitlist</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="py-20 sm:py-28 bg-white"
      >
        <MaxWidthWrapper className="space-y-16 sm:space-y-20">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-2 text-sm font-medium text-brand-700 bg-brand-50 rounded-full mb-4">
              How It Works
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Launch your waitlist in minutes
            </h2>
            <p className="text-lg text-gray-600">
              Get started quickly with our simple 3-step process to validate your idea and start
              building your audience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <MessageCircle className="size-8 text-brand-600" />,
                title: '1. Create Your Page',
                description: 'Choose a template and customize it to match your brand in minutes.',
              },
              {
                icon: <Award className="size-8 text-brand-600" />,
                title: '2. Share & Grow',
                description:
                  'Share your waitlist link and use our referral tools to grow your audience.',
              },
              {
                icon: <BarChart2 className="size-8 text-brand-600" />,
                title: '3. Launch & Convert',
                description:
                  'Engage your waitlist with email campaigns and convert them into customers.',
              },
            ].map((step, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="size-14 rounded-xl bg-brand-50 flex items-center justify-center mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        className="py-20 sm:py-28 bg-gradient-to-b from-white to-gray-50"
      >
        <MaxWidthWrapper>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-2 text-sm font-medium text-brand-700 bg-brand-50 rounded-full mb-4">
              Pricing Plans
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Start for free, upgrade as you grow. No hidden fees or surprises.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4 sm:px-6">
            {/* Free Plan */}
            {[
              {
                name: 'Free',
                price: '$0',
                period: '/month',
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
                },
              },
              {
                name: 'Starter',
                price: '$19',
                period: '/month',
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
                },
              },
              {
                name: 'Growth',
                price: '$49',
                period: '/month',
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
                  teamMembers: '3',
                  support: 'Email',
                },
              },
              {
                name: 'Pro',
                price: '$99',
                period: '/month',
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
            ].map((plan, index) => (
              <div
                key={index}
                className={`group relative rounded-2xl p-8 border-2 transition-all duration-300 flex flex-col h-full ${
                  plan.featured
                    ? 'border-brand-500 bg-white shadow-xl scale-[1.02] ring-2 ring-brand-100 ring-offset-2'
                    : 'border-gray-200 bg-white hover:border-brand-300 hover:shadow-lg'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-brand-500 to-brand-600 text-white text-xs font-semibold px-4 py-1.5 rounded-full whitespace-nowrap shadow-md">
                    {plan.badge}
                  </div>
                )}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={`p-2.5 rounded-xl bg-gradient-to-r ${plan.color} text-white shadow-md`}
                  >
                    <plan.icon className="size-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                    <span className="text-gray-500 ml-1.5">{plan.period}</span>
                  </div>
                  {plan.originalPrice && (
                    <p className="text-sm text-gray-500 mt-1">
                      <span className="line-through">{plan.originalPrice}</span>
                      <span className="ml-1.5 text-green-600 font-medium">
                        {(() => {
                          try {
                            // Safely extract and validate prices
                            const originalPrice = parseFloat(
                              plan.originalPrice.replace(/[^0-9.]/g, ''),
                            );
                            const currentPrice = parseFloat(plan.price.replace(/[^0-9.]/g, ''));

                            // Validate the parsed numbers
                            if (isNaN(originalPrice) || isNaN(currentPrice) || originalPrice <= 0) {
                              return '';
                            }

                            // Calculate discount percentage safely
                            const discount = Math.round((1 - currentPrice / originalPrice) * 100);

                            // Only show if there's an actual discount
                            return discount > 0 ? `Save ${discount}%` : '';
                          } catch (error) {
                            console.error('Error calculating discount:', error);
                            return '';
                          }
                        })()}
                      </span>
                    </p>
                  )}
                </div>

                <p className="text-gray-600 mb-6 text-sm leading-relaxed">{plan.description}</p>

                <div className="space-y-3.5 mb-8 flex-grow">
                  <div className="flex items-start">
                    <div className="mt-0.5">
                      {plan.features.widget ? (
                        <Check className="size-5 text-green-500 flex-shrink-0" />
                      ) : (
                        <XCircle className="size-5 text-gray-300 flex-shrink-0" />
                      )}
                    </div>
                    <span className="ml-3 text-gray-700">
                      <span className="font-medium">{plan.features.projects}</span>{' '}
                      {plan.features.projects === '1' ? 'Project' : 'Projects'}
                    </span>
                  </div>
                  <div className="flex items-start">
                    <div className="mt-0.5">
                      <Check className="size-5 text-green-500 flex-shrink-0" />
                    </div>
                    <span className="ml-3 text-gray-700">
                      Up to <span className="font-medium">{plan.features.signups}</span> signups
                    </span>
                  </div>
                  <div className="flex items-start">
                    <div className="mt-0.5">
                      {plan.features.referralLinks ? (
                        <Check className="size-5 text-green-500 flex-shrink-0" />
                      ) : (
                        <XCircle className="size-5 text-gray-300 flex-shrink-0" />
                      )}
                    </div>
                    <span className="ml-3 text-gray-700">Referral System</span>
                  </div>
                  <div className="flex items-start">
                    <div className="mt-0.5">
                      {plan.features.customBranding ? (
                        <Check className="size-5 text-green-500 flex-shrink-0" />
                      ) : (
                        <XCircle className="size-5 text-gray-300 flex-shrink-0" />
                      )}
                    </div>
                    <span className="ml-3 text-gray-700">Custom Branding</span>
                  </div>
                  <div className="flex items-start">
                    <div className="mt-0.5">
                      {plan.features.emailIntegrations ? (
                        <Check className="size-5 text-green-500 flex-shrink-0" />
                      ) : (
                        <XCircle className="size-5 text-gray-300 flex-shrink-0" />
                      )}
                    </div>
                    <span className="ml-3 text-gray-700">Email Integrations</span>
                  </div>
                  {plan.features.teamMembers && (
                    <div className="flex items-start">
                      <div className="mt-0.5">
                        <Check className="size-5 text-green-500 flex-shrink-0" />
                      </div>
                      <span className="ml-3 text-gray-700">
                        <span className="font-medium">{plan.features.teamMembers}</span> Team
                        Members
                      </span>
                    </div>
                  )}
                  {plan.features.support && (
                    <div className="flex items-start">
                      <div className="mt-0.5">
                        <Check className="size-5 text-green-500 flex-shrink-0" />
                      </div>
                      <span className="ml-3 text-gray-700">
                        <span className="font-medium">{plan.features.support}</span> Support
                      </span>
                    </div>
                  )}
                </div>

                <Button
                  asChild
                  size="lg"
                  className={`w-full mt-auto font-medium transition-all duration-200 ${
                    plan.featured
                      ? 'bg-gradient-to-r from-brand-600 to-brand-700 text-white hover:from-brand-700 hover:to-brand-800 hover:shadow-lg'
                      : 'bg-white text-brand-600 border-2 border-brand-600 hover:bg-brand-50 hover:border-brand-700 hover:text-brand-700'
                  }`}
                >
                  <Link href="/sign-up">
                    {plan.buttonText}
                    {!plan.featured && <ArrowRight className="ml-2 size-4" />}
                  </Link>
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="inline-flex items-center justify-center px-6 py-3 bg-blue-50 rounded-full">
              <Shield className="size-5 text-blue-600 mr-2" />
              <span className="text-sm font-medium text-blue-700">
                14-day money-back guarantee. No risk, cancel anytime.
              </span>
            </div>
            <p className="mt-8 text-gray-600">
              Need something custom?{' '}
              <a
                href="#contact"
                className="text-brand-600 hover:underline font-medium"
              >
                Contact our sales team
              </a>
            </p>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Integrations Section */}
      <section className="py-16 bg-gray-50">
        <MaxWidthWrapper>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Works with your favorite tools
            </h2>
            <p className="text-lg text-gray-600">
              Connect WaitlistNow with the tools you already use.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 items-center justify-items-center">
            {[
              { name: 'Mailchimp' },
              { name: 'Slack' },
              { name: 'Zapier' },
              { name: 'HubSpot' },
              { name: 'Stripe' },
              { name: 'Google Analytics' },
              { name: 'Segment' },
              { name: 'Webflow' },
            ].map((integration, index) => (
              <div
                key={index}
                className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-12 w-24 flex items-center justify-center">
                  <span className="text-gray-400 font-medium">{integration.name}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600">
              Don't see your favorite tool?{' '}
              <a
                href="#"
                className="text-brand-600 hover:underline font-medium"
              >
                Request an integration
              </a>
            </p>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Case Studies Section */}
      <section className="py-20 bg-white">
        <MaxWidthWrapper>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Success stories</h2>
            <p className="text-lg text-gray-600">
              See how companies like yours achieved amazing results with WaitlistNow.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {caseStudies.map((study, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="h-48 bg-gradient-to-r from-blue-50 to-indigo-50 flex items-center justify-center">
                  <div className="h-12 w-32 bg-gray-200 rounded" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{study.title}</h3>
                  <p className="text-gray-600 mb-4">{study.excerpt}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <BarChart2 className="size-4 mr-2 text-brand-500" />
                    <span>{study.metrics}</span>
                  </div>
                  <button className="mt-4 text-brand-600 hover:text-brand-700 font-medium flex items-center">
                    Read case study <ArrowRight className="ml-1 size-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <MaxWidthWrapper>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Meet the team</h2>
            <p className="text-lg text-gray-600">
              We're a passionate team on a mission to help you launch successfully.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl text-center hover:shadow-lg transition-shadow"
              >
                <div className="size-32 mx-auto mb-4 rounded-full bg-gray-200 overflow-hidden">
                  <div className="h-full w-full flex items-center justify-center text-4xl text-gray-400">
                    {member.name.charAt(0)}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                <p className="text-brand-600 font-medium mb-2">{member.role}</p>
                <p className="text-gray-600 mb-4">{member.bio}</p>
                <div className="flex justify-center space-x-4">
                  <a
                    href={member.social.twitter}
                    className="text-gray-400 hover:text-brand-500"
                  >
                    <span className="sr-only">Twitter</span>
                    <Twitter className="size-5" />
                  </a>
                  <a
                    href={member.social.linkedin}
                    className="text-gray-400 hover:text-brand-500"
                  >
                    <span className="sr-only">LinkedIn</span>
                    <Linkedin className="size-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <MaxWidthWrapper>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Your 14-day launch plan
            </h2>
            <p className="text-lg text-gray-600">
              Follow this simple timeline to make the most of your waitlist.
            </p>
          </div>

          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-gray-200" />

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div
                  key={index}
                  className={`relative flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className="flex-1">
                    <div
                      className={`p-6 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow ${index % 2 === 0 ? 'mr-8' : 'ml-8'}`}
                    >
                      <div className="flex items-center mb-2">
                        <div className="flex items-center justify-center size-10 rounded-full bg-brand-100 text-brand-600 mr-3">
                          {item.icon}
                        </div>
                        <span className="text-sm font-medium text-gray-500">{item.date}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-500 border-4 border-white" />
                </div>
              ))}
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-brand-600 to-brand-800 text-white">
        <MaxWidthWrapper className="text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Launch like a pro</h2>
            <p className="text-xl text-brand-100 mb-8">
              Get our best launch tips, case studies, and resources delivered to your inbox.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-3 rounded-lg border-0 text-gray-900 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-600"
              />
              <button className="px-6 py-3 bg-white text-brand-700 font-medium rounded-lg hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>

            <p className="mt-4 text-sm text-brand-200">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* FAQ Section */}
      <section
        id="faq"
        className="py-20 sm:py-28 bg-gray-50"
      >
        <MaxWidthWrapper>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Frequently asked questions
            </h2>
            <p className="text-lg text-gray-600">Everything you need to know about WaitlistNow.</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-12">
            {[
              {
                category: 'General',
                items: [
                  {
                    question: 'What is WaitlistNow?',
                    answer:
                      'WaitlistNow is a platform that helps you create and manage your waitlist, engage with your audience, and convert them into paying customers.',
                  },
                  {
                    question: 'How does it work?',
                    answer:
                      'WaitlistNow provides a simple 3-step process to create and manage your waitlist. You can customize your waitlist page, share it with your audience, and track your progress.',
                  },
                ],
              },
              {
                category: 'Pricing',
                items: [
                  {
                    question: 'How much does it cost?',
                    answer:
                      'WaitlistNow offers a free plan, as well as several paid plans starting at $29/month. You can upgrade or downgrade at any time.',
                  },
                  {
                    question: "What's included in the free plan?",
                    answer:
                      'The free plan includes up to 100 subscribers, basic analytics, and limited support.',
                  },
                ],
              },
              {
                category: 'Integrations',
                items: [
                  {
                    question: 'Does WaitlistNow integrate with my favorite tools?',
                    answer:
                      'Yes, WaitlistNow integrates with many popular tools, including Mailchimp, Slack, Zapier, and more.',
                  },
                  {
                    question: 'How do I integrate WaitlistNow with my tool?',
                    answer:
                      'You can integrate WaitlistNow with your tool by following the instructions in our documentation or by contacting our support team.',
                  },
                ],
              },
            ].map((category, catIndex) => (
              <div
                key={catIndex}
                className="space-y-4"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.category}</h3>
                <div className="space-y-4">
                  {category.items.map((faq, index) => (
                    <div
                      key={index}
                      className="bg-white p-6 rounded-xl border border-gray-200"
                    >
                      <h4 className="text-lg font-medium text-gray-900 mb-2">{faq.question}</h4>
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-gray-600">
              Still have questions?{' '}
              <a
                href="#contact"
                className="text-brand-600 hover:underline font-medium"
              >
                Contact our support team
              </a>
            </p>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Features */}
      <section className="py-20 sm:py-28 bg-gray-50">
        <MaxWidthWrapper className="flex flex-col items-center gap-16 sm:gap-20">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-center text-base/7 font-semibold text-brand-600 mb-3">
              Complete Waitlist Solution
            </h2>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Everything you need to launch successfully
            </h2>
            <p className="text-lg text-gray-600">
              Our platform provides all the tools you need to build, grow, and convert your waitlist
              into paying customers.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3 lg:grid-rows-2">
            {/* first bento grid element */}
            <div className="relative lg:row-span-2">
              <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-[2rem]" />

              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
                <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="size-6 text-brand-600" />
                    <p className="text-lg/7 font-medium tracking-tight text-brand-950 max-lg:text-center">
                      Lightning-Fast Setup
                    </p>
                  </div>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                    Launch your waitlist in minutes, not days. Choose from professionally designed
                    templates or customize every detail to match your brand.
                  </p>
                </div>

                <div className="relative min-h-[30rem] w-full grow [container-type:inline-size] max-lg:mx-auto max-lg:max-w-sm">
                  <div className="absolute inset-x-10 bottom-0 top-10 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-gray-700 bg-gray-900 shadow-2xl">
                    <div className="size-full bg-gradient-to-b from-brand-500 to-brand-700 flex items-center justify-center">
                      <div className="text-white text-center p-4">
                        <h3 className="text-xl font-bold mb-2">Your Waitlist</h3>
                        <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                          <p className="text-sm mb-3">Join the waitlist</p>
                          <div className="bg-white rounded px-3 py-2 text-gray-800 text-xs mb-2">
                            Enter your email...
                          </div>
                          <div className="bg-brand-800 rounded px-3 py-1 text-xs">
                            Get Early Access
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-l-[2rem]" />
            </div>

            {/* second bento grid element */}
            <div className="relative max-lg:row-start-1">
              <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem]" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
                <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="size-6 text-brand-600" />
                    <p className="text-lg/7 font-medium tracking-tight text-brand-950 max-lg:text-center">
                      Viral Referral System
                    </p>
                  </div>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                    Turn every signup into multiple signups. Built-in referral mechanics with
                    rewards, leaderboards, and social sharing.
                  </p>
                </div>
                <div className="flex flex-1 items-center justify-center px-8 max-lg:pb-12 max-lg:pt-10 sm:px-10 lg:pb-2">
                  <div className="w-full max-lg:max-w-xs bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 p-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-700 mb-1">2,847</div>
                      <div className="text-sm text-green-600 mb-3">Total Referrals</div>
                      <div className="flex items-center justify-center gap-2 text-xs text-green-600">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        +127 this week
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-t-[2rem]" />
            </div>

            {/* third bento grid element */}
            <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
              <div className="absolute inset-px rounded-lg bg-white" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)]">
                <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                  <div className="flex items-center gap-2 mb-3">
                    <BarChart3 className="size-6 text-brand-600" />
                    <p className="text-lg/7 font-medium tracking-tight text-brand-950 max-lg:text-center">
                      Advanced Analytics
                    </p>
                  </div>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                    Track conversion rates, identify your best traffic sources, and segment users by
                    engagement level and demographics.
                  </p>
                </div>

                <div className="flex flex-1 items-center justify-center px-8 max-lg:pb-12 max-lg:pt-10 sm:px-10 lg:pb-2">
                  <div className="w-full max-lg:max-w-xs">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-4">
                      <div className="grid grid-cols-2 gap-3 text-center">
                        <div>
                          <div className="text-lg font-bold text-blue-700">73%</div>
                          <div className="text-xs text-blue-600">Conversion</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-blue-700">4.2x</div>
                          <div className="text-xs text-blue-600">Viral Factor</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5" />
            </div>

            {/* fourth bento grid element */}
            <div className="relative lg:row-span-2">
              <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]" />

              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
                <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                  <div className="flex items-center gap-2 mb-3">
                    <Mail className="size-6 text-brand-600" />
                    <p className="text-lg/7 font-medium tracking-tight text-brand-950 max-lg:text-center">
                      Smart Email Campaigns
                    </p>
                  </div>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                    Automated email sequences that nurture leads, build excitement, and convert
                    waitlist subscribers into customers.
                  </p>
                </div>

                <div className="flex h-full min-h-[30rem] w-full items-center justify-center p-8">
                  <div className="w-full max-w-sm">
                    <div className="bg-gradient-to-b from-purple-50 to-pink-50 rounded-xl border border-purple-200 p-6">
                      <div className="space-y-3">
                        <div className="bg-white rounded-lg p-3 shadow-sm border-l-4 border-purple-400">
                          <div className="text-xs text-purple-600 font-medium">Welcome Email</div>
                          <div className="text-xs text-gray-600 mt-1">Sent immediately</div>
                        </div>
                        <div className="bg-white rounded-lg p-3 shadow-sm border-l-4 border-blue-400">
                          <div className="text-xs text-blue-600 font-medium">Progress Update</div>
                          <div className="text-xs text-gray-600 mt-1">Weekly updates</div>
                        </div>
                        <div className="bg-white rounded-lg p-3 shadow-sm border-l-4 border-green-400">
                          <div className="text-xs text-green-600 font-medium">Launch Alert</div>
                          <div className="text-xs text-gray-600 mt-1">When you go live</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]" />
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      <section className="relative py-24 sm:py-32 bg-white">
        <MaxWidthWrapper className="flex flex-col items-center gap-16 sm:gap-20">
          <div>
            <h2 className="text-center text-base/7 font-semibold text-brand-600">
              Success Stories
            </h2>
            <Heading className="text-center">How founders are winning with waitlists</Heading>
          </div>

          <div className="mx-auto grid max-w-2xl grid-cols-1 px-4 lg:mx-0 lg:max-w-none lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-gray-200">
            {/* first customer review */}
            <div className="flex flex-auto flex-col gap-4 bg-brand-25 p-6 sm:p-8 lg:p-16 rounded-t-[2rem] lg:rounded-tr-none lg:rounded-l-[2rem]">
              <div className="flex gap-0.5 mb-2 justify-center lg:justify-start">
                <Star className="size-5 text-brand-600 fill-brand-600" />
                <Star className="size-5 text-brand-600 fill-brand-600" />
                <Star className="size-5 text-brand-600 fill-brand-600" />
                <Star className="size-5 text-brand-600 fill-brand-600" />
                <Star className="size-5 text-brand-600 fill-brand-600" />
              </div>

              <p className="text-base sm:text-lg lg:text-lg/8 font-medium tracking-tight text-brand-950 text-center lg:text-left text-pretty">
                WaitlistNow helped us build a 15,000-person waitlist before launch. We converted 40%
                into paying customers on day one - that's $180k in revenue from the waitlist alone!
              </p>

              <div className="flex flex-col justify-center lg:justify-start sm:flex-row items-center sm:items-start gap-4 mt-2">
                <Image
                  src="/user-2.png"
                  className="rounded-full object-cover"
                  alt="Sarah Chen"
                  width={48}
                  height={48}
                />
                <div className="flex flex-col items-center sm:items-start">
                  <p className="font-semibold flex items-center">
                    Sarah Chen
                    <Icons.verificationBadge className="size-4 inline-block ml-1.5" />
                  </p>
                  <p className="text-sm text-gray-600">Founder @ MindfulApp</p>
                </div>
              </div>
            </div>

            {/* second customer review */}
            <div className="flex flex-auto flex-col gap-4 bg-brand-25 p-6 sm:p-8 lg:p-16 rounded-b-[2rem] lg:rounded-bl-none lg:rounded-r-[2rem]">
              <div className="flex gap-0.5 mb-2 justify-center lg:justify-start">
                <Star className="size-5 text-brand-600 fill-brand-600" />
                <Star className="size-5 text-brand-600 fill-brand-600" />
                <Star className="size-5 text-brand-600 fill-brand-600" />
                <Star className="size-5 text-brand-600 fill-brand-600" />
                <Star className="size-5 text-brand-600 fill-brand-600" />
              </div>

              <p className="text-base sm:text-lg lg:text-lg/8 font-medium tracking-tight text-brand-950 text-center lg:text-left text-pretty">
                The viral referral system is incredible. Our waitlist grew from 500 to 12,000 in
                just 3 weeks. The analytics showed us exactly which incentives worked best.
              </p>

              <div className="flex flex-col justify-center lg:justify-start sm:flex-row items-center sm:items-start gap-4 mt-2">
                <Image
                  src="/user-1.png"
                  className="rounded-full object-cover"
                  alt="Marcus Rodriguez"
                  width={48}
                  height={48}
                />
                <div className="flex flex-col items-center sm:items-start">
                  <p className="font-semibold flex items-center">
                    Marcus Rodriguez
                    <Icons.verificationBadge className="size-4 inline-block ml-1.5" />
                  </p>
                  <p className="text-sm text-gray-600">CEO @ TechFlow</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center max-w-2xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to build your waitlist?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Join 5,000+ founders who've successfully launched with WaitlistNow
            </p>
            <div className="flex justify-center">
              <ShinyButton
                href="/sign-up"
                className="h-14 w-full max-w-xs text-base shadow-lg bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800"
              >
                Start Your Waitlist Today
              </ShinyButton>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
