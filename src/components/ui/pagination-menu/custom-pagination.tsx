import { Button } from '@/components/shadcn-ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from '@/components/shadcn-ui/pagination';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CustomPaginationProps } from './types';

// Constants
const FIRST_PAGE = 1;

export const CustomPagination = ({
  page,
  lastPage,
  changePage,
}: CustomPaginationProps) => {
  // Values
  const prevPage = page - 1;
  const nextPage = page + 1;

  // Render conditions
  const showFirstPage = page > FIRST_PAGE;
  const showLastPage = page < lastPage;
  const showPageBeforeCurrent = prevPage > FIRST_PAGE;
  const showPageAfterCurrent = nextPage < lastPage;
  const showFirstEllipsis = page > FIRST_PAGE + 2;
  const showLastEllipsis = page < lastPage - 2;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Button
            disabled={!showFirstPage}
            variant="ghost"
            size="icon"
            onClick={() => changePage(prevPage)}
          >
            <ChevronLeft />
            <span className="sr-only">Previous</span>
          </Button>
        </PaginationItem>

        {showFirstPage && (
          <PaginationItem>
            <PaginationLink onClick={() => changePage(FIRST_PAGE)}>
              {FIRST_PAGE}
            </PaginationLink>
          </PaginationItem>
        )}

        {showFirstEllipsis && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {showPageBeforeCurrent && (
          <PaginationItem>
            <PaginationLink onClick={() => changePage(prevPage)}>
              {prevPage}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationLink isActive>{page}</PaginationLink>
        </PaginationItem>

        {showPageAfterCurrent && (
          <PaginationItem>
            <PaginationLink onClick={() => changePage(nextPage)}>
              {nextPage}
            </PaginationLink>
          </PaginationItem>
        )}

        {showLastEllipsis && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {showLastPage && (
          <PaginationItem>
            <PaginationLink onClick={() => changePage(lastPage)}>
              {lastPage}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <Button
            disabled={!showLastPage}
            variant="ghost"
            size="icon"
            onClick={() => changePage(nextPage)}
          >
            <ChevronRight />
            <span className="sr-only">Next</span>
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
