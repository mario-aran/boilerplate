export const getSeedMessage = (tableName: string, createdKeys: string[]) => {
  if (!createdKeys.length)
    return `Skipping seeding ${tableName}: no new records`;

  const joinedUniqueKeys = createdKeys.map((key) => key).join(', ');
  return `${tableName} seeded: ${joinedUniqueKeys}`;
};
