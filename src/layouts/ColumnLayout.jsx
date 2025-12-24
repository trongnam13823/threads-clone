import React, { Children, isValidElement } from "react";
import { cn } from "@/lib/utils";
import BackButton from "@/components/Column/BackButton";
import usePageStack from "@/contexts/PageStack/hooks/usePageStack";
import { useSortable } from "@dnd-kit/sortable";
import usePreserveScrollPosition from "@/hooks/usePreserveScrollPosition";

/* ---------------- Slots ---------------- */

const Header = ({ children, className }) => {
  const { data } = usePageStack();
  const { attributes, listeners, isDragging } = useSortable({ id: data?.column?.id });

  return (
    <header
      {...attributes}
      {...listeners}
      className={cn(
        "top-0 mx-auto flex h-(--header-h) w-full shrink-0 items-center justify-center bg-(--background-secondary) focus-visible:outline-0 md:sticky md:max-w-(--column-max-w)",
        isDragging ? "cursor-grabbing" : "cursor-grab",
        className
      )}
    >
      <BackButton />
      {children}
    </header>
  );
};

const Content = ({ children, className }) => {
  return (
    <main
      className={cn(
        "mx-auto flex w-full flex-1 flex-col gap-5 bg-(--elevated-background) md:max-w-(--column-max-w) md:p-px",
        className
      )}
    >
      {children}
    </main>
  );
};

/* ---------------- Root ---------------- */

const ColumnLayout = ({ children, className }) => {
  const childrenArray = Children.toArray(children);

  const header = childrenArray.find((child) => isValidElement(child) && child.type === Header);

  const content = childrenArray.find((child) => isValidElement(child) && child.type === Content);

  const { data } = usePageStack();
  const column = data?.column;
  const { isSorting } = useSortable({ id: column?.id });

  const scrollRef = usePreserveScrollPosition([isSorting]);

  return (
    <div
      ref={scrollRef}
      className={cn(
        "absolute inset-0 flex flex-col overflow-y-scroll bg-(--background-secondary) max-md:mt-(--header-h) max-md:mb-(--nav-mobile-h) max-md:ml-0",
        column ? "" : "max-lg:ml-(--nav-desktop-w)",
        className
      )}
    >
      {header}
      {content}

      {/* Overlay frame */}
      <div
        hidden={column}
        className="pointer-events-none fixed inset-0 z-10 flex flex-col items-center justify-center pt-(--header-h) pr-(--scroll-size) max-md:hidden"
      >
        <div className="relative w-(--column-max-w) flex-1 max-lg:ml-(--nav-desktop-w) max-md:ml-0">
          <div className="absolute inset-0 rounded-t-3xl outline-12 outline-(--background-secondary)" />
          <div className="absolute inset-0 rounded-t-3xl border border-(--primary-column-outline) shadow-[0_0_12px_0_var(--box-shadow-04)]" />
        </div>
      </div>
    </div>
  );
};

/* ---------------- Attach slots ---------------- */

ColumnLayout.Header = Header;
ColumnLayout.Content = Content;

export default ColumnLayout;
