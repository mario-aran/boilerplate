import { db } from '@/lib/drizzle/db';
import { permissionsSchema } from '@/lib/drizzle/schemas';
import { queryPaginatedData } from '@/lib/drizzle/utils/query-paginated-data';
import {
  CreatePermissionZod,
  ReadAllPermissionsZod,
} from '@/lib/zod/schemas/permissions.zod';

class PermissionsService {
  public async create(data: CreatePermissionZod) {
    const [createdRecord] = await db
      .insert(permissionsSchema)
      .values(data)
      .returning({ id: permissionsSchema.id });

    return createdRecord;
  }

  public async readAll({ limit, page, sort }: ReadAllPermissionsZod) {
    return queryPaginatedData({
      schema: permissionsSchema,
      limit,
      sort,
      page,
    });
  }
}

export const permissionsService = new PermissionsService();
