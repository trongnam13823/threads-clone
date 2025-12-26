import { useState, useRef, useEffect, useCallback } from "react";

// ============================================================================
// CONSTANTS
// ============================================================================

const INITIAL_DRAG_STATE = {
  draggingIndex: -1,
  startPos: 0,
  currentPos: 0,
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
  transitionDuration: 80,
  transitionTimingFunction: "ease-out",
};

// ============================================================================
// UTILITY FUNCTIONS - Position & Transform Calculations
// ============================================================================

const calculateItemTransforms = (dragRect, dragStart, dragEnd, draggingIndex, items, itemRects, gap) => {
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

const calculateConstrainedDeltaX = (currentX, startX, dragRect, containerRect) => {
  let delta = currentX - startX;
  const dragRectLeft = dragRect.left + delta;
  const dragRectRight = dragRect.right + delta;

  if (dragRectLeft < containerRect.left) {
    delta = containerRect.left - dragRect.left;
  }

  if (dragRectRight > containerRect.right) {
    delta = containerRect.right - dragRect.right;
  }

  return delta;
};

const calculateFinalDropPosition = (fromIndex, toIndex, itemRects, gap) => {
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

const reorderItems = (items, fromIndex, toIndex) => {
  const newItems = [...items];
  const [draggedItem] = newItems.splice(fromIndex, 1);
  newItems.splice(toIndex, 0, draggedItem);
  return newItems;
};

// ============================================================================
// UTILITY FUNCTIONS - Rect & State Management
// ============================================================================

const getItemRects = (items, itemsRef) => {
  return items.map((item) => {
    const el = itemsRef.current[item.id];
    return el ? el.getBoundingClientRect() : null;
  });
};

const resetDragState = (dragStateRef) => {
  dragStateRef.current = { ...INITIAL_DRAG_STATE };
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
}) {
  const [draggingId, setDraggingId] = useState(null);
  const [noTransition, setNoTransition] = useState(false);
  const [, forceUpdate] = useState({});

  const dragStateRef = useRef({ ...INITIAL_DRAG_STATE });
  const itemsRef = useRef({});
  const containerRef = useRef(null);

  const transitionStyle = `transform ${transitionDuration}ms ${transitionTimingFunction}`;

  const handleMouseDown = useCallback(
    (e, id, index) => {
      e.preventDefault();
      e.stopPropagation();

      const itemRects = getItemRects(items, itemsRef);
      const containerRect = containerRef.current?.getBoundingClientRect();

      dragStateRef.current = {
        ...INITIAL_DRAG_STATE,
        draggingIndex: index,
        startPos: e.clientX,
        currentPos: e.clientX,
        startY: e.clientY,
        currentY: e.clientY,
        itemRects,
        containerRect,
      };

      setDraggingId(id);
    },
    [items]
  );

  const handleMouseMove = useCallback(
    (e) => {
      if (!draggingId) return;

      const { itemRects, draggingIndex, startPos, containerRect } = dragStateRef.current;
      const dragRect = itemRects[draggingIndex];

      if (!dragRect || !containerRect) return;

      const deltaX = calculateConstrainedDeltaX(e.clientX, startPos, dragRect, containerRect);
      const dragStart = dragRect.left + deltaX;
      const dragEnd = dragRect.right + deltaX;

      dragStateRef.current.currentPos = startPos + deltaX;
      dragStateRef.current.currentY = e.clientY;
      dragStateRef.current.transforms = calculateItemTransforms(
        dragRect,
        dragStart,
        dragEnd,
        draggingIndex,
        items,
        itemRects,
        gap
      );

      forceUpdate({});
    },
    [draggingId, items, gap]
  );

  const handleMouseUp = useCallback(() => {
    if (!draggingId) return;

    const { transforms, draggingIndex, itemRects } = dragStateRef.current;
    const newIndex = calculateDropIndex(transforms, draggingIndex, items);

    setDraggingId(null);

    if (newIndex !== draggingIndex) {
      dragStateRef.current.isDropping = true;
      dragStateRef.current.droppingId = items[draggingIndex].id;

      const finalPosition = calculateFinalDropPosition(draggingIndex, newIndex, itemRects, gap);

      dragStateRef.current.transforms[items[draggingIndex].id] = finalPosition;
      dragStateRef.current.currentPos = dragStateRef.current.startPos + finalPosition;
      forceUpdate({});

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
  }, [draggingId, items, onReorder, gap, transitionDuration]);

  useEffect(() => {
    if (draggingId) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [draggingId, handleMouseMove, handleMouseUp]);

  const getItemStyle = useCallback(
    (itemId) => {
      const isDragging = draggingId === itemId;
      const isDropping = dragStateRef.current.isDropping && dragStateRef.current.droppingId === itemId;
      let transform = "";

      if (isDragging && !isDropping) {
        const deltaX = dragStateRef.current.currentPos - dragStateRef.current.startPos;
        const deltaY = dragStateRef.current.currentY - dragStateRef.current.startY;
        transform = `translate(${deltaX}px, ${deltaY}px)`;
      } else if (dragStateRef.current.transforms[itemId] !== undefined) {
        transform = `translateX(${dragStateRef.current.transforms[itemId]}px)`;
      }

      return {
        userSelect: "none",
        transform,
        transition: noTransition ? "none" : transitionStyle,
        zIndex: isDragging || isDropping ? 1000 : 1,
      };
    },
    [draggingId, noTransition, transitionStyle]
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
        style: {
          cursor: isDragging ? "grabbing" : "grab",
        },
      };
    },
    [items, draggingId, handleMouseDown]
  );

  return {
    getItemProps,
    getHandleProps,
    containerRef,
    isDragging: draggingId !== null,
    draggingId,
  };
}
