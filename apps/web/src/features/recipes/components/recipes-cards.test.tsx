import { useRecipesQuery } from '@/features/recipes/api/use-recipes-query';
import { GetRecipeApiResponse } from '@/features/recipes/types';
import { cleanup, render, screen, within } from '@testing-library/react';
import { Mock } from 'vitest';
import { RecipesCards } from './recipes-cards';

// Types
interface MockUseRecipesQueryProps {
  isLoading: boolean;
  recipes?: Pick<
    GetRecipeApiResponse,
    'id' | 'name' | 'cookTimeMinutes' | 'image'
  >[];
}

// Mocks
vi.mock('@/features/recipes/api', () => ({ useRecipesQuery: vi.fn() }));

// Utils
const mockUseRecipesQueryResults = ({
  isLoading,
  recipes,
}: MockUseRecipesQueryProps) => {
  const castedUseRecipesQuery = useRecipesQuery as Mock;

  return castedUseRecipesQuery.mockReturnValue({
    isLoading,
    data: { recipes },
  });
};

describe('RecipesCards', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders 3 skeleton cards while loading data', () => {
    mockUseRecipesQueryResults({ isLoading: true });

    render(<RecipesCards />);

    expect(screen.getAllByTestId('skeleton-card')).toHaveLength(3);
  });

  it('renders the correct number of cards with accurate content after loading completes', () => {
    // Setup
    const recipes = [
      { id: 1, name: 'Pasta', cookTimeMinutes: 10, image: 'pasta.jpg' },
      { id: 2, name: 'Pizza', cookTimeMinutes: 20, image: 'pizza.jpg' },
    ];

    mockUseRecipesQueryResults({ recipes, isLoading: false });

    // Actions
    render(<RecipesCards />);

    // Assertions
    // Test cards number
    const cards = screen.getAllByTestId('recipe-card');
    expect(cards).toHaveLength(recipes.length);

    // Test each card
    recipes.forEach(({ name, cookTimeMinutes, image }, index) => {
      const card = within(cards[index]);
      const cardName = card.getByText(name);
      const cardCookTime = card.getByText(`${cookTimeMinutes} mins to cook.`);
      const cardImage = card.getByRole('img', { name });

      expect(cardName).toBeInTheDocument();
      expect(cardCookTime).toBeInTheDocument();
      expect(cardImage).toHaveAttribute('src', image);
    });
  });

  it('displays "No recipes found." when no recipes exist and loading is complete', () => {
    [[], undefined].forEach((recipes) => {
      mockUseRecipesQueryResults({ recipes, isLoading: false });

      render(<RecipesCards />);

      expect(screen.getByText('No recipes found.')).toBeInTheDocument();

      cleanup(); // Remove components after each iteration
    });
  });
});
