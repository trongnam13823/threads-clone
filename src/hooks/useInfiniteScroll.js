import { useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for infinite scroll implementation using Intersection Observer
 *
 * @param {Function} onIntersect - Callback function when sentinel element intersects
 * @param {Object} options - Configuration options
 * @param {RefObject} options.rootRef - Reference to the scrollable container (null for viewport)
 * @param {string} options.rootMargin - Margin around root (default: '100%')
 * @param {number} options.threshold - Intersection threshold 0-1 (default: 0)
 * @param {boolean} options.enabled - Enable/disable observer (default: true)
 * @returns {Object} { sentinelRef } - Ref to attach to sentinel element
 */
const useInfiniteScroll = (
  onIntersect,
  { rootRef = null, rootMargin = '100%', threshold = 0, enabled = true } = {}
) => {
  const sentinelRef = useRef(null);
  const observerRef = useRef(null);

  const handleIntersect = useCallback(
    (entries) => {
      const [entry] = entries;

      if (entry.isIntersecting && enabled) {
        onIntersect();
      }
    },
    [onIntersect, enabled]
  );

  useEffect(() => {
    // Cleanup previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Don't create observer if disabled or no sentinel
    if (!enabled || !sentinelRef.current) {
      return;
    }

    // Create new Intersection Observer
    const options = {
      root: rootRef?.current || null,
      rootMargin,
      threshold,
    };

    observerRef.current = new IntersectionObserver(handleIntersect, options);
    observerRef.current.observe(sentinelRef.current);

    // Cleanup function
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [rootRef, rootMargin, threshold, enabled, handleIntersect]);

  return { sentinelRef };
};

export default useInfiniteScroll;
