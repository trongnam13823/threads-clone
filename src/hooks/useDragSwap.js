import { useState, useRef, useEffect, useCallback, useReducer } from "react";

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
};

const DEFAULT_CONFIG = {
  gap: 20,
  transitionDuration: 200,
  transitionTimingFunction: "ease-out",
  direction: "horizontal", // "horizontal" | "vertical"
};

// ============================================================================
// REDUCER FORCE UPDATE
// ============================================================================
const forceUpdateReducer = (s) => s + 1;

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

// Horizontal calculation
const calculateItemTransformsHorizontal = (dragRect, dragStart, dragEnd, draggingIndex, items, itemRects, gap) => {
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
const calculateItemTransformsVertical = (dragRect, dragStart, dragEnd, draggingIndex, items, itemRects, gap) => {
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

// Horizontal constraint
const calculateConstrainedDeltaX = (currentX, startX, dragRect, containerRect) => {
  let delta = currentX - startX;
  const dragRectLeft = dragRect.left + delta;
  const dragRectRight = dragRect.right + delta;

  if (dragRectLeft < containerRect.left) delta = containerRect.left - dragRect.left;
  if (dragRectRight > containerRect.right) delta = containerRect.right - dragRect.right;

  return delta;
};

// Vertical constraint
const calculateConstrainedDeltaY = (currentY, startY, dragRect, containerRect) => {
  let delta = currentY - startY;
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

export function useDragSwap({
  items,
  onReorder,
  gap = DEFAULT_CONFIG.gap,
  transitionDuration = DEFAULT_CONFIG.transitionDuration,
  transitionTimingFunction = DEFAULT_CONFIG.transitionTimingFunction,
  direction = DEFAULT_CONFIG.direction,
}) {
  const [draggingId, setDraggingId] = useState(null);
  const [noTransition, setNoTransition] = useState(false);
  const [, forceUpdate] = useReducer(forceUpdateReducer, 0);

  const dragStateRef = useRef({ ...INITIAL_DRAG_STATE });
  const itemsRef = useRef({});
  const containerRef = useRef(null);

  const isHorizontal = direction === "horizontal";
  const transitionStyle = `transform ${transitionDuration}ms ${transitionTimingFunction}`;

  // ========================================================================
  // DRAG START
  // ========================================================================
  const handleStart = useCallback(
    (clientX, clientY, id, index) => {
      const itemRects = getItemRects(items, itemsRef);
      const containerRect = containerRef.current?.getBoundingClientRect();

      dragStateRef.current = {
        ...INITIAL_DRAG_STATE,
        draggingIndex: index,
        startX: clientX,
        currentX: clientX,
        startY: clientY,
        currentY: clientY,
        itemRects,
        containerRect,
      };

      setDraggingId(id);
    },
    [items]
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
  // DRAG MOVE
  // ========================================================================
  const handleMove = useCallback(
    (clientX, clientY) => {
      if (!draggingId) return;

      const { itemRects, draggingIndex, startX, startY, containerRect } = dragStateRef.current;
      const dragRect = itemRects[draggingIndex];
      if (!dragRect || !containerRect) return;

      if (isHorizontal) {
        const deltaX = calculateConstrainedDeltaX(clientX, startX, dragRect, containerRect);
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
        const deltaY = calculateConstrainedDeltaY(clientY, startY, dragRect, containerRect);
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

      forceUpdate();
    },
    [draggingId, items, gap, isHorizontal]
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
    if (!draggingId) return;

    const { transforms, draggingIndex, itemRects, startX, startY } = dragStateRef.current;
    const newIndex = calculateDropIndex(transforms, draggingIndex, items);

    setDraggingId(null);

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

      forceUpdate();

      setTimeout(() => {
        setNoTransition(true);

        requestAnimationFrame(() => {
          resetDragState(dragStateRef);

          if (onReorder) {
            const newItems = reorderItems(items, draggingIndex, newIndex);
            onReorder(newItems);
          }

          requestAnimationFrame(() => {
            setNoTransition(false);
          });
        });
      }, transitionDuration);
    } else {
      resetDragState(dragStateRef);
    }
  }, [draggingId, items, onReorder, gap, transitionDuration, isHorizontal]);

  const handleMouseUp = useCallback(() => handleEnd(), [handleEnd]);
  const handleTouchEnd = useCallback(() => handleEnd(), [handleEnd]);

  // ========================================================================
  // EVENT LISTENERS
  // ========================================================================
  useEffect(() => {
    if (!draggingId) return;

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [draggingId, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  // ========================================================================
  // ITEM STYLE
  // ========================================================================
  const getItemStyle = useCallback(
    (itemId) => {
      const isDragging = draggingId === itemId;
      const isDropping = dragStateRef.current.isDropping && dragStateRef.current.droppingId === itemId;
      let transform = "";

      if (isDragging && !isDropping) {
        if (isHorizontal) {
          const deltaX = dragStateRef.current.currentX - dragStateRef.current.startX;
          const deltaY = dragStateRef.current.currentY - dragStateRef.current.startY;
          transform = `translate(${deltaX}px, ${deltaY}px)`;
        } else {
          const deltaX = dragStateRef.current.currentX - dragStateRef.current.startX;
          const deltaY = dragStateRef.current.currentY - dragStateRef.current.startY;
          transform = `translate(${deltaX}px, ${deltaY}px)`;
        }
      } else if (dragStateRef.current.transforms[itemId] !== undefined) {
        const offset = dragStateRef.current.transforms[itemId];
        transform = isHorizontal ? `translateX(${offset}px)` : `translateY(${offset}px)`;
      }

      return {
        userSelect: "none",
        transform,
        transition: noTransition || isDragging ? "none" : transitionStyle,
        zIndex: isDragging || isDropping ? 1000 : 1,
        position: isDragging ? "relative" : undefined,
      };
    },
    [draggingId, noTransition, transitionStyle, isHorizontal]
  );

  const getItemProps = useCallback(
    (item) => ({
      ref: (el) => (itemsRef.current[item.id] = el),
      style: getItemStyle(item.id),
    }),
    [getItemStyle]
  );

  const getHandleProps = useCallback(
    (itemId) => {
      const item = items.find((i) => i.id === itemId);
      const index = items.indexOf(item);
      const isDragging = draggingId === itemId;

      return {
        onMouseDown: (e) => handleMouseDown(e, itemId, index),
        onTouchStart: (e) => handleTouchStart(e, itemId, index),
        style: {
          cursor: isDragging ? "grabbing" : "grab",
        },
      };
    },
    [items, draggingId, handleMouseDown, handleTouchStart]
  );

  return {
    getItemProps,
    getHandleProps,
    containerRef,
    isDragging: draggingId !== null,
    draggingId,
  };
}
