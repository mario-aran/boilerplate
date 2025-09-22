import { _testable } from '@/lib/drizzle/utils/query-paginated-data';
import { asc, desc } from 'drizzle-orm';
import { AnyPgColumn } from 'drizzle-orm/pg-core';

// Values
const { calculatePagination, buildOrderBy } = _testable;

const mockedColumns = {
  id: {} as AnyPgColumn,
  name: {} as AnyPgColumn,
  age: {} as AnyPgColumn,
};

describe('calculatePagination', () => {
  it('calculates correct pagination for first, middle, and last page', () => {
    const limit = 2;
    const cases = [
      { page: 1, prevPage: null, nextPage: 2, offset: 0 },
      { page: 2, prevPage: 1, nextPage: 3, offset: 2 },
      { page: 3, prevPage: 2, nextPage: null, offset: 4 },
    ];

    for (const { page, prevPage, nextPage, offset } of cases) {
      const result = calculatePagination({ total: 5, limit, page });

      expect(result).toEqual({
        limit,
        page,
        prevPage,
        nextPage,
        totalPages: 3,
        offset,
      });
    }
  });

  it('sets non-positive limit to 1', () => {
    for (const limit of [-2, 0]) {
      const result = calculatePagination({ total: 1, page: 1, limit });

      expect(result.limit).toBe(1);
    }
  });

  it('sets totalPages to 1 when total is 0', () => {
    const result = calculatePagination({ limit: 1, page: 1, total: 0 });

    expect(result.totalPages).toBe(1);
  });

  it('clamps out-of-range page to nearest valid page', () => {
    for (const page of [0, 999]) {
      const result = calculatePagination({ total: 1, limit: 1, page });

      expect(result.page).toBe(1);
    }
  });
});

describe('buildOrderBy', () => {
  it('builds correct order for ascending and descending columns', () => {
    const result = buildOrderBy(mockedColumns, ['-id', '-name', 'age']);

    expect(result).toEqual([
      desc(mockedColumns.id),
      desc(mockedColumns.name),
      asc(mockedColumns.age),
    ]);
  });

  it('skips invalid columns', () => {
    const result = buildOrderBy(mockedColumns, ['invalid']);

    expect(result).toEqual([]);
  });
});
