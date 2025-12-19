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

const NavDesktop = () => {
  return (
    <div className="absolute z-20 flex h-svh w-(--nav-desktop-w) flex-col items-center justify-between bg-(--side-navigation-background) py-4 backdrop-blur-lg max-md:hidden">
      <Logo />

      <nav className="flex flex-col gap-4">
        <Button
          asChild
          variant="ghost"
          className="h-12 w-15 rounded-xl hover:bg-(--navigation-item-hover-background)"
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
          className="h-12 w-15 rounded-xl hover:bg-(--navigation-item-hover-background)"
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
          className="group h-12 w-15 rounded-xl bg-(--navigation-item-hover-background) text-(--navigation-icon)"
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
          className="h-12 w-15 rounded-xl hover:bg-(--navigation-item-hover-background)"
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
          className="h-12 w-15 rounded-xl hover:bg-(--navigation-item-hover-background)"
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

      <Menu className="mb-4" />
    </div>
  );
};

export default NavDesktop;
