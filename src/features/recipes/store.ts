import { create } from 'zustand';
import { RecipesParams } from './types';

// Types
type ItemsPerPage = (typeof ITEMS_PER_PAGE_OPTIONS)[number];

interface RecipesStore extends Pick<RecipesParams, 'sortBy' | 'order'> {
  page: number;
  itemsPerPage: ItemsPerPage;
  totalItems: number;
  lastPage: number;
  changePage: (page: number) => void;
  changeItemsPerPage: (itemsPerPage: ItemsPerPage) => void;
  changeTotalItems: (totalItems: number) => void;
}

// Constants
const FIRST_PAGE = 1;
export const ITEMS_PER_PAGE_OPTIONS = [6, 9, 12] as const;

export const useRecipesStore = create<RecipesStore>()((set) => ({
  // Params
  page: FIRST_PAGE,
  itemsPerPage: ITEMS_PER_PAGE_OPTIONS[0],
  sortBy: 'id',
  order: 'asc',

  // Results
  totalItems: 0,
  lastPage: FIRST_PAGE,

  // Actions
  changePage: (page) =>
    set((state) => {
      if (page < FIRST_PAGE || page > state.lastPage) return {}; // Guard against out bounds
      return { page };
    }),

  changeItemsPerPage: (itemsPerPage) => set({ itemsPerPage }),

  changeTotalItems: (totalItems) =>
    set((state) => ({
      totalItems,
      lastPage: Math.max(
        Math.ceil(totalItems / state.itemsPerPage),
        FIRST_PAGE,
      ),
    })),
}));
