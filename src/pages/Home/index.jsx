import CreateFeedMenuItem from '@/components/Column/CreateFeedMenuItem';
import MoreDropdown from '@/components/Column/MoreDropdown';
import ForYouPage from './ForYouPage';
import useDragSwap from '@/contexts/dragSwap/hooks/useDragSwap';

export default function HomePage() {
  const { isDraggable } = useDragSwap();
  return (
    <ForYouPage
      dropdownElement={
        !isDraggable && (
          <MoreDropdown>
            <CreateFeedMenuItem />
          </MoreDropdown>
        )
      }
      isRootColumn={isDraggable}
    />
  );
}
