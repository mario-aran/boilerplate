import { VITE_API_URL } from '@/config/env';
import { RecipesApiResponse, RecipesParams } from '@/features/recipes/types';
import { useQuery } from '@tanstack/react-query';

// Types
interface PageMetadata {
  lastPage: number | null;
  prevPage: number | null;
  nextPage: number | null;
}

type GetRecipes = Promise<RecipesApiResponse & PageMetadata>;

// Utils
const getRecipes = async ({
  limit = 10,
  page = 1,
  sortBy = 'id',
  order = 'asc',
}: RecipesParams): GetRecipes => {
  // Fetch data
  const skip = limit * (page - 1);
  const url = `${VITE_API_URL}/recipes?limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${order}`;
  const response = await fetch(url);
  const data: RecipesApiResponse = await response.json();

  // Prepare metadata
  const total = data.total ?? 0;
  const lastPage = Math.ceil(total / limit) || null;
  const prevPage = page > 1 ? page - 1 : null;
  const nextPage = skip + limit < total ? page + 1 : null;

  return {
    ...data,
    lastPage,
    prevPage,
    nextPage,
  };
};

export const useRecipesQuery = (params: RecipesParams = {}) =>
  useQuery({
    queryKey: ['recipes', params],
    queryFn: () => getRecipes(params),
  });
