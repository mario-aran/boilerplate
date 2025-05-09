import { z } from '@/lib/zod';
import { emailField, passwordField } from '@/lib/zod/utils/fields';

// Types
export type LoginAuthZod = z.infer<typeof LoginAuthZod>;

// Fields with openapi info
const email = emailField.openapi({ example: 'john.doe@example.com' });
const password = passwordField.openapi({ example: '12345678' });

// Schemas
export const LoginAuthZod = z.object({ email, password });
