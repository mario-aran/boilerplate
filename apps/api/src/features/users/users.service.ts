import { db } from '@/lib/drizzle/db';
import { usersSchema } from '@/lib/drizzle/schemas';
import { queryPaginatedData } from '@/lib/drizzle/utils/query-paginated-data';
import {
  GetAllUsersZod,
  UpdateUserPasswordZod,
  UpdateUserZod,
} from '@/lib/zod/schemas/users.zod';
import { hashPassword } from '@/utils/hash-password';
import { and, eq, ilike, or } from 'drizzle-orm';

class UsersService {
  public async getAll({
    limit,
    page,
    sort,
    userRoleId = '',
    search = '',
  }: GetAllUsersZod) {
    // Prepare filters
    const filters = and(
      ilike(usersSchema.userRoleId, `%${userRoleId}%`),
      or(
        ilike(usersSchema.email, `%${search}%`),
        ilike(usersSchema.firstName, `%${search}%`),
        ilike(usersSchema.lastName, `%${search}%`),
      ),
    );

    // Query results
    const { data, ...restOfResults } = await queryPaginatedData({
      schema: usersSchema,
      filters,
      limit,
      sort,
      page,
    });

    // Remove password from results
    const dataWithNoPassword = data.map(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ({ password: _, ...restOfData }) => restOfData,
    );

    // Return results with no password
    return {
      data: dataWithNoPassword,
      ...restOfResults,
    };
  }

  public async get(id: string) {
    return db.query.usersSchema.findFirst({
      columns: { password: false },
      where: eq(usersSchema.id, id),
    });
  }

  public async update(id: string, data: UpdateUserZod) {
    const [updatedRecord] = await db
      .update(usersSchema)
      .set(data)
      .where(eq(usersSchema.id, id))
      .returning({ email: usersSchema.email });

    return updatedRecord;
  }

  public async updatePassword(id: string, data: UpdateUserPasswordZod) {
    const hashedPassword = await hashPassword(data.password);
    const [updatedRecord] = await db
      .update(usersSchema)
      .set({ password: hashedPassword })
      .where(eq(usersSchema.id, id))
      .returning({ email: usersSchema.email });

    return updatedRecord;
  }
}

export const usersService = new UsersService();
