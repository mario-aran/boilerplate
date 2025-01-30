import { RecipesCards } from './recipes-cards';
import { RecipesPagination } from './recipes-pagination';

export const Recipes = () => {
  return (
    <div className="flex flex-col gap-8">
      <RecipesPagination />
      <RecipesCards />
    </div>
  );
};
