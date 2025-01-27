import { VITE_API_URL } from '@/config/env';
import { useQuery } from '@tanstack/react-query';

// Types
interface Recipe {
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

const getRecipes = (): Promise<{ recipes: Recipe[] }> =>
  fetch(`${VITE_API_URL}/recipes`).then((res) => res.json());

export const useRecipes = () => {
  return useQuery({
    queryKey: ['recipes'],
    queryFn: getRecipes,
  });
};
