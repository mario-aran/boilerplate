import { VITE_API_URL } from '@/config/env';
import { RecipeResponse, RecipesParams } from '@/features/recipes/types';

// Types
interface RecipesResponse {
  recipes: RecipeResponse[];
  total: number;
  skip: number;
  limit: number;
}

export const getRecipes = async ({
  limit,
  skip,
  sortBy,
  order,
}: RecipesParams): Promise<RecipesResponse> => {
  const url = `${VITE_API_URL}/recipes?limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${order}`;

  const response = await fetch(url);
  return response.json();
};
