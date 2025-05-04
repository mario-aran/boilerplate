export const getUniqueObjectValues = <T extends object>(obj: T) =>
  [...new Set(Object.values(obj))] as [T[keyof T]];
