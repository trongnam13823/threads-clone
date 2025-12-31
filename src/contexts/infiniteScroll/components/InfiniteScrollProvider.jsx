import { useMemo, useRef } from 'react';
import InfiniteScrollContext from '../context/InfiniteScrollContext';

export const InfiniteScrollProvider = ({ children }) => {
  /** Ref lưu element scroll chính */
  const scrollRef = useRef(null);

  /** Ref lưu function reload (do con cung cấp) */
  const reloadRef = useRef(null);

  /** Giá trị context sẽ expose ra cho các component con / parent */
  const contextValue = useMemo(
    () => ({
      /** Đăng ký scroll element (thường là div chứa danh sách) */
      registerScrollEl: (el) => {
        scrollRef.current = el;
      },

      /** Lấy scroll element */
      getScrollEl: () => scrollRef.current,

      /** Scroll lên đầu */
      scrollToTop: (options = {}) => {
        scrollRef.current?.scrollTo({ top: 0, ...options });
      },

      /** Scroll xuống cuối */
      scrollToBottom: (options = {}) => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, ...options });
      },

      /** Kiểm tra scroll đang ở đầu */
      isAtTop: () => (scrollRef.current ? scrollRef.current.scrollTop === 0 : true),

      /** Đăng ký function reload (do component con cung cấp) */
      registerReload: (fn) => {
        reloadRef.current = fn;
      },

      /** Gọi reload từ parent hoặc bất kỳ đâu */
      reload: () => {
        reloadRef.current?.();
      },
    }),
    []
  );

  return (
    <InfiniteScrollContext.Provider value={contextValue}>{children}</InfiniteScrollContext.Provider>
  );
};

export default InfiniteScrollProvider;
