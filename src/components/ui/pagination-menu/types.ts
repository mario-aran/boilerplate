export interface CustomSelectProps {
  page: number;
  itemsPerPageOptions: number[];
  itemsPerPage: number;
  totalItems: number;
  changeItemsPerPage: (itemsPerPage: number) => void;
}

export interface PaginationMenuProps extends CustomSelectProps {
  lastPage: number;
  changePage: (newPage: number) => void;
}
