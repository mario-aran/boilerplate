import { useRecipesQuery } from '@/features/recipes/api';
import { render, screen, within } from '@testing-library/react';
import { Mock, vi } from 'vitest';
import { RecipesCards } from './recipes-cards';

// Casted mocks
vi.mock('@/features/recipes/api', () => ({ useRecipesQuery: vi.fn() }));
const mockedUseRecipesQuery = useRecipesQuery as Mock;

describe('RecipesCards', () => {
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
    // Assert cards number
    const cards = screen.getAllByTestId('recipe-card');
    expect(cards).toHaveLength(defaultRecipes.length);

    // Assert each card content
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

  it.each([
    ['an empty array', []],
    ['undefined', undefined],
  ])(
    'displays "No recipes found." when recipes is %s and loading is complete',
    (_, testRecipes) => {
      mockedUseRecipesQuery.mockReturnValue({
        isLoading: false,
        data: { recipes: testRecipes },
      });

      render(<RecipesCards />);

      expect(screen.getByText('No recipes found.')).toBeInTheDocument();
    },
  );
});
