import { z } from 'zod';
import { email, password } from './utils/fields';

// Schemas
export const loginAuthZod = z.object({ email, password });

// Exported schema types
export type LoginAuthZod = z.infer<typeof loginAuthZod>;
