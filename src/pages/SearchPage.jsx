import { SearchUserItem } from "@/components/Search/SearchUserItem";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { users } from "@/mocksAPI";
import { EllipsisIcon, SearchIcon, SlidersHorizontalIcon } from "lucide-react";

export const SearchPage = () => {
  return (
    <div className="flex size-full min-h-svh flex-col">
      <header
        className={cn(
          "flex items-center justify-center",
          "h-(--header-height)",
          "hidden md:sticky md:top-0 md:block md:bg-(--secondary-background)"
        )}
      >
        {/* HEADING */}
        <div className="mx-auto flex h-full w-fit cursor-pointer items-center justify-center p-2">
          <p className="font-bold">Tìm kiếm</p>
        </div>

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

      <main className="flex flex-1 items-center justify-center p-px pb-3">
        <div className="flex-1 self-start">
          {/* INPUT */}
          <div className="px-6 pt-6">
            <div className="flex h-11 items-center gap-2 rounded-2xl border border-(--lines-primary) bg-(--secondary-background) px-4">
              <label htmlFor="search-input">
                <SearchIcon className="text-(--navigation-icon)" size={20} />
              </label>
              <input
                id="search-input"
                type="text"
                className="flex-1 text-(--primary-text) outline-none placeholder:text-(--secondary-text)"
                placeholder="Tìm kiếm"
              />
              <Button variant="ghost" size="icon" className="p-2">
                <SlidersHorizontalIcon className="size-5 text-(--navigation-icon)" />
              </Button>
            </div>
          </div>

          <h2 className="px-6 pt-5 pb-1.5 font-bold text-(--secondary-text)">Gợi ý theo dõi</h2>

          <div className="flex flex-col">
            {users.map((user) => (
              <SearchUserItem key={user.username} {...user} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
