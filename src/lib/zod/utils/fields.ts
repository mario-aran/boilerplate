import { PERMISSION_VALUES } from '@/constants/permissions';
import {
  PERMISSIONS_COLUMNS,
  USER_ROLES_COLUMNS,
  USERS_COLUMNS,
} from '@/lib/drizzle/schemas';
import { z } from '@/lib/zod';
import { generateSortColumns } from './helpers';
import { refineUniqueValues } from './refines';

// Base fields
export const uuid = z
  .string()
  .uuid()
  .openapi({ example: 'd4f7c2c8-2b71-4c18-9e5e-ead34387b65f' });

export const textId = z
  .string()
  .min(3)
  .max(12)
  .refine((value) => /^[a-z0-9_]+$/.test(value), {
    message: 'Must be lowercase alphanumeric and may include underscores (_)',
  })
  .refine((value) => value.trim() === value, {
    message: 'No leading or trailing spaces',
  })
  .openapi({ example: 'a1a_b2b' });

export const positiveNumber = z
  .number()
  .int()
  .positive()
  .openapi({ example: 1 });

export const text = z
  .string()
  .trim()
  .nonempty()
  .max(60)
  .openapi({ example: 'Any text' });

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

// Derived fields
export const permissionIds = refineUniqueValues(
  textId.array().max(PERMISSION_VALUES.length),
);

const userRolesSortColumns = generateSortColumns(USER_ROLES_COLUMNS);
const sortUserRole = z
  .enum(userRolesSortColumns)
  .openapi({ example: userRolesSortColumns[0] });
export const sortUserRoles = refineUniqueValues(
  sortUserRole.array().min(1).max(userRolesSortColumns.length),
);

const usersSortColumns = generateSortColumns(
  USERS_COLUMNS.filter((column) => column !== 'password'),
);
const sortUser = z
  .enum(usersSortColumns)
  .openapi({ example: usersSortColumns[0] });
export const sortUsers = refineUniqueValues(
  sortUser.array().min(1).max(usersSortColumns.length),
);

const permissionsSortColumns = generateSortColumns(PERMISSIONS_COLUMNS);
const sortPermission = z
  .enum(permissionsSortColumns)
  .openapi({ example: permissionsSortColumns[0] });
export const sortPermissions = refineUniqueValues(
  sortPermission.array().min(1).max(permissionsSortColumns.length),
);
