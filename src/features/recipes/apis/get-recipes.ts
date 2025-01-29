import { VITE_API_URL } from '@/config/env';
import { Recipe, RecipesParams } from '@/features/recipes/types';

// Types
interface RecipesApiResponse {
  recipes: Recipe[];
  total: number;
  skip: number;
  limit: number;
}

interface CustomData {
  numPage: number;
  prevPage: number | null;
  nextPage: number | null;
}

type GetRecipes = Promise<RecipesApiResponse & CustomData>;

// Constants
const FIRST_PAGE = 1;

export const getRecipes = async ({
  page,
  limit,
  sortBy,
  order,
}: RecipesParams): GetRecipes => {
  // Prepare url
  const skip = (page - 1) * limit;
  const url = `${VITE_API_URL}/recipes?limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${order}`;

  // Fetch data
  const response = await fetch(url);
  const data: RecipesApiResponse = await response.json();

  // Prepare results
  const numPage = Math.ceil(data.total / limit) || FIRST_PAGE;
  const prevPage = page > FIRST_PAGE ? page - 1 : null;
  const nextPage = page < numPage ? page + 1 : null;

  return {
    ...data,
    numPage,
    prevPage,
    nextPage,
  };
};
