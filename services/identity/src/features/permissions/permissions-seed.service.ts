import { PERMISSION_VALUES } from '@/constants/permissions';
import { drizzleDb } from '@/lib/drizzle';
import { permissionsTable } from '@/lib/drizzle/schemas';

class PermissionsSeedService {
  async seed() {
    const createdRecords = await drizzleDb
      .insert(permissionsTable)
      .values(PERMISSION_VALUES.map((id) => ({ id })))
      .onConflictDoNothing()
      .returning({ id: permissionsTable.id });

    const createdKeys = createdRecords.map(({ id }) => id);
    return { createdKeys };
  }
}

export const permissionsSeedService = new PermissionsSeedService();
