import { cn } from "@/lib/utils";
import { cloneElement, isValidElement } from "react";
import BackButton from "./BackButton";
import useSortable from "@/contexts/sortable/hooks/useSortable";

const HeaderWrapper = ({ header }) => {
  const { isDraggable, isDragging, attributes, listeners } = useSortable();

  const dragHandleProps = isDraggable ? { ...attributes, ...listeners } : {};

  if (!isValidElement(header)) return null;

  return cloneElement(header, {
    ...dragHandleProps,
    className: cn(
      "sticky top-0 z-10 mx-auto flex h-(--header-h) w-full max-w-(--column-max-w) items-center justify-center font-bold",
      "bg-(--background-secondary) max-md:mt-(--header-h) max-md:bg-(--elevated-background)",
      isDraggable && "md:cursor-grab md:min-w-(--column-min-w) md:bg-transparent",
      isDragging && "pointer-events-none",
      header.props.className
    ),
    children: (
      <>
        <BackButton />
        {header.props.children}
      </>
    ),
  });
};

export default HeaderWrapper;
