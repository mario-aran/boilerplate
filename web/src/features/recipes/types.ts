export interface GetRecipeApiResponse {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: string;
  cuisine: string;
  caloriesPerServing: number;
  tags: string[];
  userId: number;
  image: string;
  rating: number;
  reviewCount: number;
  mealType: string[];
}

type SortBy = keyof Pick<
  GetRecipeApiResponse,
  'id' | 'name' | 'cookTimeMinutes' | 'difficulty' | 'cuisine' | 'rating'
>;

export interface GetAllRecipesApiParams {
  limit: number;
  skip: number;
  sortBy: SortBy;
  order: 'asc' | 'desc';
}

interface RecipesStoreState
  extends Pick<GetAllRecipesApiParams, 'sortBy' | 'order'> {
  page: number;
  itemsPerPage: 6 | 9 | 12;
  totalItems: number;
  lastPage: number;
}

export interface RecipesStore extends RecipesStoreState {
  changePage: (newPage: RecipesStoreState['page']) => void;
  changeItemsPerPage: (
    newItemsPerPage: RecipesStoreState['itemsPerPage'],
  ) => void;
  changeSortBy: (newSortBy: RecipesStoreState['sortBy']) => void;
  changeOrder: (newChangeOrder: RecipesStoreState['order']) => void;
  changeTotalItems: (newTotalItems: RecipesStoreState['totalItems']) => void;
}
