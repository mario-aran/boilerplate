import { USER_ROLES } from '@/constants/user-roles';
import { db } from '@/lib/drizzle/db';
import { usersTable } from '@/lib/drizzle/schemas';
import { queryPaginatedData } from '@/lib/drizzle/utils/query-paginated-data';
import { hashPassword } from '@/lib/passport/utils';
import {
  CreateUser,
  GetAllUsers,
  UpdateUser,
  UpdateUserPassword,
  UserId,
} from '@/lib/zod/schemas/users.schema';
import { isUniqueViolationError } from '@/utils/db-error-checks';
import { ConflictError, NotFoundError } from '@/utils/errors';
import { and, eq, ilike, or } from 'drizzle-orm';

// Types
type UserSelect = typeof usersTable.$inferSelect;

class UsersService {
  public getAll = async ({
    limit,
    page,
    sort,
    userRoleId = '',
    search = '',
  }: GetAllUsers) => {
    const { data, ...paginationData } = await queryPaginatedData({
      schema: usersTable,
      filters: and(
        ilike(usersTable.userRoleId, `%${userRoleId}%`),
        or(
          ilike(usersTable.email, `%${search}%`),
          ilike(usersTable.firstName, `%${search}%`),
          ilike(usersTable.lastName, `%${search}%`),
        ),
      ),
      limit,
      sort,
      page,
    });

    return {
      data: data.map(this.omitPassword),
      ...paginationData,
    };
  };

  public get = async ({ id }: UserId) => {
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
    if (!record) throw this.createNotFoundError();

    // Flatten info
    const { userRole, ...restOfRecord } = record;
    return {
      ...restOfRecord,
      permissionIds: userRole.userRolesToPermissions.map(
        ({ permissionId }) => permissionId,
      ),
    };
  };

  public create = async ({ password, ...restOfData }: CreateUser) => {
    try {
      const hashedPassword = await hashPassword(password);

      const [createdRecord] = await db
        .insert(usersTable)
        .values({
          ...restOfData,
          userRoleId: USER_ROLES.USER,
          password: hashedPassword,
        })
        .returning();
      return this.omitPassword(createdRecord);
    } catch (err) {
      if (isUniqueViolationError(err)) throw this.createConflictError();

      throw err;
    }
  };

  public update = async ({ id }: UserId, data: UpdateUser) => {
    try {
      const [updatedRecord] = await db
        .update(usersTable)
        .set(data)
        .where(eq(usersTable.id, id))
        .returning();
      if (!updatedRecord) throw this.createNotFoundError();

      return this.omitPassword(updatedRecord);
    } catch (err) {
      if (isUniqueViolationError(err)) throw this.createConflictError();

      throw err;
    }
  };

  public updatePassword = async (
    { id }: UserId,
    { password }: UpdateUserPassword,
  ) => {
    const hashedPassword = await hashPassword(password);

    const [updatedRecord] = await db
      .update(usersTable)
      .set({ password: hashedPassword })
      .where(eq(usersTable.id, id))
      .returning();
    if (!updatedRecord) throw this.createNotFoundError();

    return this.omitPassword(updatedRecord);
  };

  private omitPassword = ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    password: _,
    ...restOfRecord
  }: UserSelect) => restOfRecord;

  private createNotFoundError = () => new NotFoundError('User not found');
  private createConflictError = () => new ConflictError('Email already in use');
}

export const usersService = new UsersService();
