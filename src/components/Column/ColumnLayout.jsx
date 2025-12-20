import { cn } from "@/lib/utils";
import { Children } from "react";
import { useHistory } from "@/contexts/history";
import paths from "@/configs/paths";
import HeaderWrapper from "./HeaderWrapper";
import ColumnContent from "./ColumnContent";
import { useSortable } from "@/contexts/sortable";
import RouteRenderer from "../RouteRenderer";
import { useRouteRender } from "@/contexts/routeRender";

const ColumnLayout = ({ children, className }) => {
  const [header, content] = Children.toArray(children);
  const { isDraggable, isDragging } = useSortable();

  const { currentPath } = useHistory();
  const { isRender } = useRouteRender();

  const isRouteRender = isDraggable && currentPath && currentPath !== paths.home && !isRender;

  return (
    <>
      <div
        className={cn(
          "flex size-full flex-1 flex-col",
          isDraggable ? "relative" : "layer",
          isDragging && "cursor-grabbing",
          isRouteRender ? "opacity-0" : "absolute inset-0",
          className
        )}
      >
        <HeaderWrapper header={header} />
        <ColumnContent content={content} />
      </div>

      {isRouteRender && <RouteRenderer path={currentPath} isRender={isRender || isRouteRender} />}
    </>
  );
};

export default ColumnLayout;
