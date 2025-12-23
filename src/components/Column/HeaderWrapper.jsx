import { useSortable } from "@/contexts/sortable";
import { cn } from "@/lib/utils";
import { cloneElement, isValidElement } from "react";

const HeaderWrapper = ({ header }) => {
  const { isDraggable, isDragging, attributes, listeners } = useSortable();

  const dragHandleProps = isDraggable ? { ...attributes, ...listeners } : {};

  const headerProps = {
    ...dragHandleProps,
    className: cn(
      "sticky top-0 z-10 mx-auto flex h-(--header-h) w-full max-w-(--column-max-w) items-center justify-center max-md:mt-(--header-h) bg-(--background-secondary) max-md:bg-(--elevated-background)",
      isDraggable ? "md:cursor-grab md:min-w-(--column-min-w) md:bg-transparent" : "",
      isDragging && "pointer-events-none",
      header?.props?.className
    ),
  };

  if (isValidElement(header)) {
    return cloneElement(header, headerProps);
  }

  return null;
};

export default HeaderWrapper;
