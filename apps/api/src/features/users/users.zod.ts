import { z } from 'zod';

// Fields
const limit = z.number().int().positive().optional();
const skip = z.number().int().positive().optional();
const sortOrder = z.enum(['asc', 'desc']).optional();

const sortBy = z
  .array(z.enum(['id', 'userName', 'email', 'roleId']))
  .optional()
  .refine((arr) => !arr || (arr.length && new Set(arr).size === arr.length), {
    message: 'Array cannot be empty and must contain unique values',
  });

const id = z.string().uuid();
const userName = z.string().trim().min(3).max(20).optional();
const email = z.string().email().trim().min(5).max(60).optional();
const roleId = z.string().uuid();
const password = z.string().trim().min(8).max(20);

// Schemas
export const usersZod = {
  getAll: z.object({
    query: z.object({ limit, skip, sortOrder, sortBy }),
  }),
  get: z.object({ params: z.object({ id }) }),
  update: z.object({
    params: z.object({ id }),
    body: z.object({ userName, email }),
  }),
  updateRole: z.object({
    params: z.object({ id }),
    body: z.object({ roleId }),
  }),
  updatePassword: z.object({
    params: z.object({ id }),
    body: z.object({ password }),
  }),
};

// Schema types
export type GetAllZod = z.infer<typeof usersZod.getAll>;
export type GetZod = z.infer<typeof usersZod.get>;
export type UpdateZod = z.infer<typeof usersZod.update>;
export type UpdateRoleZod = z.infer<typeof usersZod.updateRole>;
export type UpdatePasswordZod = z.infer<typeof usersZod.updatePassword>;
