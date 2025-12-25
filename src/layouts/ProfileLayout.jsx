import { Outlet } from "react-router";
import ColumnLayout from "./ColumnLayout";
import PageStackProvider from "@/contexts/PageStack/components/PageStackProvider";
import paths from "@/configs/paths";
import { useSelector } from "react-redux";

const ProfileLayout = ({ children, className, fromRouteRenderer }) => {
  const userInfo = useSelector((state) => state.auth.userInfo);

  const content = (
    <ColumnLayout className={className}>
      <ColumnLayout.Header>Profile Layout</ColumnLayout.Header>
      <ColumnLayout.Content>{children ? children : <Outlet />}</ColumnLayout.Content>
    </ColumnLayout>
  );

  if (fromRouteRenderer) return content;

  return (
    <PageStackProvider pathname={paths.profile(userInfo.username)} neverUnmount={paths.following}>
      {content}
    </PageStackProvider>
  );
};

export default ProfileLayout;
