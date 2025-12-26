import { Children, isValidElement } from "react";
import { cn } from "@/lib/utils";
import Header from "@/components/Column/Header";
import Content from "@/components/Column/Content";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import paths from "@/configs/paths";
import useDragSwap from "@/contexts/dragSwap/hooks/useDragSwap";

const ColumnLayout = ({ children, className }) => {
  const childrenArray = Children.toArray(children);
  const header = childrenArray.find((child) => isValidElement(child) && child.type === Header);
  const content = childrenArray.find((child) => isValidElement(child) && child.type === Content);
  const columns = useSelector((s) => s.auth.columns);
  const { pathname } = useLocation();
  const { isDraggable } = useDragSwap();

  return (
    <div
      className={cn(
        "absolute inset-0 flex flex-col overflow-y-scroll bg-(--background-secondary) max-md:mt-(--header-h) max-md:mb-(--nav-mobile-h) max-md:ml-0",
        isDraggable ? "overflow-y-auto bg-transparent" : "max-lg:ml-(--nav-desktop-w)",
        className
      )}
    >
      {header}
      {content}

      {/* Overlay frame */}
      <div
        hidden={pathname === paths.home && columns.length > 0}
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

ColumnLayout.Header = Header;
ColumnLayout.Content = Content;

export default ColumnLayout;
