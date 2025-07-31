import { USERS_SORT_COLUMNS_NO_PASSWORD } from '@/lib/drizzle/schemas';
import { stringToPositiveInt, text, textId } from '@/lib/zod/utils/fields';
import { generateSortField } from '@/lib/zod/utils/generate-sort-field';
import { z } from 'zod';

// Types
export type UserId = z.infer<typeof userIdSchema>;
export type GetAllUsers = z.infer<typeof getAllUsersSchema>;

// Schemas
export const userIdSchema = z.strictObject({ id: textId });

export const getAllUsersSchema = z
  .strictObject({
    limit: stringToPositiveInt,
    page: stringToPositiveInt,
    sort: generateSortField(USERS_SORT_COLUMNS_NO_PASSWORD),
    roleId: textId,
    search: text,
  })
  .partial();
