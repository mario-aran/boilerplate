import { getTableColumns } from 'drizzle-orm';
import { AnyPgTable } from 'drizzle-orm/pg-core';

export const getColumns = <T extends AnyPgTable>(schema: T) =>
  Object.keys(getTableColumns(schema)) as [keyof T['$inferInsert']];
