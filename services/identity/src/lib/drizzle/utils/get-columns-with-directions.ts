import { getTableColumns } from 'drizzle-orm';
import { AnyPgTable } from 'drizzle-orm/pg-core';

// Types
type Column<T extends AnyPgTable> = `${keyof T['$inferInsert'] & string}`;

export const getColumnsWithDirections = <T extends AnyPgTable>(table: T) => {
  const tableColumns = getTableColumns(table);
  const columnNames = Object.keys(tableColumns);

  return columnNames.flatMap((col) => [`${col}`, `-${col}`]) as [
    Column<T> | `-${Column<T>}`,
    ...(Column<T> | `-${Column<T>}`)[],
  ];
};
