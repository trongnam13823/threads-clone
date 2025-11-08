import { Menu } from "./Menu";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

export const Header = () => {
  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-20 flex items-center justify-center backdrop-blur-lg",
        "h-(--header-height) bg-(--header-background)",
        "md:hidden"
      )}
    >
      {/* LOGO */}
      <Logo size={32} />

      {/* MENU BTN */}
      <div className="absolute right-4">
        <Menu />
      </div>
    </header>
  );
};
