import { PaginationMenu } from '@/components/ui/pagination-menu';
import { useRecipesStore } from '@/features/recipes/store';
import { useShallow } from 'zustand/react/shallow';

export const RecipesPagination = () => {
  // "zustand"
  const { totalItems, page, totalPages, prevPage, nextPage, changePage } =
    useRecipesStore(
      useShallow((state) => ({
        totalItems: state.totalItems,
        page: state.page,
        totalPages: state.totalPages,
        prevPage: state.prevPage,
        nextPage: state.nextPage,
        changePage: state.changePage,
      })),
    );

  return (
    <PaginationMenu
      totalItems={totalItems}
      page={page}
      lastPage={totalPages}
      prevPage={prevPage}
      nextPage={nextPage}
      changePage={changePage}
    />
  );
};
