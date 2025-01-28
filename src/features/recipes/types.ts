export interface RecipeApiResponse {
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

export interface RecipesParams {
  limit?: number;
  page?: number;
  sortBy?: keyof RecipeApiResponse;
  order?: 'asc' | 'desc';
}

export interface RecipesApiResponse {
  recipes: RecipeApiResponse[];
  total: number;
  skip: number;
  limit: number;
}
