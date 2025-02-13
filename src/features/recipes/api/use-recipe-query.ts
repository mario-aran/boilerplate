import { VITE_API_URL } from '@/config/env';
import { RecipeResponse } from '@/features/recipes/types';
import { useQuery } from '@tanstack/react-query';

// Utils
const getRecipe = async (recipeId: string): Promise<RecipeResponse> => {
  const url = `${VITE_API_URL}/recipes/${recipeId}`;

  const response = await fetch(url);
  return response.json();
};

export const useRecipeQuery = (recipeId: string) => {
  return useQuery({
    queryKey: ['recipe', recipeId],
    queryFn: () => getRecipe(recipeId),
  });
};
