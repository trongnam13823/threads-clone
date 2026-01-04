import ColumnContent from '@/components/Column/ColumnContent';
import { PostCard } from '@/components/Post/PostCard';
import postsApi, { useGetPostDetailQuery, useGetPostRepliesQuery } from '@/services/posts/postsApi';
import { ChevronDownIcon, ChevronRightIcon } from 'lucide-react';
import LoadMoreTrigger from '@/components/Loading/LoadMoreTrigger';
import ReloadIndicator from '@/components/Loading/ReloadIndicator';
import InitialLoading from '@/components/Loading/InitialLoading';
import EmptyResults from '@/components/Loading/EmptyResults';
import useInfiniteList from '@/hooks/useInfiniteQueryList';
import { useSelector } from 'react-redux';
import useParams from '@/contexts/pageStack/components/useParams';
import MoreDropdown from '@/components/Column/MoreDropdown';
import PinColumn from '@/components/Column/PinColumn';

export default function PostDetailPage() {
  const { postId } = useParams();
  const {
    data: postDetail,
    isLoading: isPostDetailLoading,
    isFetching: isPostDetailFetching,
  } = useGetPostDetailQuery(postId);

  const selectReplies = postsApi.endpoints.getPostReplies.select({ id: postId });
  const queryState = useSelector(selectReplies);

  const {
    items: replies,
    isLoading: isRepliesLoading,
    isFetching: isRepliesFetching,
    isReloading: isRepliesReloading,
    hasMore,
    sentinelRef,
  } = useInfiniteList({
    queryHook: useGetPostRepliesQuery,
    queryParams: { id: postId },
    initialPage: queryState?.data?.pagination?.current_page ?? 1,
  });

  const isLoading =
    isPostDetailLoading || isPostDetailFetching || isRepliesLoading || isRepliesFetching;

  return (
    <ColumnContent
      className='flex flex-col'
      dropdownElement={
        <MoreDropdown>
          <PinColumn />
        </MoreDropdown>
      }
    >
      {isLoading ? (
        <InitialLoading isLoading={isLoading} />
      ) : (
        <>
          <div className='pt-2'>
            <PostCard post={postDetail.data} />

            <div className='mx-6 flex items-center justify-between border-t border-(--lines-primary) py-4'>
              <button className='flex items-center gap-1 font-bold text-(--text-primary)'>
                <span>Hàng đầu</span> <ChevronDownIcon className='size-4 text-(--text-secondary)' />
              </button>
              <button className='flex items-center gap-1 text-(--text-secondary)'>
                <span>Xem hoạt động</span> <ChevronRightIcon className='mt-0.5 size-4' />
              </button>
            </div>
          </div>

          <div className='flex-1 border-t border-(--lines-primary) *:border-b *:border-(--primary-column-outline) [&>*:last-child]:border-none'>
            <ReloadIndicator isReloading={isRepliesReloading} />
            <EmptyResults
              isEmpty={!isRepliesLoading && replies.length === 0}
              message='Chưa có phản hồi nào'
            />

            {replies.map((reply) => (
              <PostCard key={reply.id} post={reply} />
            ))}

            <LoadMoreTrigger ref={sentinelRef} hasMore={hasMore} />
          </div>
        </>
      )}
    </ColumnContent>
  );
}
