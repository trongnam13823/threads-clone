import { cn } from "@/lib/utils";
import HomePage from "@/pages/Home";
import HomeColsPage from "@/pages/Home/HomeColsPage";
import { ListPlusIcon } from "lucide-react";
import HomeLayout from "./HomeLayout";
import { useSelector } from "react-redux";

const HomeColsLayout = () => {
  const columns = useSelector((s) => s.auth.columns);

  return (
    <>
      <HomeLayout className={cn(columns.length > 0 ? "hidden" : "block", "max-md:block")}>
        <HomePage />
        <button className="group fixed top-1/2 right-[calc(50%-var(--column-max-w)/2-10px)] z-20 flex size-9 translate-x-full -translate-y-1/2 items-center justify-center rounded-full bg-(--floating-button-background) max-lg:right-[calc(50%-var(--column-max-w)/2-var(--nav-desktop-w)/2-10px)] max-md:hidden">
          <ListPlusIcon className="ml-0.5 size-5 text-(--navigation-icon) group-hover:text-(--icon-primary)" />
        </button>
      </HomeLayout>

      <HomeColsPage className={cn(columns.length > 0 ? "block" : "hidden", "max-md:hidden")} />
    </>
  );
};
export default HomeColsLayout;
