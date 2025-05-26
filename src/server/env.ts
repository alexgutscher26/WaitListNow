import { z } from 'zod';

/**
 * Schema for environment variables validation
 */
const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url('Invalid database URL'),
  
  // Authentication
  CLERK_SECRET_KEY: z.string().min(1, 'CLERK_SECRET_KEY is required'),
  CLERK_PUBLISHABLE_KEY: z.string().min(1, 'CLERK_PUBLISHABLE_KEY is required'),
  CLERK_WEBHOOK_SECRET: z.string().min(1, 'CLERK_WEBHOOK_SECRET is required'),
  NEXTAUTH_SECRET: z.string().min(1, 'NEXTAUTH_SECRET is required'),
  NEXTAUTH_URL: z.string().url('Invalid NEXTAUTH_URL'),
  
  // Stripe
  STRIPE_SECRET_KEY: z.string().min(1, 'STRIPE_SECRET_KEY is required'),
  STRIPE_WEBHOOK_SECRET: z.string().min(1, 'STRIPE_WEBHOOK_SECRET is required'),
  
  // Sentry
  SENTRY_DSN: z.string().url('Invalid Sentry DSN'),
  NEXT_PUBLIC_SENTRY_DSN: z.string().url('Invalid public Sentry DSN'),
  
  // Application
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  VERCEL_URL: z.string().optional(),
  NEXT_PUBLIC_APP_URL: z.string().url('Invalid application URL'),
  
  // Plausible Analytics
  NEXT_PUBLIC_PLAUSIBLE_DOMAIN: z.string().optional(),
  
  // Next.js Runtime
  NEXT_RUNTIME: z.enum(['nodejs', 'edge', 'client']).optional()
});

/**
 * Environment variables type
 */
export type Env = z.infer<typeof envSchema>;

/**
 * Validates and returns the environment variables
 * @throws {Error} If any required environment variables are missing or invalid
 */
export function getEnv(): Env {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingEnvs = error.errors
        .map((e) => {
          const key = e.path.join('.');
          return `${key}: ${e.message}`;
        })
        .join('\n  - ');
      
      throw new Error(`Missing or invalid environment variables:\n  - ${missingEnvs}`);
    }
    
    throw new Error('Failed to parse environment variables');
  }
}

/**
 * @deprecated Use getEnv() instead
 */
export type Bindings = Env;
