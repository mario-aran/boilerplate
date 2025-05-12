import { permissionsSchema } from '@/lib/drizzle/schemas';
import { queryPaginatedData } from '@/lib/drizzle/utils/query-paginated-data';
import { ReadAllPermissionsZod } from '@/lib/zod/schemas/v1/permissions.zod';

class PermissionsService {
  public async readAll({ limit, page, sort }: ReadAllPermissionsZod) {
    return queryPaginatedData({ schema: permissionsSchema, limit, sort, page });
  }
}

export const permissionsService = new PermissionsService();
