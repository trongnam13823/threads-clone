import { Outlet } from "react-router";
import ColumnLayout from "./ColumnLayout";
import PageStackProvider from "@/contexts/PageStack/components/PageStackProvider";
import paths from "@/configs/paths";

const SearchLayout = ({ children, className, fromRouteRenderer }) => {
  const content = (
    <ColumnLayout className={className}>
      <ColumnLayout.Header>Search Layout</ColumnLayout.Header>
      <ColumnLayout.Content>{children ? children : <Outlet />}</ColumnLayout.Content>
    </ColumnLayout>
  );

  if (fromRouteRenderer) return content;

  return (
    <PageStackProvider url={paths.search} neverUnmount={paths.following}>
      {content}
    </PageStackProvider>
  );
};

export default SearchLayout;
