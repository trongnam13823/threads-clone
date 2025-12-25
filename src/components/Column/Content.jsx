import { useDraggable } from "@/contexts/draggable/hooks/usePageStack";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePreserveScroll } from "@/hooks/usePreserveScroll";

const Content = ({ children, className }) => {
  const { isOver, isDraggable, isDragging } = useDraggable();
  const Main = isDraggable ? ScrollArea : "main";

  const scrollRef = usePreserveScroll([isDragging]);

  return (
    <Main
      ref={scrollRef}
      className={cn(
        "mx-auto w-full flex-1 bg-(--elevated-background) transition-transform md:max-w-(--column-max-w) md:p-px",
        isDraggable &&
          "h-[calc(100svh-var(--header-h))] overflow-y-auto rounded-t-3xl border border-(--primary-column-outline) shadow-[0_0_12px_0_var(--box-shadow-04)]",
        isOver && "scale-95",
        className
      )}
    >
      <div className="flex size-full flex-col gap-5">{children}</div>
    </Main>
  );
};

export default Content;
