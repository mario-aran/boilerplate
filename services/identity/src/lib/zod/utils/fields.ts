import { PERMISSION_VALUES } from '@/constants/permissions';
import {
  PERMISSIONS_SORTABLE_COLUMNS,
  ROLES_SORTABLE_COLUMNS,
  USERS_SORTABLE_COLUMNS,
} from '@/lib/drizzle/schemas';
import { z } from 'zod';
import { generateSortField } from './generate-sort-field';
import { lowerAlphanumUnder, noDuplicateStrs, noSpaces } from './refines';

// ---------------------------
// IDS
// ---------------------------

export const uuid = z.uuid();
export const textId = noSpaces(lowerAlphanumUnder(z.string().min(4).max(40)));
export const roleId = textId;

export const permissionIds = noDuplicateStrs(
  z.enum(PERMISSION_VALUES).array().max(PERMISSION_VALUES.length),
);

// ---------------------------
// COERCIONS
// ---------------------------

const coerceToPositiveInt = z.coerce.number().int().positive();
export const limit = coerceToPositiveInt;
export const page = coerceToPositiveInt;
export const isActive = z.coerce.boolean();

// ---------------------------
// TEXTS
// ---------------------------

const text = z.string().trim().min(1).max(60);
export const search = text;
export const firstName = text;
export const lastName = text;

// ---------------------------
// SPECIFIC
// ---------------------------

export const email = z.email().min(5).max(60);
export const currentEmail = email;
export const newEmail = email;
export const password = noSpaces(z.string().min(8).max(20));
export const currentPassword = password;
export const newPassword = password;
export const token = noSpaces(z.string().min(1));

// ---------------------------
// SORTS
// ---------------------------

export const sortUsers = generateSortField(USERS_SORTABLE_COLUMNS);
export const sortRoles = generateSortField(ROLES_SORTABLE_COLUMNS);
export const sortPermissions = generateSortField(PERMISSIONS_SORTABLE_COLUMNS);
