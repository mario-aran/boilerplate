import { VITE_API_URL } from '@/config/env';
import { RecipesApiResponse, RecipesParams } from '@/features/recipes/types';

// Types
type GetRecipes = Promise<RecipesApiResponse>;

export const getRecipes = async ({
  limit,
  page,
  sortBy,
  order,
}: RecipesParams): GetRecipes => {
  // Prepare url
  const skip = limit * (page - 1);
  const url = `${VITE_API_URL}/recipes?limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${order}`;

  // Fetch data
  const response = await fetch(url);
  return response.json();
};
