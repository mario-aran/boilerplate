import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useRecipesStore } from '@/features/recipes/stores';

// Constants
const FIRST_PAGE = 1;

export const RecipesPagination = () => {
  // Stores
  const page = useRecipesStore((state) => state.page);
  const numPage = useRecipesStore((state) => state.numPage);
  const prevPage = useRecipesStore((state) => state.prevPage);
  const nextPage = useRecipesStore((state) => state.nextPage);
  const changePage = useRecipesStore((state) => state.changePage);

  // Conditions
  const showFirstPage = page !== FIRST_PAGE;
  const showLastPage = page !== numPage;
  const showFirstEllipsis = page > 2;
  const showLastEllipsis = page < numPage - 2;

  // Utils
  const handlePageChange = (newPage: number | null) => {
    if (newPage) changePage(newPage);
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={() => handlePageChange(prevPage)} />
        </PaginationItem>

        {showFirstPage && (
          <PaginationItem>
            <PaginationLink onClick={() => handlePageChange(FIRST_PAGE)}>
              {FIRST_PAGE}
            </PaginationLink>
          </PaginationItem>
        )}

        {showFirstEllipsis && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationLink isActive>{page}</PaginationLink>
        </PaginationItem>

        {showLastEllipsis && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {showLastPage && (
          <PaginationItem>
            <PaginationLink onClick={() => handlePageChange(numPage)}>
              {numPage}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext onClick={() => handlePageChange(nextPage)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
