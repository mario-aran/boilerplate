import { db } from '@/lib/drizzle/db';
import {
  userRolesSchema,
  userRolesToPermissionsSchema,
} from '@/lib/drizzle/schemas';
import { queryPaginatedData } from '@/lib/drizzle/utils/query-paginated-data';
import {
  CreateUserRoleZod,
  ReadAllUserRolesZod,
  UpdateUserRoleZod,
} from '@/lib/zod/schemas/v1/user-roles.zod';
import { eq } from 'drizzle-orm';

class UserRolesService {
  public async create(data: CreateUserRoleZod) {
    const [createdRecord] = await db
      .insert(userRolesSchema)
      .values(data)
      .returning({ id: userRolesSchema.id });

    return createdRecord;
  }

  public async readAll({ limit, page, sort }: ReadAllUserRolesZod) {
    return queryPaginatedData({
      schema: userRolesSchema,
      limit,
      sort,
      page,
    });
  }

  public async read(id: string) {
    // Check record
    const record = await db.query.userRolesSchema.findFirst({
      with: {
        userRolesToPermissions: {
          columns: { permissionId: true },
        },
      },
      where: eq(userRolesSchema.id, id),
    });
    if (!record) return null;

    // Flatten info
    const { userRolesToPermissions, ...restOfRecord } = record;
    const permissionIds = userRolesToPermissions.map(
      ({ permissionId }) => permissionId,
    );

    return { ...restOfRecord, permissionIds };
  }

  public async update(
    id: string,
    { permissionIds, ...restOfData }: UpdateUserRoleZod,
  ) {
    return db.transaction(async (tx) => {
      // Check permissionIds
      if (permissionIds) {
        // Delete old permissions from userRolesToPermissionsSchema
        await tx
          .delete(userRolesToPermissionsSchema)
          .where(eq(userRolesToPermissionsSchema.userRoleId, id));

        // Insert new permissions into userRolesToPermissionsSchema
        const values = permissionIds.map((permissionId) => ({
          userRoleId: id,
          permissionId,
        }));
        await tx.insert(userRolesToPermissionsSchema).values(values);
      }

      // Update userRoleSchema values
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
