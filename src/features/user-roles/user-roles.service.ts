import { db } from '@/lib/drizzle/db';
import {
  userRolesTable,
  userRolesToPermissionsTable,
} from '@/lib/drizzle/schemas';
import { queryPaginatedData } from '@/lib/drizzle/utils/query-paginated-data';
import {
  GetAllUserRoles,
  UpdateUserRole,
} from '@/lib/zod/schemas/v1/user-roles.schema';
import { eq } from 'drizzle-orm';

class UserRolesService {
  public async getAll({ limit, page, sort }: GetAllUserRoles) {
    return queryPaginatedData({ schema: userRolesTable, limit, sort, page });
  }

  public async get(id: string) {
    const record = await db.query.userRolesTable.findFirst({
      with: { userRolesToPermissions: { columns: { permissionId: true } } },
      where: eq(userRolesTable.id, id),
    });
    if (!record) return null;

    // Flatten info
    const { userRolesToPermissions, ...restOfRecord } = record;
    return {
      ...restOfRecord,
      permissionIds: userRolesToPermissions.map(
        ({ permissionId }) => permissionId,
      ),
    };
  }

  public async update(
    id: string,
    { permissionIds, ...restOfData }: UpdateUserRole,
  ) {
    return db.transaction(async (tx) => {
      if (permissionIds) {
        // Delete old permissions
        await tx
          .delete(userRolesToPermissionsTable)
          .where(eq(userRolesToPermissionsTable.userRoleId, id));

        // Insert new permissions
        await tx.insert(userRolesToPermissionsTable).values(
          permissionIds.map((permissionId) => ({
            userRoleId: id,
            permissionId,
          })),
        );
      }

      // Update values
      const [updatedRecord] = await tx
        .update(userRolesTable)
        .set(restOfData)
        .where(eq(userRolesTable.id, id))
        .returning({ id: userRolesTable.id });
      return updatedRecord;
    });
  }
}

export const userRolesService = new UserRolesService();
