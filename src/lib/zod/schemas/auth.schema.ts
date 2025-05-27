import { z } from '@/lib/zod';
import { email, password } from '@/lib/zod/utils/fields';

// Types
export type LoginAuth = z.infer<typeof loginAuthSchema>;

// Schemas
export const loginAuthSchema = z.strictObject({ email, password });
