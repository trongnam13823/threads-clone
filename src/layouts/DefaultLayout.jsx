import NavDesktop from "@/components/NavBar/NavDesktop";
import NavMobile from "@/components/NavBar/NavMobile";
import CreatePostFAB from "@/components/Post/CreatePostFAB";

const DefaultLayout = ({ children }) => {
  return (
    <>
      {children}

      <NavDesktop />
      <NavMobile />
      <CreatePostFAB />
    </>
  );
};

export default DefaultLayout;
