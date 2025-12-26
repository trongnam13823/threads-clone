import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePreserveScroll } from "@/hooks/usePreserveScroll";
import useDragSwap from "@/contexts/dragSwap/hooks/useDragSwap";

const Content = ({ children, className }) => {
  const { isDraggable, isDragging } = useDragSwap();
  const Main = isDraggable ? ScrollArea : "main";

  const scrollRef = usePreserveScroll([isDragging]);

  return (
    <ScrollArea
      ref={scrollRef}
      className={cn(
        "mx-auto w-full flex-1 bg-(--elevated-background) transition-transform md:max-w-(--column-max-w) md:p-px",
        isDraggable &&
          "h-[calc(100svh-var(--header-h))] overflow-y-auto rounded-t-3xl border border-(--primary-column-outline) shadow-[0_0_12px_0_var(--box-shadow-04)]",
        className
      )}
    >
      <div className="flex size-full flex-col gap-5">{children}</div>
    </ScrollArea>
  );
};

export default Content;
