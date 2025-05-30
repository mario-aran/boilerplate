import { getTableColumns } from 'drizzle-orm';
import { AnyPgTable } from 'drizzle-orm/pg-core';

// Types
type SortColumns<T extends string> = [T | `-${T}`, ...(T | `-${T}`)[]];

export const getSortColumns = <T extends AnyPgTable>(table: T) => {
  const tableColumns = getTableColumns(table);
  const columns = Object.keys(tableColumns);

  return columns.flatMap((col) => [col, `-${col}`]) as SortColumns<
    keyof T['$inferInsert'] & string
  >;
};
