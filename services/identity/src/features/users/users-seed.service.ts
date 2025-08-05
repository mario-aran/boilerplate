import { SYSTEM_ROLES } from '@/constants/system-roles';
import { db } from '@/lib/drizzle/db';
import { UserInsert, usersTable } from '@/lib/drizzle/schemas';
import { hashPassword } from './utils/hash-password';

class UsersSeedService {
  public seedUsers = async (users: UserInsert[]) => {
    const hashedUserPromises = users.map(({ password, ...restOfUser }) =>
      hashPassword(password).then((hashedPassword) => ({
        ...restOfUser,
        password: hashedPassword,
      })),
    );
    const usersWithHashedPassword = await Promise.all(hashedUserPromises);

    const createdRecords = await db
      .insert(usersTable)
      .values(usersWithHashedPassword)
      .onConflictDoNothing()
      .returning({ email: usersTable.email });

    return createdRecords.map(({ email }) => email);
  };

  public seed = async () =>
    this.seedUsers([
      {
        roleId: SYSTEM_ROLES.SUPER_ADMIN,
        email: 'superadmin@superadmin.com',
        emailVerified: true,
        emailVerifiedAt: new Date(),
        password: SYSTEM_ROLES.SUPER_ADMIN,
      },
    ]);
}

export const usersSeedService = new UsersSeedService();
