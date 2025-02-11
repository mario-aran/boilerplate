import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn-ui/select';
import { CustomSelectProps } from './types';

export const CustomSelect = ({
  page,
  itemsPerPageOptions,
  itemsPerPage,
  totalItems,
  changeItemsPerPage,
}: CustomSelectProps) => {
  // Items summary values
  const firstItem = (page - 1) * itemsPerPage + 1;
  const lastItem = Math.min(page * itemsPerPage, totalItems);
  const itemsSummary =
    totalItems === 0
      ? 'No items available'
      : `${firstItem}-${lastItem} of ${totalItems} items`;

  return (
    <div className="flex items-center justify-center text-sm">
      {/* Items selector */}
      <div className="flex items-center gap-0.5">
        <p>Items per page:</p>
        <Select
          value={String(itemsPerPage)}
          onValueChange={(value) => changeItemsPerPage(Number(value))}
        >
          <SelectTrigger className="w-[58px] border-none focus:ring-transparent">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {itemsPerPageOptions.map((option) => (
              <SelectItem key={option} value={String(option)}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Items summary */}
      <p>{itemsSummary}</p>
    </div>
  );
};
