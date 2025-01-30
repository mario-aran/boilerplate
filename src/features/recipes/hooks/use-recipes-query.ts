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

  // Prepare queryFn params
  const params = { page, limit, sortBy, order };

  // return "tanstack-query"
  return useQuery({
    queryKey: ['recipes', params],
    queryFn: async () => {
      // Fetch api data
      const data = await getRecipes(params);
      const { total } = data;

      // Prepare page data
      const { limit, page } = params;
      const numPage = Math.ceil(total / limit) || 1;
      const prevPage = page > 1 ? page - 1 : 0;
      const nextPage = page < numPage ? page + 1 : 0;

      // Set page data
      setPageData({ numPage, prevPage, nextPage, total });

      // Return recipes
      return data.recipes;
    },
  });
};
