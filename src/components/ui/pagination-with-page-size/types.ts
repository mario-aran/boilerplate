export interface PageSizeSelectorProps {
  page: number;
  itemsPerPageOptions: number[];
  itemsPerPage: number;
  totalItems: number;
  changeItemsPerPage: (itemsPerPage: number) => void;
}

export interface CustomPaginationProps
  extends Pick<PageSizeSelectorProps, 'page'> {
  lastPage: number;
  changePage: (newPage: number) => void;
}
