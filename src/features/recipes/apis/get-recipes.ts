import { VITE_API_URL } from '@/config/env';
import { RecipeApiResponse, RecipesParams } from '@/features/recipes/types';

// Types
interface RecipesApiResponse {
  recipes: RecipeApiResponse[];
  total: number;
}

export const getRecipes = async ({
  limit,
  page,
  sortBy,
  order,
}: RecipesParams): Promise<RecipesApiResponse> => {
  // Prepare url
  const skip = limit * (page - 1);
  const url = `${VITE_API_URL}/recipes?limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${order}`;

  // Fetch data
  const response = await fetch(url);
  return response.json();
};
