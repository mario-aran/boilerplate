import { USER_ROLES } from '@/constants/user-roles';
import { db } from '@/lib/drizzle/db';
import { usersSchema } from '@/lib/drizzle/schemas';
import { queryPaginatedData } from '@/lib/drizzle/utils/query-paginated-data';
import {
  CreateUserZod,
  GetAllUsersZod,
  UpdateUserPasswordZod,
  UpdateUserZod,
} from '@/lib/zod/schemas/users.zod';
import bcrypt from 'bcryptjs';
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
    return { ...restOfResults, data: dataWithNoPassword };
  }

  public async get(id: string) {
    return db.query.usersSchema.findFirst({
      columns: { password: false },
      where: eq(usersSchema.id, id),
    });
  }

  public async create(data: CreateUserZod) {
    const hashedPassword = await this.hashPassword(data.password);
    const [createdRecord] = await db
      .insert(usersSchema)
      .values({
        ...data,
        userRoleId: USER_ROLES.DEFAULT,
        password: hashedPassword,
      })
      .returning({ email: usersSchema.email });

    return createdRecord;
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
    const hashedPassword = await this.hashPassword(data.password);
    const [updatedRecord] = await db
      .update(usersSchema)
      .set({ password: hashedPassword })
      .where(eq(usersSchema.id, id))
      .returning({ email: usersSchema.email });

    return updatedRecord;
  }

  private async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }
}

export const usersService = new UsersService();
