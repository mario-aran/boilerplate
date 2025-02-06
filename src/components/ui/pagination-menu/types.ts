export interface CustomSelectProps {
  itemsPerPageOptions: number[];
  itemsPerPage: number;
  totalItems: number;
  page: number;
  changeItemsPerPage: (itemsPerPage: number) => void;
}
