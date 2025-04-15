import { db } from '@/lib/drizzle/db';
import { userRolesSchema } from '@/lib/drizzle/schemas';
import { queryPaginatedData } from '@/lib/drizzle/utils/query-paginated-data';
import {
  CreateUserRoleZod,
  GetAllUserRolesZod,
  UpdateUserRoleZod,
} from '@/lib/zod/schemas/user-roles.zod';
import { eq, ilike } from 'drizzle-orm';

class UserRolesService {
  public async getAll({ limit, page, sort, search = '' }: GetAllUserRolesZod) {
    return queryPaginatedData({
      schema: userRolesSchema,
      filters: ilike(userRolesSchema.name, `%${search}%`),
      limit,
      sort,
      page,
    });
  }

  public async get(id: string) {
    return db.query.userRolesSchema.findFirst({
      where: eq(userRolesSchema.id, id),
    });
  }

  public async create(data: CreateUserRoleZod) {
    const [createdRecord] = await db
      .insert(userRolesSchema)
      .values(data)
      .returning({ id: userRolesSchema.id });

    return createdRecord;
  }

  public async update(id: string, data: UpdateUserRoleZod) {
    const [updatedRecord] = await db
      .update(userRolesSchema)
      .set(data)
      .where(eq(userRolesSchema.id, id))
      .returning({ id: userRolesSchema.id });

    return updatedRecord;
  }

  public async delete(id: string) {
    const [deletedRecord] = await db
      .delete(userRolesSchema)
      .where(eq(userRolesSchema.id, id))
      .returning({ id: userRolesSchema.id });

    return deletedRecord;
  }
}

export const userRolesService = new UserRolesService();
