import { USER_ROLES } from '@/constants/user-roles';
import { db } from '@/lib/drizzle/db';
import { usersSchema } from '@/lib/drizzle/schemas';
import { queryPaginatedData } from '@/lib/drizzle/utils/query-paginated-data';
import { hashPassword } from '@/lib/passport/utils';
import {
  CreateUser,
  GetAllUsers,
  UpdateUser,
  UpdateUserPassword,
} from '@/lib/zod/schemas/v1';
import { and, eq, ilike, or } from 'drizzle-orm';

class UsersService {
  public async getAll({
    limit,
    page,
    sort,
    userRoleId = '',
    search = '',
  }: GetAllUsers) {
    const filters = and(
      ilike(usersSchema.userRoleId, `%${userRoleId}%`),
      or(
        ilike(usersSchema.email, `%${search}%`),
        ilike(usersSchema.firstName, `%${search}%`),
        ilike(usersSchema.lastName, `%${search}%`),
      ),
    );
    const { data, ...pagination } = await queryPaginatedData({
      schema: usersSchema,
      filters,
      limit,
      sort,
      page,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const dataWithoutPassword = data.map(({ password: _, ...rest }) => rest);
    return { data: dataWithoutPassword, ...pagination };
  }

  public async get(id: string) {
    const record = await db.query.usersSchema.findFirst({
      columns: { password: false },
      with: {
        userRole: {
          columns: {},
          with: { userRolesToPermissions: { columns: { permissionId: true } } },
        },
      },
      where: eq(usersSchema.id, id),
    });
    if (!record) return null;

    // Flatten info
    const { userRole, ...restOfRecord } = record;
    return {
      ...restOfRecord,
      permissionIds: userRole.userRolesToPermissions.map(
        ({ permissionId }) => permissionId,
      ),
    };
  }

  public async create({ password, ...dataWithNoPassword }: CreateUser) {
    const hashedPassword = await hashPassword(password);
    const [createdRecord] = await db
      .insert(usersSchema)
      .values({
        ...dataWithNoPassword,
        userRoleId: USER_ROLES.USER,
        password: hashedPassword,
      })
      .returning({ email: usersSchema.email });
    return createdRecord;
  }

  public async update(id: string, data: UpdateUser) {
    const [updatedRecord] = await db
      .update(usersSchema)
      .set(data)
      .where(eq(usersSchema.id, id))
      .returning({ email: usersSchema.email });
    return updatedRecord;
  }

  public async updatePassword(id: string, { password }: UpdateUserPassword) {
    const hashedPassword = await hashPassword(password);
    const [updatedRecord] = await db
      .update(usersSchema)
      .set({ password: hashedPassword })
      .where(eq(usersSchema.id, id))
      .returning({ email: usersSchema.email });
    return updatedRecord;
  }
}

export const usersService = new UsersService();
