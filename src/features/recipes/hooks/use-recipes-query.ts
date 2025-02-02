import { getRecipes } from '@/features/recipes/api';
import { useRecipesStore } from '@/features/recipes/store';
import { useQuery } from '@tanstack/react-query';

export const useRecipesQuery = () => {
  // "zustand"
  const skip = useRecipesStore((state) => state.skip);
  const limit = useRecipesStore((state) => state.limit);
  const sortBy = useRecipesStore((state) => state.sortBy);
  const order = useRecipesStore((state) => state.order);
  const setPaginationData = useRecipesStore((state) => state.setPaginationData);

  // Prepare values
  const recipesParams = { skip, limit, sortBy, order };

  // return "tanstack-query"
  return useQuery({
    queryKey: ['recipes', recipesParams],
    queryFn: async () => {
      // Fetch data
      const data = await getRecipes(recipesParams);

      // Set store
      setPaginationData(data.total);

      // Return data
      return data;
    },
  });
};
