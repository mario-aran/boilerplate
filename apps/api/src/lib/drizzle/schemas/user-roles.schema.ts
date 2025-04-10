import { relations } from 'drizzle-orm';
import { pgTable, varchar } from 'drizzle-orm/pg-core';
import { usersSchema } from './users.schema';
import { createdAt, id, updatedAt } from './utils/common-columns';

export const userRolesSchema = pgTable('user_roles', {
  id,
  createdAt,
  updatedAt,
  name: varchar('name', { length: 255 }).notNull().unique(),
});

export const userRolesRelations = relations(userRolesSchema, ({ many }) => ({
  users: many(usersSchema),
}));
