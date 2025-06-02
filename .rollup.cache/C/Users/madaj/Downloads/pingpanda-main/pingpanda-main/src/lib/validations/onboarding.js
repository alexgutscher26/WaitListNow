import { z } from 'zod';
import { customFieldSchema, waitlistStyleSchema, waitlistSettingsSchema } from './waitlist';
export var onboardingCompleteSchema = z.object({
    // Basic Waitlist Information
    name: z.string().min(3, 'Name must be at least 3 characters').max(100),
    description: z.string().max(500).optional(),
    websiteUrl: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
    redirectUrl: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
    // Custom Fields
    customFields: z.array(customFieldSchema).default([]),
    // Styling
    style: waitlistStyleSchema.default({}),
    // Settings
    settings: waitlistSettingsSchema.default({
        emailVerification: true,
        allowDuplicates: false,
        referralEnabled: false,
    }),
    // Terms Acceptance
    termsAccepted: z.boolean().refine(function (val) { return val === true; }, {
        message: 'You must accept the terms and conditions',
    }),
    // Notification Preferences
    emailNotifications: z.boolean().default(true),
    marketingEmails: z.boolean().default(false),
});
//# sourceMappingURL=onboarding.js.map