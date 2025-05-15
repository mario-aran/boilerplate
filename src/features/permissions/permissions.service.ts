import { permissionsSchema } from '@/lib/drizzle/schemas';
import { queryPaginatedData } from '@/lib/drizzle/utils/query-paginated-data';
import { GetAllPermissions } from '@/lib/zod/schemas/v1';

class PermissionsService {
  public async getAll({ limit, page, sort }: GetAllPermissions) {
    return queryPaginatedData({ schema: permissionsSchema, limit, sort, page });
  }
}

export const permissionsService = new PermissionsService();
