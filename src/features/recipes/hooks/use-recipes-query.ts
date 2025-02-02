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
  const queryParams = { skip, limit, sortBy, order };

  // return "tanstack-query"
  return useQuery({
    queryKey: ['recipes', queryParams],
    queryFn: async () => {
      // Fetch api
      const data = await getRecipes(queryParams);

      // Set store
      setPaginationData(data.total);

      // Return api data
      return data;
    },
  });
};
