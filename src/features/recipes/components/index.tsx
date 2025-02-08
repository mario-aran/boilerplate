import { RecipesCards } from './recipes-cards';
import { RecipesPagination } from './recipes-pagination';

export const Recipes = () => {
  return (
    <div className="flex flex-col justify-center space-y-4">
      <RecipesPagination />
      <RecipesCards />
    </div>
  );
};
