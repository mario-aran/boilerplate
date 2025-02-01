import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/shadcn-ui/pagination';
import { useRecipesQuery } from '@/features/recipes/hooks';
import { useRecipesStore } from '@/features/recipes/store';

// Constants
const FIRST_PAGE = 1;

export const RecipesPagination = () => {
  const { data } = useRecipesQuery();
  const { numPage, prevPage, nextPage } = data ?? {
    numPage: 1,
    prevPage: null,
    nextPage: null,
  };

  const page = useRecipesStore((state) => state.page);
  const changePage = useRecipesStore((state) => state.changePage);

  // Render conditions
  const showCurrentPage = page !== FIRST_PAGE && page !== numPage;
  const showFirstEllipsis = page > 2;
  const showLastEllipsis = page < numPage - 1;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={() => changePage(prevPage)} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink onClick={() => changePage(FIRST_PAGE)}>
            {FIRST_PAGE}
          </PaginationLink>
        </PaginationItem>

        {showFirstEllipsis && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {showCurrentPage && (
          <PaginationItem>
            <PaginationLink isActive>{page}</PaginationLink>
          </PaginationItem>
        )}

        {showLastEllipsis && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationLink onClick={() => changePage(numPage)}>
            {numPage}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext onClick={() => changePage(nextPage)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
