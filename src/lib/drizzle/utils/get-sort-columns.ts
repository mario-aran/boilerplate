export const getSortColumns = <T extends string>(columns: [T, ...T[]]) =>
  columns.flatMap((col) => [col, `-${col}`]) as [
    T | `-${T}`,
    ...(T | `-${T}`)[],
  ];
