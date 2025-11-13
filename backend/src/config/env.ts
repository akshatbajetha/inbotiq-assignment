import { z } from 'zod';

const envSchema = z.object({
  PORT: z.string().default('5000'),
  DATABASE_URL: z.string().url('DATABASE_URL must be a valid URL'),
  DIRECT_URL: z.string().url('DIRECT_URL must be a valid URL').optional(),
  JWT_SECRET: z.string().min(1, 'JWT_SECRET is required'),
  JWT_EXPIRES_IN: z.string().default('15m'),
  COOKIE_NAME: z.string().default('auth_token'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  COOKIE_DOMAIN: z.string().optional(),
});

// Parse and validate environment variables
const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('Invalid environment variables:');
  process.exit(1);
}

export const env = parsedEnv.data;


