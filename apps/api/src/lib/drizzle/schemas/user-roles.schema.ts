import { relations } from 'drizzle-orm';
import { pgTable, varchar } from 'drizzle-orm/pg-core';
import { usersSchema } from './users.schema';
import { createdAt, updatedAt } from './utils/columns';

export const userRolesSchema = pgTable('user_roles', {
  id: varchar('id', { length: 255 }).primaryKey(),
  createdAt,
  updatedAt,
  name: varchar('name', { length: 255 }).notNull().unique(),
});

export const userRolesRelations = relations(userRolesSchema, ({ many }) => ({
  users: many(usersSchema),
}));
