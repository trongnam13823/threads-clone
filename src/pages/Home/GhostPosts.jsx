import { useTranslation } from 'react-i18next';
import ColumnContent from '@/components/Column/ColumnContent';
import MoreDropdown from '@/components/Column/MoreDropdown';
import PinColumn from '@/components/Column/PinColumn';
import { CreatePostBox } from '@/components/post/CreatePostBox';
import { PostCard } from '@/components/post/PostCard';
import postService, { useGetPostsFeedQuery } from '@/services/posts/postService';
import LoadMoreTrigger from '@/components/Loading/LoadMoreTrigger';
import ReloadIndicator from '@/components/Loading/ReloadIndicator';
import InitialLoading from '@/components/Loading/InitialLoading';
import useInfiniteList from '@/hooks/useInfiniteQueryList';
import GhostIcon from '@/assets/GhostIcon.svg?react';
import { useSelector } from 'react-redux';
import usePageStack from '@/contexts/pageStack/hooks/usePageStack';
import paths from '@/configs/paths';

const GhostPosts = ({ dropdownElement }) => {
  const { t } = useTranslation();
  const selectFeed = postService.endpoints.getPostsFeed.select({ type: 'ghost' });
  const queryState = useSelector(selectFeed);

  const { items, isLoading, isReloading, hasMore, sentinelRef } = useInfiniteList({
    queryHook: useGetPostsFeedQuery,
    queryParams: { type: 'ghost' },
    initialPage: queryState?.data?.pagination?.current_page ?? 1,
  });

  const { pages } = usePageStack();
  const isRootColumn = pages[0].path === paths.home;

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

        <InitialLoading isLoading={isLoading} />
        <ReloadIndicator isReloading={isReloading} />

        {!isLoading && items.length === 0 && (
          <div className='flex h-full flex-col items-center justify-center p-8 text-center text-balance text-(--secondary-icon)'>
            <GhostIcon />
            <p className='mt-5 text-2xl font-bold'>{t('ghostPosts.noPosts')}</p>
            <p className='mt-4'>{t('ghostPosts.description')}</p>
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
