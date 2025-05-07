import { z } from '@/lib/zod';
import { email, password } from '@/lib/zod/utils/fields';

// Schemas
export const LoginAuthZod = z.object({ email, password });

// Exported schema types
export type LoginAuthZod = z.infer<typeof LoginAuthZod>;
