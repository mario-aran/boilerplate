import { getRecipes } from '@/features/recipes/api';
import { useRecipesStore } from '@/features/recipes/store';
import { useQuery } from '@tanstack/react-query';

export const useRecipesQuery = () => {
  // "zustand"
  const page = useRecipesStore((state) => state.page);
  const limit = useRecipesStore((state) => state.limit);
  const sortBy = useRecipesStore((state) => state.sortBy);
  const order = useRecipesStore((state) => state.order);

  // Prepare queryFn params
  const params = { page, limit, sortBy, order };

  // return "tanstack-query"
  return useQuery({
    queryKey: ['recipes', params],
    queryFn: async () => {
      // Fetch api data
      const data = await getRecipes(params);

      // Prepare custom data
      const { limit, page } = params;
      const numPage = Math.ceil(data.total / limit) || 1;
      const prevPage = page > 1 ? page - 1 : null;
      const nextPage = page < numPage ? page + 1 : null;

      // Return api and custom data
      return { ...data, numPage, prevPage, nextPage };
    },
  });
};
