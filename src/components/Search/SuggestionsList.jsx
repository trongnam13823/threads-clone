import { useTranslation } from 'react-i18next';
import SearchUserItem from './SearchUserItem';
import searchService, { useGetUserSuggestionQuery } from '@/services/search/searchService';
import LoadMoreTrigger from '../Loading/LoadMoreTrigger';
import ReloadIndicator from '../Loading/ReloadIndicator';
import InitialLoading from '../Loading/InitialLoading';
import EmptyResults from '../Loading/EmptyResults';
import useInfiniteList from '@/hooks/useInfiniteQueryList';
import { useSelector } from 'react-redux';

export default function SuggestionsList() {
  const { t } = useTranslation();
  const selectQuery = searchService.endpoints.getUserSuggestion.select({});
  const queryState = useSelector(selectQuery);

  const { items, isLoading, isReloading, hasMore, sentinelRef } = useInfiniteList({
    queryHook: useGetUserSuggestionQuery,
    queryParams: {},
    initialPage: queryState?.data?.pagination?.current_page ?? 1,
  });

  return (
    <>
      <InitialLoading isLoading={isLoading} />
      <ReloadIndicator isReloading={isReloading} />
      <EmptyResults isEmpty={!isLoading && items.length === 0} message={t('search.noSuggestions')} />

      {items.length > 0 && (
        <>
          <h2 className='px-6 pt-5 pb-1.5 font-bold text-(--text-secondary)'>{t('search.followSuggestions')}</h2>
          <div className='flex flex-col'>
            {items.map((user) => (
              <SearchUserItem key={user.id} user={user} />
            ))}
          </div>
        </>
      )}

      <LoadMoreTrigger ref={sentinelRef} hasMore={hasMore} />
    </>
  );
}
