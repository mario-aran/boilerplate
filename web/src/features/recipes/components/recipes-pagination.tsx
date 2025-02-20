import { PaginationWithPageSize } from '@/components/custom-ui/pagination-with-page-size';
import {
  ITEMS_PER_PAGE_OPTIONS,
  useRecipesStore,
} from '@/features/recipes/store';
import { useShallow } from 'zustand/react/shallow';

export const RecipesPagination = () => {
  // "zustand"
  const paginationMenuProps = useRecipesStore(
    useShallow((state) => ({
      itemsPerPage: state.itemsPerPage,
      totalItems: state.totalItems,
      page: state.page,
      lastPage: state.lastPage,
      changeItemsPerPage: state.changeItemsPerPage,
      changePage: state.changePage,
    })),
  );

  return (
    <PaginationWithPageSize
      itemsPerPageOptions={ITEMS_PER_PAGE_OPTIONS}
      {...paginationMenuProps}
    />
  );
};
