import { db } from '@/lib/drizzle/db';
import { asc, count, desc, getTableColumns, SQL } from 'drizzle-orm';
import {
  AnyPgColumn,
  AnyPgTable,
  TableLikeHasEmptySelection,
} from 'drizzle-orm/pg-core';

// ---------------------------
// TYPES
// ---------------------------

interface CalculatePaginationProps {
  total: number;
  limit: number;
  page: number;
}

interface QueryPaginatedDataProps<T extends AnyPgTable> {
  table: TableLikeHasEmptySelection<T> extends true ? never : T;
  filters?: SQL<unknown>;
  sortArr?: string[];
  limit?: number;
  page?: number;
}

// ---------------------------
// UTILS
// ---------------------------

const calculatePagination = ({
  total,
  limit,
  page,
}: CalculatePaginationProps) => {
  const safeLimit = Math.max(1, limit);
  const totalPages = Math.max(1, Math.ceil(total / safeLimit));
  const safePage = Math.min(Math.max(1, page), totalPages);

  return {
    limit: safeLimit,
    totalPages,
    page: safePage,
    prevPage: safePage > 1 ? safePage - 1 : null,
    nextPage: safePage < totalPages ? safePage + 1 : null,
    offset: (safePage - 1) * safeLimit,
  };
};

const buildOrderBy = (
  tableColumns: Record<string, AnyPgColumn>,
  sortArr: string[],
) => {
  const orderBy = [];

  for (const el of sortArr) {
    const isDesc = el.startsWith('-');
    const col = isDesc ? el.slice(1) : el;
    if (!(col in tableColumns)) continue; // Skips non-existent columns

    orderBy.push(isDesc ? desc(tableColumns[col]) : asc(tableColumns[col]));
  }

  return orderBy;
};

export const queryPaginatedData = async <T extends AnyPgTable>({
  table,
  filters,
  sortArr = [],
  limit = 10,
  page = 1,
}: QueryPaginatedDataProps<T>) => {
  // Query total count
  const [{ count: total }] = await db
    .select({ count: count() })
    .from(table)
    .where(filters);

  // Return results with empty data if none found
  const pagination = calculatePagination({ limit, page, total });
  if (!total) return { total, ...pagination, data: [] };

  // Query data and return results
  const orderBy = buildOrderBy(getTableColumns(table), sortArr);
  const data = await db
    .select()
    .from(table)
    .where(filters)
    .orderBy(...orderBy) // Spread as individual arguments
    .limit(pagination.limit)
    .offset(pagination.offset);
  return { total, ...pagination, data };
};

export const _testable = { calculatePagination };
