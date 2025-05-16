import { permissionsTable } from '@/lib/drizzle/schemas';
import { queryPaginatedData } from '@/lib/drizzle/utils/query-paginated-data';
import { GetAllPermissions } from '@/lib/zod/schemas/v1';
import { ilike } from 'drizzle-orm';

class PermissionsService {
  public async getAll({ limit, page, sort, search = '' }: GetAllPermissions) {
    const filters = ilike(permissionsTable.id, `%${search}%`);

    return queryPaginatedData({
      schema: permissionsTable,
      filters,
      limit,
      sort,
      page,
    });
  }
}

export const permissionsService = new PermissionsService();
