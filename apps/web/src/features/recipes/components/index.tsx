import { RecipesCards } from './recipes-cards';
import { RecipesPagination } from './recipes-pagination';

export const RecipesList = () => {
  return (
    <div>
      <RecipesPagination />

      <div className="mt-4">
        <RecipesCards />
      </div>
    </div>
  );
};
