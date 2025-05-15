import { PERMISSIONS } from '@/constants/permissions';
import { USER_ROLES } from '@/constants/user-roles';
import { z } from '@/lib/zod';

// Internal
const baseText = z.string().trim().nonempty().max(60);

const baseTextId = z
  .string()
  .min(3)
  .max(12)
  .refine((val) => /^[A-Z0-9]+$/.test(val), {
    message: 'Must be uppercase alphanumeric without spaces',
  });

// OpenAPI fields
export const limit = z.number().int().positive().openapi({ example: 10 });
export const page = z.number().int().positive().openapi({ example: 1 });
export const search = baseText.openapi({ example: 'Any text' });
export const firstName = baseText.openapi({ example: 'John' });
export const lastName = baseText.openapi({ example: 'Doe' });
export const userRoleId = baseTextId.openapi({ example: USER_ROLES.USER });

export const permissionId = baseTextId.openapi({
  example: PERMISSIONS.READ_PERMISSIONS,
});

export const uuid = z
  .string()
  .uuid()
  .openapi({ example: 'd4f7c2c8-2b71-4c18-9e5e-ead34387b65f' });

export const dateTime = z
  .string()
  .datetime({ message: 'Invalid datetime, must be UTC' })
  .openapi({ example: '2023-01-01T00:00:00Z' });

export const email = z
  .string()
  .email()
  .min(5)
  .max(60)
  .openapi({ example: 'john.doe@example.com' });

export const password = z
  .string()
  .min(8)
  .max(20)
  .refine((val) => /^[^\s]+$/.test(val), {
    message: 'Must not contain spaces',
  })
  .openapi({ example: '12345678' });
