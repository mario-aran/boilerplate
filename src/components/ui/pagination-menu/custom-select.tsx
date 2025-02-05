import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn-ui/select';
import { useState } from 'react';
import { CustomSelectProps } from './types';

// Constants
const ITEMS_PER_PAGE_OPTIONS = [6, 9, 12];

export const CustomSelect = ({ totalItems, page }: CustomSelectProps) => {
  // Values
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE_OPTIONS[0]);
  const firstItem = (page - 1) * itemsPerPage + 1;
  const lastItem = Math.min(page * itemsPerPage, totalItems);

  // Render conditions
  const itemsMessage =
    totalItems <= 0
      ? 'No items available'
      : `Showing ${firstItem}-${lastItem} of ${totalItems} items`;

  // Utils
  const handleItemsPerPageChange = (value: string) =>
    setItemsPerPage(Number(value));

  return (
    <div className="flex items-center gap-4 text-sm">
      <div className="flex items-center">
        <p className="whitespace-nowrap">Items per page:</p>
        <Select
          value={itemsPerPage.toString()}
          onValueChange={handleItemsPerPageChange}
        >
          <SelectTrigger className="w-[58px] border-none focus:ring-transparent">
            <SelectValue placeholder={itemsPerPage.toString()} />
          </SelectTrigger>
          <SelectContent>
            {ITEMS_PER_PAGE_OPTIONS.map((option) => (
              <SelectItem key={option} value={option.toString()}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <p className="whitespace-nowrap">{itemsMessage}</p>
    </div>
  );
};
