import { PERMISSION_VALUES } from '@/constants/permissions';
import { db } from '@/lib/drizzle/connection';
import { permissionsTable } from '@/lib/drizzle/schemas';

class PermissionsSeedService {
  async seed() {
    const createdRecords = await db
      .insert(permissionsTable)
      .values(PERMISSION_VALUES.map((id) => ({ id })))
      .onConflictDoNothing()
      .returning({ id: permissionsTable.id });

    const createdKeys = createdRecords.map(({ id }) => id);
    return { createdKeys };
  }
}

export const permissionsSeedService = new PermissionsSeedService();
