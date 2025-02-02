import { VITE_API_URL } from '@/config/env';
import { RecipeApiResponse, RecipesParams } from '@/features/recipes/types';

// Types
interface RecipesApiResponse {
  recipes: RecipeApiResponse[];
  total: number;
  skip: number;
  limit: number;
}

export const getRecipes = async ({
  limit,
  skip,
  sortBy,
  order,
}: RecipesParams): Promise<RecipesApiResponse> => {
  // Prepare values
  const url = `${VITE_API_URL}/recipes?limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${order}`;

  // Fetch data
  const response = await fetch(url);
  return response.json();
};
