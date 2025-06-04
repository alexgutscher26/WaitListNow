-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "Plan" AS ENUM ('FREE', 'PRO', 'STARTER', 'GROWTH');

-- CreateEnum
CREATE TYPE "WaitlistStatus" AS ENUM ('DRAFT', 'ACTIVE', 'PAUSED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "SubscriberStatus" AS ENUM ('PENDING', 'VERIFIED', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "DeliveryStatus" AS ENUM ('PENDING', 'DELIVERED', 'FAILED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "externalId" TEXT,
    "plan" "Plan" NOT NULL DEFAULT 'FREE',
    "email" TEXT NOT NULL,
    "apiKey" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "onboardingComplete" BOOLEAN NOT NULL DEFAULT false,
    "onboardingCompletedAt" TIMESTAMP(3),
    "bio" TEXT,
    "company" TEXT,
    "name" TEXT,
    "notificationPreferences" JSONB DEFAULT '{}',
    "preferences" JSONB DEFAULT '{}',
    "timezone" TEXT NOT NULL DEFAULT 'UTC',
    "website" TEXT,
    "referralCode" TEXT,
    "waitlist_preferences" JSONB DEFAULT '{"maxSubscribers": 1000, "emailNotifications": true, "defaultWaitlistLimit": 1, "autoApproveSubscribers": true, "requireEmailVerification": false}',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Waitlist" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "websiteUrl" TEXT,
    "redirectUrl" TEXT,
    "userId" TEXT NOT NULL,
    "status" "WaitlistStatus" NOT NULL DEFAULT 'DRAFT',
    "customFields" JSONB,
    "style" JSONB,
    "settings" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "subscriberCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Waitlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscriber" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "waitlistId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "customFields" JSONB,
    "referralCode" TEXT,
    "referredBy" TEXT,
    "status" "SubscriberStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "verificationToken" TEXT,

    CONSTRAINT "Subscriber_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_externalId_key" ON "User"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_apiKey_key" ON "User"("apiKey");

-- CreateIndex
CREATE UNIQUE INDEX "User_referralCode_key" ON "User"("referralCode");

-- CreateIndex
CREATE INDEX "User_email_apiKey_idx" ON "User"("email", "apiKey");

-- CreateIndex
CREATE UNIQUE INDEX "Waitlist_slug_key" ON "Waitlist"("slug");

-- CreateIndex
CREATE INDEX "Waitlist_slug_userId_idx" ON "Waitlist"("slug", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Subscriber_referralCode_key" ON "Subscriber"("referralCode");

-- CreateIndex
CREATE UNIQUE INDEX "Subscriber_verificationToken_key" ON "Subscriber"("verificationToken");

-- CreateIndex
CREATE INDEX "Subscriber_referralCode_idx" ON "Subscriber"("referralCode");

-- CreateIndex
CREATE UNIQUE INDEX "Subscriber_email_waitlistId_key" ON "Subscriber"("email", "waitlistId");

-- AddForeignKey
ALTER TABLE "Waitlist" ADD CONSTRAINT "Waitlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscriber" ADD CONSTRAINT "Subscriber_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscriber" ADD CONSTRAINT "Subscriber_waitlistId_fkey" FOREIGN KEY ("waitlistId") REFERENCES "Waitlist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
