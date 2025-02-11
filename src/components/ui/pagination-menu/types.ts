export interface CustomSelectProps {
  page: number;
  itemsPerPageOptions: number[];
  itemsPerPage: number;
  totalItems: number;
  changeItemsPerPage: (itemsPerPage: number) => void;
}

export interface CustomPaginationProps extends Pick<CustomSelectProps, 'page'> {
  lastPage: number;
  changePage: (newPage: number) => void;
}

export type PaginationMenuProps = CustomSelectProps & CustomPaginationProps;
