import { RecipesParams } from '@/features/recipes/types';
import { create } from 'zustand';

// Types
interface RecipesStoreActions {
  changePage: (page: number | null) => void;
}

type RecipesStore = RecipesParams & RecipesStoreActions;

export const useRecipesStore = create<RecipesStore>()((set) => ({
  page: 1,
  limit: 6,
  sortBy: 'id',
  order: 'asc',
  changePage: (page) => set(() => (page ? { page } : {})),
}));
