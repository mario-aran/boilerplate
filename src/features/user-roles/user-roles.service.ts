import { db } from '@/lib/drizzle/db';
import {
  userRolesSchema,
  userRolesToPermissionsSchema,
} from '@/lib/drizzle/schemas';
import { queryPaginatedData } from '@/lib/drizzle/utils/query-paginated-data';
import {
  ReadAllUserRolesZod,
  UpdateUserRoleZod,
} from '@/lib/zod/schemas/v1/user-roles.zod';
import { eq } from 'drizzle-orm';

class UserRolesService {
  public async readAll({ limit, page, sort }: ReadAllUserRolesZod) {
    return queryPaginatedData({ schema: userRolesSchema, limit, sort, page });
  }

  public async read(id: string) {
    const record = await db.query.userRolesSchema.findFirst({
      with: { userRolesToPermissions: { columns: { permissionId: true } } },
      where: eq(userRolesSchema.id, id),
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
    { permissionIds, ...restOfData }: UpdateUserRoleZod,
  ) {
    return db.transaction(async (tx) => {
      if (permissionIds) {
        // Delete old permissions
        await tx
          .delete(userRolesToPermissionsSchema)
          .where(eq(userRolesToPermissionsSchema.userRoleId, id));

        // Insert new permissions
        const values = permissionIds.map((permissionId) => ({
          userRoleId: id,
          permissionId,
        }));
        await tx.insert(userRolesToPermissionsSchema).values(values);
      }

      // Update values
      const [updatedRecord] = await tx
        .update(userRolesSchema)
        .set(restOfData)
        .where(eq(userRolesSchema.id, id))
        .returning({ id: userRolesSchema.id });
      return updatedRecord;
    });
  }
}

export const userRolesService = new UserRolesService();
