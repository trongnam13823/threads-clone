import paths from "@/configs/paths";
import { Link, NavLink } from "react-router";
import { Menu } from "./Menu";
import { HeartIcon, HomeIcon, PlusIcon, SearchIcon, UserIcon } from "lucide-react";
import { ThreadsIcon } from "@/icons/ThreadsIcon";
import { userInfo } from "@/mocksAPI";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

export const Navigation = () => {
  const navItems = [
    { path: paths.home, Icon: HomeIcon },
    { path: paths.search, Icon: SearchIcon },
    { isButton: true, name: "create-post" },
    { path: paths.activity, Icon: HeartIcon },
    { path: paths.profile(userInfo.username), Icon: UserIcon },
  ];

  return (
    <div
      className={cn(
        "fixed top-0 bottom-0 left-0 flex w-[76px] flex-col items-center justify-between pt-4 pb-6 backdrop-blur-lg",
        "max-md:top-auto max-md:w-full max-md:p-1",
        "max-md:h-(--header-height) max-md:bg-(--header-background)"
      )}
    >
      {/* LOGO */}
      <Logo className="max-md:hidden" />

      {/* NAV */}
      <nav className={cn("flex flex-col gap-4", "max-md:h-full max-md:w-full max-md:flex-row max-md:gap-2")}>
        {navItems.map((item) => {
          // CREATE POST BTN
          if (item.isButton) {
            return (
              <Button
                key={item.name}
                variant="secondary"
                className={cn(
                  "group h-12 w-[60px] rounded-[12px]",
                  "bg-(--navigation-item-hover-background)",
                  "max-md:h-full max-md:w-auto max-md:flex-1"
                )}
              >
                <PlusIcon
                  className={cn("size-6 stroke-3", "text-(--navigation-icon)", "group-hover:text-(--primary-icon)")}
                />
              </Button>
            );
          }
          // NAV LINKS
          else {
            const Icon = item.Icon;

            return (
              <Button
                key={item.path}
                variant="ghost"
                asChild
                className={cn(
                  "h-12 w-[60px] rounded-[12px]",
                  "hover:bg-(--navigation-item-hover-background)",
                  "max-md:h-full max-md:w-auto max-md:flex-1"
                )}
              >
                <NavLink to={item.path}>
                  {({ isActive }) => (
                    <Icon className={cn("size-6", isActive ? "text-(--primary-icon)" : "text-(--navigation-icon)")} />
                  )}
                </NavLink>
              </Button>
            );
          }
        })}
      </nav>

      {/* MENU BTN */}
      <Menu className="max-md:hidden" />
    </div>
  );
};
