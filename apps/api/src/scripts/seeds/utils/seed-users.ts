import { db } from '@/lib/drizzle/db';
import { usersSchema } from '@/lib/drizzle/schemas';
import { SEEDS_LENGTH } from '@/scripts/seeds/constants/seeds-length';
import { faker } from '@faker-js/faker';

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
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email,
        password: faker.internet.password(),
        userRoleId: faker.helpers.arrayElement(userRoles).id,
      }),
    );

  // Insert seeds
  await db.insert(usersSchema).values(mockedUsers);

  console.log('Users seeded successfully');
};
