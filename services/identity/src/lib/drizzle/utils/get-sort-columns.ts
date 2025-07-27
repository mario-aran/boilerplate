import { getTableColumns } from 'drizzle-orm';
import { AnyPgTable } from 'drizzle-orm/pg-core';

// Types
type Column<T extends AnyPgTable> = `${string & keyof T['$inferInsert']}`;

export const getSortColumns = <
  T extends AnyPgTable,
  U extends Column<T> = never,
>({
  table,
  excludedColumns = [],
}: {
  table: T;
  excludedColumns?: U[];
}) => {
  const tableColumns = getTableColumns(table);
  const columnNames = Object.keys(tableColumns);
  const filteredColumns = columnNames.filter(
    (col) => !excludedColumns.includes(col as U),
  );

  return filteredColumns.flatMap((col) => [`${col}`, `-${col}`]) as [
    Exclude<Column<T>, U> | `-${Exclude<Column<T>, U>}`,
    ...(Exclude<Column<T>, U> | `-${Exclude<Column<T>, U>}`)[],
  ];
};
