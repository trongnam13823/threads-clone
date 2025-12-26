/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect, useCallback } from "react";

// ============================================================================
// TYPES & CONSTANTS
// ============================================================================

/**
 * Hướng drag & drop
 */
export const DIRECTION = {
  HORIZONTAL: "horizontal",
  VERTICAL: "vertical",
};

/**
 * Cấu trúc drag state
 */
const INITIAL_DRAG_STATE = {
  draggingIndex: -1,
  startPos: 0,
  currentPos: 0,
  itemRects: [],
  transforms: {},
  containerRect: null,
};

/**
 * Style mặc định cho item
 */
const DEFAULT_ITEM_STYLE = {
  userSelect: "none",
};

/**
 * Style mặc định cho handle
 */
const DEFAULT_HANDLE_STYLE = {
  cursor: "grab",
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Tính toán transforms cho các items khi drag
 */
const calculateTransforms = (dragRect, dragStart, dragEnd, draggingIndex, items, itemRects, gap, direction) => {
  const transforms = {};
  const isHorizontal = direction === DIRECTION.HORIZONTAL;
  const itemSize = isHorizontal ? dragRect.width : dragRect.height;
  const totalOffset = itemSize + gap;

  items.forEach((item, index) => {
    if (index === draggingIndex) return;

    const rect = itemRects[index];
    if (!rect) return;

    const rectStart = isHorizontal ? rect.left : rect.top;
    const rectSize = isHorizontal ? rect.width : rect.height;
    const rectMiddle = rectStart + rectSize / 2;

    if (index > draggingIndex) {
      transforms[item.id] = dragEnd > rectMiddle ? -totalOffset : 0;
    } else if (index < draggingIndex) {
      transforms[item.id] = dragStart < rectMiddle ? totalOffset : 0;
    }
  });

  return transforms;
};

/**
 * Tính toán index mới sau khi drop
 */
const calculateNewIndex = (transforms, draggingIndex, items) => {
  const movedItems = Object.entries(transforms).filter(([_, value]) => value !== 0);

  if (movedItems.length === 0) return draggingIndex;

  const transformedIndices = items
    .map((item, idx) => (transforms[item.id] !== 0 && transforms[item.id] !== undefined ? idx : -1))
    .filter((idx) => idx !== -1);

  const maxIdx = Math.max(...transformedIndices);
  const minIdx = Math.min(...transformedIndices);

  if (transforms[items[maxIdx]?.id] < 0) {
    return maxIdx;
  } else if (transforms[items[minIdx]?.id] > 0) {
    return minIdx;
  }

  return draggingIndex;
};

/**
 * Tính toán delta có giới hạn trong container
 */
const calculateConstrainedDelta = (currentPos, startPos, dragRect, containerRect, direction) => {
  const isHorizontal = direction === DIRECTION.HORIZONTAL;
  let delta = currentPos - startPos;

  if (isHorizontal) {
    const dragRectLeft = dragRect.left + delta;
    const dragRectRight = dragRect.right + delta;

    if (dragRectLeft < containerRect.left) {
      delta = containerRect.left - dragRect.left;
    }

    if (dragRectRight > containerRect.right) {
      delta = containerRect.right - dragRect.right;
    }
  } else {
    const dragRectTop = dragRect.top + delta;
    const dragRectBottom = dragRect.bottom + delta;

    if (dragRectTop < containerRect.top) {
      delta = containerRect.top - dragRect.top;
    }

    if (dragRectBottom > containerRect.bottom) {
      delta = containerRect.bottom - dragRect.bottom;
    }
  }

  return delta;
};

/**
 * Tạo mảng items mới sau khi reorder
 */
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
 * Hook để xử lý drag and drop cho danh sách với drag handle
 *
 * @param {Object} config - Cấu hình
 * @param {Array} config.items - Mảng items cần drag & drop (mỗi item phải có thuộc tính `id`)
 * @param {Function} config.onReorder - Callback được gọi khi thứ tự items thay đổi
 * @param {number} [config.gap=20] - Khoảng cách giữa các items (px)
 * @param {string} [config.direction='horizontal'] - Hướng drag: 'horizontal' hoặc 'vertical'
 *
 * @returns {Object} Object chứa:
 *   - getItemProps: Function để bind props vào item container
 *   - getHandleProps: Function để bind props vào drag handle
 *   - containerRef: Ref cần gắn vào container
 *   - isDragging: Boolean cho biết có đang kéo hay không
 *   - draggingId: ID của item đang được kéo
 *
 * @example
 * const { getItemProps, getHandleProps, containerRef } = useDragSwap({
 *   items,
 *   onReorder: (newItems) => setItems(newItems),
 * });
 *
 * // Trong component:
 * <div ref={containerRef}>
 *   {items.map((item, index) => (
 *     <div key={item.id} {...getItemProps(item, index)}>
 *       <div {...getHandleProps(item.id)}>
 *         Kéo ở đây (Header)
 *       </div>
 *       <div>Nội dung không kéo được (Body)</div>
 *     </div>
 *   ))}
 * </div>
 */
export function useDragSwap({ items, onReorder, gap = 20, direction = DIRECTION.HORIZONTAL }) {
  // ============================================================================
  // STATE & REFS
  // ============================================================================

  const [draggingId, setDraggingId] = useState(null);
  const [, forceUpdate] = useState({});

  const dragStateRef = useRef(INITIAL_DRAG_STATE);
  const itemsRef = useRef({});
  const containerRef = useRef(null);

  const isHorizontal = direction === DIRECTION.HORIZONTAL;

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================

  /**
   * Xử lý khi bắt đầu kéo từ handle
   */
  const handleMouseDown = useCallback(
    (e, id, index) => {
      e.preventDefault();
      e.stopPropagation(); // Ngăn event bubble lên item

      const rects = items.map((item) => {
        const el = itemsRef.current[item.id];
        return el ? el.getBoundingClientRect() : null;
      });

      const containerRect = containerRef.current ? containerRef.current.getBoundingClientRect() : null;
      const startPos = isHorizontal ? e.clientX : e.clientY;

      dragStateRef.current = {
        draggingIndex: index,
        startPos,
        currentPos: startPos,
        itemRects: rects,
        transforms: {},
        containerRect,
      };

      setDraggingId(id);
    },
    [items, isHorizontal]
  );

  /**
   * Xử lý khi di chuyển chuột
   */
  const handleMouseMove = useCallback(
    (e) => {
      if (!draggingId) return;

      const { itemRects, draggingIndex, startPos, containerRect } = dragStateRef.current;
      const dragRect = itemRects[draggingIndex];

      if (!dragRect || !containerRect) return;

      const currentPos = isHorizontal ? e.clientX : e.clientY;
      const delta = calculateConstrainedDelta(currentPos, startPos, dragRect, containerRect, direction);

      const dragStart = (isHorizontal ? dragRect.left : dragRect.top) + delta;
      const dragEnd = (isHorizontal ? dragRect.right : dragRect.bottom) + delta;

      dragStateRef.current.currentPos = startPos + delta;
      dragStateRef.current.transforms = calculateTransforms(
        dragRect,
        dragStart,
        dragEnd,
        draggingIndex,
        items,
        itemRects,
        gap,
        direction
      );

      forceUpdate({});
    },
    [draggingId, items, gap, direction, isHorizontal]
  );

  /**
   * Xử lý khi thả chuột
   */
  const handleMouseUp = useCallback(() => {
    if (!draggingId) return;

    const { transforms, draggingIndex } = dragStateRef.current;
    const newIndex = calculateNewIndex(transforms, draggingIndex, items);

    dragStateRef.current = INITIAL_DRAG_STATE;
    setDraggingId(null);

    if (newIndex !== draggingIndex && onReorder) {
      const newItems = reorderItems(items, draggingIndex, newIndex);
      onReorder(newItems);
    }
  }, [draggingId, items, onReorder]);

  // ============================================================================
  // EFFECTS
  // ============================================================================

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

  // ============================================================================
  // HELPER FUNCTIONS
  // ============================================================================

  /**
   * Lấy style cho item
   */
  const getItemStyle = useCallback(
    (itemId) => {
      const isDragging = draggingId === itemId;

      let transform = "";
      if (isDragging) {
        const delta = dragStateRef.current.currentPos - dragStateRef.current.startPos;
        transform = isHorizontal ? `translateX(${delta}px)` : `translateY(${delta}px)`;
      } else if (dragStateRef.current.transforms[itemId] !== undefined) {
        const transformValue = dragStateRef.current.transforms[itemId];
        transform = isHorizontal ? `translateX(${transformValue}px)` : `translateY(${transformValue}px)`;
      }

      return {
        ...DEFAULT_ITEM_STYLE,
        transform,
        zIndex: isDragging ? 1000 : 1,
      };
    },
    [draggingId, isHorizontal]
  );

  /**
   * Lấy props để bind vào item container
   */
  const getItemProps = useCallback(
    (item, index) => ({
      ref: (el) => (itemsRef.current[item.id] = el),
      style: getItemStyle(item.id),
    }),
    [getItemStyle]
  );

  /**
   * Lấy props để bind vào drag handle
   */
  const getHandleProps = useCallback(
    (itemId) => {
      const item = items.find((i) => i.id === itemId);
      const index = items.indexOf(item);
      const isDragging = draggingId === itemId;

      return {
        onMouseDown: (e) => handleMouseDown(e, itemId, index),
        style: {
          ...DEFAULT_HANDLE_STYLE,
          cursor: isDragging ? "grabbing" : "grab",
        },
      };
    },
    [items, draggingId, handleMouseDown]
  );

  // ============================================================================
  // RETURN
  // ============================================================================

  return {
    getItemProps,
    getHandleProps,
    containerRef,
    isDragging: draggingId !== null,
    draggingId,
  };
}
