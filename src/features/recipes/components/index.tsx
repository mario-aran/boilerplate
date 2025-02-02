import { RecipesCards } from './recipes-cards';
import { RecipesPagination } from './recipes-pagination';

export const Recipes = () => {
  return (
    <div>
      <RecipesPagination />

      <div className="pt-4">
        <RecipesCards />
      </div>
    </div>
  );
};
