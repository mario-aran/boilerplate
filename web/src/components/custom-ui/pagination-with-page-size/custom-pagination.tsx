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
    // div wrapper to avoid full width
    <div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <Button
              aria-label="Previous"
              disabled={!showFirstPage}
              variant="ghost"
              size="icon"
              onClick={() => changePage(prevPage)}
            >
              <ChevronLeft />
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
              aria-label="Next"
              disabled={!showLastPage}
              variant="ghost"
              size="icon"
              onClick={() => changePage(nextPage)}
            >
              <ChevronRight />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
