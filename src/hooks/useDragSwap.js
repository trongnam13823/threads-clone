import { useEffect, useRef } from 'react';

/* ============================================================
   HOOK: useDragSwap - Hỗ trợ cả horizontal và vertical
   ============================================================ */

/**
 * Hook để xử lý drag & swap items
 * @param {Array} items - Mảng items cần sort
 * @param {Object} config - Cấu hình
 * @param {number} config.gap - Khoảng cách giữa các items (px)
 * @param {number} config.transitionDuration - Thời gian animation (ms)
 * @param {string} config.transitionTimingFunction - Timing function CSS
 * @param {number} config.threshold - Ngưỡng di chuyển tối thiểu (px)
 * @param {string} config.direction - "horizontal" hoặc "vertical"
 * @param {Function} config.onReorder - Callback nhận mảng mới sau khi reorder
 * @returns {Object} { getItemProps, getHandleProps, isDraggingRef }
 */
export function useDragSwap(items, config = {}) {
  const {
    gap = 16,
    transitionDuration = 300,
    transitionTimingFunction = 'ease-in-out',
    threshold = 1,
    direction = 'horizontal', // mặc định là ngang
    onReorder, // callback để người dùng tự xử lý
  } = config;

  /* ---------- Refs ---------- */
  const mouseRef = useMouseDirectionRef();
  const dragDownPos = useRef({ x: null, y: null });
  const dragIndex = useRef(null);
  const dropIndex = useRef(null);
  const itemRefs = useRef([]);
  const isDraggingRef = useRef(false); // Track nếu đang drag

  /* ---------- Setup Event Listeners ---------- */
  useEffect(() => {
    // Chọn axis dựa vào direction
    const isHorizontal = direction === 'horizontal';
    const axis = isHorizontal ? 'x' : 'y'; // x hoặc y
    const size = isHorizontal ? 'width' : 'height'; // width hoặc height
    const position = isHorizontal ? 'left' : 'top'; // left hoặc top
    const transformFunc = isHorizontal ? 'translateX' : 'translateY'; // translateX hoặc translateY

    /* ---------- Mouse Move Handler ---------- */
    const handleMouseMove = () => {
      const { x, y, direction: mouseDir } = mouseRef.current;

      if (dragDownPos.current.x === null) return;

      // Tính khoảng dịch chuyển trên cả 2 trục
      const dx = x - dragDownPos.current.x;
      const dy = y - dragDownPos.current.y;

      // Kiểm tra ngưỡng tối thiểu
      if (Math.abs(dx) < threshold && Math.abs(dy) < threshold) return;

      // Đánh dấu là đang drag (vượt ngưỡng)
      isDraggingRef.current = true;

      // Disable text selection
      document.body.style.userSelect = 'none';

      // Item đang được kéo
      const dragItem = itemRefs.current[dropIndex.current];

      // Style cho item đang kéo (di chuyển tự do theo chuột)
      dragItem.style.transition = 'none';
      dragItem.style.transform = `translate(${dx}px, ${dy}px)`;
      dragItem.style.zIndex = 999;
      dragItem.style.cursor = 'grabbing';

      // Lấy direction theo axis chính (1 = xuống/phải, -1 = lên/trái)
      const dirValue = mouseDir[axis];

      // Item kế bên theo hướng chuột
      const swapItem = itemRefs.current[dropIndex.current + dirValue];
      if (!swapItem) return;

      // Tính toán vị trí để quyết định swap
      const dragRect = dragItem.getBoundingClientRect();
      const swapRect = swapItem.getBoundingClientRect();

      // Tâm của item bị đẩy
      const swapCenter = swapRect[position] + swapRect[size] / 2;

      // Kiểm tra điều kiện swap dựa vào hướng
      const isSwap =
        dirValue < 0
          ? dragRect[position] < swapCenter // Kéo lên/trái
          : dragRect[position] + dragRect[size] > swapCenter; // Kéo xuống/phải

      // Setup transition cho item bị đẩy
      swapItem.style.transitionProperty = 'transform';
      swapItem.style.transitionDuration = `${transitionDuration}ms`;
      swapItem.style.transitionTimingFunction = transitionTimingFunction;

      // Thực hiện swap
      if (isSwap) {
        // Tính toán khoảng dịch chuyển cho item bị đẩy
        const translate = `${transformFunc}(calc(${-dirValue}*(100% + ${gap}px)))`;

        // Toggle transform (có transform thì xóa, chưa có thì thêm)
        swapItem.style.transform = swapItem.style.transform ? '' : translate;

        // Swap DOM refs
        swap(itemRefs.current, dropIndex.current, dropIndex.current + dirValue);

        // Cập nhật vị trí hiện tại
        dropIndex.current += dirValue;
      }
    };

    /* ---------- Mouse Up Handler ---------- */
    const handleMouseUp = () => {
      if (dragIndex.current === null) return;

      const dragItem = itemRefs.current[dropIndex.current];

      // Setup transition cho item về vị trí mới
      dragItem.style.transitionProperty = 'transform';
      dragItem.style.transitionDuration = `${transitionDuration}ms`;
      dragItem.style.transitionTimingFunction = transitionTimingFunction;

      // Tính khoảng cách và hướng di chuyển
      const dir = Math.sign(dropIndex.current - dragIndex.current);
      const dist = Math.max(Math.abs(dropIndex.current - dragIndex.current), 1);

      // Animate về vị trí mới
      dragItem.style.transform = `${transformFunc}(calc(${dir}*${dist}*(100% + ${gap}px)))`;

      // Tạo mảng mới với thứ tự đã thay đổi
      const newItems = reOrder(items, dragIndex.current, dropIndex.current);

      // Reset trạng thái drag
      dragDownPos.current = { x: null, y: null };
      dragIndex.current = null;
      dropIndex.current = null;
      document.body.style.userSelect = '';

      // Reset style sau khi animation hoàn thành
      setTimeout(() => {
        itemRefs.current.forEach((el) => {
          el.style.transition = 'none';
          el.style.transform = '';
          el.style.zIndex = '';
          el.style.cursor = '';
        });

        // Cập nhật state với thứ tự mới
        onReorder(newItems);
        isDraggingRef.current = false;
      }, transitionDuration);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [
    items,
    mouseRef,
    gap,
    transitionDuration,
    transitionTimingFunction,
    threshold,
    direction,
    onReorder,
  ]);

  /* ---------- API ---------- */
  return {
    /**
     * Props cho item container
     * @param {number} index - Vị trí của item trong mảng
     */
    getItemProps: (index) => ({
      ref: (el) => (itemRefs.current[index] = el),
    }),

    /**
     * Props cho drag handle (phần có thể kéo)
     * @param {number} index - Vị trí của item trong mảng
     */
    getHandleProps: (index) => ({
      onMouseDown: (e) => {
        dragDownPos.current = {
          x: e.clientX,
          y: e.clientY,
        };
        dragIndex.current = index;
        dropIndex.current = index;
        isDraggingRef.current = false; // Reset flag khi bắt đầu mousedown
      },
      onClick: (e) => {
        // Nếu đã drag thì ngăn click event
        if (isDraggingRef.current) {
          e.preventDefault();
          e.stopPropagation();
          return false;
        }
      },
      style: { cursor: 'grab' },
    }),
    isDraggingRef, // Trả ref để truy cập isDraggingRef.current
  };
}

/* ============================================================
   UTILS
   ============================================================ */

/**
 * Swap 2 phần tử trong mảng (mutate)
 */
const swap = (items, i, j) => (([items[i], items[j]] = [items[j], items[i]]), items);

/**
 * Tạo mảng mới, di chuyển phần tử từ vị trí from → to
 */
const reOrder = (a, f, t) => ((b) => (b.splice(t, 0, b.splice(f, 1)[0]), b))([...a]);

/**
 * Hook theo dõi vị trí và hướng di chuyển của chuột
 */
function useMouseDirectionRef() {
  const mouseRef = useRef({
    x: 0,
    y: 0,
    direction: { x: -1, y: -1 }, // -1: trái/lên, 1: phải/xuống
  });

  const prevPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;

      const prev = prevPosRef.current;
      const dir = mouseRef.current.direction;

      // Xác định hướng X
      if (x > prev.x) dir.x = 1;
      else if (x < prev.x) dir.x = -1;

      // Xác định hướng Y
      if (y > prev.y) dir.y = 1;
      else if (y < prev.y) dir.y = -1;

      // Cập nhật vị trí
      mouseRef.current.x = x;
      mouseRef.current.y = y;
      prevPosRef.current = { x, y };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return mouseRef;
}
