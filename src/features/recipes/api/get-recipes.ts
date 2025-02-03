import { VITE_API_URL } from '@/config/env';
import { RecipesParams, RecipesResponse } from '@/features/recipes/types';

export const getRecipes = async ({
  limit,
  skip,
  sortBy,
  order,
}: RecipesParams): Promise<RecipesResponse> => {
  // Prepare values
  const url = `${VITE_API_URL}/recipes?limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${order}`;

  // Fetch data
  const response = await fetch(url);
  return response.json();
};
