/* eslint-disable react-hooks/preserve-manual-memoization */
import { useEffect, useState, useCallback, useRef } from 'react';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import useInfiniteScrollContext from '@/contexts/infiniteScroll/hooks/useInfiniteScroll';
import useDragSwap from '@/contexts/dragSwap/hooks/useDragSwap';

/**
 * Hook tổng quát cho infinite scroll list với pagination và reload
 *
 * @param {Object} config
 * @param {Function} config.queryHook - RTK Query hook (ví dụ: useGetPostsFeedQuery)
 * @param {Object} config.queryParams - Params cố định cho query (ví dụ: { type: 'FOR_YOU' })
 * @param {number} config.initialPage - Initial page number (optional, default: 1)
 * @param {Function} config.getItems - Callback để extract items từ data (optional, default: data?.data ?? [])
 * @param {Function} config.getPagination - Callback để extract pagination từ data (optional, default: data?.pagination ?? {})
 * @param {Function} config.getHasMore - Callback để tính hasMore từ page và pagination (optional, default: page < pagination.last_page)
 * @param {Function} config.getNextPage - Callback để tính next page từ currentPage và pagination (optional, default: currentPage + 1)
 * @param {Object} config.queryOptions - Options cho RTK Query hook (optional, ví dụ: { skip: true })
 * @param {Object} config.scrollOptions - Options cho infinite scroll
 * @param {string} config.scrollOptions.rootMargin - Root margin (default: '0%')
 * @param {number} config.scrollOptions.threshold - Threshold (default: 0)
 *
 * @returns {Object} {
 *   items: Array|Object - Danh sách items (có thể là array hoặc object tùy getItems)
 *   isLoading: boolean - Loading lần đầu
 *   isFetching: boolean - Đang fetch thêm data
 *   isReloading: boolean - Đang reload
 *   hasMore: boolean - Còn data để load
 *   sentinelRef: Ref - Ref cho sentinel element
 *   refetch: Function - Hàm refetch thủ công
 *   pagination: Object - Thông tin pagination
 *   page: number - Current page
 *   setPage: Function - Function to set page
 * }
 */
const useInfiniteList = ({
  queryHook,
  queryParams = {},
  initialPage,
  queryOptions = {},
  getItems,
  getPagination,
  getHasMore,
  getNextPage,
  scrollOptions = {},
}) => {
  const { rootMargin = '0%', threshold = 0 } = scrollOptions;

  const [page, setPage] = useState(initialPage);
  const [isReloading, setIsReloading] = useState(false);
  const previousPageRef = useRef(initialPage);

  // Scroll context
  const { getScrollEl, isAtTop, scrollToTop, registerReload } = useInfiniteScrollContext();

  // Drag swap context (optional - có thể không có trong một số trường hợp)
  const dragSwapContext = useDragSwap();
  const isDraggingRef =
    dragSwapContext && typeof dragSwapContext === 'object' ? dragSwapContext.isDraggingRef : null;

  // Query data
  const { data, isLoading, isFetching, refetch } = queryHook(
    {
      ...queryParams,
      page,
    },
    queryOptions
  );

  // Extract items, pagination, và hasMore với custom functions nếu có
  const items = getItems ? getItems(data) : (data?.data ?? []);
  const pagination = getPagination ? getPagination(data) : (data?.pagination ?? {});
  const hasMore = getHasMore
    ? getHasMore(page, pagination, data)
    : page < (pagination.last_page ?? 1);

  // Lấy current_page từ pagination để so sánh với previousPage
  const currentPageFromApi = pagination?.current_page ?? page;

  /**
   * Kiểm tra và scroll to top nếu page từ API nhỏ hơn page trước
   */
  useEffect(() => {
    if (data && currentPageFromApi < previousPageRef.current) {
      scrollToTop();
      setPage(1);
    }
    // Cập nhật previousPage sau khi so sánh
    if (data && currentPageFromApi) {
      previousPageRef.current = currentPageFromApi;
    }
  }, [data, currentPageFromApi, scrollToTop]);

  /**
   * Load more handler
   */
  const loadMore = useCallback(() => {
    if (!isFetching && hasMore) {
      setPage((prev) => {
        let nextPage;
        if (getNextPage) {
          nextPage = getNextPage(prev, pagination, data);
        } else {
          // Default: sử dụng current_page từ pagination nếu có, nếu không thì + 1
          nextPage = pagination?.current_page ? pagination.current_page + 1 : prev + 1;
        }

        // Không gọi API nếu nextPage bằng previousPageRef (page đã được fetch)
        if (nextPage === previousPageRef.current) {
          return prev;
        }

        return nextPage;
      });
    }
  }, [isFetching, hasMore, getNextPage, pagination, data]);

  /**
   * Infinite scroll sentinel
   */
  const { sentinelRef } = useInfiniteScroll(loadMore, {
    rootRef: getScrollEl(),
    enabled: !isFetching && hasMore,
    rootMargin,
    threshold,
  });

  /**
   * Reload handler
   */
  const handleReload = useCallback(async () => {
    // Không reload nếu đang drag
    if (isDraggingRef?.current) return;

    if (isAtTop()) {
      setIsReloading(true);
      if (page === 1) {
        await refetch();
      } else {
        setPage(1);
      }
    } else {
      scrollToTop();
    }
  }, [page, isAtTop, scrollToTop, refetch, isDraggingRef]);

  /**
   * Register reload callback
   */
  useEffect(() => {
    registerReload(handleReload);
  }, [handleReload, registerReload]);

  /**
   * Stop reloading indicator when fetch completes
   */
  useEffect(() => {
    if (!isFetching) {
      setIsReloading(false);
    }
  }, [isFetching]);

  return {
    items,
    isLoading: isLoading && page === 1,
    isFetching,
    isReloading,
    hasMore,
    sentinelRef,
    refetch,
    pagination,
    page,
    setPage,
  };
};

export default useInfiniteList;
