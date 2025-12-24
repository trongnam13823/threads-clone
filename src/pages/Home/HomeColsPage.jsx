import { DndContext, closestCenter, useSensors, useSensor, MouseSensor } from "@dnd-kit/core";
import { SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { useDispatch, useSelector } from "react-redux";
import SortableItem from "@/components/Dnd/SortableItem";
import { reorderColumns } from "@/features/auth/authSlice";
import routes from "@/configs/routes";
import PageStackRouter from "@/contexts/PageStack/components/PageStackRouter";
import ColumnPageStackLayout from "@/layouts/ColumnPageStackLayout";
import { cn } from "@/lib/utils";
import { ListPlusIcon } from "lucide-react";

export default function HomeColsPage({ className, handleToggleCols }) {
  const dispatch = useDispatch();
  const columns = useSelector((s) => s.auth.columns);

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

  return (
    <div className={cn("absolute inset-0 ml-(--nav-desktop-w)", className)}>
      <ul
        className={cn(
          "relative flex h-full gap-3 overflow-x-auto overflow-y-hidden pr-[calc(var(--nav-desktop-w)+20px)] pl-5 *:first-of-type:ml-auto *:last-of-type:mr-auto"
        )}
      >
        <DndContext collisionDetection={closestCenter} sensors={sensors} autoScroll={false} onDragEnd={handleDragEnd}>
          <SortableContext items={columns.map((c) => c.id)} strategy={horizontalListSortingStrategy}>
            {columns.map((column) => (
              <SortableItem
                key={column.id}
                id={column.id}
                className="relative w-full max-w-(--column-max-w) min-w-(--column-min-w)"
              >
                <PageStackRouter
                  routes={routes}
                  layout={ColumnPageStackLayout}
                  pathname={column.path}
                  isPreventDefault
                  data={{ column }}
                />
              </SortableItem>
            ))}

            <li className="relative h-full w-0">
              <button
                className="group absolute top-1/2 right-0 flex size-9 translate-x-full -translate-y-1/2 items-center justify-center rounded-full bg-(--floating-button-background)"
                onClick={handleToggleCols}
              >
                <ListPlusIcon className="ml-0.5 size-5 text-(--navigation-icon) group-hover:text-(--icon-primary)" />
              </button>
            </li>
          </SortableContext>
        </DndContext>
      </ul>
    </div>
  );
}
