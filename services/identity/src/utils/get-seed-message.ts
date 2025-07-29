export const getSeedMessage = (tableName: string, seededKeys: string[]) => {
  if (!seededKeys.length)
    return `Skipping seeding ${tableName}: no new records`;

  const joinedUniqueKeys = seededKeys.map((key) => key).join(', ');
  return `${tableName} seeded: ${joinedUniqueKeys}`;
};
