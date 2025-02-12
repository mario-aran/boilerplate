import { VITE_API_URL } from '@/config/env';
import { RecipeResponse } from '@/features/recipes/types';

export const getRecipe = async (recipeId: string): Promise<RecipeResponse> => {
  const url = `${VITE_API_URL}/recipes/${recipeId}`;

  const response = await fetch(url);
  return response.json();
};
