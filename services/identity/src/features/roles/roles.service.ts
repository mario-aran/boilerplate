import { Permission } from '@/constants/permissions';
import { buildEntityNotFoundError } from '@/errors/api-errors';
import { db } from '@/lib/drizzle/db';
import { rolesTable, rolesToPermissionsTable } from '@/lib/drizzle/schemas';
import { queryPaginatedData } from '@/lib/drizzle/utils/query-paginated-data';
import {
  CreateRole,
  GetRoles,
  UpdateRole,
} from '@/lib/zod/schemas/roles.schema';
import { eq, ilike } from 'drizzle-orm';

const RoleNotFoundError = buildEntityNotFoundError('Role');

class RolesService {
  async getAll({ limit, page, sort, search }: GetRoles) {
    const filters = search ? ilike(rolesTable.id, `%${search}%`) : undefined;
    return queryPaginatedData({
      table: rolesTable,
      filters,
      sort,
      limit,
      page,
    });
  }

  async get(id: string) {
    const role = await db.query.rolesTable.findFirst({
      with: { rolesToPermissions: { columns: { permissionId: true } } },
      where: eq(rolesTable.id, id),
    });
    if (!role) throw RoleNotFoundError;

    const { rolesToPermissions, ...restOfRole } = role;
    const permissionIds = rolesToPermissions.map((el) => el.permissionId);
    return { ...restOfRole, permissionIds };
  }

  async create(props: CreateRole) {
    const [createdRole] = await db.insert(rolesTable).values(props).returning();
    return createdRole;
  }

  async update(id: string, { permissionIds, ...restOfProps }: UpdateRole) {
    // Guard role
    await this.get(id);

    const replacedPermissionIds = permissionIds
      ? await this.replacePermissionsForRole(id, permissionIds)
      : [];

    const [updatedRole] = await db
      .update(rolesTable)
      .set(restOfProps)
      .where(eq(rolesTable.id, id))
      .returning();

    return { ...updatedRole, permissionIds: replacedPermissionIds };
  }

  async delete(id: string) {
    const deletedRoles = await db
      .delete(rolesTable)
      .where(eq(rolesTable.id, id))
      .returning();
    if (!deletedRoles.length) throw RoleNotFoundError;

    return deletedRoles[0];
  }

  private async replacePermissionsForRole(
    id: string,
    permissionIds: Permission[],
  ) {
    const createdRows = await db.transaction(async (tx) => {
      // Delete existing permissions for this role
      await tx
        .delete(rolesToPermissionsTable)
        .where(eq(rolesToPermissionsTable.roleId, id));
      if (!permissionIds.length) return [];

      // Add permissions for this role
      return tx
        .insert(rolesToPermissionsTable)
        .values(
          permissionIds.map((permissionId) => ({ roleId: id, permissionId })),
        )
        .returning();
    });

    return createdRows.map((el) => el.permissionId);
  }
}

export const rolesService = new RolesService();
