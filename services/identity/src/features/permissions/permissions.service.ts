import { permissionsTable } from '@/lib/drizzle/schemas';
import { queryPaginatedData } from '@/lib/drizzle/utils/query-paginated-data';
import { GetAllPermissions } from '@/lib/zod/schemas/permissions.schema';
import { ilike } from 'drizzle-orm';

class PermissionsService {
  async getAll(params?: GetAllPermissions) {
    const { limit, page, sort, search = '' } = params ?? {};
    const sortArr = sort ? (Array.isArray(sort) ? sort : [sort]) : undefined;
    const filters = ilike(permissionsTable.id, `%${search}%`);

    return queryPaginatedData({
      table: permissionsTable,
      filters,
      sortArr,
      limit,
      page,
    });
  }
}

export const permissionsService = new PermissionsService();
