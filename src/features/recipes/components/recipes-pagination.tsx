import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/shadcn-ui/pagination';
import { useRecipesStore } from '@/features/recipes/store';

// Constants
const FIRST_PAGE = 1;

export const RecipesPagination = () => {
  // Store
  const page = useRecipesStore((state) => state.page);
  const totalPages = useRecipesStore((state) => state.totalPages);
  const prevPage = useRecipesStore((state) => state.prevPage);
  const nextPage = useRecipesStore((state) => state.nextPage);
  const changePage = useRecipesStore((state) => state.changePage);

  // Render conditions
  const showCurrentPage = page !== FIRST_PAGE && page !== totalPages;
  const showFirstEllipsis = page > 2;
  const showLastEllipsis = page < totalPages - 1;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => prevPage && changePage(prevPage)}
          />
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
          <PaginationLink onClick={() => changePage(totalPages)}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext onClick={() => nextPage && changePage(nextPage)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
