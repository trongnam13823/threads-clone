import React, { useRef, useEffect, useState } from "react";
import { draggable, dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";

/**
 * 📦 DRAGGABLE ITEM COMPONENT
 * Component đại diện cho một item có thể kéo thả
 */
function DraggableItem({ item, index, onReorder }) {
  const itemRef = useRef(null);

  useEffect(() => {
    const el = itemRef.current;
    if (!el) return;

    // 1️⃣ DRAGGABLE: Làm cho phần tử có thể kéo được
    const dragCleanup = draggable({
      element: el,
      // Lưu cả index và id của item đang kéo
      getInitialData: () => ({
        index,
        id: item.id, // Lưu id để đảm bảo đúng item
      }),
    });

    // 2️⃣ DROP TARGET: Làm cho phần tử trở thành vùng thả được
    const dropCleanup = dropTargetForElements({
      element: el,
      // Lưu index và id của drop target
      getData: () => ({
        index,
        id: item.id,
      }),
      // Xử lý khi thả item vào đây
      onDrop: ({ source, self }) => {
        const fromIndex = source.data.index;
        const toIndex = self.data.index;

        if (fromIndex !== toIndex) {
          onReorder(fromIndex, toIndex);
        }
      },
    });

    // Cleanup khi component unmount hoặc re-render
    return () => {
      dragCleanup();
      dropCleanup();
    };
  }, [index, item.id, onReorder]); // Re-run khi index, id hoặc callback thay đổi

  return (
    <div
      ref={itemRef}
      style={{
        padding: "8px 12px",
        margin: "4px 0",
        border: "1px solid #aaa",
        borderRadius: 4,
        cursor: "grab",
        background: "#fff",
        userSelect: "none",
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}
    >
      <span style={{ color: "#666", fontSize: "12px" }}>#{item.id}</span>
      <span>{item.name}</span>
    </div>
  );
}

/**
 * 📋 DRAGGABLE LIST COMPONENT
 * Component quản lý danh sách các item có thể kéo thả
 */
function DraggableList({ items, onItemsChange }) {
  // Xử lý reorder: di chuyển item từ fromIndex sang toIndex
  const handleReorder = (fromIndex, toIndex) => {
    const newItems = [...items];
    const [moved] = newItems.splice(fromIndex, 1); // Lấy item ra khỏi vị trí cũ
    newItems.splice(toIndex, 0, moved); // Chèn vào vị trí mới
    onItemsChange(newItems);
  };

  return (
    <div style={{ width: 300, padding: 10, border: "1px solid #ccc", borderRadius: 8 }}>
      {items.map((item, idx) => (
        <DraggableItem
          key={item.id} // ⚠️ Dùng item.id làm key để tránh lỗi khi reorder
          item={item} // Truyền cả object item
          index={idx}
          onReorder={handleReorder}
        />
      ))}
    </div>
  );
}

/**
 * 🏠 MAIN APP COMPONENT
 * Component gốc quản lý state
 */
export default function A() {
  // State với array of objects
  const [items, setItems] = useState([
    { id: 1, name: "🍎 Apple" },
    { id: 2, name: "🍌 Banana" },
    { id: 3, name: "🍇 Grape" },
    { id: 4, name: "🥝 Kiwi" },
  ]);

  return (
    <div style={{ padding: 20 }}>
      <h3>Drag & Drop List (Objects)</h3>
      <p style={{ color: "#666", fontSize: "14px" }}>Kéo thả để sắp xếp lại danh sách</p>
      <DraggableList items={items} onItemsChange={setItems} />

      {/* Debug panel để xem thứ tự hiện tại */}
      <div style={{ marginTop: 20, padding: 10, background: "#f5f5f5", borderRadius: 4 }}>
        <strong>Current Order:</strong>
        <pre style={{ fontSize: "12px", margin: "8px 0 0 0" }}>{JSON.stringify(items, null, 2)}</pre>
      </div>
    </div>
  );
}

/**
 * 📚 XỬ LÝ ARRAY OF OBJECTS
 *
 * Thay đổi chính so với mảng đơn giản:
 *
 * 1️⃣ STATE STRUCTURE:
 *    - Trước: ["🍎 Apple", "🍌 Banana"]
 *    - Sau:  [{ id: 1, name: "🍎 Apple" }, { id: 2, name: "🍌 Banana" }]
 *
 * 2️⃣ KEY PROP:
 *    - Trước: key={item}
 *    - Sau:  key={item.id}  // Dùng unique id thay vì string
 *
 * 3️⃣ DATA TRANSFER:
 *    - Lưu cả id trong getInitialData/getData để có thể validate
 *    - Vẫn dùng index để reorder vì index thay đổi khi kéo thả
 *
 * 4️⃣ DISPLAY:
 *    - Trước: {item}
 *    - Sau:  {item.name}  // Truy cập property của object
 *
 * 5️⃣ DEPENDENCIES:
 *    - Thêm item.id vào dependency array của useEffect
 *    - Đảm bảo effect chạy lại nếu item object thay đổi
 *
 * ✅ Ưu điểm của cách dùng object:
 *    - Có unique identifier (id) cho mỗi item
 *    - Dễ dàng mở rộng thêm properties (color, priority, etc)
 *    - An toàn hơn khi items có giá trị trùng lặp
 */
