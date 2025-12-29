import { useState, useRef, useEffect, useCallback, useMemo } from 'react';

// ============================================================================
// CONSTANTS
// ============================================================================
const INITIAL_DRAG_STATE = {
  draggingIndex: -1,
  startX: 0,
  currentX: 0,
  startY: 0,
  currentY: 0,
  itemRects: [],
  transforms: {},
  containerRect: null,
  isDropping: false,
  droppingId: null,
  hasScroll: false,
};

const DEFAULT_CONFIG = {
  gap: 20,
  transitionDuration: 200,
  transitionTimingFunction: 'ease-out',
  direction: 'horizontal', // "horizontal" | "vertical"
  dragThreshold: 1, // Minimum pixels to move before starting drag (increased for better UX)
};

// ============================================================================
// ANIMATION FRAME THROTTLING
// ============================================================================
const scheduleUpdate = (callback, rafRef) => {
  if (rafRef.current) {
    cancelAnimationFrame(rafRef.current);
  }
  rafRef.current = requestAnimationFrame(callback);
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const getItemRects = (items, itemsRef) =>
  items.map((item) => {
    const el = itemsRef.current[item.id];
    return el ? el.getBoundingClientRect() : null;
  });

const resetDragState = (dragStateRef) => {
  dragStateRef.current = { ...INITIAL_DRAG_STATE };
};

// Check if container has scroll
const checkContainerScroll = (container, direction) => {
  if (!container) return false;

  if (direction === 'horizontal') {
    return container.scrollWidth > container.clientWidth;
  } else {
    return container.scrollHeight > container.clientHeight;
  }
};

// Horizontal calculation
const calculateItemTransformsHorizontal = (
  dragRect,
  dragStart,
  dragEnd,
  draggingIndex,
  items,
  itemRects,
  gap
) => {
  const transforms = {};
  const totalOffset = dragRect.width + gap;

  items.forEach((item, index) => {
    if (index === draggingIndex) return;

    const rect = itemRects[index];
    if (!rect) return;

    const rectMiddle = rect.left + rect.width / 2;

    if (index > draggingIndex) {
      transforms[item.id] = dragEnd > rectMiddle ? -totalOffset : 0;
    } else if (index < draggingIndex) {
      transforms[item.id] = dragStart < rectMiddle ? totalOffset : 0;
    }
  });

  return transforms;
};

// Vertical calculation
const calculateItemTransformsVertical = (
  dragRect,
  dragStart,
  dragEnd,
  draggingIndex,
  items,
  itemRects,
  gap
) => {
  const transforms = {};
  const totalOffset = dragRect.height + gap;

  items.forEach((item, index) => {
    if (index === draggingIndex) return;

    const rect = itemRects[index];
    if (!rect) return;

    const rectMiddle = rect.top + rect.height / 2;

    if (index > draggingIndex) {
      transforms[item.id] = dragEnd > rectMiddle ? -totalOffset : 0;
    } else if (index < draggingIndex) {
      transforms[item.id] = dragStart < rectMiddle ? totalOffset : 0;
    }
  });

  return transforms;
};

const calculateDropIndex = (transforms, draggingIndex, items) => {
  const movedItems = Object.entries(transforms).filter(([, value]) => value !== 0);
  if (movedItems.length === 0) return draggingIndex;

  const transformedIndices = items
    .map((item, idx) => (transforms[item.id] !== 0 && transforms[item.id] !== undefined ? idx : -1))
    .filter((idx) => idx !== -1);

  const maxIdx = Math.max(...transformedIndices);
  const minIdx = Math.min(...transformedIndices);

  if (transforms[items[maxIdx]?.id] < 0) return maxIdx;
  if (transforms[items[minIdx]?.id] > 0) return minIdx;

  return draggingIndex;
};

// Horizontal constraint (only when no scroll)
const calculateConstrainedDeltaX = (currentX, startX, dragRect, containerRect, hasScroll) => {
  let delta = currentX - startX;

  // Skip constraint if container has scroll
  if (hasScroll) return delta;

  const dragRectLeft = dragRect.left + delta;
  const dragRectRight = dragRect.right + delta;

  if (dragRectLeft < containerRect.left) delta = containerRect.left - dragRect.left;
  if (dragRectRight > containerRect.right) delta = containerRect.right - dragRect.right;

  return delta;
};

// Vertical constraint (only when no scroll)
const calculateConstrainedDeltaY = (currentY, startY, dragRect, containerRect, hasScroll) => {
  let delta = currentY - startY;

  // Skip constraint if container has scroll
  if (hasScroll) return delta;

  const dragRectTop = dragRect.top + delta;
  const dragRectBottom = dragRect.bottom + delta;

  if (dragRectTop < containerRect.top) delta = containerRect.top - dragRect.top;
  if (dragRectBottom > containerRect.bottom) delta = containerRect.bottom - dragRect.bottom;

  return delta;
};

// Horizontal final position
const calculateFinalDropPositionHorizontal = (fromIndex, toIndex, itemRects, gap) => {
  let position = 0;

  if (toIndex > fromIndex) {
    for (let i = fromIndex; i < toIndex; i++) {
      const rect = itemRects[i + 1];
      if (rect) position += rect.width + gap;
    }
  } else {
    for (let i = toIndex; i < fromIndex; i++) {
      const rect = itemRects[i];
      if (rect) position -= rect.width + gap;
    }
  }

  return position;
};

// Vertical final position
const calculateFinalDropPositionVertical = (fromIndex, toIndex, itemRects, gap) => {
  let position = 0;

  if (toIndex > fromIndex) {
    for (let i = fromIndex; i < toIndex; i++) {
      const rect = itemRects[i + 1];
      if (rect) position += rect.height + gap;
    }
  } else {
    for (let i = toIndex; i < fromIndex; i++) {
      const rect = itemRects[i];
      if (rect) position -= rect.height + gap;
    }
  }

  return position;
};

const reorderItems = (items, fromIndex, toIndex) => {
  const newItems = [...items];
  const [draggedItem] = newItems.splice(fromIndex, 1);
  newItems.splice(toIndex, 0, draggedItem);
  return newItems;
};

// ============================================================================
// MAIN HOOK
// ============================================================================
/**
 * Custom hook for drag-and-drop reordering with optimized performance
 *
 * Optimizations:
 * - RAF (RequestAnimationFrame) throttling for smooth 60fps animations
 * - useMemo for expensive calculations
 * - Proper cleanup of timeouts and animation frames
 * - willChange CSS hint for GPU acceleration
 * - Better animation state management to prevent glitches
 *
 * @param {Object} config - Configuration options
 * @param {Array} config.items - Array of items with unique 'id' property
 * @param {Function} config.onReorder - Callback when items are reordered
 * @param {number} config.gap - Gap between items in pixels
 * @param {number} config.transitionDuration - Animation duration in ms
 * @param {string} config.transitionTimingFunction - CSS timing function
 * @param {string} config.direction - 'horizontal' or 'vertical'
 * @param {number} config.dragThreshold - Min pixels to move before drag starts
 */
export function useDragSwap({
  items,
  onReorder,
  gap = DEFAULT_CONFIG.gap,
  transitionDuration = DEFAULT_CONFIG.transitionDuration,
  transitionTimingFunction = DEFAULT_CONFIG.transitionTimingFunction,
  direction = DEFAULT_CONFIG.direction,
  dragThreshold = DEFAULT_CONFIG.dragThreshold,
}) {
  const [draggingId, setDraggingId] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [noTransition, setNoTransition] = useState(false);
  const [updateTrigger, setUpdateTrigger] = useState(0);

  const dragStateRef = useRef({ ...INITIAL_DRAG_STATE });
  const itemsRef = useRef({});
  const containerRef = useRef(null);
  const pendingDragRef = useRef(null);
  const rafRef = useRef(null);
  const dropTimeoutRef = useRef(null);

  const isHorizontal = direction === 'horizontal';

  // Memoize transition style
  const transitionStyle = useMemo(
    () => `transform ${transitionDuration}ms ${transitionTimingFunction}`,
    [transitionDuration, transitionTimingFunction]
  );

  // Force update helper with RAF (for drop animation)
  const triggerUpdate = useCallback(() => {
    scheduleUpdate(() => setUpdateTrigger((prev) => prev + 1), rafRef);
  }, []);

  // ========================================================================
  // DRAG START
  // ========================================================================
  const handleStart = useCallback(
    (clientX, clientY, id, index) => {
      const itemRects = getItemRects(items, itemsRef);
      const containerRect = containerRef.current?.getBoundingClientRect();
      const hasScroll = checkContainerScroll(containerRef.current, direction);

      // Store pending drag info, but don't start dragging yet
      pendingDragRef.current = {
        id,
        index,
        clientX,
        clientY,
        itemRects,
        containerRect,
        hasScroll,
      };

      setIsPending(true); // Enable event listeners
    },
    [items, direction]
  );

  const handleMouseDown = useCallback(
    (e, id, index) => {
      e.preventDefault();
      e.stopPropagation();
      handleStart(e.clientX, e.clientY, id, index);
    },
    [handleStart]
  );

  const handleTouchStart = useCallback(
    (e, id, index) => {
      const touch = e.touches[0];
      handleStart(touch.clientX, touch.clientY, id, index);
    },
    [handleStart]
  );

  // ========================================================================
  // DRAG MOVE (RAF-throttled for 60fps performance)
  // ========================================================================
  const handleMove = useCallback(
    (clientX, clientY) => {
      // Check if we have a pending drag that hasn't started yet
      if (pendingDragRef.current && !draggingId) {
        const {
          clientX: startClientX,
          clientY: startClientY,
          id,
          index,
          itemRects,
          containerRect,
          hasScroll,
        } = pendingDragRef.current;

        // Calculate distance moved
        const deltaX = Math.abs(clientX - startClientX);
        const deltaY = Math.abs(clientY - startClientY);
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        // Only start dragging if moved beyond threshold
        if (distance >= dragThreshold) {
          dragStateRef.current = {
            ...INITIAL_DRAG_STATE,
            draggingIndex: index,
            startX: startClientX,
            currentX: startClientX,
            startY: startClientY,
            currentY: startClientY,
            itemRects,
            containerRect,
            hasScroll,
          };

          setDraggingId(id);
          setIsPending(false);
          pendingDragRef.current = null;
        }
        return;
      }

      if (!draggingId) return;

      // Use RAF to throttle updates and ensure smooth 60fps
      scheduleUpdate(() => {
        const { itemRects, draggingIndex, startX, startY, containerRect, hasScroll } =
          dragStateRef.current;
        const dragRect = itemRects[draggingIndex];

        // Safety check
        if (!dragRect || !containerRect) return;

        if (isHorizontal) {
          const deltaX = calculateConstrainedDeltaX(
            clientX,
            startX,
            dragRect,
            containerRect,
            hasScroll
          );
          const dragStart = dragRect.left + deltaX;
          const dragEnd = dragRect.right + deltaX;

          dragStateRef.current.currentX = startX + deltaX;
          dragStateRef.current.currentY = clientY;
          dragStateRef.current.transforms = calculateItemTransformsHorizontal(
            dragRect,
            dragStart,
            dragEnd,
            draggingIndex,
            items,
            itemRects,
            gap
          );
        } else {
          const deltaY = calculateConstrainedDeltaY(
            clientY,
            startY,
            dragRect,
            containerRect,
            hasScroll
          );
          const dragStart = dragRect.top + deltaY;
          const dragEnd = dragRect.bottom + deltaY;

          dragStateRef.current.currentX = clientX;
          dragStateRef.current.currentY = startY + deltaY;
          dragStateRef.current.transforms = calculateItemTransformsVertical(
            dragRect,
            dragStart,
            dragEnd,
            draggingIndex,
            items,
            itemRects,
            gap
          );
        }

        // Trigger re-render after all calculations
        setUpdateTrigger((prev) => prev + 1);
      }, rafRef);
    },
    [draggingId, items, gap, isHorizontal, dragThreshold]
  );

  const handleMouseMove = useCallback((e) => handleMove(e.clientX, e.clientY), [handleMove]);
  const handleTouchMove = useCallback(
    (e) => {
      const touch = e.touches[0];
      handleMove(touch.clientX, touch.clientY);
    },
    [handleMove]
  );

  // ========================================================================
  // DRAG END
  // ========================================================================
  const handleEnd = useCallback(() => {
    // Clear any pending RAF
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    // If there's a pending drag that never started, just clear it (this was a click)
    if (pendingDragRef.current && !draggingId) {
      pendingDragRef.current = null;
      setIsPending(false);
      return;
    }

    if (!draggingId) return;

    const { transforms, draggingIndex, itemRects, startX, startY } = dragStateRef.current;
    const newIndex = calculateDropIndex(transforms, draggingIndex, items);

    setDraggingId(null);
    setIsPending(false);
    pendingDragRef.current = null;

    if (newIndex !== draggingIndex) {
      dragStateRef.current.isDropping = true;
      dragStateRef.current.droppingId = items[draggingIndex].id;

      const finalPosition = isHorizontal
        ? calculateFinalDropPositionHorizontal(draggingIndex, newIndex, itemRects, gap)
        : calculateFinalDropPositionVertical(draggingIndex, newIndex, itemRects, gap);

      dragStateRef.current.transforms[items[draggingIndex].id] = finalPosition;

      if (isHorizontal) {
        dragStateRef.current.currentX = startX + finalPosition;
      } else {
        dragStateRef.current.currentY = startY + finalPosition;
      }

      triggerUpdate();

      // Clear existing timeout if any
      if (dropTimeoutRef.current) {
        clearTimeout(dropTimeoutRef.current);
      }

      // Schedule reorder after animation completes
      dropTimeoutRef.current = setTimeout(() => {
        setNoTransition(true);

        requestAnimationFrame(() => {
          resetDragState(dragStateRef);

          if (onReorder) {
            const newItems = reorderItems(items, draggingIndex, newIndex);
            onReorder(newItems);
          }

          requestAnimationFrame(() => {
            setNoTransition(false);
            dropTimeoutRef.current = null;
          });
        });
      }, transitionDuration);
    } else {
      resetDragState(dragStateRef);
    }
  }, [draggingId, items, onReorder, gap, transitionDuration, isHorizontal, triggerUpdate]);

  const handleMouseUp = useCallback(() => handleEnd(), [handleEnd]);
  const handleTouchEnd = useCallback(() => handleEnd(), [handleEnd]);

  // ========================================================================
  // EVENT LISTENERS
  // ========================================================================
  useEffect(() => {
    if (!isPending && !draggingId) return;

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isPending, draggingId, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  // ========================================================================
  // CLEANUP ON UNMOUNT
  // ========================================================================
  useEffect(() => {
    return () => {
      // Cancel any pending RAF
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      // Clear any pending timeout
      if (dropTimeoutRef.current) {
        clearTimeout(dropTimeoutRef.current);
      }
    };
  }, []);

  // ========================================================================
  // ITEM STYLE
  // ========================================================================
  const getItemStyle = useCallback(
    (itemId) => {
      const isDragging = draggingId === itemId;
      const isDropping =
        dragStateRef.current.isDropping && dragStateRef.current.droppingId === itemId;
      let transform = '';

      if (isDragging && !isDropping) {
        const deltaX = dragStateRef.current.currentX - dragStateRef.current.startX;
        const deltaY = dragStateRef.current.currentY - dragStateRef.current.startY;
        transform = `translate(${deltaX}px, ${deltaY}px)`;
      } else if (dragStateRef.current.transforms[itemId] !== undefined) {
        const offset = dragStateRef.current.transforms[itemId];
        transform = isHorizontal ? `translateX(${offset}px)` : `translateY(${offset}px)`;
      }

      return {
        userSelect: 'none',
        WebkitUserSelect: 'none',
        transform,
        transition: noTransition || (isDragging && !isDropping) ? 'none' : transitionStyle,
        zIndex: isDragging || isDropping ? 1000 : 1,
        position: isDragging ? 'relative' : undefined,
        willChange: isDragging || isDropping ? 'transform' : undefined,
      };
    },
    [draggingId, noTransition, transitionStyle, isHorizontal, updateTrigger]
  );

  const getItemProps = useCallback(
    (item) => {
      const style = getItemStyle(item.id);
      return {
        ref: (el) => (itemsRef.current[item.id] = el),
        style: {
          ...style,
          touchAction: 'none', // Prevent default touch behaviors
        },
        'data-drag-item': item.id,
      };
    },
    [getItemStyle]
  );

  const getHandleProps = useCallback(
    (itemId) => {
      const item = items.find((i) => i.id === itemId);
      if (!item) return {};

      const index = items.indexOf(item);
      const isDragging = draggingId === itemId;
      const isPendingDrag = isPending && pendingDragRef.current?.id === itemId;

      return {
        onMouseDown: (e) => handleMouseDown(e, itemId, index),
        onTouchStart: (e) => handleTouchStart(e, itemId, index),
        style: {
          cursor: isDragging || isPendingDrag ? 'grabbing' : 'grab',
          touchAction: 'none',
        },
        'data-drag-handle': itemId,
      };
    },
    [items, draggingId, isPending, handleMouseDown, handleTouchStart]
  );

  return {
    getItemProps,
    getHandleProps,
    containerRef,
    isDragging: draggingId !== null,
    draggingId,
  };
}
