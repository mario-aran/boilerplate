import {
  PERMISSIONS_COLUMNS,
  USER_ROLES_COLUMNS,
  USERS_COLUMNS,
} from '@/lib/drizzle/schemas';
import { z } from '@/lib/zod';
import { permissionId } from './fields';
import { generateSortColumns } from './helpers';
import { refineUniqueValues } from './refines';

// Internal values
const permissionsColumns = generateSortColumns(PERMISSIONS_COLUMNS);
const userRolesSortColumns = generateSortColumns(USER_ROLES_COLUMNS);

const usersSortColumns = generateSortColumns(
  USERS_COLUMNS.filter((column) => column !== 'password'),
);

// OpenAPI fields
export const permissionIds = refineUniqueValues(permissionId.array());

export const sortPermissions = refineUniqueValues(
  z
    .enum(permissionsColumns)
    .openapi({ example: permissionsColumns[0] })
    .array()
    .min(1)
    .max(permissionsColumns.length),
);

export const sortUserRoles = refineUniqueValues(
  z
    .enum(userRolesSortColumns)
    .openapi({ example: userRolesSortColumns[0] })
    .array()
    .min(1)
    .max(userRolesSortColumns.length),
);

export const sortUsers = refineUniqueValues(
  z
    .enum(usersSortColumns)
    .openapi({ example: usersSortColumns[0] })
    .array()
    .min(1)
    .max(usersSortColumns.length),
);
