import { buildEntityNotFoundError } from '@/errors/http-errors';
import { emailQueueService } from '@/features/email/email-queue.service';
import { guardPassword, hashPassword } from '@/lib/bcrypt/utils';
import { db } from '@/lib/drizzle/db';
import { UserInsert, UserSelect, usersTable } from '@/lib/drizzle/schemas';
import { queryPaginatedData } from '@/lib/drizzle/utils/query-paginated-data';
import { Register } from '@/lib/zod/schemas/auth.schema';
import {
  GetUsers,
  UpdateUser,
  UpdateUserMeEmail,
  UpdateUserMePassword,
} from '@/lib/zod/schemas/users.schema';
import { and, eq, ilike, or, SQL } from 'drizzle-orm';

// ---------------------------
// TYPES
// ---------------------------

export type UsersServiceGetResult = Awaited<
  ReturnType<typeof usersService.get>
>;

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

    const { data, ...restOfRecords } = await queryPaginatedData({
      table: usersTable,
      filters,
      sort,
      limit,
      page,
    });

    const usersWithoutPassword = data.map((user) => this.omitPassword(user));
    return { ...restOfRecords, data: usersWithoutPassword };
  }

  async get(id: string) {
    const where = eq(usersTable.id, id);
    const record = await this.getByWhereWithPassword(where);

    return this.omitPassword(record);
  }

  async getWithPassword(id: string) {
    const where = eq(usersTable.id, id);
    return this.getByWhereWithPassword(where);
  }

  async getByEmail(email: string) {
    const where = eq(usersTable.email, email);
    const record = await this.getByWhereWithPassword(where);

    return this.omitPassword(record);
  }

  async getByEmailWithPassword(email: string) {
    const where = eq(usersTable.email, email);
    return this.getByWhereWithPassword(where);
  }

  async create({ password, ...restOfProps }: Register) {
    const hashedPassword = await hashPassword(password);

    const createdUsers = await db
      .insert(usersTable)
      .values({ ...restOfProps, password: hashedPassword })
      .returning();

    return this.omitPassword(createdUsers[0]);
  }

  async update(id: string, props: UpdateUser) {
    return this.applyUpdate(id, props);
  }

  async requestEmailUpdate(id: string, { newEmail }: UpdateUserMeEmail) {
    await usersService.applyUpdate(id, { pendingEmail: newEmail });

    await emailQueueService.queueEmailVerification({
      userId: id,
      email: newEmail,
    });
  }

  async updatePassword(
    id: string,
    { currentPassword, newPassword }: UpdateUserMePassword,
  ) {
    const user = await usersService.getWithPassword(id);
    await guardPassword(currentPassword, user.password);

    await this.applyUpdate(user.id, { password: newPassword });
  }

  async forceUpdatePassword(id: string, password: string) {
    await this.applyUpdate(id, { password });
  }

  async delete(id: string) {
    const deletedRecords = await db
      .delete(usersTable)
      .where(eq(usersTable.id, id))
      .returning();
    if (!deletedRecords.length) throw UserNotFoundError;

    return deletedRecords[0];
  }

  private omitPassword<T extends UserSelect>({
    // Disabled eslint: to not be forced to use "_"
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    password: _,
    ...restOfProps
  }: T) {
    return restOfProps;
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

  private async applyUpdate(
    id: string,
    { password, ...restOfProps }: Partial<UserInsert>,
  ) {
    const hashedPassword = password ? await hashPassword(password) : undefined;

    const updatedUsers = await db
      .update(usersTable)
      .set({ ...restOfProps, password: hashedPassword })
      .where(eq(usersTable.id, id))
      .returning();
    if (!updatedUsers.length) throw UserNotFoundError;

    return this.omitPassword(updatedUsers[0]);
  }
}

export const usersService = new UsersService();
