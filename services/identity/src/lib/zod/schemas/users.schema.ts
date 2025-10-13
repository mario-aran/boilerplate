import { USERS_SORTABLE_COLUMNS } from '@/lib/drizzle/schemas';
import { stringToPositiveInt, text, textId } from '@/lib/zod/utils/fields';
import { generateSortField } from '@/lib/zod/utils/generate-sort-field';
import { z } from 'zod';

// ---------------------------
// TYPES
// ---------------------------

export type UserId = z.infer<typeof userIdSchema>;
export type GetAllUsers = z.infer<typeof getAllUsersSchema>;

// ---------------------------
// SCHEMAS
// ---------------------------

export const userIdSchema = z.strictObject({ id: textId });

export const getAllUsersSchema = z
  .strictObject({
    limit: stringToPositiveInt,
    page: stringToPositiveInt,
    sort: generateSortField(USERS_SORTABLE_COLUMNS),
    roleId: textId,
    search: text,
  })
  .partial();
