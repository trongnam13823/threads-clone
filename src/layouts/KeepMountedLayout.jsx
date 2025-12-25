import { useState } from "react";
import { Outlet, useLocation } from "react-router";
import HomeLayout from "./HomeLayout";
import HomePage from "@/pages/Home";
import paths from "@/configs/paths";
import FollowingPage from "@/pages/Home/FollowingPage";

const routes = [
  {
    path: paths.home,
    element: (
      <HomeLayout>
        <HomePage />
      </HomeLayout>
    ),
  },
  {
    path: paths.following,
    element: (
      <HomeLayout>
        <FollowingPage />
      </HomeLayout>
    ),
  },
];

const KeepMountedRoutes = () => {
  const location = useLocation();
  const [mountedPages, setMountedPages] = useState({});

  const pathname = location.pathname;

  if (!mountedPages[pathname]) {
    setMountedPages((prev) => ({ ...prev, [pathname]: true }));
  }

  return (
    <>
      {routes.map(({ path, element }) => (
        <div key={path} style={{ display: pathname === path ? "block" : "none" }}>
          {mountedPages[path] && element}
        </div>
      ))}

      <Outlet />
    </>
  );
};

export default KeepMountedRoutes;
