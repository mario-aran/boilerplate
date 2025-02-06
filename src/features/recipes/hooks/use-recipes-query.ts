import { getRecipes } from '@/features/recipes/api';
import { useRecipesStore } from '@/features/recipes/store';
import { useQuery } from '@tanstack/react-query';
import { useShallow } from 'zustand/react/shallow';

export const useRecipesQuery = () => {
  // "zustand"
  const { changeRecipesTotalItems, ...recipesParams } = useRecipesStore(
    useShallow((state) => ({
      skip: state.skip,
      limit: state.limit,
      sortBy: state.sortBy,
      order: state.order,
      changeRecipesTotalItems: state.changeRecipesTotalItems,
    })),
  );

  // return "tanstack-query"
  return useQuery({
    queryKey: ['recipes', recipesParams],
    queryFn: async () => {
      // Fetch data
      const data = await getRecipes(recipesParams);

      // Set store
      changeRecipesTotalItems(data.total);

      // Return data
      return data;
    },
  });
};
