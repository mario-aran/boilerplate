import { permissionsService } from '@/features/permissions/permissions.service';
import { permissionsTable } from '@/lib/drizzle/schemas';
import { queryPaginatedData } from '@/lib/drizzle/utils/query-paginated-data';
import { ilike } from 'drizzle-orm';

// ---------------------------
// CONSTANTS
// ---------------------------

const MOCK_PAGINATED_RESULT = { prop: 'mock_paginated_result' } as never;

// ---------------------------
// MODULE MOCKS
// ---------------------------

vi.mock('@/lib/drizzle/utils/query-paginated-data');
const queryPaginatedDataMock = vi.mocked(queryPaginatedData);

describe('permissionsService', () => {
  describe('getAll', () => {
    beforeEach(() => {
      vi.clearAllMocks();

      queryPaginatedDataMock.mockResolvedValue(MOCK_PAGINATED_RESULT);
    });

    it('uses permissionsTable and returns the result of queryPaginatedData', async () => {
      const result = await permissionsService.getAll();

      expect(queryPaginatedDataMock).toHaveBeenCalledOnce();
      expect(queryPaginatedDataMock).toHaveBeenCalledWith({
        table: permissionsTable,
        filters: undefined,
        sortArr: undefined,
        limit: undefined,
        page: undefined,
      });
      expect(result).toEqual(MOCK_PAGINATED_RESULT);
    });

    it('maps limit, page and search params', async () => {
      const params = { limit: 5, page: 2, search: 'read' };

      await permissionsService.getAll(params);

      expect(queryPaginatedDataMock).toHaveBeenCalledWith(
        expect.objectContaining({
          filters: ilike(permissionsTable.id, `%${params.search}%`),
          limit: params.limit,
          page: params.page,
        }),
      );
    });

    it('handles sort param as string or array', async () => {
      const sortArr: ['id'] = ['id'];

      for (const sort of [sortArr[0], sortArr]) {
        await permissionsService.getAll({ sort });

        expect(queryPaginatedDataMock).toHaveBeenCalledWith(
          expect.objectContaining({ sortArr }),
        );
      }
    });
  });
});
