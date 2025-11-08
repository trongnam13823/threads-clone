import { Navigation } from "@/components/Navigation";
import { Outlet } from "react-router";
import { Header } from "@/components/Header";
import { CreatePostButton } from "@/components/CreatePostButton";
import { cn } from "@/lib/utils";

export const DefaultLayout = () => {
  return (
    <>
      {/* HEADER SHOW ON MOBILE */}
      <Header />

      {/* BORDER FOR MAIN */}
      <div
        className={cn(
          "pointer-events-none fixed left-1/2 h-svh -translate-x-1/2 rounded-t-3xl border",
          "top-(--header-height) w-(--column-layout-max-width) border-(--primary-column-outline) bg-(--elevated-background)",
          "max-md:hidden"
        )}
      />
      {/* BACKGROUND & SHADOW FOR MAIN */}
      <div
        className={cn(
          "pointer-events-none fixed left-1/2 z-10 h-svh -translate-x-1/2 rounded-t-3xl",
          "top-(--header-height) w-(--column-layout-max-width) shadow-[0_0_12px_0_var(--box-shadow-04)]",
          "max-md:hidden"
        )}
      />

      {/* MAIN */}
      <main
        className={cn(
          "relative mx-auto flex min-h-svh items-center justify-center",
          "w-(--column-layout-max-width)",
          "max-md:w-full max-md:py-(--header-height)"
        )}
      >
        <Outlet />
      </main>

      {/* NAVIGATION BAR */}
      <Navigation />

      {/* CREATE POST BTN FLOAT */}
      <CreatePostButton />
    </>
  );
};
