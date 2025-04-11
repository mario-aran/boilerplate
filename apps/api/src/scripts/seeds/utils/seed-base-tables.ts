import { USER_ROLES } from '@/constants/user-roles';
import { db } from '@/lib/drizzle/db';
import { userRolesSchema } from '@/lib/drizzle/schemas';

// Types
type UserRolesInsert = typeof userRolesSchema.$inferInsert;

// Mocks
const mockedUserRoles = Object.values(USER_ROLES).map(
  (id): UserRolesInsert => ({ id, name: id.toLowerCase() }),
);

// Promises
const seedPromises = [{ schema: userRolesSchema, values: mockedUserRoles }].map(
  ({ schema, values }) => db.insert(schema).values(values),
);

export const seedBaseTables = async () => {
  // Insert promises
  await Promise.all(seedPromises);

  console.log('User roles seeded successfully');
};
