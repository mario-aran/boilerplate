import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn-ui/select';
import { useState } from 'react';
import { CustomSelectProps } from './types';

export const CustomSelect = ({
  itemsPerPageOptions,
  totalItems,
  page,
}: CustomSelectProps) => {
  // States
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0] || 1);

  // Values
  const firstItem = (page - 1) * itemsPerPage + 1;
  const lastItem = Math.min(page * itemsPerPage, totalItems);

  // Render conditions
  const itemsMessage =
    totalItems > 0
      ? `Showing ${firstItem}-${lastItem} of ${totalItems} items`
      : 'No items available';

  return (
    <div className="flex items-center gap-4 text-sm">
      <div className="flex items-center">
        <p className="whitespace-nowrap">Items per page:</p>
        <Select
          value={itemsPerPage.toString()}
          onValueChange={(value) => setItemsPerPage(Number(value))}
        >
          <SelectTrigger className="w-[58px] border-none focus:ring-transparent">
            <SelectValue placeholder={itemsPerPage.toString()} />
          </SelectTrigger>
          <SelectContent>
            {itemsPerPageOptions.map((option) => (
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
