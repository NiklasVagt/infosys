import { z } from 'zod';

/**
 * A User
 * @typedef {object} User
 * @property {number} id.required - User ID
 * @property {string} username.required - Username
 */
export const userSchema = z.object({
  id: z.number(),
  username: z.string(),
});

/**
 * @typedef {object} Login
 * @property {string} username.required - Username
 * @property {string} password.required - Password
 */
export const createUserSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters long' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
});

export const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

/**
 * @typedef {object} UpdateUser
 * @property {string} username - Username
 * @property {string} password - Password
 */
export const updateUserSchema = createUserSchema.partial();

/**
 * @typedef {object} Token
 * @property {string} token.required - JWT token
 */
export const tokenSchema = z.object({
  token: z.string(),
});

export type UserDto = z.infer<typeof userSchema>;
export type LoginDto = z.infer<typeof createUserSchema>;
export type CrateUserDto = z.infer<typeof createUserSchema>;
export type UpdateUserDto = z.infer<typeof updateUserSchema>;
export type TokenDto = z.infer<typeof tokenSchema>;
