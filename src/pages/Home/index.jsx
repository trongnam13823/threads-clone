import { DndContext, closestCenter, useSensors, useSensor, MouseSensor } from "@dnd-kit/core";
import { SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { useDispatch, useSelector } from "react-redux";
import { DEFAULT_COLUMN_ID, reorderColumns } from "@/features/homeLayout/homeLayoutSlice";
import SortableItem from "@/components/Dnd/SortableItem";
import { cn } from "@/lib/utils";
import HomeColumn from "./HomeColumn";
import { HistoryProvider } from "@/contexts/history";
import { ColumnProvider } from "@/contexts/column";
import { SortableProvider } from "@/contexts/sortable";
import RouteRenderer from "@/components/RouteRenderer";

export default function Home({ className }) {
  const dispatch = useDispatch();
  const columns = useSelector((s) => s.homeLayout.columns);

  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 1 } });
  const sensors = useSensors(mouseSensor);

  const handleDragEnd = ({ active, over }) => {
    dispatch(
      reorderColumns({
        activeId: active?.id,
        overId: over?.id,
      })
    );
  };

  const isDraggable = columns.length > 1;

  return (
    <DndContext collisionDetection={closestCenter} sensors={sensors} autoScroll={false} onDragEnd={handleDragEnd}>
      <SortableContext items={columns.map((c) => c.id)} strategy={horizontalListSortingStrategy}>
        <div className={cn("layer", className)}>
          <div
            className={cn(
              "flex size-full gap-5 overflow-x-auto overflow-y-hidden px-[calc(var(--nav-desktop-w)+20px)]",
              "[&>*:first-child]:ml-auto [&>*:last-child]:mr-auto"
            )}
          >
            {columns.map((col) => {
              const content = (
                <SortableItem
                  key={col.id}
                  id={col.id}
                  className={cn(
                    isDraggable && "md:relative md:w-full md:max-w-(--column-max-w) md:min-w-(--column-min-w)",
                    col.id === DEFAULT_COLUMN_ID ? "max-md:block" : "max-md:hidden"
                  )}
                >
                  {(data) => (
                    <SortableProvider value={{ ...data, isDraggable }}>
                      {col.id === DEFAULT_COLUMN_ID ? <HomeColumn /> : <RouteRenderer path={col.path} />}
                    </SortableProvider>
                  )}
                </SortableItem>
              );

              return isDraggable ? (
                <ColumnProvider value={col} key={col.id}>
                  <HistoryProvider isNavBlocked={true}>{content}</HistoryProvider>
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
