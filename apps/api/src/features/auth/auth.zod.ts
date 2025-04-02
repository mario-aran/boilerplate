import { z } from 'zod';

// Fields
const username;
const email;
const password;
const refreshToken;
const resetToken;

// Schemas
const registerBody = z.object({ username, email, password });
const loginBody = z.object({ username, password });
const refreshBody = z.object({ refreshToken });
const forgotPasswordBody = z.object({ email });
const resetPasswordBody = z.object({ password, resetToken });

// Request schemas
export const authZod = {
  register: z.object({ body: registerBody }),
  login: z.object({ body: loginBody }),
  refresh: z.object({ body: refreshBody }),
  forgotPassword: z.object({ body: forgotPasswordBody }),
  resetPassword: z.object({ body: resetPasswordBody }),
};
