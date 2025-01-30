import { RecipesStore } from '@/features/recipes/types';
import { create } from 'zustand';

export const useRecipesStore = create<RecipesStore>()((set) => ({
  rowsPerPage: 6,
  page: 1,
  numPage: 1,
  prevPage: null,
  nextPage: null,
  sortBy: 'id',
  order: 'asc',
  setPageData: (pageData) => set(pageData),
  changePage: (page) => set({ page }),
}));
