import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { cn } from "@/lib/utils";
import { ListPlusIcon } from "lucide-react";
import RouteRenderer from "@/contexts/pageStack/components/RouteRenderer";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { autoScrollForElements } from "@atlaskit/pragmatic-drag-and-drop-auto-scroll/element";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import invariant from "tiny-invariant";
import DraggableProvider from "@/contexts/draggable/components/DraggableProvider";

export default function HomeColsPage({ className, handleToggleCols }) {
  const columns = useSelector((s) => s.auth.columns);
  const ulRef = useRef(null);

  useEffect(() => {
    const element = ulRef.current;
    invariant(element);

    return combine(
      dropTargetForElements({
        element,
      }),
      autoScrollForElements({
        element,
        getAllowedAxis: () => "horizontal",
        getConfiguration: () => ({
          maxScrollSpeed: "fast",
          startEdgeThreshold: 30,
          maxEdgeThreshold: 60,
        }),
      })
    );
  });

  return (
    <div className={cn("absolute inset-0 ml-(--nav-desktop-w) bg-(--background-secondary)", className)}>
      <ul
        ref={ulRef}
        className={cn(
          "relative flex h-full gap-3 overflow-x-auto overflow-y-hidden pr-[calc(var(--nav-desktop-w)+20px)] pl-5 *:first-of-type:ml-auto *:last-of-type:mr-auto"
        )}
      >
        {columns.map((column, index) => (
          <DraggableProvider
            key={column.id}
            index={index}
            data={column}
            className="relative w-full max-w-(--column-max-w) min-w-(--column-min-w)"
          >
            <RouteRenderer fromRouteRenderer={false} autoUpdateUrl={false} path={column.path} />
          </DraggableProvider>
        ))}

        <li className="relative h-full w-0">
          <button
            className="group absolute top-1/2 right-0 flex size-9 translate-x-full -translate-y-1/2 items-center justify-center rounded-full bg-(--floating-button-background)"
            onClick={handleToggleCols}
          >
            <ListPlusIcon className="ml-0.5 size-5 text-(--navigation-icon) group-hover:text-(--icon-primary)" />
          </button>
        </li>
      </ul>
    </div>
  );
}
