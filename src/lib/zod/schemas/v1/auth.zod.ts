import { z } from '@/lib/zod';
import { email, password } from '@/lib/zod/utils/fields';

// Types
export type LoginAuthZod = z.infer<typeof LoginAuthZod>;

// Schemas
export const LoginAuthZod = z.object({ email, password });
