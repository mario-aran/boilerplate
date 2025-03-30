import { db } from '@/lib/drizzle/db';
import { userRolesSchema } from '@/lib/drizzle/schemas';

// Types
type UserRolesInsert = typeof userRolesSchema.$inferInsert;

// Constants
const USER_ROLES = {
  CLIENT: 'client',
  SELLER: 'seller',
} as const;

// Prepare mocks
const mockedUserRoles = Object.values(USER_ROLES).map(
  (name): UserRolesInsert => ({ name }),
);

// Prepare seed promises
const seedPromises = [{ schema: userRolesSchema, values: mockedUserRoles }].map(
  ({ schema, values }) => db.insert(schema).values(values),
);

export const seedBaseTables = async () => {
  // Insert seed promises
  await Promise.all(seedPromises);

  console.log('User roles seeded successfully');
};
