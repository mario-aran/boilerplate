import { USER_ROLES } from '@/constants/user-roles';
import { db } from '@/lib/drizzle/db';
import { usersTable } from '@/lib/drizzle/schemas';
import { queryPaginatedData } from '@/lib/drizzle/utils/query-paginated-data';
import { hashPassword } from '@/lib/passport/utils/auth';
import {
  CreateUser,
  GetAllUsers,
  UpdateUser,
  UpdateUserPassword,
  UserId,
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
      ilike(usersTable.userRoleId, `%${userRoleId}%`),
      or(
        ilike(usersTable.email, `%${search}%`),
        ilike(usersTable.firstName, `%${search}%`),
        ilike(usersTable.lastName, `%${search}%`),
      ),
    );
    const { data, ...pagination } = await queryPaginatedData({
      schema: usersTable,
      filters,
      limit,
      sort,
      page,
    });

    const dataWithoutPassword = data.map(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ({ password: _, ...restOfRecord }) => restOfRecord,
    );
    return { data: dataWithoutPassword, ...pagination };
  }

  public async get({ id }: UserId) {
    const record = await db.query.usersTable.findFirst({
      columns: { password: false },
      with: {
        userRole: {
          columns: {},
          with: { userRolesToPermissions: { columns: { permissionId: true } } },
        },
      },
      where: eq(usersTable.id, id),
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
      .insert(usersTable)
      .values({
        ...dataWithNoPassword,
        userRoleId: USER_ROLES.USER,
        password: hashedPassword,
      })
      .returning({ email: usersTable.email });
    return createdRecord;
  }

  public async update({ id }: UserId, data: UpdateUser) {
    const [updatedRecord] = await db
      .update(usersTable)
      .set(data)
      .where(eq(usersTable.id, id))
      .returning({ email: usersTable.email });
    return updatedRecord;
  }

  public async updatePassword(
    { id }: UserId,
    { password }: UpdateUserPassword,
  ) {
    const hashedPassword = await hashPassword(password);
    const [updatedRecord] = await db
      .update(usersTable)
      .set({ password: hashedPassword })
      .where(eq(usersTable.id, id))
      .returning({ email: usersTable.email });
    return updatedRecord;
  }
}

export const usersService = new UsersService();
