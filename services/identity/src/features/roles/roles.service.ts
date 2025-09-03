import { DrizzleDb } from '@/lib/drizzle';
import { rolesTable, rolesToPermissionsTable } from '@/lib/drizzle/schemas';
import { queryPaginatedData } from '@/lib/drizzle/utils/query-paginated-data';
import {
  CreateRole,
  GetAllRoles,
  RoleId,
  UpdateRole,
} from '@/lib/zod/schemas/roles.schema';
import { HttpError } from '@/utils/http-error';
import { eq, ilike } from 'drizzle-orm';
import { StatusCodes } from 'http-status-codes';

// Types
interface RolesServiceProps {
  db: DrizzleDb;
}

export class RolesService {
  private static readonly notFoundError = new HttpError({
    status: StatusCodes.NOT_FOUND,
    message: 'Role not found',
  });

  private readonly db: DrizzleDb;

  constructor({ db }: RolesServiceProps) {
    this.db = db;
  }

  async getAll({ limit, page, sort, search = '' }: GetAllRoles) {
    return queryPaginatedData(this.db, {
      schema: rolesTable,
      filters: ilike(rolesTable.id, `%${search}%`),
      limit,
      page,
      sort,
    });
  }

  async get(id: RoleId['id']) {
    const records = await this.db.query.rolesTable.findFirst({
      with: { rolesToPermissions: { columns: { permissionId: true } } },
      where: eq(rolesTable.id, id),
    });
    if (!records) throw RolesService.notFoundError;

    // Flatten results
    const { rolesToPermissions, ...restOfRecords } = records;
    const permissionIds = rolesToPermissions.map(
      ({ permissionId }) => permissionId,
    );
    return { ...restOfRecords, permissionIds };
  }

  async create(props: CreateRole) {
    const [createdRecord] = await this.db
      .insert(rolesTable)
      .values(props)
      .returning();
    return createdRecord;
  }

  async update(
    id: RoleId['id'],
    { permissionIds, ...restOfProps }: UpdateRole,
  ) {
    // Update roles
    if (Object.keys(restOfProps).length)
      await this.db
        .update(rolesTable)
        .set(restOfProps)
        .where(eq(rolesTable.id, id));

    // Update roles to permissions
    if (permissionIds) await this.updatePermissions(id, { permissionIds });

    // Return updated role with permissions
    return this.get(id);
  }

  async delete(id: RoleId['id']) {
    const [deletedRecord] = await this.db
      .delete(rolesTable)
      .where(eq(rolesTable.id, id))
      .returning({ id: rolesTable.id });
    if (!deletedRecord) throw RolesService.notFoundError;

    return deletedRecord;
  }

  private async updatePermissions(
    id: RoleId['id'],
    { permissionIds }: Required<Pick<UpdateRole, 'permissionIds'>>,
  ) {
    return this.db.transaction(async (tx) => {
      // Delete all existing permissions for this role
      await tx
        .delete(rolesToPermissionsTable)
        .where(eq(rolesToPermissionsTable.roleId, id));
      if (!permissionIds.length) return [];

      // Add new permissions for this role
      const newPermissions = permissionIds.map((permissionId) => ({
        roleId: id,
        permissionId,
      }));
      return tx
        .insert(rolesToPermissionsTable)
        .values(newPermissions)
        .returning();
    });
  }
}
