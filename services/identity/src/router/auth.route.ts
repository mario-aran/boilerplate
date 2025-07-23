import { SEGMENTS } from '@/constants/routes';
import { authController } from '@/controllers/auth.controller';
import { registerAuthSchema } from '@/lib/zod/schemas/auth.schema';
import { validateWithZod } from '@/middleware/validate-with-zod';
import { Router } from 'express';

export const authRoute = Router();

authRoute.post(
  SEGMENTS.REGISTER,
  validateWithZod({ body: registerAuthSchema }),
  authController.register,
);
