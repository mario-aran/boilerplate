import { RecipesList } from '@/features/recipes/components';

export const RecipesRoute = () => {
  return (
    <>
      <h1 className="text-3xl font-semibold">Recipes</h1>

      <RecipesList />
    </>
  );
};
