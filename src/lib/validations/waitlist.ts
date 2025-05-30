import { z } from 'zod';

export const customFieldSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Field name is required'),
  type: z.enum(['text', 'email', 'number', 'select', 'checkbox', 'url']),
  placeholder: z.string().optional(),
  required: z.boolean().default(false),
  options: z.array(z.string()).optional(),
});

export const waitlistStyleSchema = z.object({
  buttonText: z.string().default('Join Waitlist'),
  buttonColor: z.string().default('#3b82f6'),
  buttonTextColor: z.string().default('#ffffff'),
  backgroundColor: z.string().default('#ffffff'),
  textColor: z.string().default('#1f2937'),
  borderRadius: z.number().min(0).max(50).default(8),
  fontFamily: z.string().default('Inter'),
  showLabels: z.boolean().default(true),
  formLayout: z.enum(['stacked', 'inline']).default('stacked'),
});

export const waitlistSettingsSchema = z.object({
  maxSignups: z.number().min(0).optional(),
  emailVerification: z.boolean().default(true),
  allowDuplicates: z.boolean().default(false),
  referralEnabled: z.boolean().default(false),
  referralReward: z.string().optional(),
  customCss: z.string().optional(),
  customJs: z.string().optional(),
});

export const waitlistFormSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters').max(100),
  description: z.string().max(500).optional(),
  websiteUrl: z
    .string()
    .url('Please enter a valid URL')
    .optional()
    .or(z.literal('')),
  redirectUrl: z
    .string()
    .url('Please enter a valid URL')
    .optional()
    .or(z.literal('')),
  status: z.enum(['DRAFT', 'ACTIVE', 'PAUSED', 'ARCHIVED']).optional(),
  customFields: z.array(customFieldSchema).default([]),
  style: waitlistStyleSchema.default({}),
  settings: waitlistSettingsSchema.default({}),
});

// Schema for partial updates (PATCH)
export const waitlistUpdateSchema = waitlistFormSchema.partial();

export type WaitlistFormValues = z.infer<typeof waitlistFormSchema>;
