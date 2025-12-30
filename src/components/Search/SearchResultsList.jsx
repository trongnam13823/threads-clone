import { Spinner } from '@/components/ui/spinner';
import SearchUserItem from './SearchUserItem';
import SearchTopicItem from './SearchTopicItem';
import { useInfiniteQueryList } from '@/hooks/useInfiniteQueryList';
import { useSearchAllQuery } from '@/services/search/searchApi';
import { SEARCH_TYPES } from '@/constants/searchType';
import { useSelector } from 'react-redux';

export default function SearchResultsList() {
  const q = useSelector((state) => state.search.text);
  const isSearching = q.length > 1;

  const {
    items: searchData,
    isLoading,
    isReloading,
    loadMoreRef,
    hasMore,
  } = useInfiniteQueryList({
    listKey: SEARCH_TYPES.GLOBAL_SEARCH,
    useQuery: useSearchAllQuery,
    queryArgs: {
      q: q.trim(),
      per_page_topics: 10,
      per_page_users: 10,
    },
    skip: !isSearching,
    getItems: (data) => ({
      topics: data?.data?.topics ?? [],
      users: data?.data?.users ?? [],
    }),
    getHasMore: (data, page) => {
      const { topics: topicsPagination, users: usersPagination } = data?.pagination || {};
      return page < (topicsPagination?.last_page ?? 1) || page < (usersPagination?.last_page ?? 1);
    },
  });

  const { topics, users } = searchData || { topics: [], users: [] };

  if (!isSearching) {
    return null;
  }

  if (isLoading) {
    return (
      <div className='flex flex-1 items-center justify-center py-10'>
        <Spinner className='size-10' />
      </div>
    );
  }

  if (topics.length === 0 && users.length === 0) {
    return (
      <div className='flex flex-1 items-center justify-center py-10'>
        <p className='text-lg text-(--text-secondary)'>Không tìm thấy kết quả</p>
      </div>
    );
  }

  return (
    <d>
      {isReloading && (
        <div className='flex min-h-20 flex-1 items-center justify-center overflow-hidden border-b-0! transition-[min-height]'>
          <Spinner className='size-5' />
        </div>
      )}

      {topics.length > 0 && (
        <>
          <h2 className='px-6 pt-5 pb-1.5 font-bold text-(--text-secondary)'>Topics</h2>
          <div className='flex flex-col'>
            {topics.map((topic) => (
              <SearchTopicItem key={topic.id} topic={topic} />
            ))}
          </div>
        </>
      )}

      {users.length > 0 && (
        <>
          <h2 className='px-6 pt-5 pb-1.5 font-bold text-(--text-secondary)'>People</h2>
          <div className='flex flex-col'>
            {users.map((user) => (
              <SearchUserItem key={user.id} user={user} />
            ))}
          </div>
        </>
      )}

      {hasMore && (
        <div ref={loadMoreRef} className='flex min-h-20 flex-1 items-center justify-center'>
          <Spinner className='size-5' />
        </div>
      )}
    </d>
  );
}
