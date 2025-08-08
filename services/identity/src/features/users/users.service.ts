import { db } from '@/lib/drizzle/db';
import { UserInsert, UserSelect, usersTable } from '@/lib/drizzle/schemas';
import { queryPaginatedData } from '@/lib/drizzle/utils/query-paginated-data';
import { RegisterAuth } from '@/lib/zod/schemas/auth.schema';
import { GetAllUsers, UserId } from '@/lib/zod/schemas/users.schema';
import { HttpError } from '@/utils/http-error';
import { and, eq, ilike, or } from 'drizzle-orm';
import { StatusCodes } from 'http-status-codes';
import { hashPassword } from './utils/hash-password';

class UsersService {
  private userNotFoundError = new HttpError({
    message: 'User not found',
    httpStatus: StatusCodes.NOT_FOUND,
  });

  async getAll({ limit, page, sort, roleId = '', search = '' }: GetAllUsers) {
    const filters = and(
      ilike(usersTable.roleId, `%${roleId}%`),
      or(
        ilike(usersTable.email, `%${search}%`),
        ilike(usersTable.firstName, `%${search}%`),
        ilike(usersTable.lastName, `%${search}%`),
      ),
    );
    const { data, ...restOfRecords } = await queryPaginatedData({
      schema: usersTable,
      filters,
      limit,
      page,
      sort,
    });

    const usersWithoutPassword = data.map(this.omitUserPassword);
    return { data: usersWithoutPassword, ...restOfRecords };
  }

  async get(id: UserId['id']) {
    const user = await db.query.usersTable.findFirst({
      columns: { password: false },
      with: {
        role: {
          columns: {},
          with: { rolesToPermissions: { columns: { permissionId: true } } },
        },
      },
      where: eq(usersTable.id, id),
    });
    if (!user) throw this.userNotFoundError;

    // Flatten results
    const { role, ...restOfUser } = user;
    const permissionIds = role.rolesToPermissions.map(
      ({ permissionId }) => permissionId,
    );
    return { ...restOfUser, permissionIds };
  }

  async getByEmailWithPassword(email: string) {
    const user = await db.query.usersTable.findFirst({
      where: eq(usersTable.email, email),
    });
    if (!user) throw this.userNotFoundError;

    return user;
  }

  async create({ password, ...restOfProps }: RegisterAuth) {
    const hashedPassword = await hashPassword(password);

    const [createdUser] = await db
      .insert(usersTable)
      .values({ ...restOfProps, password: hashedPassword })
      .returning();

    return this.omitUserPassword(createdUser);
  }

  async update(
    id: UserId['id'],
    { password, ...restOfProps }: Partial<UserInsert>,
  ) {
    const hashedPassword = password ? await hashPassword(password) : undefined;

    const [updatedUser] = await db
      .update(usersTable)
      .set({ ...restOfProps, password: hashedPassword })
      .where(eq(usersTable.id, id))
      .returning();
    if (!updatedUser) throw this.userNotFoundError;

    return this.omitUserPassword(updatedUser);
  }

  private omitUserPassword = <T extends UserSelect>({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    password: _,
    ...restOfProps
  }: T) => restOfProps;
}

export const usersService = new UsersService();
