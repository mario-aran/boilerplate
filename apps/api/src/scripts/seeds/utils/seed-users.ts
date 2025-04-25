import { USER_ROLES } from '@/constants/user-roles';
import { authService } from '@/features/auth/auth.service';
import { db } from '@/lib/drizzle/db';
import { RegisterAuthZod } from '@/lib/zod/schemas/auth.zod';
import { SEEDS_LENGTH } from '@/scripts/seeds/constants/seeds-length';
import { faker } from '@faker-js/faker';

// Mocks
const mockedUsers = faker.helpers
  .uniqueArray(faker.internet.email, SEEDS_LENGTH)
  .map(
    (email): RegisterAuthZod => ({
      email,
      password: '12345678',
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
    }),
  );

export const seedUsers = async () => {
  // Check if all user roles exist
  const userRoles = await db.query.userRolesSchema.findMany({
    columns: { id: true },
  });

  const everyUserRoleExists = Object.values(USER_ROLES).every((userRoleId) =>
    userRoles.some(({ id }) => id === userRoleId),
  );
  if (!everyUserRoleExists)
    throw new Error('Not all user roles exists on the database');

  // Insert seeds
  await Promise.all(mockedUsers.map((user) => authService.register(user)));

  console.log('Users seeded successfully');
};
