import ColumnContent from '@/components/Column/ColumnContent';
import MoreDropdown from '@/components/Column/MoreDropdown';
import PinColumn from '@/components/Column/PinColumn';
import { CreatePostBox } from '@/components/Post/CreatePostBox';
import { PostCard } from '@/components/Post/PostCard';
import { useGetPostsFeedQuery } from '@/services/posts/postsApi';
import { FEED_TYPES } from '@/constants/feedTypes';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';
import { useInfiniteQueryList } from '@/hooks/useInfiniteQueryList';

const ForYouPage = ({ dropdownElement, isRootColumn = false }) => {
  const { items, isLoading, isReloading, loadMoreRef, hasMore } = useInfiniteQueryList({
    listKey: FEED_TYPES.FOR_YOU,
    useQuery: useGetPostsFeedQuery,
    queryArgs: {
      type: FEED_TYPES.FOR_YOU,
    },
  });

  return (
    <ColumnContent
      dropdownElement={
        isRootColumn
          ? null
          : dropdownElement || (
              <MoreDropdown>
                <PinColumn />
              </MoreDropdown>
            )
      }
    >
      <div className='flex h-full flex-1 flex-col *:border-b *:border-(--primary-column-outline) [&>*:last-child]:border-none'>
        <CreatePostBox className='pt-6 max-md:hidden' />

        {isLoading ? (
          <div className='flex flex-1 items-center justify-center'>
            <Spinner className='size-10' />
          </div>
        ) : items.length === 0 ? (
          <div className='flex flex-1 items-center justify-center'>
            <p className='text-lg text-(--text-secondary)'>Chưa có bài viết nào</p>
          </div>
        ) : (
          <>
            <div
              className={cn(
                'flex min-h-20 flex-1 items-center justify-center overflow-hidden border-b-0! transition-[min-height]',
                isReloading ? 'max-h-20 min-h-20' : 'max-h-0 min-h-0'
              )}
            >
              <Spinner className='size-5' />
            </div>

            {items.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}

            {hasMore && (
              <div ref={loadMoreRef} className='flex min-h-20 flex-1 items-center justify-center'>
                <Spinner className='size-5' />
              </div>
            )}
          </>
        )}
      </div>
    </ColumnContent>
  );
};

export default ForYouPage;
