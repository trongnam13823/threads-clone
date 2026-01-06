import { useTranslation } from 'react-i18next';
import ColumnContent from '@/components/Column/ColumnContent';
import MoreDropdown from '@/components/Column/MoreDropdown';
import PinColumn from '@/components/Column/PinColumn';
import { CreatePostBox } from '@/components/Post/CreatePostBox';
import { PostCard } from '@/components/Post/PostCard';
import postsApi, { useGetPostsFeedQuery } from '@/services/posts/postsApi';
import LoadMoreTrigger from '@/components/Loading/LoadMoreTrigger';
import ReloadIndicator from '@/components/Loading/ReloadIndicator';
import InitialLoading from '@/components/Loading/InitialLoading';
import EmptyResults from '@/components/Loading/EmptyResults';
import useInfiniteList from '@/hooks/useInfiniteQueryList';
import { useSelector } from 'react-redux';
import paths from '@/configs/paths';
import usePageStack from '@/contexts/pageStack/hooks/usePageStack';

const ForYouPage = ({ dropdownElement }) => {
  const { t } = useTranslation();
  const selectFeed = postsApi.endpoints.getPostsFeed.select({ type: 'for_you' });
  const queryState = useSelector(selectFeed);

  const { items, isLoading, isReloading, hasMore, sentinelRef } = useInfiniteList({
    queryHook: useGetPostsFeedQuery,
    queryParams: { type: 'for_you' },
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
        <EmptyResults isEmpty={!isLoading && items.length === 0} message={t('home.noPosts')} />

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

export default ForYouPage;
