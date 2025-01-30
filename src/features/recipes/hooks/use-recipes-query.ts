import { getRecipes } from '@/features/recipes/apis';
import { useRecipesStore } from '@/features/recipes/stores';
import { useQuery } from '@tanstack/react-query';

export const useRecipesQuery = () => {
  // "zustand"
  const page = useRecipesStore((state) => state.page);
  const limit = useRecipesStore((state) => state.limit);
  const sortBy = useRecipesStore((state) => state.sortBy);
  const order = useRecipesStore((state) => state.order);
  const setPageData = useRecipesStore((state) => state.setPageData);

  // Prepare params
  const params = { page, limit, sortBy, order };

  // return "tanstack-query"
  return useQuery({
    queryKey: ['recipes', params],
    queryFn: async () => {
      const data = await getRecipes(params);
      const { numPage, prevPage, nextPage, ...rest } = data;

      setPageData({ numPage, prevPage, nextPage });

      return rest;
    },
  });
};
