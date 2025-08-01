import { SYSTEM_ROLES } from '@/constants/system-roles';
import { db } from '@/lib/drizzle/db';
import {
  UserInsert,
  USERS_TABLE_NAME,
  usersTable,
} from '@/lib/drizzle/schemas';
import { getSeedMessage } from '@/utils/get-seed-message';
import { hashPassword } from './utils/hash-password';

class UsersSeedService {
  public seed = async (users: UserInsert[]) => {
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

    const createdKeys = createdRecords.map(({ email }) => email);
    const seedMessage = getSeedMessage(USERS_TABLE_NAME, createdKeys);
    console.log(seedMessage);
  };

  public seedSystemData = async () =>
    this.seed([
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
