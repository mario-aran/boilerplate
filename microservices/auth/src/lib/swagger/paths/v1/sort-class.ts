// import { getTableColumns } from 'drizzle-orm';
// import { AnyPgTable } from 'drizzle-orm/pg-core';

// // Types
// type TableColumns<T extends AnyPgTable> = T['_']['columns'];

// interface TestProps<T extends AnyPgTable> {
//   table: T;
//   excludedColumns?: string[];
// }

// // Utils
// export class Test<T extends AnyPgTable> {
//   private tableColumns: TableColumns<T>;
//   private excludedColumns: string[];

//   constructor({ table, excludedColumns = [] }: TestProps<T>) {
//     this.tableColumns = getTableColumns(table);
//     this.excludedColumns = excludedColumns;
//   }

//   public getSortColumns = () => {
//     const filteredColumns = this.getFilteredColumns();
//     return filteredColumns.flatMap((col) => [col, `-${col}`]);
//   };

//   public getSwaggerProperties = () => {
//     const keysAndValues = Object.entries(this.tableColumns).map(
//       ([key, value]) => [key, { type: value.dataType }],
//     );
//     return Object.fromEntries(keysAndValues);
//   };

//   private getFilteredColumns = () => {
//     return Object.keys(this.tableColumns).filter(
//       (col) => !this.excludedColumns.includes(col),
//     ) as (keyof TableColumns<T>)[];
//   };
// }
