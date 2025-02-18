import { VITE_API_URL } from '@/config/env';
import { GetRecipeApiResponse } from '@/features/recipes/types';
import { useQuery } from '@tanstack/react-query';

// Utils
const getRecipeApi = async (
  recipeId: string,
): Promise<GetRecipeApiResponse> => {
  const apiUrl = `${VITE_API_URL}/recipes/${recipeId}`;

  const response = await fetch(apiUrl);
  return response.json();
};

export const useRecipeQuery = (recipeId: string) => {
  // "tanstack-query"
  return useQuery({
    queryKey: ['recipe', recipeId],
    queryFn: () => getRecipeApi(recipeId),
  });
};
