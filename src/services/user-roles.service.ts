import { ERROR_CODES } from '@/constants/error-codes';
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
import { eq, ilike } from 'drizzle-orm';

// Types
type UserRoleSelect = typeof userRolesTable.$inferSelect;

type GetResult =
  | { errorCode: typeof ERROR_CODES.NOT_FOUND }
  | (UserRoleSelect & { permissionIds: string[] });

type UpdateResult =
  | { errorCode: typeof ERROR_CODES.NOT_FOUND }
  | UserRoleSelect;

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

  public get = async ({ id }: UserRoleId): Promise<GetResult> => {
    const record = await db.query.userRolesTable.findFirst({
      with: { userRolesToPermissions: { columns: { permissionId: true } } },
      where: eq(userRolesTable.id, id),
    });
    if (!record) return { errorCode: ERROR_CODES.NOT_FOUND };

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
  ): Promise<UpdateResult> => {
    return db.transaction(async (tx) => {
      // Update values
      const [updatedRecord] = await tx
        .update(userRolesTable)
        .set(restOfData)
        .where(eq(userRolesTable.id, id))
        .returning();
      if (!updatedRecord) return { errorCode: ERROR_CODES.NOT_FOUND };

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
}

export const userRolesService = new UserRolesService();
