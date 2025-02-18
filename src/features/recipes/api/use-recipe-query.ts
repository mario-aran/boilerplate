import { VITE_API_URL } from '@/config/env';
import { RecipeApiResponse } from '@/features/recipes/types';
import { useQuery } from '@tanstack/react-query';

// Utils
const getRecipeApi = async (recipeId: string): Promise<RecipeApiResponse> => {
  const url = `${VITE_API_URL}/recipes/${recipeId}`;

  const response = await fetch(url);
  return response.json();
};

export const useRecipeQuery = (recipeId: string) => {
  // "tanstack-query"
  return useQuery({
    queryKey: ['recipe', recipeId],
    queryFn: () => getRecipeApi(recipeId),
  });
};
