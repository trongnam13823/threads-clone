import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import useSortable from "@/contexts/sortable/hooks/useSortable";

const ColumnContent = ({ content }) => {
  const { isDraggable } = useSortable();

  const ContentWrapper = isDraggable ? ScrollArea : "div";

  return (
    <main
      className={cn(
        "relative mx-auto w-full max-w-(--column-max-w) flex-1",
        isDraggable ? "md:min-w-(--column-min-w)" : ""
      )}
    >
      <div className="absolute inset-0">
        <ContentWrapper
          className={cn(
            "h-auto min-h-full bg-(--elevated-background) max-md:pb-(--nav-mobile-h)",
            isDraggable
              ? "md:h-full md:min-h-auto md:overflow-hidden md:rounded-t-3xl md:border md:border-(--primary-column-outline) md:shadow-[0_0_12px_0_var(--box-shadow-04)]"
              : ""
          )}
        >
          {content}
        </ContentWrapper>
      </div>
    </main>
  );
};

export default ColumnContent;
