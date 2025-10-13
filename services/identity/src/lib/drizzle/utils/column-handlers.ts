import { getTableColumns } from 'drizzle-orm';
import { AnyPgTable } from 'drizzle-orm/pg-core';

export const getSwaggerColumnsObject = <
  T extends AnyPgTable,
  ExCols extends readonly (keyof T['$inferSelect'])[] = [],
>(
  table: T,
  excluded?: ExCols,
) => {
  const columns = getTableColumns(table);
  const filteredEntries = Object.entries(columns).flatMap(([k, v]) =>
    excluded?.includes(k) ? [] : [[k, v.dataType]],
  );

  return Object.fromEntries(filteredEntries) as Record<
    Exclude<keyof T['$inferSelect'], ExCols[number]>,
    string
  >;
};

export const getSortableColumns = <
  T extends AnyPgTable,
  Col extends keyof T['$inferSelect'],
  ExCol extends Col = never,
>(
  table: T,
  excluded?: readonly ExCol[],
) => {
  const columns = getTableColumns(table);
  const result = Object.keys(columns).flatMap((col) =>
    excluded?.includes(col as ExCol) ? [] : [`${col}`, `-${col}`],
  );

  return result as [
    Exclude<Col, ExCol> | `-${string & Exclude<Col, ExCol>}`,
    ...(Exclude<Col, ExCol> | `-${string & Exclude<Col, ExCol>}`)[],
  ];
};
