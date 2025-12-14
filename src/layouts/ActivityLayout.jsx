import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import paths from "@/configs/paths";
import { cn } from "@/lib/utils";
import { CheckIcon, ChevronDownIcon, EllipsisIcon } from "lucide-react";
import { NavLink, Outlet, useLocation } from "react-router";

export const ActivityLayout = () => {
  const { pathname } = useLocation();
  const navLinks = [
    { path: paths.activity, name: "Tất cả", title: "Hoạt động" },
    { path: paths.activityFollows, name: "Lượt theo dõi" },
    { path: paths.activityReplies, name: "Thread trả lời" },
    { path: paths.activityMentions, name: "Lượt nhắc" },
    { path: paths.activityQuotes, name: "Lượt trích dẫn" },
    { path: paths.activityReposts, name: "Bài đăng lại" },
    { path: paths.activityVerified, name: "Đã xác minh" },
  ];

  const currentNav = navLinks.find((item) => item.path === pathname);

  return (
    <div className="flex size-full min-h-svh flex-col">
      <header
        className={cn(
          "flex items-center justify-center",
          "h-(--header-height)",
          "md:sticky md:top-0 md:bg-(--secondary-background)"
        )}
      >
        {/* HEADING DESKTOP*/}
        <div className="mx-auto flex h-full w-fit cursor-pointer items-center justify-center gap-4 p-2 text-center max-md:hidden">
          <p className="font-bold">{currentNav?.title || currentNav?.name || ""}</p>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon-sm"
                className={cn("shadow-[0_2px_8px_0_var(--box-shadow-08)]", "hover:scale-105")}
              >
                <ChevronDownIcon className="size-4.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {navLinks.map(({ path, name }) => (
                <NavLink end key={path} to={path} className="w-full">
                  {({ isActive }) => (
                    <DropdownMenuItem className="flex items-center justify-between">
                      <span>{name}</span>
                      {isActive && <CheckIcon className="size-5 text-(--primary-text)" />}
                    </DropdownMenuItem>
                  )}
                </NavLink>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {/* HEADING MOBILE */}
        <ScrollArea className="max-w-full md:hidden" type="always">
          <div className="mb-4 flex gap-1.5 px-3 py-1">
            {navLinks.map(({ path, name }) => (
              <NavLink
                end
                key={path}
                to={path}
                className={({ isActive }) =>
                  cn(
                    "shrink-0 rounded-full border border-(--lines-primary) px-4 leading-[34px] font-bold",
                    isActive ? "bg-(--tertiary-background)" : ""
                  )
                }
              >
                <span>{name}</span>
              </NavLink>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        {/* </div> */}

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
