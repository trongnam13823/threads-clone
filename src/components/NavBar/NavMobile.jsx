import { Button } from "../ui/button";
import { HeartIcon, HomeIcon, PlusIcon, SearchIcon, UserIcon } from "lucide-react";
import paths from "@/configs/paths";
import { useSelector } from "react-redux";
import NavLink from "@/contexts/pageStack/components/NavLink";
const NavMobile = () => {
  const userInfo = useSelector((s) => s.auth.userInfo);

  return (
    <nav className="absolute right-0 bottom-0 left-0 flex h-(--nav-mobile-h) gap-2 bg-(--side-navigation-background) backdrop-blur-lg md:hidden">
      <Button
        asChild
        variant="ghost"
        className="h-full flex-1 rounded-xl hover:bg-(--navigation-item-hover-background)"
      >
        <NavLink replace to={paths.home}>
          {({ isActive }) => (
            <HomeIcon size={24} className={isActive ? "text-(--icon-primary)" : "text-(--navigation-icon)"} />
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
            <SearchIcon size={24} className={isActive ? "text-(--icon-primary)" : "text-(--navigation-icon)"} />
          )}
        </NavLink>
      </Button>

      <Button
        variant="secondary"
        className="group h-full flex-1 rounded-xl bg-(--navigation-item-hover-background) text-(--navigation-icon)"
      >
        <PlusIcon size={24} strokeWidth={3} className="group-hover:text-(--icon-primary)" />
      </Button>

      <Button
        asChild
        variant="ghost"
        className="h-full flex-1 rounded-xl hover:bg-(--navigation-item-hover-background)"
      >
        <NavLink replace to={paths.activity}>
          {({ isActive }) => (
            <HeartIcon size={24} className={isActive ? "text-(--icon-primary)" : "text-(--navigation-icon)"} />
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
            <UserIcon size={24} className={isActive ? "text-(--icon-primary)" : "text-(--navigation-icon)"} />
          )}
        </NavLink>
      </Button>
    </nav>
  );
};

export default NavMobile;
