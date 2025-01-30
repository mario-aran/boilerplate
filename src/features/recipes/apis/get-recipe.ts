import { VITE_API_URL } from '@/config/env';
import { RecipeApiResponse } from '@/features/recipes/types';

// Types
type GetRecipe = Promise<RecipeApiResponse>;

export const getRecipe = async (recipeId: string): GetRecipe => {
  // Prepare url
  const url = `${VITE_API_URL}/recipes/${recipeId}`;

  // Fetch data
  const response = await fetch(url);
  return response.json();
};
