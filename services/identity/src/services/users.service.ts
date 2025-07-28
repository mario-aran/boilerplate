import { hashPassword } from '@/lib/bcrypt/utils';
import { db } from '@/lib/drizzle/db';
import { UserSelect, usersTable } from '@/lib/drizzle/schemas';
import { queryPaginatedData } from '@/lib/drizzle/utils/query-paginated-data';
import { Register } from '@/lib/zod/schemas/auth.schema';
import { GetAllUsers } from '@/lib/zod/schemas/users.schema';
import { HttpError } from '@/utils/http-error';
import { and, eq, ilike, or } from 'drizzle-orm';
import { StatusCodes } from 'http-status-codes';

class UsersService {
  private userNotFoundError = new HttpError({
    message: 'User not found',
    httpStatus: StatusCodes.NOT_FOUND,
  });

  private emailAlreadyInUseError = new HttpError({
    message: 'Email already in use',
    httpStatus: StatusCodes.CONFLICT,
  });

  public readAll = async ({
    limit,
    page,
    sort,
    roleId = '',
    search = '',
  }: GetAllUsers) => {
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
  };

  public read = async (userId: string) => {
    const user = await db.query.usersTable.findFirst({
      columns: { password: false },
      with: {
        role: {
          columns: {},
          with: { rolesToPermissions: { columns: { permissionId: true } } },
        },
      },
      where: eq(usersTable.id, userId),
    });
    if (!user) throw this.userNotFoundError;

    // Flatten results
    const { role, ...restOfUser } = user;
    const permissionIds = role.rolesToPermissions.map(
      ({ permissionId }) => permissionId,
    );
    return { ...restOfUser, permissionIds };
  };

  public readByEmailWithPassword = async (email: string) => {
    const user = await db.query.usersTable.findFirst({
      where: eq(usersTable.email, email),
    });
    if (!user) throw this.userNotFoundError;

    return user;
  };

  public create = async ({ password, ...restOfProps }: Register) => {
    await this.validateEmailUniqueness(restOfProps.email);

    const hashedPassword = await hashPassword(password);

    const [createdUser] = await db
      .insert(usersTable)
      .values({ ...restOfProps, password: hashedPassword })
      .returning();

    return this.omitUserPassword(createdUser);
  };

  public update = async (
    userId: string,
    { password, ...restOfProps }: Partial<typeof usersTable.$inferInsert>,
  ) => {
    // Guards
    if (restOfProps.email)
      await this.validateEmailUniqueness(restOfProps.email);

    // Fields
    const hashedPassword = password ? await hashPassword(password) : undefined;

    // Query
    const [updatedUser] = await db
      .update(usersTable)
      .set({ ...restOfProps, password: hashedPassword })
      .where(eq(usersTable.id, userId))
      .returning();
    if (!updatedUser) throw this.userNotFoundError;

    // Prepare results
    return this.omitUserPassword(updatedUser);
  };

  private omitUserPassword = <T extends UserSelect>({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    password: _,
    ...restOfProps
  }: T) => restOfProps;

  private validateEmailUniqueness = async (email: string) => {
    const user = await db.query.usersTable.findFirst({
      where: eq(usersTable.email, email),
    });
    if (user) throw this.emailAlreadyInUseError;
  };
}

export const usersService = new UsersService();
