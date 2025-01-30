import { PageData, RecipesParams } from '@/features/recipes/types';
import { create } from 'zustand';

// Constants
const NO_VALUE = 0;
const FIRST_PAGE = 1;

interface RecipesStoreActions {
  setPageData: (pageData: PageData) => void;
  changePage: (page: number) => void;
}

type RecipesStore = PageData & RecipesParams & RecipesStoreActions;

export const useRecipesStore = create<RecipesStore>()((set) => ({
  limit: 6,
  total: NO_VALUE,
  page: FIRST_PAGE,
  numPage: FIRST_PAGE,
  prevPage: NO_VALUE,
  nextPage: NO_VALUE,
  sortBy: 'id',
  order: 'asc',
  setPageData: (pageData) => set(pageData),
  changePage: (page) => set(() => (page ? { page } : {})),
}));
