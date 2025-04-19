import { db } from '@/lib/drizzle/db';
import { asc, count, desc, SQL } from 'drizzle-orm';
import { AnyPgTable } from 'drizzle-orm/pg-core';

// Types
interface QueryParams {
  schema: AnyPgTable;
  filters?: SQL<unknown>;
  page?: number;
  limit?: number;
  sort?: {
    field: keyof AnyPgTable['$inferSelect'];
    direction: 'asc' | 'desc';
  }[];
}

export const queryPaginatedData = async ({
  schema,
  filters,
  page = 1,
  limit = 10,
  sort = [{ field: 'id', direction: 'asc' }],
}: QueryParams) => {
  // Query count
  const [{ count: total }] = await db
    .select({ count: count() })
    .from(schema)
    .where(filters);

  const totalPages = total ? Math.ceil(total / limit) : 1;

  // Prepare results
  const results = {
    total,
    limit,
    page,
    totalPages,
    prevPage: page > 1 ? page - 1 : null,
    nextPage: page < totalPages ? page + 1 : null,
  };

  // If count is zero, Return results with empty data
  if (!total) return { data: [], ...results };

  // Query data
  const orderBy = sort.map(({ field, direction }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const column = (schema as any)[field];
    return direction === 'asc' ? asc(column) : desc(column);
  });

  const data = await db
    .select()
    .from(schema)
    .where(filters)
    .orderBy(...orderBy) // Spread orderBy array as individual arguments
    .limit(limit)
    .offset((page - 1) * limit);

  // Return results with data
  return { data, ...results };
};
