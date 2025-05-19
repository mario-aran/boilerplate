import { ERROR_CODES } from '@/constants/error-codes';
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
import { and, eq, ilike, or } from 'drizzle-orm';

// Types
type UserSelect = typeof usersTable.$inferSelect;
type UserSelectNoPassword = Omit<UserSelect, 'password'>;

type GetResult =
  | { errorCode: typeof ERROR_CODES.NOT_FOUND }
  | (UserSelectNoPassword & { permissionIds: string[] });

type CreateResult =
  | { errorCode: typeof ERROR_CODES.CONFLICT }
  | UserSelectNoPassword;

type UpdateResult =
  | { errorCode: typeof ERROR_CODES.NOT_FOUND | typeof ERROR_CODES.CONFLICT }
  | UserSelectNoPassword;

type UpdatePasswordResult =
  | { errorCode: typeof ERROR_CODES.NOT_FOUND }
  | UserSelectNoPassword;

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

  public get = async ({ id }: UserId): Promise<GetResult> => {
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
    if (!record) return { errorCode: ERROR_CODES.NOT_FOUND };

    // Flatten info
    const { userRole, ...restOfRecord } = record;
    return {
      ...restOfRecord,
      permissionIds: userRole.userRolesToPermissions.map(
        ({ permissionId }) => permissionId,
      ),
    };
  };

  public create = async ({
    password,
    ...restOfData
  }: CreateUser): Promise<CreateResult> => {
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
      if (isUniqueViolationError(err))
        return { errorCode: ERROR_CODES.CONFLICT };

      throw err;
    }
  };

  public update = async (
    { id }: UserId,
    data: UpdateUser,
  ): Promise<UpdateResult> => {
    try {
      const [updatedRecord] = await db
        .update(usersTable)
        .set(data)
        .where(eq(usersTable.id, id))
        .returning();
      if (!updatedRecord) return { errorCode: ERROR_CODES.NOT_FOUND };

      return this.omitPassword(updatedRecord);
    } catch (err) {
      if (isUniqueViolationError(err))
        return { errorCode: ERROR_CODES.CONFLICT };

      throw err;
    }
  };

  public updatePassword = async (
    { id }: UserId,
    { password }: UpdateUserPassword,
  ): Promise<UpdatePasswordResult> => {
    const hashedPassword = await hashPassword(password);

    const [updatedRecord] = await db
      .update(usersTable)
      .set({ password: hashedPassword })
      .where(eq(usersTable.id, id))
      .returning();
    if (!updatedRecord) return { errorCode: ERROR_CODES.NOT_FOUND };

    return this.omitPassword(updatedRecord);
  };

  private omitPassword = ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    password: _,
    ...restOfRecord
  }: UserSelect) => restOfRecord;
}

export const usersService = new UsersService();
