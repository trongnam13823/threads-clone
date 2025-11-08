import { cn } from "@/lib/utils";
import { MenuIcon } from "lucide-react";
import { Button } from "./ui/button";

export const Menu = ({ className }) => {
  return (
    <Button variant="none" className={cn("group size-12", className)}>
      <MenuIcon
        className={cn("size-6 transition-colors", "text-(--navigation-icon)", "group-hover:text-(--primary-icon)")}
      />
    </Button>
  );
};
