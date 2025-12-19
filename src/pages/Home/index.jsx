import {
  DndContext,
  closestCenter,
  useSensors,
  useSensor,
  MouseSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

import { useDispatch, useSelector } from "react-redux";
import { DEFAULT_COLUMN_ID, setColumns } from "@/features/homeLayout";
import getRouteElement from "@/utils/getRouteElement";
import SortableItem from "@/components/Dnd/SortableItem";
import { cn } from "@/lib/utils";
import HomeColumn from "./HomeColumn";
import { HistoryProvider } from "@/contexts/history";
import { ColumnProvider } from "@/contexts/column";

export default function Home({ className }) {
  const dispatch = useDispatch();
  const columns = useSelector((s) => s.homeLayout.columns);

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 1 } }),
  );

  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return;

    const oldIndex = columns.findIndex((c) => c.id === active.id);
    const newIndex = columns.findIndex((c) => c.id === over.id);
    dispatch(setColumns(arrayMove(columns, oldIndex, newIndex)));
  };

  const isDraggable = columns.length > 1;

  return (
    <DndContext
      collisionDetection={closestCenter}
      sensors={sensors}
      autoScroll={false}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={columns.map((c) => c.id)}
        strategy={horizontalListSortingStrategy}
      >
        <div className={cn("layer", className)}>
          <div
            className={cn(
              "flex size-full gap-5 overflow-x-auto overflow-y-hidden px-[calc(var(--nav-desktop-w)+20px)]",
              "[&>*:first-child]:ml-auto [&>*:last-child]:mr-auto",
            )}
          >
            {columns.map((col) => {
              const content = (
                <SortableItem
                  key={col.id}
                  id={col.id}
                  className={cn(
                    "w-full max-w-(--column-max-w) min-w-(--column-min-w)",
                    isDraggable && "relative",
                  )}
                >
                  {(data) => {
                    const sortableData = { ...data, isDraggable };

                    return col.id === DEFAULT_COLUMN_ID ? (
                      <HomeColumn sortableData={sortableData} />
                    ) : (
                      getRouteElement({ ...col, props: { sortableData } })
                    );
                  }}
                </SortableItem>
              );

              return isDraggable ? (
                <ColumnProvider columnData={col} key={col.id}>
                  <HistoryProvider>{content}</HistoryProvider>
                </ColumnProvider>
              ) : (
                content
              );
            })}
          </div>
        </div>
      </SortableContext>
    </DndContext>
  );
}
