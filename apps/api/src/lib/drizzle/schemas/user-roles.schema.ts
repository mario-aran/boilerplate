import { createdAt, id, updatedAt } from '@/lib/drizzle/schemas/common-columns';
import { relations } from 'drizzle-orm';
import { pgTable, varchar } from 'drizzle-orm/pg-core';
import { usersSchema } from './users.schema';

export const userRolesSchema = pgTable('user_roles', {
  id,
  createdAt,
  updatedAt,
  name: varchar('name', { length: 255 }).notNull().unique(),
});

export const userRolesRelations = relations(userRolesSchema, ({ many }) => ({
  users: many(usersSchema),
}));
