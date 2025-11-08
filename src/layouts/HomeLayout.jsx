import { Button } from "@/components/ui/button";
import paths from "@/configs/paths";
import { usePreserveScroll } from "@/hooks/usePreserveScroll";
import { cn } from "@/lib/utils";
import { EllipsisIcon } from "lucide-react";
import { Outlet } from "react-router";
import { NavLink } from "react-router";

export const HomeLayout = () => {
  const navLinks = [
    { path: paths.home, name: "For you" },
    { path: paths.following, name: "Following" },
    { path: paths.ghostPosts, name: "Ghost posts" },
  ];

  usePreserveScroll();

  return (
    <div className="flex size-full min-h-svh flex-col">
      <header className={cn("h-(--header-height)", "md:sticky md:top-0 md:bg-(--secondary-background)")}>
        {/* NAV */}
        <nav className={cn("flex h-full justify-center gap-8", "max-md:gap-0")}>
          {navLinks.map(({ path, name }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                cn(
                  "flex h-full items-center justify-center px-2",
                  "border-(--primary-outline) text-(--secondary-text)",
                  "max-md:flex-1 max-md:border-b-2",
                  isActive && "border-(--primary-text) text-(--primary-text)"
                )
              }
            >
              <Button asChild variant="none" className="font-bold text-current transition-transform">
                <span>{name}</span>
              </Button>
            </NavLink>
          ))}
        </nav>

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

      <main className="flex flex-1 items-center justify-center p-px">
        <Outlet />
      </main>
    </div>
  );
};
