import { VITE_API_URL } from '@/config/env';
import { useRecipesStore } from '@/features/recipes/store';
import { RecipeResponse, RecipesParams } from '@/features/recipes/types';
import { useQuery } from '@tanstack/react-query';
import { useShallow } from 'zustand/react/shallow';

// Types
interface RecipesResponse {
  recipes: RecipeResponse[];
  total: number;
  skip: number;
  limit: number;
}

// Utils
const getRecipes = async ({
  limit,
  skip,
  sortBy,
  order,
}: RecipesParams): Promise<RecipesResponse> => {
  const url = `${VITE_API_URL}/recipes?limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${order}`;

  const response = await fetch(url);
  return response.json();
};

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

  // "tanstack-query"
  return useQuery({
    queryKey: ['recipes', recipesParams],
    queryFn: async () => {
      const data = await getRecipes(recipesParams);

      changeTotalItems(data.total);

      return data;
    },
  });
};
