import { db } from '@/lib/drizzle';
import { asc, count, desc, SQL } from 'drizzle-orm';
import {
  AnyPgColumn,
  AnyPgTable,
  TableLikeHasEmptySelection,
} from 'drizzle-orm/pg-core';

// Types
interface QueryPaginatedDataProps<T extends AnyPgTable> {
  table: TableLikeHasEmptySelection<T> extends true ? never : T;
  filters?: SQL<unknown>;
  limit?: number;
  page?: number;
  sort?: string | string[];
}

export const queryPaginatedData = async <T extends AnyPgTable>({
  table,
  filters,
  limit = 10,
  page = 1,
  sort = [],
}: QueryPaginatedDataProps<T>) => {
  // Query count
  const [{ count: total }] = await db
    .select({ count: count() })
    .from(table)
    .where(filters);

  const positiveLimit = Math.max(limit, 1);
  const totalPages = Math.ceil(total / positiveLimit) || 1;
  const currentPage = Math.max(1, Math.min(page, totalPages));
  const results = {
    total,
    limit: positiveLimit,
    page: currentPage,
    prevPage: currentPage > 1 ? currentPage - 1 : null,
    nextPage: currentPage < totalPages ? currentPage + 1 : null,
    totalPages,
  };
  if (!total) return { data: [], ...results };

  // Query data
  const sortArr = Array.isArray(sort) ? sort : [sort];
  const orderBy = sortArr.map((el) => {
    const isDesc = el.startsWith('-');
    const field = (isDesc ? el.slice(1) : el) as keyof typeof table;
    const column = table[field] as AnyPgColumn;
    return isDesc ? desc(column) : asc(column);
  });

  const offset = (currentPage - 1) * positiveLimit;
  const data = await db
    .select()
    .from(table)
    .where(filters)
    .orderBy(...orderBy) // Spread orderBy as individual arguments
    .limit(positiveLimit)
    .offset(offset);
  return { data, ...results };
};
