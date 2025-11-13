import { z } from 'zod';

export const signupSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long'),
  role: z.enum(['USER', 'ADMIN']),
});

export type SignupInput = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  email: z.email({ message: 'Invalid email address' }),
  password: z.string().min(1, 'Password is required'),
});

export type LoginInput = z.infer<typeof loginSchema>;

