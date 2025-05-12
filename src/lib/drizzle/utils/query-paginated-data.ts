import { db } from '@/lib/drizzle/db';
import { asc, count, desc, SQL } from 'drizzle-orm';
import { AnyPgColumn, AnyPgTable } from 'drizzle-orm/pg-core';

// Types
interface QueryParams {
  schema: AnyPgTable;
  filters?: SQL<unknown>;
  limit?: number;
  page?: number;
  sort?: string[];
}

export const queryPaginatedData = async ({
  schema,
  filters,
  limit = 10,
  page = 1,
  sort = [],
}: QueryParams) => {
  // Query count
  const [{ count: total }] = await db
    .select({ count: count() })
    .from(schema)
    .where(filters);

  const safeLimit = Math.max(limit, 1);
  const totalPages = Math.ceil(total / safeLimit) || 1;
  const currentPage = Math.max(1, Math.min(page, totalPages));

  const results = {
    total,
    limit: safeLimit,
    page: currentPage,
    prevPage: currentPage > 1 ? currentPage - 1 : null,
    nextPage: currentPage < totalPages ? currentPage + 1 : null,
    totalPages,
  };
  if (!total) return { data: [], ...results };

  // Query data
  const orderBy = sort.map((el) => {
    const isDesc = el.startsWith('-');
    const field = (isDesc ? el.slice(1) : el) as keyof typeof schema;
    const column = schema[field] as AnyPgColumn;
    const direction = isDesc ? 'desc' : 'asc';
    return direction === 'asc' ? asc(column) : desc(column);
  });

  const data = await db
    .select()
    .from(schema)
    .where(filters)
    .orderBy(...orderBy) // Spread orderBy as individual arguments
    .limit(limit)
    .offset((page - 1) * limit);
  return { data, ...results };
};
