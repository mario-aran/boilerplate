import { getTableColumns } from 'drizzle-orm';
import { AnyPgTable } from 'drizzle-orm/pg-core';

// Types
type Column<T extends AnyPgTable> =
  | `${keyof T['$inferInsert'] & string}`
  | `-${keyof T['$inferInsert'] & string}`;

export const getSortColumns = <T extends AnyPgTable>({
  table,
  excludedColumns,
}: {
  table: T;
  excludedColumns?: string[];
}) => {
  const tableColumns = getTableColumns(table);
  const columnNames = Object.keys(tableColumns);
  const filteredColumns = columnNames.filter(
    (col) => !excludedColumns?.includes(col),
  );

  return filteredColumns.flatMap((col) => [`${col}`, `-${col}`]) as [
    Column<T>,
    ...Column<T>[],
  ];
};
