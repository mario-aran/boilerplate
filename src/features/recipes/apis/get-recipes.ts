import { VITE_API_URL } from '@/config/env';
import {
  GetRecipes,
  RecipesApiResponse,
  RecipesParams,
} from '@/features/recipes/types';

// Constants
const FIRST_PAGE = 1;

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
  const data: RecipesApiResponse = await response.json();

  // Prepare results
  const numPage = Math.ceil(data.total / limit) || FIRST_PAGE;
  const prevPage = page > FIRST_PAGE ? page - 1 : 0;
  const nextPage = page < numPage ? page + 1 : 0;

  return {
    ...data,
    numPage,
    prevPage,
    nextPage,
  };
};
