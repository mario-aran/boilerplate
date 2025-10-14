import { USERS_SORTABLE_COLUMNS } from '@/lib/drizzle/schemas';
import { stringToPositiveInt, text, textId } from '@/lib/zod/utils/fields';
import { generateSortField } from '@/lib/zod/utils/generate-sort-field';
import { z } from 'zod';

// ---------------------------
// TYPES
// ---------------------------

export type UserId = z.infer<typeof userIdSchema>;
export type GetUsers = z.infer<typeof getUsersSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;

// ---------------------------
// SCHEMAS
// ---------------------------

export const userIdSchema = z.strictObject({ id: textId });

export const getUsersSchema = z
  .strictObject({
    limit: stringToPositiveInt,
    page: stringToPositiveInt,
    sort: generateSortField(USERS_SORTABLE_COLUMNS),
    roleId: textId,
    search: text,
  })
  .partial();

export const updateUserSchema = z.strictObject({}).partial();
