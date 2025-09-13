import { db, DbOrTx } from '@/lib/drizzle';
import { asc, count, desc, SQL } from 'drizzle-orm';
import {
  AnyPgColumn,
  AnyPgTable,
  TableLikeHasEmptySelection,
} from 'drizzle-orm/pg-core';

// Types
interface QueryPaginatedDataProps<T extends AnyPgTable> {
  dbOrTx?: DbOrTx;
  table: TableLikeHasEmptySelection<T> extends true ? never : T;
  filters?: SQL<unknown>;
  limit?: number;
  page?: number;
  sortArr?: string[];
}

export const queryPaginatedData = async <T extends AnyPgTable>({
  dbOrTx = db,
  table,
  filters,
  limit = 10,
  page = 1,
  sortArr = [],
}: QueryPaginatedDataProps<T>) => {
  // Query count
  const [{ count: total }] = await dbOrTx
    .select({ count: count() })
    .from(table)
    .where(filters);

  // Return empty results
  const resultLimit = Math.max(limit, 1);
  const totalPages = Math.ceil(total / resultLimit) || 1;
  const resultPage = Math.min(Math.max(page, 1), totalPages);
  const prevPage = resultPage > 1 ? resultPage - 1 : null;
  const nextPage = resultPage < totalPages ? resultPage + 1 : null;

  const results = {
    total,
    limit: resultLimit,
    page: resultPage,
    prevPage,
    nextPage,
    totalPages,
    data: [],
  };
  if (!total) return results;

  // Query data and return results
  const orderBy = sortArr.map((el) => {
    const isDesc = el.startsWith('-');
    const field = (isDesc ? el.slice(1) : el) as keyof typeof table;
    const column = table[field] as AnyPgColumn;
    return isDesc ? desc(column) : asc(column);
  });
  const offset = (resultPage - 1) * resultLimit;

  const data = await dbOrTx
    .select()
    .from(table)
    .where(filters)
    .orderBy(...orderBy) // Spread as individual arguments
    .limit(resultLimit)
    .offset(offset);
  return { ...results, data };
};
