import { useRecipesQuery } from '@/features/recipes/api';
import { cleanup, render, screen, within } from '@testing-library/react';
import { Mock, vi } from 'vitest';
import { RecipesCards } from './recipes-cards';

describe('RecipesCards', () => {
  // Mocks: casted to use mock methods
  vi.mock('@/features/recipes/api', () => ({ useRecipesQuery: vi.fn() }));
  const mockedUseRecipesQuery = useRecipesQuery as Mock;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders 3 skeleton cards while loading data', () => {
    mockedUseRecipesQuery.mockReturnValue({ isLoading: true });

    render(<RecipesCards />);

    expect(screen.getAllByTestId('skeleton-card')).toHaveLength(3);
  });

  it('renders the correct number of cards with correct content when loading is complete', () => {
    // Setup
    const defaultRecipes = [
      { id: 1, name: 'Pasta', cookTimeMinutes: 10, image: 'pasta.jpg' },
      { id: 2, name: 'Pizza', cookTimeMinutes: 20, image: 'pizza.jpg' },
    ];

    mockedUseRecipesQuery.mockReturnValue({
      isLoading: false,
      data: { recipes: defaultRecipes },
    });

    // Actions
    render(<RecipesCards />);

    // Assertions
    // Test cards number
    const cards = screen.getAllByTestId('recipe-card');
    expect(cards).toHaveLength(defaultRecipes.length);

    // Test each card
    defaultRecipes.forEach(({ name, cookTimeMinutes, image }, index) => {
      const card = within(cards[index]);
      const cardName = card.getByText(name);
      const cardCookTime = card.getByText(`${cookTimeMinutes} mins to cook.`);
      const cardImage = card.getByRole('img', { name });

      expect(cardName).toBeInTheDocument();
      expect(cardCookTime).toBeInTheDocument();
      expect(cardImage).toHaveAttribute('src', image);
    });
  });

  it('displays "No recipes found." when no recipes exists and loading is complete', () => {
    const noRecipesValues = [[], undefined];

    noRecipesValues.forEach((recipes) => {
      mockedUseRecipesQuery.mockReturnValue({
        isLoading: false,
        data: { recipes },
      });

      render(<RecipesCards />);

      expect(screen.getByText('No recipes found.')).toBeInTheDocument();

      cleanup(); // Remove the components after each iteration
    });
  });
});
