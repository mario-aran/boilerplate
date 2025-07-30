import { PERMISSION_VALUES } from '@/constants/permissions';
import { db } from '@/lib/drizzle/db';
import {
  PERMISSIONS_TABLE_NAME,
  permissionsTable,
} from '@/lib/drizzle/schemas';
import { getSeedMessage } from '@/utils/get-seed-message';

class PermissionsSeedService {
  public seedSystemData = async () => {
    const createdRecords = await db
      .insert(permissionsTable)
      .values(PERMISSION_VALUES.map((id) => ({ id })))
      .onConflictDoNothing()
      .returning({ id: permissionsTable.id });

    const createdKeys = createdRecords.map(({ id }) => id);
    const seedMessage = getSeedMessage(PERMISSIONS_TABLE_NAME, createdKeys);
    console.log(seedMessage);
  };
}

export const permissionsSeedService = new PermissionsSeedService();
