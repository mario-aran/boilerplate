import { useRecipesStore } from './store';

// Initial values
const { getState, setState } = useRecipesStore;
const initialStore = getState();

const {
  changePage,
  changeItemsPerPage,
  changeSortBy,
  changeOrder,
  changeTotalItems,
} = initialStore;

describe('useRecipesStore', () => {
  beforeEach(() => {
    setState(initialStore); // Reset store state
  });

  it('changePage: should ignore non-positive, decimals, and out-of-range values', () => {
    // Set fixed lastPage for testing
    setState({ lastPage: 2 });
    const expectedStore = getState();

    // Test cases
    [-1, 0, 1.5, 3].forEach((page) => {
      changePage(page);

      expect(getState()).toMatchObject(expectedStore);
    });
  });

  it('changePage: should update page with all values withing range', () => {
    // Set fixed lastPage for testing
    const lastPage = 3;
    setState({ lastPage });
    const expectedStore = getState();

    // Test all pages within range
    for (let i = 1; i <= lastPage; i++) {
      changePage(i);

      expect(getState()).toMatchObject({ ...expectedStore, page: i });
    }
  });

  it('changeItemsPerPage: should update itemsPerPage, lastPage, and page with each option', () => {
    // Set fixed totalItems for testing
    const totalItems = 30;
    setState({ totalItems });
    const expectedStore = getState();

    // Test all options
    const options = [
      { itemsPerPage: 6, lastPage: 5 },
      { itemsPerPage: 9, lastPage: 4 },
      { itemsPerPage: 12, lastPage: 3 },
    ] as const;

    options.forEach(({ itemsPerPage, lastPage }) => {
      changeItemsPerPage(itemsPerPage);

      expect(getState()).toMatchObject({
        ...expectedStore,
        itemsPerPage,
        lastPage,
        page: 1,
      });
    });
  });

  it('changeSortBy: should update sortBy', () => {
    const sortBy = 'rating';

    changeSortBy(sortBy);

    expect(getState()).toEqual({ ...initialStore, sortBy });
  });

  it('changeOrder: should update order', () => {
    const order = 'desc';

    changeOrder(order);

    expect(getState()).toEqual({ ...initialStore, order });
  });

  it('changeTotalItems: should ignore negative values and decimals', () => {
    [-1, 1.5].forEach((totalItems) => {
      changeTotalItems(totalItems);

      expect(getState()).toMatchObject(initialStore);
    });
  });

  it('changeTotalItems: should update totalItems and lastPage with whole numbers', () => {
    // Set fixed itemsPerPage for testing
    const itemsPerPage = 6;
    setState({ itemsPerPage });
    const expectedStore = getState();

    // Test cases
    [
      { totalItems: 0, lastPage: 1 },
      { totalItems: 10, lastPage: 2 },
      { totalItems: 20, lastPage: 4 },
    ].forEach(({ totalItems, lastPage }) => {
      changeTotalItems(totalItems);

      expect(getState()).toMatchObject({
        ...expectedStore,
        totalItems,
        lastPage,
      });
    });
  });
});
