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
  const safeLimit = Math.max(1, limit);
  const totalPages = Math.max(1, Math.ceil(total / safeLimit));
  const safePage = Math.min(Math.max(1, page), totalPages);

  const results = {
    total,
    limit: safeLimit,
    page: safePage,
    prevPage: safePage > 1 ? safePage - 1 : null,
    nextPage: safePage < totalPages ? safePage + 1 : null,
    totalPages,
    data: [],
  };
  if (!total) return results;

  // Query data and include it in the returned results
  const orderBy = sortArr.map((el) => {
    const isDesc = el.startsWith('-');
    const field = (isDesc ? el.slice(1) : el) as keyof typeof table;
    const column = table[field] as AnyPgColumn;
    return isDesc ? desc(column) : asc(column);
  });
  const offset = (safePage - 1) * safeLimit;

  const data = await dbOrTx
    .select()
    .from(table)
    .where(filters)
    .orderBy(...orderBy) // Spread as individual arguments
    .limit(safeLimit)
    .offset(offset);
  return { ...results, data };
};
