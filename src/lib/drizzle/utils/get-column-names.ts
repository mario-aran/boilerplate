import { getTableColumns } from 'drizzle-orm';
import { AnyPgTable } from 'drizzle-orm/pg-core';

export const getColumnNames = <T extends AnyPgTable>(schema: T) =>
  Object.keys(getTableColumns(schema)) as [
    keyof T['$inferInsert'],
    ...(keyof T['$inferInsert'])[],
  ];
