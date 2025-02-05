export interface CustomPaginationProps {
  page: number;
  lastPage: number;
  changePage: (newPage: number) => void;
}

export interface CustomSelectProps extends Pick<CustomPaginationProps, 'page'> {
  itemsPerPageOptions: number[];
  totalItems: number;
}

export type PaginationMenuProps = CustomSelectProps & CustomPaginationProps;
