import { useRef, useCallback, useEffect, useState } from 'react';

/**
 * Custom hook for drag-to-scroll functionality
 * Perfect for scrollable containers like image galleries, horizontal lists, etc.
 *
 * @param {Object} config - Configuration options
 * @param {string} config.direction - Scroll direction: 'horizontal', 'vertical', or 'both' (default: 'horizontal')
 * @param {number} config.dragThreshold - Minimum pixels to move before starting drag (default: 5)
 * @param {boolean} config.smooth - Whether to use smooth scrolling (default: false)
 * @param {number} config.sensitivity - Scroll sensitivity multiplier (default: 1)
 * @param {Function} config.onDragStart - Callback when drag starts
 * @param {Function} config.onDragEnd - Callback when drag ends
 * @param {Function} config.onScroll - Callback during scrolling
 *
 * @returns {Object} Object containing containerRef and isDragging state
 */
export function useDragScroll({
  direction = 'horizontal',
  dragThreshold = 1,
  smooth = false,
  sensitivity = 1,
  onDragStart,
  onDragEnd,
  onScroll,
} = {}) {
  const containerRef = useRef(null);
  const isDraggingRef = useRef(false);
  const startPosRef = useRef({ x: 0, y: 0 });
  const scrollPosRef = useRef({ left: 0, top: 0 });
  const hasDraggedRef = useRef(false);

  const canScrollHorizontal = direction === 'horizontal' || direction === 'both';
  const canScrollVertical = direction === 'vertical' || direction === 'both';

  // Start drag
  const handleStart = useCallback(
    (clientX, clientY) => {
      const container = containerRef.current;
      if (!container) return;

      isDraggingRef.current = true;
      hasDraggedRef.current = false;

      startPosRef.current = { x: clientX, y: clientY };
      scrollPosRef.current = {
        left: container.scrollLeft,
        top: container.scrollTop,
      };

      // Add grabbing cursor
      container.style.cursor = 'grabbing';
      container.style.userSelect = 'none';

      onDragStart?.();
    },
    [onDragStart]
  );

  // Move drag
  const handleMove = useCallback(
    (clientX, clientY) => {
      if (!isDraggingRef.current) return;

      const container = containerRef.current;
      if (!container) return;

      const deltaX = (startPosRef.current.x - clientX) * sensitivity;
      const deltaY = (startPosRef.current.y - clientY) * sensitivity;

      // Check if movement exceeds threshold
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      if (distance >= dragThreshold) {
        hasDraggedRef.current = true;
      }

      // Scroll the container
      if (canScrollHorizontal) {
        const newScrollLeft = scrollPosRef.current.left + deltaX;
        container.scrollLeft = newScrollLeft;
      }

      if (canScrollVertical) {
        const newScrollTop = scrollPosRef.current.top + deltaY;
        container.scrollTop = newScrollTop;
      }

      onScroll?.({ scrollLeft: container.scrollLeft, scrollTop: container.scrollTop });
    },
    [canScrollHorizontal, canScrollVertical, dragThreshold, sensitivity, onScroll]
  );

  // End drag
  const handleEnd = useCallback(() => {
    if (!isDraggingRef.current) return;

    const container = containerRef.current;
    if (container) {
      container.style.cursor = 'grab';
      container.style.userSelect = '';
    }

    const hadDragged = hasDraggedRef.current;

    isDraggingRef.current = false;
    hasDraggedRef.current = false;

    onDragEnd?.({ hadDragged });
  }, [onDragEnd]);

  // Mouse events
  const handleMouseDown = useCallback(
    (e) => {
      // Only start drag with left mouse button
      if (e.button !== 0) return;

      e.preventDefault();
      handleStart(e.clientX, e.clientY);
    },
    [handleStart]
  );

  const handleMouseMove = useCallback(
    (e) => {
      handleMove(e.clientX, e.clientY);
    },
    [handleMove]
  );

  const handleMouseUp = useCallback(() => {
    handleEnd();
  }, [handleEnd]);

  // Touch events
  const handleTouchStart = useCallback(
    (e) => {
      const touch = e.touches[0];
      if (!touch) return;

      handleStart(touch.clientX, touch.clientY);
    },
    [handleStart]
  );

  const handleTouchMove = useCallback(
    (e) => {
      const touch = e.touches[0];
      if (!touch) return;

      handleMove(touch.clientX, touch.clientY);
    },
    [handleMove]
  );

  const handleTouchEnd = useCallback(() => {
    handleEnd();
  }, [handleEnd]);

  // Prevent click events when dragging
  const handleClick = useCallback((e) => {
    if (hasDraggedRef.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, []);

  // Attach global event listeners
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Set initial cursor
    container.style.cursor = 'grab';

    // Mouse events
    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Touch events
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('touchend', handleTouchEnd);

    // Click prevention
    container.addEventListener('click', handleClick, { capture: true });

    // Apply smooth scroll if needed
    if (smooth) {
      container.style.scrollBehavior = 'smooth';
    }

    return () => {
      container.style.cursor = '';
      container.style.userSelect = '';
      container.style.scrollBehavior = '';

      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);

      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);

      container.removeEventListener('click', handleClick, { capture: true });
    };
  }, [
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleClick,
    smooth,
  ]);

  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    function syncDraggingState() {
      setIsDragging(isDraggingRef.current);
    }

    // Mouse and touch events update isDraggingRef, so we listen globally to sync state
    window.addEventListener('mousemove', syncDraggingState);
    window.addEventListener('mouseup', syncDraggingState);
    window.addEventListener('touchmove', syncDraggingState);
    window.addEventListener('touchend', syncDraggingState);

    return () => {
      window.removeEventListener('mousemove', syncDraggingState);
      window.removeEventListener('mouseup', syncDraggingState);
      window.removeEventListener('touchmove', syncDraggingState);
      window.removeEventListener('touchend', syncDraggingState);
    };
  }, []);

  return {
    containerRef,
    isDragging,
  };
}
