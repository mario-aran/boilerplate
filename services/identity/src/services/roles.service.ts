import { PERMISSION_VALUES } from '@/constants/permissions';
import { SYSTEM_ROLE_VALUES, SYSTEM_ROLES } from '@/constants/system-roles';
import { db } from '@/lib/drizzle/db';
import {
  ROLES_TABLE_NAME,
  ROLES_TO_PERMISSIONS_TABLE_NAME,
  rolesTable,
  rolesToPermissionsTable,
  RoleToPermissionInsert,
} from '@/lib/drizzle/schemas';
import { queryPaginatedData } from '@/lib/drizzle/utils/query-paginated-data';
import { GetAllRoles, UpdateRole } from '@/lib/zod/schemas/roles.schema';
import { getSeedMessage } from '@/utils/get-seed-message';
import { HttpError } from '@/utils/http-error';
import { eq, ilike } from 'drizzle-orm';
import { StatusCodes } from 'http-status-codes';

class RolesService {
  private roleNotFoundError = new HttpError({
    message: 'Role not found',
    httpStatus: StatusCodes.NOT_FOUND,
  });

  public getAll = async ({ limit, page, sort, search = '' }: GetAllRoles) =>
    queryPaginatedData({
      schema: rolesTable,
      filters: ilike(rolesTable.id, `%${search}%`),
      limit,
      page,
      sort,
    });

  public get = async (id: string) => {
    const records = await db.query.rolesTable.findFirst({
      with: { rolesToPermissions: { columns: { permissionId: true } } },
      where: eq(rolesTable.id, id),
    });
    if (!records) throw this.roleNotFoundError;

    // Flatten results
    const { rolesToPermissions, ...restOfRecords } = records;
    const permissionIds = rolesToPermissions.map(
      ({ permissionId }) => permissionId,
    );
    return { ...restOfRecords, permissionIds };
  };

  public update = async (id: string, { permissionIds }: UpdateRole) =>
    db.transaction(async (tx) => {
      // Remove all existing permissions for this role
      await tx
        .delete(rolesToPermissionsTable)
        .where(eq(rolesToPermissionsTable.roleId, id));

      // Add new permissions for this role
      return tx
        .insert(rolesToPermissionsTable)
        .values(
          permissionIds.map((permissionId) => ({ roleId: id, permissionId })),
        );
    });

  public seedSystemRoles = async () => {
    const createdRecords = await db
      .insert(rolesTable)
      .values(SYSTEM_ROLE_VALUES.map((id) => ({ id })))
      .onConflictDoNothing()
      .returning({ id: rolesTable.id });

    const seededKeys = createdRecords.map(({ id }) => id);
    return getSeedMessage(ROLES_TABLE_NAME, seededKeys);
  };

  public seedSystemRolesToPermissions = async () => {
    const createdRecords = await db
      .insert(rolesToPermissionsTable)
      .values(
        PERMISSION_VALUES.map(
          (permissionId): RoleToPermissionInsert => ({
            roleId: SYSTEM_ROLES.SUPER_ADMIN,
            permissionId,
          }),
        ),
      )
      .onConflictDoNothing()
      .returning({ roleId: rolesToPermissionsTable.roleId });

    const seededKeys = [...new Set(createdRecords.map(({ roleId }) => roleId))];
    return getSeedMessage(ROLES_TO_PERMISSIONS_TABLE_NAME, seededKeys);
  };
}

export const rolesService = new RolesService();
