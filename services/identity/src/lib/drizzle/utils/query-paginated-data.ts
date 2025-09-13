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

  const positiveLimit = Math.max(limit, 1);
  const totalPages = Math.ceil(total / positiveLimit) || 1;
  const currentPage = Math.min(Math.max(page, 1), totalPages);

  const results = {
    data: [],
    total,
    limit: positiveLimit,
    page: currentPage,
    prevPage: currentPage > 1 ? currentPage - 1 : null,
    nextPage: currentPage < totalPages ? currentPage + 1 : null,
    totalPages,
  };
  if (!total) return results;

  // Query data
  const data = await dbOrTx
    .select()
    .from(table)
    .where(filters)
    .orderBy(
      // Spread orderBy as individual arguments
      ...sortArr.map((el) => {
        const isDesc = el.startsWith('-');
        const field = (isDesc ? el.slice(1) : el) as keyof typeof table;
        const column = table[field] as AnyPgColumn;
        return isDesc ? desc(column) : asc(column);
      }),
    )
    .limit(positiveLimit)
    .offset((currentPage - 1) * positiveLimit);
  return { ...results, data };
};
