import { useRecipesStore } from '@/features/recipes/store';
import {
  GetAllRecipesApiParams,
  GetRecipeApiResponse,
} from '@/features/recipes/types';
import { apiFetch } from '@/lib/fetch/api-fetch';
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
const getAllRecipesApi = ({
  limit,
  skip,
  sortBy,
  order,
}: GetAllRecipesApiParams) =>
  apiFetch<GetAllRecipesApiResponse>(
    `/recipes?limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${order}`,
  );

export const useRecipesQuery = () => {
  // "zustand"
  const { changeTotalItems, page, itemsPerPage, ...restRecipesState } =
    useRecipesStore(
      useShallow((state) => ({
        page: state.page,
        itemsPerPage: state.itemsPerPage,
        sortBy: state.sortBy,
        order: state.order,
        changeTotalItems: state.changeTotalItems,
      })),
    );

  const recipesParams: GetAllRecipesApiParams = {
    ...restRecipesState,
    skip: (page - 1) * itemsPerPage,
    limit: itemsPerPage,
  };

  // "tanstack-query"
  return useQuery({
    queryKey: ['recipes', recipesParams],
    queryFn: async () => {
      const data = await getAllRecipesApi(recipesParams);

      changeTotalItems(data.total);

      return data;
    },
  });
};
