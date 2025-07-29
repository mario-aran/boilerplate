import { PERMISSION_VALUES } from '@/constants/permissions';
import { db } from '@/lib/drizzle/db';
import {
  PERMISSIONS_TABLE_NAME,
  permissionsTable,
} from '@/lib/drizzle/schemas';
import { queryPaginatedData } from '@/lib/drizzle/utils/query-paginated-data';
import { GetAllPermissions } from '@/lib/zod/schemas/permissions.schema';
import { getSeedMessage } from '@/utils/get-seed-message';
import { ilike } from 'drizzle-orm';

class PermissionsService {
  public getAll = async ({
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

  public seedSystemData = async () => {
    const createdRecords = await db
      .insert(permissionsTable)
      .values(PERMISSION_VALUES.map((id) => ({ id })))
      .onConflictDoNothing()
      .returning({ id: permissionsTable.id });

    const seededKeys = createdRecords.map(({ id }) => id);
    return getSeedMessage(PERMISSIONS_TABLE_NAME, seededKeys);
  };
}

export const permissionsService = new PermissionsService();
