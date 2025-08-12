import { getTableColumns } from 'drizzle-orm';
import { AnyPgTable } from 'drizzle-orm/pg-core';

export const getExampleColumns = <
  Table extends AnyPgTable,
  Col extends keyof Table['$inferSelect'],
  ExCol extends Col = never,
>(
  table: Table,
  excludedColumns: readonly ExCol[] = [],
) => {
  // Format data
  const tableColumns = getTableColumns(table);
  const entries = Object.entries(tableColumns);
  const filtered = entries.filter(
    ([key]) => !excludedColumns.includes(key as ExCol),
  );
  const mapped = filtered.map(([key, value]) => [key, value.dataType]);
  const fromEntries = Object.fromEntries(mapped);

  // Assert results
  return fromEntries as Record<Exclude<Col, ExCol>, string>;
};

export const getSortColumns = <
  Table extends AnyPgTable,
  Col extends keyof Table['$inferSelect'],
  ExCol extends Col = never,
>(
  table: Table,
  excludedColumns: readonly ExCol[] = [],
) => {
  // Format data
  const columns = getTableColumns(table);
  const keys = Object.keys(columns);
  const filtered = keys.filter(
    (col) => !excludedColumns.includes(col as ExCol),
  );
  const flatMapped = filtered.flatMap((col) => [`${col}`, `-${col}`]);

  // Assert results
  return flatMapped as [
    Exclude<Col, ExCol> | `-${string & Exclude<Col, ExCol>}`,
    ...(Exclude<Col, ExCol> | `-${string & Exclude<Col, ExCol>}`)[],
  ];
};
