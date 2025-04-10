import {
  email,
  id,
  limit,
  password,
  skip,
  sortOrder,
  userName,
} from '@/lib/zod/common-fields';
import { idZod } from '@/lib/zod/common-schemas';
import { z } from 'zod';

// Fields
const sortBy = z
  .array(z.enum(['id', 'userName', 'email', 'roleId']))
  .optional()
  .refine((arr) => !arr || (arr.length && new Set(arr).size === arr.length), {
    message: 'Array cannot be empty and must contain unique values',
  });

// Schemas
const getAllUsersZod = z.object({ limit, skip, sortOrder, sortBy });
const updateUsersZod = z.object({ userName, email });
const updateRoleUsersZod = z.object({ roleId: id });
const updatePasswordUsersZod = z.object({ password });

// Request schemas
export const getAllReqUsersZod = z.object({ query: getAllUsersZod });

export const updateReqUsersZod = z.object({
  params: idZod,
  body: updateUsersZod,
});

export const updateRoleReqUsersZod = z.object({
  params: idZod,
  body: updateRoleUsersZod,
});

export const updatePasswordReqUsersZod = z.object({
  params: idZod,
  body: updatePasswordUsersZod,
});

// Exported schema types
export type GetAllUsersZod = z.infer<typeof getAllUsersZod>;
export type UpdateUsersZod = z.infer<typeof updateUsersZod>;
export type UpdateRoleUsersZod = z.infer<typeof updateRoleUsersZod>;
export type UpdatePasswordUsersZod = z.infer<typeof updatePasswordUsersZod>;
