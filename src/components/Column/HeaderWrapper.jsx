import { useSortable } from "@/contexts/sortable";
import { cn } from "@/lib/utils";
import { cloneElement, isValidElement } from "react";

const HeaderWrapper = ({ header }) => {
  const { isDraggable, isDragging, attributes, listeners } = useSortable();

  const dragHandleProps = isDraggable ? { ...attributes, ...listeners } : {};

  const headerProps = {
    ...dragHandleProps,
    className: cn(
      "sticky top-0 z-10 mx-auto flex h-(--header-h) w-full max-w-(--column-max-w) min-w-(--column-min-w) items-center justify-center max-md:mt-(--header-h)",
      isDraggable ? "cursor-grab" : "bg-(--background-secondary)",
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
