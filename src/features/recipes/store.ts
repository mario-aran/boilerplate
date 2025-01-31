import { RecipesParams } from '@/features/recipes/types';
import { create } from 'zustand';

// Types
interface PageData {
  total: number;
  numPage: number;
  prevPage: number;
  nextPage: number;
}

interface RecipesStoreActions {
  setPageData: (pageData: PageData) => void;
  changePage: (page: number) => void;
}

type RecipesStore = RecipesParams & PageData & RecipesStoreActions;

export const useRecipesStore = create<RecipesStore>()((set) => ({
  limit: 6,
  page: 1,
  total: 0,
  numPage: 1,
  prevPage: 0,
  nextPage: 0,
  sortBy: 'id',
  order: 'asc',
  setPageData: (pageData) => set(pageData),
  changePage: (page) => set(() => (page ? { page } : {})),
}));
