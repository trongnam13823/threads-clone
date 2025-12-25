import { useEffect, useRef, useState } from "react";
import { draggable, dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import invariant from "tiny-invariant";
import { useDispatch } from "react-redux";
import { reorderColumns } from "@/features/auth/authSlice";
import { cn } from "@/lib/utils";
import DraggableContext from "../context/DraggableContext";

export default function DraggableProvider({ index, data, className, children }) {
  const dispatch = useDispatch();
  const dragRef = useRef(null);
  const dropRef = useRef(null);

  const [isCanDrag, setIsCanDrag] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isOver, setIsOver] = useState(false);

  useEffect(() => {
    const dragElement = dragRef.current;
    const dropElement = dropRef.current;

    invariant(dragElement);
    invariant(dropElement);

    return combine(
      draggable({
        element: dragElement,
        getInitialData() {
          return {
            type: "item",
            index,
          };
        },
        canDrag() {
          return isCanDrag;
        },
        onDragStart() {
          setIsDragging(true);
        },
        onDrop() {
          setIsDragging(false);
          setIsCanDrag(false);
        },
      }),

      dropTargetForElements({
        element: dropElement,

        canDrop({ source }) {
          return source.data.type === "item";
        },

        getData() {
          return { type: "item", index };
        },

        onDragEnter({ source }) {
          // Không highlight chính nó
          if (source.data.index !== index) {
            setIsOver(true);
          }
        },

        onDragLeave() {
          setIsOver(false);
        },

        onDrop({ source, self }) {
          setIsOver(false);

          const fromIndex = source.data.index;
          const toIndex = self.data.index;

          if (fromIndex !== toIndex) {
            dispatch(reorderColumns({ fromIndex, toIndex }));
          }
        },
      })
    );
  }, [index, dispatch, isCanDrag]);

  return (
    <DraggableContext.Provider value={{ setIsCanDrag, data, isOver, isDragging, isDraggable: true }}>
      <div ref={dropRef} className={cn("relative", isDragging && "opacity-20", className)}>
        <div ref={dragRef} className={cn("select-auto")}>
          {children}
        </div>
      </div>
    </DraggableContext.Provider>
  );
}
