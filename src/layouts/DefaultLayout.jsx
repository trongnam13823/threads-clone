import paths from "@/configs/paths";
import { Outlet, useLocation } from "react-router";
import NavDesktop from "@/components/NavBar/NavDesktop";
import NavMobile from "@/components/NavBar/NavMobile";
import CreatePostFAB from "@/components/Post/CreatePostFAB";
import Home from "@/pages/Home";

const DefaultLayout = () => {
  const { pathname } = useLocation();

  return (
    <div className="relative h-svh w-svw">
      <Home className={pathname !== paths.home && "layer--hide"} />

      <Outlet />

      <NavDesktop />
      <NavMobile />
      <CreatePostFAB />
    </div>
  );
};

export default DefaultLayout;
