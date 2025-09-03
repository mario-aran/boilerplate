import { PERMISSION_VALUES } from '@/constants/permissions';
import { DrizzleDb } from '@/lib/drizzle';
import { permissionsTable } from '@/lib/drizzle/schemas';

// Types
interface PermissionsSeedServiceProps {
  db: DrizzleDb;
}

export class PermissionsSeedService {
  private readonly db: DrizzleDb;

  constructor({ db }: PermissionsSeedServiceProps) {
    this.db = db;
  }

  async seed() {
    const createdRecords = await this.db
      .insert(permissionsTable)
      .values(PERMISSION_VALUES.map((id) => ({ id })))
      .onConflictDoNothing()
      .returning({ id: permissionsTable.id });

    const createdKeys = createdRecords.map(({ id }) => id);
    return { createdKeys };
  }
}
