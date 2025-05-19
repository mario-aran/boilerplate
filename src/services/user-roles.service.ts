import { db } from '@/lib/drizzle/db';
import {
  userRolesTable,
  userRolesToPermissionsTable,
} from '@/lib/drizzle/schemas';
import { queryPaginatedData } from '@/lib/drizzle/utils/query-paginated-data';
import {
  GetAllUserRoles,
  UpdateUserRole,
  UserRoleId,
} from '@/lib/zod/schemas/user-roles.schema';
import { NotFoundError } from '@/utils/errors';
import { eq, ilike } from 'drizzle-orm';

class UserRolesService {
  public getAll = async ({
    limit,
    page,
    sort,
    search = '',
  }: GetAllUserRoles) => {
    const filters = ilike(userRolesTable.id, `%${search}%`);

    return queryPaginatedData({
      schema: userRolesTable,
      filters,
      limit,
      sort,
      page,
    });
  };

  public get = async ({ id }: UserRoleId) => {
    const record = await db.query.userRolesTable.findFirst({
      with: { userRolesToPermissions: { columns: { permissionId: true } } },
      where: eq(userRolesTable.id, id),
    });
    if (!record) throw this.createNotFoundError();

    // Flatten info
    const { userRolesToPermissions, ...restOfRecord } = record;
    return {
      ...restOfRecord,
      permissionIds: userRolesToPermissions.map(
        ({ permissionId }) => permissionId,
      ),
    };
  };

  public update = async (
    { id }: UserRoleId,
    { permissionIds, ...restOfData }: UpdateUserRole,
  ) => {
    return db.transaction(async (tx) => {
      // Update values
      const [updatedRecord] = await tx
        .update(userRolesTable)
        .set(restOfData)
        .where(eq(userRolesTable.id, id))
        .returning();
      if (!updatedRecord) throw this.createNotFoundError();

      if (permissionIds) {
        // Remove all existing permissions for this role
        await tx
          .delete(userRolesToPermissionsTable)
          .where(eq(userRolesToPermissionsTable.userRoleId, id));

        // Add new permissions for this role
        await tx.insert(userRolesToPermissionsTable).values(
          permissionIds.map((permissionId) => ({
            userRoleId: id,
            permissionId,
          })),
        );
      }

      return updatedRecord;
    });
  };

  private createNotFoundError = () => new NotFoundError('User role not found');
}

export const userRolesService = new UserRolesService();
