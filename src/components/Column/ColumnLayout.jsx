import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Children } from "react";
import getRouteElement from "@/utils/getRouteElement";
import { useHistory } from "@/contexts/history";
import paths from "@/configs/paths";
import HeaderWrapper from "./HeaderWrapper";
import ColumnContent from "./ColumnContent";

const ColumnLayout = ({
  children,
  className,
  sortableData = {},
  isRenderCurrentPath = true,
}) => {
  const [header, content] = Children.toArray(children);
  const { isDraggable, isDragging } = sortableData;

  const { currentPath } = useHistory();

  const shouldRenderCurrentPath =
    isDraggable &&
    currentPath &&
    isRenderCurrentPath &&
    currentPath !== paths.home;

  return (
    <>
      <div
        className={cn(
          "flex size-full flex-1 flex-col",
          isDraggable ? "relative" : "layer",
          isDragging && "cursor-grabbing",
          shouldRenderCurrentPath ? "opacity-0" : "absolute inset-0",
          className,
        )}
      >
        <HeaderWrapper header={header} sortableData={sortableData} />
        <ColumnContent content={content} sortableData={sortableData} />
      </div>

      {shouldRenderCurrentPath &&
        getRouteElement({
          path: currentPath,
          props: { sortableData, isRenderCurrentPath: false },
        })}
    </>
  );
};

export default ColumnLayout;
