import { Outlet } from "react-router";
import ColumnLayout from "./ColumnLayout";
import PageStackProvider from "@/contexts/PageStack/components/PageStackProvider";
import paths from "@/configs/paths";

const HomeLayout = ({ children, className, fromRouteRenderer }) => {
  const content = (
    <ColumnLayout className={className}>
      <ColumnLayout.Header>Home Layout</ColumnLayout.Header>
      <ColumnLayout.Content>{children ? children : <Outlet />}</ColumnLayout.Content>
    </ColumnLayout>
  );

  if (fromRouteRenderer) return content;

  return <PageStackProvider page={paths.home}>{content}</PageStackProvider>;
};

export default HomeLayout;
