import { SEGMENTS } from '@/constants/routes';
import { authController } from '@/controllers/auth.controller';
import { createUserSchema } from '@/lib/zod/schemas/users.schema';
import { validateWithZod } from '@/middleware/validate-with-zod';
import { Router } from 'express';

export const authRoute = Router();

authRoute.post(
  SEGMENTS.REGISTER,
  validateWithZod({ body: createUserSchema }),
  authController.register,
);
