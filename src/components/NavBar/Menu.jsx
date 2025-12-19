import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { MenuIcon } from "lucide-react";

function Menu({ className }) {
  return (
    <Button variant="none" className={cn("group size-12 text-(--navigation-icon)", className)}>
      <MenuIcon size={24} className="group-hover:text-(--icon-primary)" />
    </Button>
  );
}

export default Menu;
