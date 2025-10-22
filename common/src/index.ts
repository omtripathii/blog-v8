import { z } from "zod";

/**
 * Creting a Common folder for the zod validation cauise it will be used by the both frontend as well as the the backend
 *
 *
 * Idea is to wrap it inside an npm libray and use it in backe3nd as well as the frontend
 *
 */

// User validation schemas
export const signupInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
});

export const signinInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// Blog validation schemas
export const createBlogInput = z.object({
  title: z.string(),
  content: z.string(),
});

export const updateBlogInput = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
});

// Type exports for TypeScript
export type SignupInput = z.infer<typeof signupInput>;
export type SigninInput = z.infer<typeof signinInput>;
export type CreateBlogInput = z.infer<typeof createBlogInput>;
export type UpdateBlogInput = z.infer<typeof updateBlogInput>;