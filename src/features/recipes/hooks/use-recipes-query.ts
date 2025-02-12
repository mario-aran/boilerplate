import { getRecipes } from '@/features/recipes/api';
import { useRecipesStore } from '@/features/recipes/store';
import { useQuery } from '@tanstack/react-query';
import { useShallow } from 'zustand/react/shallow';

export const useRecipesQuery = () => {
  // "zustand"
  const { changeTotalItems, ...recipesParams } = useRecipesStore(
    useShallow((state) => ({
      skip: (state.page - 1) * state.itemsPerPage,
      limit: state.itemsPerPage,
      sortBy: state.sortBy,
      order: state.order,
      changeTotalItems: state.changeTotalItems,
    })),
  );

  // return "tanstack-query"
  return useQuery({
    queryKey: ['recipes', recipesParams],
    queryFn: async () => {
      const data = await getRecipes(recipesParams);

      changeTotalItems(data.total);

      return data;
    },
  });
};
