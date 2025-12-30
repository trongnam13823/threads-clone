import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '@/features/InfiniteList/infiniteListSlice';
import useInfiniteScroll from './useInfiniteScroll';

export function useInfiniteQueryList({
  listKey,
  useQuery,
  queryArgs = {},
  skip = false,
  getItems = (data) => data?.data ?? [],
  getHasMore = (data, page) => page < (data?.pagination?.last_page ?? 1),
}) {
  const dispatch = useDispatch();
  const [isReloading, setIsReloading] = useState(false);
  const [init, setInit] = useState(true);

  const { page, reload } = useSelector((state) => state.infiniteList.lists[listKey]);

  const queryResult = useQuery(
    {
      ...queryArgs,
      page,
    },
    { skip }
  );

  const { data, isLoading, isFetching, refetch } = queryResult;

  const items = useMemo(() => getItems(data), [data]);
  const hasMore = getHasMore(data, page);

  const { ref: loadMoreRef, tryScrollToTop } = useInfiniteScroll(
    () => {
      dispatch(setPage({ key: listKey, page: page + 1 }));
    },
    { enabled: !isFetching && hasMore }
  );

  // 🔄 reload / refresh
  useEffect(() => {
    if (init) {
      setInit(false);
      return;
    }

    if (!tryScrollToTop() && !isFetching) {
      page === 1 ? refetch() : dispatch(setPage({ key: listKey, page: 1 }));

      setIsReloading(true);
    }
  }, [reload.signal]);

  useEffect(() => {
    if (!isFetching) {
      setIsReloading(false);
    }
  }, [isFetching]);

  return {
    items,
    page,
    hasMore,
    isLoading,
    isFetching,
    isReloading,
    loadMoreRef,
    refetch,
  };
}
