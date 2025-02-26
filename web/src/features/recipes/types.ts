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

export interface GetAllRecipesApiParams {
  limit: number;
  skip: number;
  sortBy: keyof GetRecipeApiResponse;
  order: 'asc' | 'desc';
}

export interface RecipesStore
  extends Pick<GetAllRecipesApiParams, 'sortBy' | 'order'> {
  page: number;
  itemsPerPage: number;
  totalItems: number;
  lastPage: number;
  changePage: (page: number) => void;
  changeItemsPerPage: (itemsPerPage: number) => void;
  changeTotalItems: (totalItems: number) => void;
}
