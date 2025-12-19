import { Logo } from "../Logo";
import { Button } from "../ui/button";
import {
  HeartIcon,
  HomeIcon,
  PlusIcon,
  SearchIcon,
  UserIcon,
} from "lucide-react";
import paths from "@/configs/paths";
import { userInfo } from "@/mocksAPI";
import Menu from "./Menu";
import NavLink from "@/contexts/history/components/NavLink";

const NavMobile = () => {
  return (
    <>
      <header className="absolute top-0 right-0 left-0 z-20 flex h-(--header-h) items-center justify-center bg-(--header-background) backdrop-blur-xl md:hidden">
        <Logo size={32} />

        <Menu className="absolute top-1/2 right-4 -translate-y-1/2" />
      </header>

      <nav className="absolute right-0 bottom-0 left-0 flex h-(--nav-mobile-h) gap-2 bg-(--side-navigation-background) backdrop-blur-lg md:hidden">
        <Button
          asChild
          variant="ghost"
          className="h-full flex-1 rounded-xl hover:bg-(--navigation-item-hover-background)"
        >
          <NavLink replace to={paths.home}>
            {({ isActive }) => (
              <HomeIcon
                size={24}
                className={
                  isActive
                    ? "text-(--icon-primary)"
                    : "text-(--navigation-icon)"
                }
              />
            )}
          </NavLink>
        </Button>

        <Button
          asChild
          variant="ghost"
          className="h-full flex-1 rounded-xl hover:bg-(--navigation-item-hover-background)"
        >
          <NavLink replace to={paths.search}>
            {({ isActive }) => (
              <SearchIcon
                size={24}
                className={
                  isActive
                    ? "text-(--icon-primary)"
                    : "text-(--navigation-icon)"
                }
              />
            )}
          </NavLink>
        </Button>

        <Button
          variant="secondary"
          className="group h-full flex-1 rounded-xl bg-(--navigation-item-hover-background) text-(--navigation-icon)"
        >
          <PlusIcon
            size={24}
            strokeWidth={3}
            className="group-hover:text-(--icon-primary)"
          />
        </Button>

        <Button
          asChild
          variant="ghost"
          className="h-full flex-1 rounded-xl hover:bg-(--navigation-item-hover-background)"
        >
          <NavLink replace to={paths.activity}>
            {({ isActive }) => (
              <HeartIcon
                size={24}
                className={
                  isActive
                    ? "text-(--icon-primary)"
                    : "text-(--navigation-icon)"
                }
              />
            )}
          </NavLink>
        </Button>

        <Button
          asChild
          variant="ghost"
          className="h-full flex-1 rounded-xl hover:bg-(--navigation-item-hover-background)"
        >
          <NavLink replace to={paths.profile(userInfo.username)}>
            {({ isActive }) => (
              <UserIcon
                size={24}
                className={
                  isActive
                    ? "text-(--icon-primary)"
                    : "text-(--navigation-icon)"
                }
              />
            )}
          </NavLink>
        </Button>
      </nav>
    </>
  );
};

export default NavMobile;
