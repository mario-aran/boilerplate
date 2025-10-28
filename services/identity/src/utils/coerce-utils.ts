export const coerceFalsyToUndefined = <T>(value: T) =>
  value ? value : undefined;
