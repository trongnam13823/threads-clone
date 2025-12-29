import { useMemo, memo } from 'react';
import DragSwapContext from '../context/DragSwapContext';

export default memo(({ children, getHandleProps, isDragging, draggingId, data }) => {
  // Memoize context value để tránh re-render tất cả consumers khi parent re-render
  const contextValue = useMemo(
    () => ({ getHandleProps, isDragging, draggingId, data, isDraggable: true }),
    [getHandleProps, isDragging, draggingId, data]
  );

  return <DragSwapContext.Provider value={contextValue}>{children}</DragSwapContext.Provider>;
});
