// Recipe API
export interface RecipeResponse {
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

// Recipes API
export interface RecipesParams {
  limit: number;
  skip: number;
  sortBy: keyof RecipeResponse;
  order: 'asc' | 'desc';
}

export interface RecipesResponse {
  recipes: RecipeResponse[];
  total: number;
  skip: number;
  limit: number;
}
