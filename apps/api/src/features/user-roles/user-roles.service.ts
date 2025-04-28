import { userRolesSchema } from '@/lib/drizzle/schemas';
import { queryPaginatedData } from '@/lib/drizzle/utils/query-paginated-data';
import { ReadAllUserRolesZod } from '@/lib/zod/schemas/user-roles.zod';

class UserRolesService {
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
