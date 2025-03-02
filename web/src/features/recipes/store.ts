import { create } from 'zustand';
import { RecipesStore } from './types';

// Utils
const getLastPage = (totalItems: number, itemsPerPage: number) =>
  Math.max(Math.ceil(totalItems / itemsPerPage), 1);

export const useRecipesStore = create<RecipesStore>()((set) => ({
  page: 1,
  itemsPerPage: 6,
  sortBy: 'name',
  order: 'asc',
  totalItems: 0,
  lastPage: 1,

  // Actions
  changePage: (newPage) => {
    if (newPage <= 0 || !Number.isInteger(newPage)) return;

    set((state) => (newPage > state.lastPage ? state : { page: newPage }));
  },

  changeItemsPerPage: (newItemsPerPage) =>
    set((state) => ({
      itemsPerPage: newItemsPerPage,
      page: 1,
      lastPage: getLastPage(state.totalItems, newItemsPerPage),
    })),

  changeSortBy: (newSortBy) => set({ sortBy: newSortBy }),
  changeOrder: (newOrder) => set({ order: newOrder }),

  changeTotalItems: (newTotalItems) => {
    if (newTotalItems < 0 || !Number.isInteger(newTotalItems)) return;

    set((state) => ({
      totalItems: newTotalItems,
      lastPage: getLastPage(newTotalItems, state.itemsPerPage),
    }));
  },
}));
