import ColumnContent from '@/components/Column/ColumnContent';
import MoreDropdown from '@/components/Column/MoreDropdown';
import PinColumn from '@/components/Column/PinColumn';
import { CreatePostBox } from '@/components/Post/CreatePostBox';
import { PostCard } from '@/components/Post/PostCard';
import postsApi, { useGetPostsFeedQuery } from '@/services/posts/postsApi';
import LoadMoreTrigger from '@/components/Loading/LoadMoreTrigger';
import ReloadIndicator from '@/components/Loading/ReloadIndicator';
import InitialLoading from '@/components/Loading/InitialLoading';
import useInfiniteList from '@/hooks/useInfiniteQueryList';
import GhostIcon from '@/assets/GhostIcon.svg?react';
import { useSelector } from 'react-redux';

const GhostPosts = ({ dropdownElement }) => {
  const selectFeed = postsApi.endpoints.getPostsFeed.select({ type: 'ghost' });
  const queryState = useSelector(selectFeed);

  const { items, isLoading, isReloading, hasMore, sentinelRef } = useInfiniteList({
    queryHook: useGetPostsFeedQuery,
    queryParams: { type: 'ghost' },
    initialPage: queryState?.data?.pagination?.current_page ?? 1,
  });

  return (
    <ColumnContent
      dropdownElement={
        dropdownElement || (
          <MoreDropdown>
            <PinColumn />
          </MoreDropdown>
        )
      }
    >
      <div className='flex h-full flex-1 flex-col *:border-b *:border-(--primary-column-outline) [&>*:last-child]:border-none'>
        <CreatePostBox className='pt-6 max-md:hidden' />

        <InitialLoading isLoading={isLoading} />
        <ReloadIndicator isReloading={isReloading} />

        {!isLoading && items.length === 0 && (
          <div className='flex h-full flex-col items-center justify-center p-8 text-center text-balance text-(--secondary-icon)'>
            <GhostIcon />
            <p className='mt-5 text-2xl font-bold'>Chưa có bài viết bài viết tự biến mất nào</p>
            <p className='mt-4'>
              Hệ thống sẽ lưu trữ bài viết tự hủy sau 24 giờ và chuyển thread trả lời vào tin nhắn.
              Chỉ mình bạn xem được ai đã thích và trả lời.
            </p>
          </div>
        )}

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

export default GhostPosts;
