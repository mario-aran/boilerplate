import { db } from '@/lib/drizzle/db';
import { rolesTable, rolesToPermissionsTable } from '@/lib/drizzle/schemas';
import { queryPaginatedData } from '@/lib/drizzle/utils/query-paginated-data';
import { GetAllRoles, UpdateRole } from '@/lib/zod/schemas/roles.schema';
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
}

export const rolesService = new RolesService();
