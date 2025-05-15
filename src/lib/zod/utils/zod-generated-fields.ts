import { PERMISSION_VALUES } from '@/constants/permissions';
import {
  PERMISSIONS_COLUMNS,
  USER_ROLES_COLUMNS,
  USERS_COLUMNS,
} from '@/lib/drizzle/schemas';
import { z } from '@/lib/zod';
import { generateSortColumns } from './helpers';
import { permissionId } from './zod-fields';
import { refineUniqueValues } from './zod-refines';

// OpenAPI fields
export const permissionIds = refineUniqueValues(
  permissionId.array().max(PERMISSION_VALUES.length),
);

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
