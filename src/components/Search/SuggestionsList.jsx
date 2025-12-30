import { Spinner } from '@/components/ui/spinner';
import SearchUserItem from './SearchUserItem';
import { useInfiniteQueryList } from '@/hooks/useInfiniteQueryList';
import { useGetUserSuggestionQuery } from '@/services/search/searchApi';
import { SEARCH_TYPES } from '@/constants/searchType';
import { cn } from '@/lib/utils';

export default function SuggestionsList() {
  const { items, isLoading, isReloading, loadMoreRef, hasMore } = useInfiniteQueryList({
    listKey: SEARCH_TYPES.USER_SUGGESTIONS,
    useQuery: useGetUserSuggestionQuery,
    queryArgs: {},
  });

  if (isLoading) {
    return (
      <div className='flex flex-1 items-center justify-center py-10'>
        <Spinner className='size-10' />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className='flex flex-1 items-center justify-center py-10'>
        <p className='text-lg text-(--text-secondary)'>Chưa có gợi ý nào</p>
      </div>
    );
  }

  return (
    <>
      <div
        className={cn(
          'flex min-h-20 flex-1 items-center justify-center overflow-hidden border-b-0! transition-[min-height]',
          isReloading ? 'max-h-20 min-h-20' : 'max-h-0 min-h-0'
        )}
      >
        <Spinner className='size-5' />
      </div>

      <h2 className='px-6 pt-5 pb-1.5 font-bold text-(--text-secondary)'>Gợi ý theo dõi</h2>
      <div className='flex flex-col'>
        {items.map((user) => (
          <SearchUserItem key={user.id} user={user} />
        ))}

        {hasMore && (
          <div ref={loadMoreRef} className='flex min-h-20 flex-1 items-center justify-center'>
            <Spinner className='size-5' />
          </div>
        )}
      </div>
    </>
  );
}
