import { PERMISSIONS } from '@/constants/permissions';
import { USER_ROLES } from '@/constants/user-roles';
import {
  PERMISSIONS_COLUMNS,
  USER_ROLES_COLUMNS,
  USERS_COLUMNS,
} from '@/lib/drizzle/schemas';
import { z } from '@/lib/zod';
import { generateSortColumns } from './generate-sort-columns';
import { refineUniqueValues } from './refine-unique-values';

// Base fields
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

export const userRoleId = baseTextId.openapi({ example: USER_ROLES.USER });

export const permissionId = baseTextId.openapi({
  example: PERMISSIONS.READ_PERMISSIONS,
});

// OpenAPI generated fields
export const permissionIds = refineUniqueValues(permissionId.array());

const permissionsSortColumns = generateSortColumns(PERMISSIONS_COLUMNS);
export const sortPermissions = refineUniqueValues(
  z
    .enum(permissionsSortColumns)
    .openapi({ example: permissionsSortColumns[0] })
    .array()
    .min(1)
    .max(permissionsSortColumns.length),
);

const userRolesSortColumns = generateSortColumns(USER_ROLES_COLUMNS);
export const sortUserRoles = refineUniqueValues(
  z
    .enum(userRolesSortColumns)
    .openapi({ example: userRolesSortColumns[0] })
    .array()
    .min(1)
    .max(userRolesSortColumns.length),
);

const usersSortColumns = generateSortColumns(
  USERS_COLUMNS.filter((column) => column !== 'password'),
);
export const sortUsers = refineUniqueValues(
  z
    .enum(usersSortColumns)
    .openapi({ example: usersSortColumns[0] })
    .array()
    .min(1)
    .max(usersSortColumns.length),
);
