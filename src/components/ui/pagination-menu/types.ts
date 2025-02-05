export interface CustomSelectProps {
  itemsPerPageOptions: number[];
  totalItems: number;
  page: number;
}

export interface PaginationMenuProps extends CustomSelectProps {
  lastPage: number;
  changePage: (newPage: number) => void;
}
