import { Order, SortBy } from '@/features/recipes/types';
import { create } from 'zustand';

// Types
interface RecipesState {
  rowsPerPage: number;
  page: number;
  sortBy: SortBy;
  order: Order;
}

export const useRecipesStore = create<RecipesState>()(() => ({
  rowsPerPage: 10,
  page: 1,
  sortBy: 'id',
  order: 'asc',
}));
