import { db } from '@/lib/drizzle/db';
import { usersSchema } from '@/lib/drizzle/schemas';
import { faker } from '@faker-js/faker';
import { SEEDS_LENGTH } from './constants';

// Types
type UsersInsert = typeof usersSchema.$inferInsert;

export const seedUsers = async () => {
  // Query the database
  const userRoles = await db.query.userRolesSchema.findMany({
    columns: { id: true },
  });
  if (userRoles.length === 0) throw new Error('No user roles found');

  // Prepare mocks
  const mockedUsers = faker.helpers
    .uniqueArray(faker.internet.email, SEEDS_LENGTH)
    .map(
      (email): UsersInsert => ({
        name: faker.person.fullName(),
        email,
        password: faker.internet.password(),
        userRoleId: faker.helpers.arrayElement(userRoles).id,
      }),
    );

  // Insert seeds
  await db.insert(usersSchema).values(mockedUsers);

  console.log('Users seeded successfully');
};
