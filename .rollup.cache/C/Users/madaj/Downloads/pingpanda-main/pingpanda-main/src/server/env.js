import { z } from 'zod';
/**
 * Schema for environment variables validation
 */
var envSchema = z.object({
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
    // Application
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    VERCEL_URL: z.string().optional(),
    NEXT_PUBLIC_APP_URL: z.string().url('Invalid application URL'),
    // Plausible Analytics
    NEXT_PUBLIC_PLAUSIBLE_DOMAIN: z.string().optional(),
    // Next.js Runtime
    NEXT_RUNTIME: z.enum(['nodejs', 'edge', 'client']).optional(),
    // AI
    OPENAI_API_KEY: z.string().min(1, 'OPENAI_API_KEY is required'),
    CLAUDE_API_KEY: z.string().min(1, 'CLAUDE_API_KEY is required'),
    // Email
    RESEND_API_KEY: z.string().min(1, 'RESEND_API_KEY is required'),
});
/**
 * Validates and returns the environment variables.
 *
 * This function parses the environment variables using `envSchema`. If any required environment
 * variables are missing or invalid, it throws an error with detailed information about the missing or invalid
 * variables. For other parsing failures, a generic error is thrown.
 */
export function getEnv() {
    try {
        return envSchema.parse(process.env);
    }
    catch (error) {
        if (error instanceof z.ZodError) {
            var missingEnvs = error.errors
                .map(function (e) {
                var key = e.path.join('.');
                return "".concat(key, ": ").concat(e.message);
            })
                .join('\n  - ');
            throw new Error("Missing or invalid environment variables:\n  - ".concat(missingEnvs));
        }
        throw new Error('Failed to parse environment variables');
    }
}
//# sourceMappingURL=env.js.map