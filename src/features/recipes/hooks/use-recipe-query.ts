import { VITE_API_URL } from '@/config/env';
import { RecipeApiResponse } from '@/features/recipes/types';
import { useQuery } from '@tanstack/react-query';

// Types
type GetRecipe = Promise<RecipeApiResponse>;

// Utils
const getRecipe = async (recipeId: string): GetRecipe => {
  const url = `${VITE_API_URL}/recipes/${recipeId}`;
  const response = await fetch(url);
  return response.json();
};

export const useRecipeQuery = (recipeId: string) =>
  useQuery({
    queryKey: ['recipe', recipeId],
    queryFn: () => getRecipe(recipeId),
  });
