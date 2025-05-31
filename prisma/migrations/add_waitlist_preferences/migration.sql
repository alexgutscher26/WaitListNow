-- Add waitlistPreferences column to User table if it doesn't exist
ALTER TABLE "User" 
ADD COLUMN IF NOT EXISTS "waitlistPreferences" JSONB DEFAULT '{"defaultWaitlistLimit":1,"autoApproveSubscribers":true,"emailNotifications":true,"maxSubscribers":1000,"requireEmailVerification":false}'::jsonb;
