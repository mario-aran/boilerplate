import { USERS_SORTABLE_COLUMNS } from '@/lib/drizzle/schemas';
import {
  email,
  firstName,
  lastName,
  limit,
  page,
  password,
  search,
  textId,
  uuid,
} from '@/lib/zod/utils/fields';
import { generateSortField } from '@/lib/zod/utils/generate-sort-field';
import { z } from 'zod';

// ---------------------------
// TYPES
// ---------------------------

export type GetUsers = z.infer<typeof getUsersSchema>;

// ---------------------------
// FIELDS
// ---------------------------

const id = uuid;
const sort = generateSortField(USERS_SORTABLE_COLUMNS);
const roleId = textId;

// ---------------------------
// SCHEMAS
// ---------------------------

export const userIdSchema = z.strictObject({ id });

export const getUsersSchema = z
  .strictObject({ limit, page, sort, roleId, search })
  .partial();

export const updateUserMeSchema = z
  .strictObject({ email, password, firstName, lastName })
  .partial();

export const updateUserSchema = updateUserMeSchema.extend({ roleId });
