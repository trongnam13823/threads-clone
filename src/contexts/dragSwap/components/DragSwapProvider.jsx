import { useMemo, memo } from 'react';
import DragSwapContext from '../context/DragSwapContext';

export default memo(({ children, getHandleProps, isDraggingRef, data }) => {
  // Memoize context value để tránh re-render tất cả consumers khi parent re-render
  const contextValue = useMemo(
    () => ({ getHandleProps, isDraggingRef, data, isDraggable: true }),
    [getHandleProps, isDraggingRef, data]
  );

  return <DragSwapContext.Provider value={contextValue}>{children}</DragSwapContext.Provider>;
});
