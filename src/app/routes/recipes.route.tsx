import { Recipes } from '@/features/recipes/components';

export const RecipesRoute = () => {
  return (
    <>
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
        Recipes
      </h1>

      <Recipes />
    </>
  );
};
