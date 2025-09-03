import { DrizzleDb } from '@/lib/drizzle';
import { permissionsTable } from '@/lib/drizzle/schemas';
import { queryPaginatedData } from '@/lib/drizzle/utils/query-paginated-data';
import { GetAllPermissions } from '@/lib/zod/schemas/permissions.schema';
import { ilike } from 'drizzle-orm';

// Types
interface PermissionsServiceProps {
  db: DrizzleDb;
}

export class PermissionsService {
  private readonly db: DrizzleDb;

  constructor({ db }: PermissionsServiceProps) {
    this.db = db;
  }

  async getAll({ limit, page, sort, search = '' }: GetAllPermissions) {
    return queryPaginatedData(this.db, {
      schema: permissionsTable,
      filters: ilike(permissionsTable.id, `%${search}%`),
      limit,
      page,
      sort,
    });
  }
}
