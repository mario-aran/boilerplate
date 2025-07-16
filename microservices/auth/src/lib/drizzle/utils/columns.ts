import { timestamp, uuid } from 'drizzle-orm/pg-core';

export const id = uuid().primaryKey().defaultRandom();
export const createdAt = timestamp('created_at').notNull().defaultNow();

export const updatedAt = timestamp('updated_at')
  .notNull()
  .defaultNow()
  .$onUpdate(() => new Date());
