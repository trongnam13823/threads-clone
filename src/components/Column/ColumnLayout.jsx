import { cn } from "@/lib/utils";
import { Children } from "react";
import paths from "@/configs/paths";
import HeaderWrapper from "./HeaderWrapper";
import ColumnContent from "./ColumnContent";
import useSortable from "@/contexts/sortable/hooks/useSortable";

const ColumnLayout = ({ children, className }) => {
  const [header, content] = Children.toArray(children);
  const { isDraggable, isDragging } = useSortable();

  // const { isRender } = useRouteRender();

  // const isRouteRender = isDraggable && currentPath && currentPath !== paths.home && !isRender;

  return (
    <>
      <div
        className={cn(
          "flex size-full flex-1 flex-col",
          isDraggable ? "relative" : "layer scroll-box overflow-y-scroll!",
          isDragging && "cursor-grabbing",
          // isRouteRender ? "opacity-0" : "absolute inset-0",
          className
        )}
      >
        <HeaderWrapper header={header} />
        <ColumnContent content={content} />

        {/* BORDER & BACKGROUND && SHADOW FOR MAIN */}
        <div
          className={cn(
            "pointer-events-none fixed inset-0 left-0 z-10 flex flex-col items-center justify-center pt-(--header-h) pr-(--scroll-size) max-md:hidden",
            isDraggable ? "hidden" : "flex"
          )}
        >
          <div className="relative w-(--column-max-w) flex-1">
            <div className="absolute inset-0 rounded-t-3xl outline-12 outline-(--background-secondary)"></div>
            <div className="absolute inset-0 rounded-t-3xl border border-(--primary-column-outline) shadow-[0_0_12px_0_var(--box-shadow-04)]"></div>
          </div>
        </div>
      </div>

      {/* {isRouteRender && <RouteRenderer path={currentPath} isRender={isRender || isRouteRender} />} */}
    </>
  );
};

export default ColumnLayout;
