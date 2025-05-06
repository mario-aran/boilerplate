import { email, password } from '@/lib/zod/utils/fields';
import { z } from 'zod';

// Schemas
export const loginAuthZod = z.object({ email, password });

// Exported schema types
export type LoginAuthZod = z.infer<typeof loginAuthZod>;
