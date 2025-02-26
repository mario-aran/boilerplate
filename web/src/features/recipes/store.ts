import { create } from 'zustand';
import { RecipesStore } from './types';

// Constants
const FIRST_PAGE = 1;
export const ITEMS_PER_PAGE_OPTIONS = [6, 9, 12];

export const useRecipesStore = create<RecipesStore>()((set) => ({
  // Params
  page: FIRST_PAGE,
  itemsPerPage: ITEMS_PER_PAGE_OPTIONS[0],
  sortBy: 'name',
  order: 'asc',

  // Results
  totalItems: 0,
  lastPage: FIRST_PAGE,

  // Actions
  changePage: (page) => set({ page }),

  changeItemsPerPage: (itemsPerPage) =>
    set((state) => ({
      page: FIRST_PAGE,
      itemsPerPage,
      lastPage: Math.max(
        Math.ceil(state.totalItems / itemsPerPage),
        FIRST_PAGE,
      ),
    })),

  changeTotalItems: (totalItems) =>
    set((state) => ({
      totalItems,
      lastPage: Math.max(
        Math.ceil(totalItems / state.itemsPerPage),
        FIRST_PAGE,
      ),
    })),
}));
