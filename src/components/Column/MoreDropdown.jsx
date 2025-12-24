import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { EllipsisIcon } from "lucide-react";
import { Button } from "../ui/button";

export default function MoreDropdown({ children }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="max-md:hidden">
        <div className="group absolute top-1/2 right-3 z-20 flex size-12 -translate-y-1/2 cursor-pointer items-center justify-center">
          <Button
            className="size-6 shadow-[0_2px_8px_0_var(--box-shadow-08)] group-hover:scale-105 group-active:scale-95"
            variant="outline"
            size="icon"
          >
            <EllipsisIcon className="size-4" />
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={-6} alignOffset={-12}>
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
