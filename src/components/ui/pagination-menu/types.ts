// Internal types
interface Page {
  page: number;
}

interface TotalItems {
  totalItems: number;
}

// Exported types
export type CustomSelectProps = Page & TotalItems;

export interface CustomPaginationProps extends Page {
  lastPage: number;
  prevPage: number | null;
  nextPage: number | null;
  changePage: (newPage: number) => void;
}

export type PaginationMenuProps = TotalItems & CustomPaginationProps;
