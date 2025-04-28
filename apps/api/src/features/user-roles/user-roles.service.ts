import { db } from '@/lib/drizzle/db';
import { userRolesSchema } from '@/lib/drizzle/schemas';
import { queryPaginatedData } from '@/lib/drizzle/utils/query-paginated-data';
import {
  CreateUserRoleZod,
  ReadAllUserRolesZod,
} from '@/lib/zod/schemas/user-roles.zod';

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
}

export const userRolesService = new UserRolesService();
