import { CreatePostBox } from '@/components/Post/CreatePostBox';
import ColumnContent from '@/components/Column/ColumnContent';
import { PostCard } from '@/components/Post/PostCard';
import CreateFeedMenuItem from '@/components/Column/CreateFeedMenuItem';
import PinColumn from '@/components/Column/PinColumn';
import MoreDropdown from '@/components/Column/MoreDropdown';
import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import useDragSwap from '@/contexts/dragSwap/hooks/useDragSwap';

const FollowingPage = () => {
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
      <div className='flex-1 *:border-b *:border-(--primary-column-outline) [&>*:last-child]:border-none'>
        <CreatePostBox className='pt-6 max-md:hidden' />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
      </div>
    </ColumnContent>
  );
};

export default FollowingPage;
