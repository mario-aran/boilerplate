export interface CustomPaginationProps {
  page: number;
  lastPage: number;
  prevPage: number | null;
  nextPage: number | null;
  changePage: (newPage: number) => void;
}

export interface CustomSelectProps extends Pick<CustomPaginationProps, 'page'> {
  totalItems: number;
}

export type PaginationMenuProps = CustomSelectProps & CustomPaginationProps;
