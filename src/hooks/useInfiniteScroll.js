import { useRef, useEffect } from 'react';

const getScrollableParent = (element) => {
  if (!element) return null;

  let parent = element.parentElement;

  while (parent) {
    const style = window.getComputedStyle(parent);
    const overflowY = style.overflowY;

    if (overflowY === 'auto' || overflowY === 'scroll') {
      return parent;
    }

    parent = parent.parentElement;
  }

  return window;
};

const useInfiniteScroll = (callback, options = {}) => {
  const { threshold = 1.0, rootMargin = '50%', enabled = true } = options;

  const observerRef = useRef(null);
  const targetRef = useRef(null);
  const scrollParentRef = useRef(null);

  useEffect(() => {
    const target = targetRef.current;
    if (!target || !enabled) return;

    const root = getScrollableParent(target);

    scrollParentRef.current = root;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          callback();
        }
      },
      {
        root,
        threshold,
        rootMargin,
      }
    );

    observerRef.current.observe(target);

    return () => {
      observerRef.current?.disconnect();
      scrollParentRef.current = null;
    };
  }, [callback, threshold, rootMargin, enabled]);

  return {
    ref: targetRef,
    tryScrollToTop: () => {
      const el = scrollParentRef.current;
      if (!el || el.scrollTop <= 0) return false;
      el.scrollTop = 0;
      return true;
    },
  };
};

export default useInfiniteScroll;
