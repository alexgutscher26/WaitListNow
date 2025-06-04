import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';

const REWARD_TIERS = [
  { count: 1, name: 'Early Supporter', reward: 'Priority access, exclusive badge' },
  { count: 3, name: 'Rising Referrer', reward: 'Access to behind-the-scenes updates or beta features' },
  { count: 5, name: 'Inner Circle', reward: 'Free 1-month trial / Pro plan / "Founding Member" badge' },
  { count: 10, name: 'Power Promoter', reward: 'Discounted subscription (e.g., 50% off for 3 months)' },
  { count: 25, name: 'Brand Ambassador', reward: 'Swag pack (stickers, T-shirt) or lifetime deal contest entry' },
  { count: 50, name: 'Growth Hacker', reward: 'Lifetime plan or a custom domain subdomain (like yourname.waitlistnow.app)' },
  { count: 100, name: 'Legend Tier', reward: 'Public shoutout, profile feature, big reward like AirPods, etc.' },
];

export async function GET() {
  try {
    const authUser = await auth();
    const userId = authUser.userId;
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user and their referralCode
    const user = await db.user.findUnique({
      where: { externalId: userId },
      select: { referralCode: true },
    });
    if (!user || !user.referralCode) {
      return NextResponse.json({ error: 'Referral code not found' }, { status: 404 });
    }

    // Count successful referrals (subscribers who used this code)
    const referralCount = await db.subscriber.count({
      where: { referredBy: user.referralCode },
    });

    // Build referral link
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const referralLink = `${baseUrl}/ref/${user.referralCode}`;

    // Calculate unlocked rewards and next reward
    const unlocked = REWARD_TIERS.filter(tier => referralCount >= tier.count);
    const next = REWARD_TIERS.find(tier => referralCount < tier.count) || null;
    const progress = next
      ? Math.min(100, Math.round((referralCount / next.count) * 100))
      : 100;
    const referralsToNext = next ? next.count - referralCount : 0;

    // Top 1% referrer logic (simple: top 1% by referral count)
    const allCounts = await db.subscriber.groupBy({
      by: ['referredBy'],
      _count: { id: true },
      where: { referredBy: { not: null } },
    });
    const sorted = allCounts.map(g => g._count.id).sort((a, b) => b - a);
    const rank = sorted.findIndex(c => c <= referralCount) + 1;
    const topPercent = rank > 0 ? (rank / sorted.length) * 100 : 100;
    const topReferrer = topPercent <= 1;

    return NextResponse.json({
      referralLink,
      referralCode: user.referralCode,
      referralCount,
      rewards: unlocked,
      nextReward: next
        ? {
            ...next,
            referralsToNext,
            progress,
            message: `You're ${referralsToNext} away from ${next.name}!`,
          }
        : null,
      progress,
      topReferrer,
    });
  } catch (error) {
    console.error('Error fetching referral info:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 