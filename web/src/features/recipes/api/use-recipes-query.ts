import { VITE_API_URL } from '@/config/env';
import { useRecipesStore } from '@/features/recipes/store';
import {
  GetAllRecipesApiParams,
  GetRecipeApiResponse,
} from '@/features/recipes/types';
import { useQuery } from '@tanstack/react-query';
import { useShallow } from 'zustand/react/shallow';

// Types
interface GetAllRecipesApiResponse {
  recipes: GetRecipeApiResponse[];
  total: number;
  skip: number;
  limit: number;
}

// Utils
const getAllRecipesApi = async ({
  limit,
  skip,
  sortBy,
  order,
}: GetAllRecipesApiParams): Promise<GetAllRecipesApiResponse> => {
  const apiUrl = `${VITE_API_URL}/recipes?limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${order}`;

  const response = await fetch(apiUrl);
  return response.json();
};

export const useRecipesQuery = () => {
  // "zustand"
  const { changeTotalItems, ...recipesParams } = useRecipesStore(
    useShallow((state) => ({
      skip: (state.page - 1) * state.itemsPerPage,
      limit: state.itemsPerPage,
      sortBy: state.sortBy,
      order: state.order,
      changeTotalItems: state.changeTotalItems,
    })),
  );

  // "tanstack"
  return useQuery({
    queryKey: ['recipes', recipesParams],
    queryFn: async () => {
      const data = await getAllRecipesApi(recipesParams);

      changeTotalItems(data.total);

      return data;
    },
  });
};
