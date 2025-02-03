import { RecipesParams, RecipesResponse } from '@/features/recipes/types';
import { create } from 'zustand';

// Types
type RecipesResults = Partial<Pick<RecipesResponse, 'total'>>;

type RecipesStore = RecipesParams & {
  page: number;
  totalItems: number;
  totalPages: number;
  prevPage: number | null;
  nextPage: number | null;
  changeRecipesParams: (recipesParams: Partial<RecipesParams>) => void;
  changePage: (page: number) => void;
  changeRecipesResults: (recipesResults: RecipesResults) => void;
};

// Constants
const INITIAL_TOTAL_ITEMS = 0;
const INITIAL_TOTAL_PAGES = 1;

export const useRecipesStore = create<RecipesStore>()((set) => ({
  // Params
  skip: 1,
  limit: 6,
  sortBy: 'id',
  order: 'asc',

  // Values
  page: 1,

  // Results
  totalItems: INITIAL_TOTAL_ITEMS,
  totalPages: INITIAL_TOTAL_PAGES,
  prevPage: null,
  nextPage: null,

  // Actions
  changeRecipesParams: (recipesParams) => set(recipesParams),
  changePage: (page) => page > 0 && set({ page }),
  changeRecipesResults: ({ total = INITIAL_TOTAL_ITEMS }) =>
    set((state) => {
      const totalPages = Math.ceil(total / state.limit) || INITIAL_TOTAL_PAGES;

      return {
        totalItems: total,
        totalPages,
        prevPage: state.page > 1 ? state.page - 1 : null,
        nextPage: state.page < totalPages ? state.page + 1 : null,
      };
    }),
}));
