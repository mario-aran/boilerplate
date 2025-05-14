export const generateSortColumns = <T extends string>(ascColumns: T[]) =>
  ascColumns.flatMap((column) => [column, `-${column}`]) as [T | `-${T}`];
