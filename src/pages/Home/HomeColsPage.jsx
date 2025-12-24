import { useSelector } from "react-redux";
import { cn } from "@/lib/utils";
import { ListPlusIcon } from "lucide-react";

export default function HomeColsPage({ className, handleToggleCols }) {
  const columns = useSelector((s) => s.auth.columns);

  return (
    <div className={cn("absolute inset-0 ml-(--nav-desktop-w)", className)}>
      <ul
        className={cn(
          "relative flex h-full gap-3 overflow-x-auto overflow-y-hidden pr-[calc(var(--nav-desktop-w)+20px)] pl-5 *:first-of-type:ml-auto *:last-of-type:mr-auto"
        )}
      >
        {columns.map((column) => (
          <li key={column.id} id={column.id} className="relative w-full max-w-(--column-max-w) min-w-(--column-min-w)">
            <div className="h-full bg-gray-200"></div>
          </li>
        ))}

        <li className="relative h-full w-0">
          <button
            className="group absolute top-1/2 right-0 flex size-9 translate-x-full -translate-y-1/2 items-center justify-center rounded-full bg-(--floating-button-background)"
            onClick={handleToggleCols}
          >
            <ListPlusIcon className="ml-0.5 size-5 text-(--navigation-icon) group-hover:text-(--icon-primary)" />
          </button>
        </li>
      </ul>
    </div>
  );
}
