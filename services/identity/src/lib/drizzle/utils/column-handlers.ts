import { getTableColumns } from 'drizzle-orm';
import { AnyPgTable } from 'drizzle-orm/pg-core';

export const getSwaggerColumnsObject = <
  T extends AnyPgTable,
  ExCols extends readonly (keyof T['$inferSelect'])[],
>(
  table: T,
  excludedColumns?: ExCols,
) => {
  const columns = getTableColumns(table);
  const entries = Object.entries(columns).flatMap(([key, value]) =>
    excludedColumns?.includes(key) ? [] : [[key, value.dataType]],
  );

  return Object.fromEntries(entries) as Record<
    Exclude<keyof T['$inferSelect'], ExCols>,
    string
  >;
};

export const getSortableColumns = <
  Table extends AnyPgTable,
  Col extends keyof Table['$inferSelect'],
  ExCol extends Col = never,
>(
  table: Table,
  excludedColumns?: readonly ExCol[],
) => {
  const columns = getTableColumns(table);
  const result = Object.keys(columns).flatMap((col) =>
    excludedColumns?.includes(col as ExCol) ? [] : [`${col}`, `-${col}`],
  );

  return result as [
    Exclude<Col, ExCol> | `-${string & Exclude<Col, ExCol>}`,
    ...(Exclude<Col, ExCol> | `-${string & Exclude<Col, ExCol>}`)[],
  ];
};
