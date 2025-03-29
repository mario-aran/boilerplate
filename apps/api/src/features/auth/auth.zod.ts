import { z } from 'zod';

// Schemas
export const authZod = {
  register: z.object({}),
  login: z.object({}),
  logout: z.object({}),
  refresh: z.object({}),
  me: z.object({}),
  forgotPassword: z.object({}),
  resetPassword: z.object({}),
};

// Schema types
export type RegisterZod = z.infer<typeof authZod.register>;
export type LoginZod = z.infer<typeof authZod.login>;
export type LogoutZod = z.infer<typeof authZod.logout>;
export type RefreshZod = z.infer<typeof authZod.refresh>;
export type MeZod = z.infer<typeof authZod.me>;
export type ForgotPasswordZod = z.infer<typeof authZod.forgotPassword>;
export type ResetPasswordZod = z.infer<typeof authZod.resetPassword>;
