import ColumnContent from '@/components/Column/ColumnContent';
import MoreDropdown from '@/components/Column/MoreDropdown';
import PinColumn from '@/components/Column/PinColumn';
import CreateFeedMenuItem from '@/components/Column/CreateFeedMenuItem';
import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import useDragSwap from '@/contexts/dragSwap/hooks/useDragSwap';

const ActivityFollowsPage = () => {
  const { isDraggable } = useDragSwap();

  return (
    <ColumnContent
      dropdownElement={
        <MoreDropdown>
          <PinColumn />
          {!isDraggable && (
            <>
              <DropdownMenuSeparator />
              <CreateFeedMenuItem />
            </>
          )}
        </MoreDropdown>
      }
    >
      <div className='flex size-full items-center justify-center py-2'>
        <p className='text-(--text-secondary)'>Chưa có hoạt động nào.</p>
      </div>
    </ColumnContent>
  );
};

export default ActivityFollowsPage;
