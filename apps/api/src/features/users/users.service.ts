import { USER_ROLES } from '@/constants/user-roles';
import { db } from '@/lib/drizzle/db';
import { usersSchema } from '@/lib/drizzle/schemas';
import {
  CreateUsersZod,
  GetAllUsersZod,
  UpdatePasswordUsersZod,
  UpdateUsersZod,
} from '@/lib/zod/schemas/users.zod';
import bcrypt from 'bcryptjs';
import { asc, desc, eq } from 'drizzle-orm';

class UsersService {
  private async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  public async getAll({
    orderBy = [{ field: 'id', order: 'asc' }],
    limit = 10,
    skip = 0,
  }: GetAllUsersZod) {
    const orderByFields = orderBy.map(({ field, order }) => {
      const userField = usersSchema[field];
      return order === 'desc' ? desc(userField) : asc(userField);
    });

    return db.query.usersSchema.findMany({
      columns: { password: false },
      orderBy: orderByFields,
      limit,
      offset: skip,
    });
  }

  public async get(id: string) {
    return db.query.usersSchema.findFirst({
      columns: { password: false },
      where: eq(usersSchema.id, id),
    });
  }

  public async create(data: CreateUsersZod) {
    const hashedPassword = await this.hashPassword(data.password);
    const createdUser = await db
      .insert(usersSchema)
      .values({
        ...data,
        userRoleId: USER_ROLES.DEFAULT,
        password: hashedPassword,
      })
      .returning({ id: usersSchema.id });

    return createdUser[0];
  }

  public async update(id: string, data: UpdateUsersZod) {
    const updatedUser = await db
      .update(usersSchema)
      .set(data)
      .where(eq(usersSchema.id, id))
      .returning({ id: usersSchema.id });

    return updatedUser[0];
  }

  public async updatePassword(id: string, data: UpdatePasswordUsersZod) {
    const hashedPassword = await this.hashPassword(data.password);
    const updatedUser = await db
      .update(usersSchema)
      .set({ password: hashedPassword })
      .where(eq(usersSchema.id, id))
      .returning({ id: usersSchema.id });

    return updatedUser[0];
  }
}

export const usersService = new UsersService();
