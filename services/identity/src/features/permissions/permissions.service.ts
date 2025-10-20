import { permissionsTable } from '@/lib/drizzle/schemas';
import { queryPaginatedData } from '@/lib/drizzle/utils/query-paginated-data';
import { GetPermissions } from '@/lib/zod/schemas/permissions.schema';
import { ilike } from 'drizzle-orm';

class PermissionsService {
  async getAll({ limit, page, sort, search }: GetPermissions = {}) {
    const filters = search
      ? ilike(permissionsTable.id, `%${search}%`)
      : undefined;

    return queryPaginatedData({
      table: permissionsTable,
      filters,
      sort,
      limit,
      page,
    });
  }
}

export const permissionsService = new PermissionsService();
