import { email, password } from '@/lib/zod/utils/fields';
import { z } from 'zod';

// Types
export type LoginAuth = z.infer<typeof loginAuthSchema>;

// Schemas
export const loginAuthSchema = z.strictObject({ email, password });
