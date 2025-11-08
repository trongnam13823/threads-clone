import paths from "@/configs/paths";
import { ThreadsIcon } from "@/icons/ThreadsIcon";
import { cn } from "@/lib/utils";
import { Link } from "react-router";

export const Logo = ({ size = 34, className }) => {
  return (
    <Link to={paths.home} className={cn("transition-transform", "hover:scale-105 active:scale-95", className)}>
      <ThreadsIcon size={size} className="text-(--primary-icon)" />
    </Link>
  );
};
