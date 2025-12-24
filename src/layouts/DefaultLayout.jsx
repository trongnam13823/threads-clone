import NavDesktop from "@/components/NavBar/NavDesktop";
import NavMobile from "@/components/NavBar/NavMobile";
import CreatePostFAB from "@/components/Post/CreatePostFAB";
import { Outlet } from "react-router";

const DefaultLayout = ({ children }) => {
  return (
    <>
      {children ? children : <Outlet />}

      <NavDesktop />
      <NavMobile />
      <CreatePostFAB />
    </>
  );
};

export default DefaultLayout;
