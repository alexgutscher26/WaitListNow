import {
  Star,
  Users,
  Zap,
  BarChart3,
  Mail,
  ChevronRight,
  ArrowRight,
  MessageCircle,
  Award,
  BarChart2,
  Rocket,
  Trophy,
} from 'lucide-react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import { Heading } from '@/components/heading';
import { Icons } from '@/components/icons';
import { MaxWidthWrapper } from '@/components/max-width-wrapper';
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

      {/* FAQ Section */}
      <section
        id="faq"
        className="py-20 sm:py-28 bg-white"
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
      <section className="py-20 sm:py-28 bg-white">
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

      {/* Footer */}
      <footer className="text-white py-16">
        <MaxWidthWrapper>
          <div className="text-center overflow-hidden px-4">
            {/* Large Brand Text */}
            <div className="mb-12 -mx-4">
              <h2 className="text-7xl sm:text-8xl md:text-8xl lg:text-9xl xl:text-[10rem] 2xl:text-[12rem] font-black text-transparent bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text tracking-tight">
                WaitListNow
              </h2>
            </div>

            {/* Footer Links */}
            <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 text-sm text-gray-400">
              <p>© {new Date().getFullYear()} WaitlistNow Inc. All rights reserved.</p>
              <Link
                href="/terms"
                className="hover:text-white transition-colors"
              >
                Terms of service
              </Link>
              <Link
                href="/privacy"
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/help"
                className="hover:text-white transition-colors"
              >
                Help Center
              </Link>
            </div>
          </div>
        </MaxWidthWrapper>
      </footer>
    </div>
  );
}
