import {
  buildEntityNotFoundError,
  EmailAlreadyTakenError,
  SelfActionError,
} from '@/errors/api-errors';
import { emailQueueService } from '@/features/email/email-queue.service';
import { guardPassword, hashPassword } from '@/lib/bcrypt/password-utils';
import { db } from '@/lib/drizzle/db';
import { UserInsert, UserSelect, usersTable } from '@/lib/drizzle/schemas';
import { queryPaginatedData } from '@/lib/drizzle/utils/query-paginated-data';
import { Register } from '@/lib/zod/schemas/auth.schema';
import {
  GetUsers,
  UpdateUserMeEmail,
  UpdateUserMePassword,
} from '@/lib/zod/schemas/users.schema';
import { and, eq, ilike, or, SQL } from 'drizzle-orm';

// ---------------------------
// TYPES
// ---------------------------

interface UserContext {
  callerId: string;
}

export type GetUserResult = Awaited<ReturnType<typeof usersService.get>>;

// ---------------------------
// VALUES
// ---------------------------

const UserNotFoundError = buildEntityNotFoundError('User');

// ---------------------------
// SERVICE
// ---------------------------

class UsersService {
  async getAll({ limit, page, sort, roleId, search }: GetUsers) {
    const roleIdFilter = roleId ? eq(usersTable.roleId, roleId) : undefined;
    const searchFilter = search
      ? or(
          ilike(usersTable.email, `%${search}%`),
          ilike(usersTable.firstName, `%${search}%`),
          ilike(usersTable.lastName, `%${search}%`),
        )
      : undefined;
    const filters = and(roleIdFilter, searchFilter);

    const { data, ...restOfPagination } = await queryPaginatedData({
      table: usersTable,
      filters,
      sort,
      limit,
      page,
    });

    const usersWithoutPassword = data.map((user) => this.omitPassword(user));
    return { ...restOfPagination, data: usersWithoutPassword };
  }

  async get(id: string) {
    const where = eq(usersTable.id, id);
    const user = await this.getByWhereWithPassword(where);

    return this.omitPassword(user);
  }

  async getWithPassword(id: string) {
    const where = eq(usersTable.id, id);
    return this.getByWhereWithPassword(where);
  }

  async getByEmail(email: string) {
    const where = eq(usersTable.email, email);
    const user = await this.getByWhereWithPassword(where);

    return this.omitPassword(user);
  }

  async getByEmailWithPassword(email: string) {
    const where = eq(usersTable.email, email);
    return this.getByWhereWithPassword(where);
  }

  async create({ password, ...restOfProps }: Register) {
    const hashedPassword = await hashPassword(password);

    const [createdUser] = await db
      .insert(usersTable)
      .values({ ...restOfProps, password: hashedPassword })
      .returning();

    return this.omitPassword(createdUser);
  }

  async update(
    id: string,
    { password, email, ...restOfProps }: Partial<UserInsert>,
    context?: UserContext,
  ) {
    if (id === context?.callerId) throw SelfActionError;
    await this.guardEmailUniqueness(email);

    const hashedPassword = password ? await hashPassword(password) : undefined;

    const updatedUsers = await db
      .update(usersTable)
      .set({ ...restOfProps, email, password: hashedPassword })
      .where(eq(usersTable.id, id))
      .returning();
    if (!updatedUsers.length) throw UserNotFoundError;

    return this.omitPassword(updatedUsers[0]);
  }

  async updatePassword(
    id: string,
    { currentPassword, newPassword }: UpdateUserMePassword,
  ) {
    const user = await usersService.getWithPassword(id);
    await guardPassword(currentPassword, user.password);

    await this.update(user.id, { password: newPassword });
  }

  async requestEmailUpdate(id: string, { newEmail }: UpdateUserMeEmail) {
    const updatedUser = await usersService.update(id, {
      pendingEmail: newEmail,
    });
    if (!updatedUser.pendingEmail)
      throw new Error('pendingEmail should not be null');

    await emailQueueService.queueEmailVerification({
      userId: updatedUser.id,
      email: updatedUser.pendingEmail,
    });
  }

  async delete(id: string, context?: UserContext) {
    if (id === context?.callerId) throw SelfActionError;

    const deletedUsers = await db
      .delete(usersTable)
      .where(eq(usersTable.id, id))
      .returning();
    if (!deletedUsers.length) throw UserNotFoundError;

    return deletedUsers[0];
  }

  private omitPassword<T extends UserSelect>({
    // Disabled eslint: to not be forced to use "_"
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    password: _,
    ...restOfProps
  }: T) {
    return restOfProps;
  }

  private async guardEmailUniqueness(email: string | undefined) {
    if (!email) return;

    const emailTaken = await db.query.usersTable.findFirst({
      columns: { email: true },
      where: eq(usersTable.email, email),
    });
    if (emailTaken) throw EmailAlreadyTakenError;
  }

  private async getByWhereWithPassword(where: SQL) {
    const user = await db.query.usersTable.findFirst({
      with: {
        role: {
          columns: {},
          with: { rolesToPermissions: { columns: { permissionId: true } } },
        },
      },
      where,
    });
    if (!user) throw UserNotFoundError;

    // Flat results
    const { role, ...restOfUser } = user;
    const permissionIds = role.rolesToPermissions.map((el) => el.permissionId);
    return { ...restOfUser, permissionIds };
  }
}

export const usersService = new UsersService();
