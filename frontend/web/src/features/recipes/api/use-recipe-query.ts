import { GetRecipeApiResponse } from '@/features/recipes/types';
import { apiFetch } from '@/lib/fetch/api-fetch';
import { useQuery } from '@tanstack/react-query';

// Utils
const getRecipeApi = (recipeId: string) =>
  apiFetch<GetRecipeApiResponse>(`/recipes/${recipeId}`);

// "tanstack-query"
export const useRecipeQuery = (recipeId: string) =>
  useQuery({
    queryKey: ['recipe', recipeId],
    queryFn: () => getRecipeApi(recipeId),
  });
