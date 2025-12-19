import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

const ColumnContent = ({ content, sortableData = {} }) => {
  const { isDraggable } = sortableData;

  const ContentWrapper = isDraggable ? ScrollArea : "div";

  return (
    <main className="relative mx-auto w-full max-w-(--column-max-w) min-w-(--column-min-w) flex-1">
      <div className="absolute inset-0">
        <ContentWrapper
          className={cn(
            "h-full bg-(--elevated-background)",
            isDraggable &&
              "overflow-hidden rounded-t-3xl border border-(--primary-column-outline) shadow-[0_0_12px_0_var(--box-shadow-04)]",
          )}
        >
          {content}
        </ContentWrapper>
      </div>
    </main>
  );
};

export default ColumnContent;
