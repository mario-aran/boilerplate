import { _testable } from '@/lib/drizzle/utils/query-paginated-data';

const { calculatePagination } = _testable;

describe('calculatePagination', () => {
  it('sets limit to 1 for non-positive values', () => {
    for (const limit of [-2, 0]) {
      const result = calculatePagination({ total: 1, page: 1, limit });

      expect(result.limit).toBe(1);
    }
  });

  it('clamps out-of-range page to the nearest valid page', () => {
    for (const page of [0, 999]) {
      const result = calculatePagination({ total: 1, limit: 1, page });

      expect(result.page).toBe(1);
    }
  });
});
