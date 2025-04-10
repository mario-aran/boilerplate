import {
  createdAt,
  id,
  updatedAt,
} from '@/lib/drizzle/schemas/utils/common-columns';
import { relations } from 'drizzle-orm';
import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { userRolesSchema } from './user-roles.schema';

export const usersSchema = pgTable('users', {
  id,
  userRoleId: uuid('user_role_id')
    .notNull()
    .references(() => userRolesSchema.id),
  createdAt,
  updatedAt,
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
});

export const usersRelations = relations(usersSchema, ({ one }) => ({
  userRole: one(userRolesSchema, {
    fields: [usersSchema.userRoleId],
    references: [userRolesSchema.id],
  }),
}));
