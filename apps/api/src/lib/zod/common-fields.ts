import { z } from 'zod';

// Id fields
export const id = z.string().uuid();

// User fields
export const userName = z.string().trim().min(3).max(20).optional();
export const email = z.string().email().trim().min(5).max(60).optional();
export const password = z.string().trim().min(8).max(20);

// Pagination fields
export const limit = z.number().int().positive().optional();
export const skip = z.number().int().positive().optional();
export const sortOrder = z.enum(['asc', 'desc']).optional();
