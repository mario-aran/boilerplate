export interface CustomSelectProps<T extends number[]> {
  page: number;
  itemsPerPageOptions: T;
  itemsPerPage: T[number];
  totalItems: number;
  changeItemsPerPage: (itemsPerPage: T[number]) => void;
}

export interface PaginationMenuProps<T extends number[]>
  extends CustomSelectProps<T> {
  lastPage: number;
  changePage: (newPage: number) => void;
}
