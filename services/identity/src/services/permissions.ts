import { PERMISSION_VALUES } from '@/constants/permissions';
import { db } from '@/lib/drizzle/db';
import { permissionsTable } from '@/lib/drizzle/schemas';
import { queryPaginatedData } from '@/lib/drizzle/utils/query-paginated-data';
import { GetAllPermissions } from '@/lib/zod/schemas/permissions.schema';
import { ilike } from 'drizzle-orm';

class PermissionsService {
  public readAll = async ({
    limit,
    page,
    sort,
    search = '',
  }: GetAllPermissions) =>
    queryPaginatedData({
      schema: permissionsTable,
      filters: ilike(permissionsTable.id, `%${search}%`),
      limit,
      page,
      sort,
    });

  public seed = async () =>
    db
      .insert(permissionsTable)
      .values(PERMISSION_VALUES.map((id) => ({ id })))
      .onConflictDoNothing()
      .returning({ id: permissionsTable.id });
}

export const permissionsService = new PermissionsService();
