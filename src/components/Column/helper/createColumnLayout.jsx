import { Outlet } from "react-router";
import PageStackProvider from "@/contexts/pageStack/components/PageStackProvider";
import paths from "@/configs/paths";
import ColumnLayout from "../ColumnLayout";

const createColumnLayout = (header, defaultPath) => {
  return ({ children, className, fromRouteRenderer, routeRendererPath, autoUpdateUrl }) => {
    const content = (
      <ColumnLayout className={className}>
        {header}

        <ColumnLayout.Content>{children ? children : <Outlet />}</ColumnLayout.Content>
      </ColumnLayout>
    );

    if (fromRouteRenderer) return content;

    const url = routeRendererPath ?? defaultPath;

    return (
      <PageStackProvider url={url} neverUnmount={paths.following} autoUpdateUrl={autoUpdateUrl}>
        {content}
      </PageStackProvider>
    );
  };
};

export default createColumnLayout;
