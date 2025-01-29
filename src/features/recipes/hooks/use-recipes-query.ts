import { getRecipes } from '@/features/recipes/apis';
import { useRecipesStore } from '@/lib/zustand/stores';
import { useQuery } from '@tanstack/react-query';

export const useRecipesQuery = () => {
  // "zustand"
  const page = useRecipesStore((state) => state.page);
  const rowsPerPage = useRecipesStore((state) => state.rowsPerPage);
  const sortBy = useRecipesStore((state) => state.sortBy);
  const order = useRecipesStore((state) => state.order);

  // Prepare params
  const params = {
    page,
    limit: rowsPerPage,
    sortBy,
    order,
  };

  // return "tanstack-query"
  return useQuery({
    queryKey: ['recipes', params],
    queryFn: () => getRecipes(params),
  });
};
