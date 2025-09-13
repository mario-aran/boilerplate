import { permissionsTable } from '@/lib/drizzle/schemas';
import { queryPaginatedData } from '@/lib/drizzle/utils/query-paginated-data';
import { GetAllPermissions } from '@/lib/zod/schemas/permissions.schema';
import { ilike } from 'drizzle-orm';

class PermissionsService {
  async getAll({ limit, page, sort, search = '' }: GetAllPermissions) {
    const sortArr = sort ? (Array.isArray(sort) ? sort : [sort]) : undefined;
    return queryPaginatedData({
      table: permissionsTable,
      filters: ilike(permissionsTable.id, `%${search}%`),
      limit,
      page,
      sortArr,
    });
  }
}

export const permissionsService = new PermissionsService();
