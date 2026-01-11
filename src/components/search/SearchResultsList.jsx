import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import SearchUserItem from './SearchUserItem';
import SearchTopicItem from './SearchTopicItem';
import searchService, { useSearchAllQuery } from '@/services/search/searchService';
import LoadMoreTrigger from '../loading/LoadMoreTrigger';
import ReloadIndicator from '../loading/ReloadIndicator';
import InitialLoading from '../loading/InitialLoading';
import EmptyResults from '../loading/EmptyResults';
import useInfiniteList from '@/hooks/useInfiniteQueryList';
import { useTranslation } from 'react-i18next';

export default function SearchResultsList() {
  const { t } = useTranslation();
  const q = useSelector((state) => state.search.text);
  const isSearching = q.length > 1;
  const trimmedQ = q.trim();

  const selectQuery = searchService.endpoints.searchAll.select({ q: trimmedQ });
  const queryState = useSelector(selectQuery);

  // Lấy initialPage là giá trị lớn hơn giữa topics và users current_page
  const topicsPage = queryState?.data?.pagination?.topics?.current_page ?? 0;
  const usersPage = queryState?.data?.pagination?.users?.current_page ?? 0;
  const initialPage = Math.max(topicsPage, usersPage, 1);

  const { items, isLoading, isReloading, hasMore, sentinelRef, setPage } = useInfiniteList({
    queryHook: useSearchAllQuery,
    queryParams: { q: trimmedQ },
    queryOptions: { skip: !isSearching || trimmedQ.length <= 1 },
    initialPage,
    getItems: (data) => ({
      topics: data?.data?.topics ?? [],
      users: data?.data?.users ?? [],
    }),
    getPagination: (data) => data?.pagination ?? {},
    getHasMore: (page, pagination) => {
      const { topics: topicsPagination, users: usersPagination } = pagination;
      return page < (topicsPagination?.last_page ?? 1) || page < (usersPagination?.last_page ?? 1);
    },
    getNextPage: (currentPage, pagination) => {
      const { topics: topicsPagination, users: usersPagination } = pagination;
      // Lấy current_page lớn hơn giữa topics và users, rồi + 1
      const topicsCurrentPage = topicsPagination?.current_page ?? 0;
      const usersCurrentPage = usersPagination?.current_page ?? 0;
      const maxCurrentPage = Math.max(topicsCurrentPage, usersCurrentPage, currentPage);
      return maxCurrentPage + 1;
    },
  });

  const { topics, users } = items || { topics: [], users: [] };

  /**
   * Reset page when search query changes
   */
  useEffect(() => {
    setPage(1);
  }, [trimmedQ, setPage]);

  if (!isSearching) return null;

  return (
    <>
      <InitialLoading isLoading={isLoading} />
      <ReloadIndicator isReloading={isReloading} />
      <EmptyResults
        isEmpty={!isLoading && topics.length === 0 && users.length === 0}
        message={t('search.noResults')}
      />

      {topics.length > 0 && (
        <>
          <h2 className='px-6 pt-5 pb-1.5 font-bold text-(--text-secondary)'>
            {t('search.topics')}
          </h2>
          <div className='flex flex-col'>
            {topics.map((topic) => (
              <SearchTopicItem key={topic.id} topic={topic} />
            ))}
          </div>
        </>
      )}

      {users.length > 0 && (
        <>
          <h2 className='px-6 pt-5 pb-1.5 font-bold text-(--text-secondary)'>
            {t('search.people')}
          </h2>
          <div className='flex flex-col'>
            {users.map((user) => (
              <SearchUserItem key={user.id} user={user} />
            ))}
          </div>
        </>
      )}

      <LoadMoreTrigger ref={sentinelRef} hasMore={hasMore} />
    </>
  );
}
