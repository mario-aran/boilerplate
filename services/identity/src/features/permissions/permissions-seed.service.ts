import { PERMISSION_VALUES } from '@/constants/permissions';
import { db } from '@/lib/drizzle/db';
import { permissionsTable } from '@/lib/drizzle/schemas';

class PermissionsSeedService {
  public seed = async () => {
    const createdRecords = await db
      .insert(permissionsTable)
      .values(PERMISSION_VALUES.map((id) => ({ id })))
      .onConflictDoNothing()
      .returning({ id: permissionsTable.id });

    const createdKeys = createdRecords.map(({ id }) => id);
    return { createdKeys };
  };
}

export const permissionsSeedService = new PermissionsSeedService();
