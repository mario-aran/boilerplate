interface PageProp {
  page: number;
}

export interface CustomPaginationProps extends PageProp {
  lastPage: number;
  changePage: (newPage: PageProp['page']) => void;
}

export type RNArray = readonly number[];

export interface PageSizeSelectorProps<T extends RNArray> extends PageProp {
  itemsPerPageOptions: T;
  itemsPerPage: T[number];
  totalItems: number;
  changeItemsPerPage: (newItemsPerPage: T[number]) => void;
}

export type PaginationWithPageSizeProps<T extends RNArray> =
  CustomPaginationProps & PageSizeSelectorProps<T>;
