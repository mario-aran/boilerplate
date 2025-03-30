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
const params = z.object({ id });
const getAllQuery = z.object({ limit, skip, sortOrder, sortBy });
const updateBody = z.object({ userName, email });
const updateRoleBody = z.object({ roleId });
const updatePasswordBody = z.object({ password });

// Request schemas
export const usersZod = {
  getAll: z.object({ query: getAllQuery }),
  get: z.object({ params }),
  update: z.object({ params, body: updateBody }),
  updateRole: z.object({ params, body: updateRoleBody }),
  updatePassword: z.object({ params, body: updatePasswordBody }),
};
