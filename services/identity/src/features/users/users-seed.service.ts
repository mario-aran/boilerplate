import { SYSTEM_ROLES } from '@/constants/system-roles';
import { DrizzleDb } from '@/lib/drizzle';
import { UserInsert, usersTable } from '@/lib/drizzle/schemas';
import { hashPassword } from './utils/hash-password';

// Types
interface UsersSeedServiceProps {
  db: DrizzleDb;
}

export class UsersSeedService {
  private readonly db: DrizzleDb;

  constructor({ db }: UsersSeedServiceProps) {
    this.db = db;
  }

  async seedUsers(props: UserInsert[]) {
    const hashedUserPromises = props.map(({ password, ...restOfUser }) =>
      hashPassword(password).then((hashedPassword) => ({
        ...restOfUser,
        password: hashedPassword,
      })),
    );
    const usersWithHashedPassword = await Promise.all(hashedUserPromises);

    const createdRecords = await this.db
      .insert(usersTable)
      .values(usersWithHashedPassword)
      .onConflictDoNothing()
      .returning({ email: usersTable.email });

    const createdKeys = createdRecords.map(({ email }) => email);
    return { createdKeys };
  }

  async seed() {
    return this.seedUsers([
      {
        roleId: SYSTEM_ROLES.SUPER_ADMIN,
        email: 'superadmin@superadmin.com',
        emailVerified: true,
        emailVerifiedAt: new Date(),
        password: SYSTEM_ROLES.SUPER_ADMIN,
      },
    ]);
  }
}
