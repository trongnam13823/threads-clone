import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import paths from "@/configs/paths";
import { usePreserveScroll } from "@/hooks/usePreserveScroll";
import { cn } from "@/lib/utils";
import { userInfo } from "@/mocksAPI";
import { EllipsisIcon, InstagramIcon, SquareKanbanIcon } from "lucide-react";
import { NavLink, Outlet } from "react-router";

export const ProfileLayout = () => {
  const navLinks = [
    { path: paths.profile(userInfo.username), name: "Threads" },
    { path: paths.profileReplies(userInfo.username), name: "Replies" },
    { path: paths.profileMedia(userInfo.username), name: "Media" },
    { path: paths.profileReposts(userInfo.username), name: "Reposts" },
  ];

  usePreserveScroll();

  return (
    <div className="flex size-full min-h-svh flex-col">
      <header className={cn("relative flex justify-center", "h-(--header-height)", "max-md:hidden")}>
        {/* TITLE */}
        <Button asChild variant="none" className="h-full font-bold">
          <span>Profile</span>
        </Button>

        {/* MORE BTN */}
        <Button
          variant="outline"
          size="icon-sm"
          className={cn(
            "absolute top-1/2 right-6 -translate-y-1/2",
            "shadow-[0_2px_8px_0_var(--box-shadow-08)]",
            "hover:scale-105",
            "max-md:hidden"
          )}
        >
          <EllipsisIcon className="size-4.5" />
        </Button>
      </header>

      <main className="flex flex-1 flex-col p-px">
        {/* INFO */}
        <div className="h-fit w-full px-6 pt-4.5 pb-2.5">
          {/* NAME & AVATAR */}
          <div className="flex justify-between">
            <div>
              <p className="text-2xl font-bold">{userInfo.username}</p>
              <p className="text-[15px]">{userInfo.fullname}</p>
            </div>

            <Avatar className="size-[84px] cursor-pointer">
              <AvatarImage src={userInfo.avatar} alt={userInfo.fullname} />
              <AvatarFallback>{userInfo.fullname.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          </div>
          {/* FOLLOWER */}
          <div className="mt-3 flex items-center justify-between">
            <p className="text-(--secondary-text)">{userInfo.followers} followers</p>

            <div>
              <Button variant="ghost" size="icon" className="size-9">
                <SquareKanbanIcon className={cn("size-6", "rotate-180 text-(--primary-icon)")} />
              </Button>
              <Button variant="ghost" size="icon" className="size-9">
                <InstagramIcon className={cn("size-6", "text-(--primary-icon)")} />
              </Button>
            </div>
          </div>
        </div>

        {/* EDIT BTN */}
        <div className="px-6 py-3">
          <Button variant="outline" className="h-8.5 w-full">
            Edit profile
          </Button>
        </div>

        {/* NAV LINKS */}
        <nav className={cn("flex h-[50px] justify-center gap-0")}>
          {navLinks.map(({ path, name }) => (
            <NavLink
              end
              key={path}
              to={path}
              className={({ isActive }) =>
                cn(
                  "flex-1 border-b",
                  "border-(--primary-outline) text-(--secondary-text)",
                  isActive && "border-(--primary-text) text-(--primary-text)"
                )
              }
            >
              <Button asChild variant="none" className="size-full font-bold text-current transition-transform">
                <span>{name}</span>
              </Button>
            </NavLink>
          ))}
        </nav>

        <Outlet />
      </main>
    </div>
  );
};
