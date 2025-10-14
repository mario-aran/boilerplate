import { db } from '@/lib/drizzle/db';
import { rolesTable, rolesToPermissionsTable } from '@/lib/drizzle/schemas';
import { queryPaginatedData } from '@/lib/drizzle/utils/query-paginated-data';
import {
  CreateRole,
  GetRoles,
  UpdateRole,
} from '@/lib/zod/schemas/roles.schema';
import { HttpError } from '@/utils/http-error';
import { eq, ilike } from 'drizzle-orm';
import { StatusCodes } from 'http-status-codes';

class RolesService {
  private static readonly notFoundError = new HttpError({
    status: StatusCodes.NOT_FOUND,
    message: 'Role not found',
  });

  async getAll({ limit, page, sort, search = '' }: GetRoles) {
    return queryPaginatedData({
      table: rolesTable,
      filters: ilike(rolesTable.id, `%${search}%`),
      limit,
      page,
      sortArr: sort ? (Array.isArray(sort) ? sort : [sort]) : undefined,
    });
  }

  async get(id: string) {
    const records = await db.query.rolesTable.findFirst({
      with: { rolesToPermissions: { columns: { permissionId: true } } },
      where: eq(rolesTable.id, id),
    });
    if (!records) throw RolesService.notFoundError;

    // Flat results
    const { rolesToPermissions, ...restOfRecords } = records;
    const permissionIds = rolesToPermissions.map(
      ({ permissionId }) => permissionId,
    );
    return { ...restOfRecords, permissionIds };
  }

  async create(props: CreateRole) {
    const [createdRecord] = await db
      .insert(rolesTable)
      .values(props)
      .returning();
    return createdRecord;
  }

  async update(id: string, { permissionIds, ...restOfProps }: UpdateRole) {
    // Update roles
    if (Object.keys(restOfProps).length)
      await db.update(rolesTable).set(restOfProps).where(eq(rolesTable.id, id));

    // Update roles to permissions
    if (permissionIds) await this.updatePermissions(id, { permissionIds });

    // Return updated role with permissions
    return this.get(id);
  }

  async delete(id: string) {
    const [deletedRecord] = await db
      .delete(rolesTable)
      .where(eq(rolesTable.id, id))
      .returning({ id: rolesTable.id });
    if (!deletedRecord) throw RolesService.notFoundError;

    return deletedRecord;
  }

  private async updatePermissions(
    id: string,
    { permissionIds }: Required<Pick<UpdateRole, 'permissionIds'>>,
  ) {
    return db.transaction(async (tx) => {
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

export const rolesService = new RolesService();
