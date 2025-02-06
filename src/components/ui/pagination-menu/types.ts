export interface CustomSelectProps {
  itemsPerPageOptions: number[];
  itemsPerPage: number;
  totalItems: number;
  page: number;
  changeItemsPerPage: (itemsPerPage: number) => void;
}

export interface PaginationMenuProps extends CustomSelectProps {
  lastPage: number;
  changePage: (newPage: number) => void;
}
