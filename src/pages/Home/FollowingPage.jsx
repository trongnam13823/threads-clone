import ColumnContent from '@/components/Column/ColumnContent';
import MoreDropdown from '@/components/Column/MoreDropdown';
import PinColumn from '@/components/Column/PinColumn';
import { CreatePostBox } from '@/components/Post/CreatePostBox';
import { PostCard } from '@/components/Post/PostCard';
import postsApi, { useGetPostsFeedQuery } from '@/services/posts/postsApi';
import CreateFeedMenuItem from '@/components/Column/CreateFeedMenuItem';
import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import useDragSwap from '@/contexts/dragSwap/hooks/useDragSwap';
import LoadMoreTrigger from '@/components/Loading/LoadMoreTrigger';
import ReloadIndicator from '@/components/Loading/ReloadIndicator';
import InitialLoading from '@/components/Loading/InitialLoading';
import EmptyResults from '@/components/Loading/EmptyResults';
import useInfiniteList from '@/hooks/useInfiniteQueryList';
import { useSelector } from 'react-redux';

const FollowingPage = ({ dropdownElement }) => {
  const { isDraggable } = useDragSwap();
  const selectFeed = postsApi.endpoints.getPostsFeed.select({ type: 'following' });
  const queryState = useSelector(selectFeed);

  const { items, isLoading, isReloading, hasMore, sentinelRef } = useInfiniteList({
    queryHook: useGetPostsFeedQuery,
    queryParams: { type: 'following' },
    initialPage: queryState?.data?.pagination?.current_page ?? 1,
  });

  return (
    <ColumnContent
      dropdownElement={
        dropdownElement || (
          <MoreDropdown>
            <PinColumn />
            {!isDraggable && (
              <>
                <DropdownMenuSeparator />
                <CreateFeedMenuItem />
              </>
            )}
          </MoreDropdown>
        )
      }
    >
      <div className='flex h-full flex-1 flex-col *:border-b *:border-(--primary-column-outline) [&>*:last-child]:border-none'>
        <CreatePostBox className='pt-6 max-md:hidden' />

        <InitialLoading isLoading={isLoading} />
        <ReloadIndicator isReloading={isReloading} />
        <EmptyResults isEmpty={!isLoading && items.length === 0} message='Chưa có bài viết nào' />

        {items.length > 0 && (
          <>
            {items.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
            <LoadMoreTrigger ref={sentinelRef} hasMore={hasMore} />
          </>
        )}
      </div>
    </ColumnContent>
  );
};

export default FollowingPage;
