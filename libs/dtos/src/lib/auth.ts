import { z } from 'zod';

export const userSchema = z.object({
  id: z.number(),
  username: z.string(),
});

export const loginSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters long' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
});

export const tokenSchema = z.object({
  token: z.string(),
});

export type LoginDto = z.infer<typeof loginSchema>;

export type UserDto = z.infer<typeof userSchema>;

export type TokenDto = z.infer<typeof tokenSchema>;
