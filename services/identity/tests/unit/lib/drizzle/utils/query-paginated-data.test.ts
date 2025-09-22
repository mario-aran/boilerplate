import { _testable } from '@/lib/drizzle/utils/query-paginated-data';

// Values
const { calculatePagination } = _testable;

describe('calculatePagination', () => {
  it('handles normal pagination', () => {
    const limit = 2;

    const cases = [
      { page: 1, prevPage: null, nextPage: 2, offset: 0 },
      { page: 2, prevPage: 1, nextPage: 3, offset: 2 },
      { page: 3, prevPage: 2, nextPage: null, offset: 4 },
    ];

    for (const { page, prevPage, nextPage, offset } of cases) {
      const actual = calculatePagination({ limit, total: 5, page });

      expect(actual.limit).toBe(limit);
      expect(actual.totalPages).toBe(3);
      expect(actual.page).toBe(page);
      expect(actual.prevPage).toBe(prevPage);
      expect(actual.nextPage).toBe(nextPage);
      expect(actual.offset).toBe(offset);
    }
  });

  it('handles non-positive limit', () => {
    for (const limit of [-2, 0]) {
      const actual = calculatePagination({ total: 1, page: 1, limit });

      expect(actual.limit).toBe(1);
    }
  });

  it('handles total = 0', () => {
    const total = 0;
    const actual = calculatePagination({ limit: 1, page: 1, total });

    expect(actual.totalPages).toBe(1);
  });

  it('handles page boundaries', () => {
    for (const page of [0, 999]) {
      const actual = calculatePagination({ total: 1, limit: 1, page });

      expect(actual.page).toBe(1);
    }
  });
});
