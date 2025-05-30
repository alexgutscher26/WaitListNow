import { z } from 'zod';

export const onboardingCompleteSchema = z
  .object({
    // Add any additional fields needed for onboarding completion
    // For example:
    // fullName: z.string().min(2, 'Full name is required'),
    // companyName: z.string().min(2, 'Company name is required'),
    // website: z.string().url('Please enter a valid URL').optional(),
    // For now, we'll just require an empty object as we don't have specific fields yet
  })
  .strict();

export type OnboardingCompleteData = z.infer<typeof onboardingCompleteSchema>;
