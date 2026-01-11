import { useTranslation } from 'react-i18next';
import ColumnContent from '@/components/column/ColumnContent';
import MoreDropdown from '@/components/column/MoreDropdown';
import PinColumn from '@/components/column/PinColumn';
import CreateFeedMenuItem from '@/components/column/CreateFeedMenuItem';
import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import useDragSwap from '@/contexts/dragSwap/hooks/useDragSwap';

const ActivityFollows = () => {
  const { t } = useTranslation();
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
        <p className='text-(--text-secondary)'>{t('activity.noActivity')}</p>
      </div>
    </ColumnContent>
  );
};

export default ActivityFollows;
