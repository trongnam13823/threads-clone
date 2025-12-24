import { memo } from "react";
import PageStackProvider from "./PageStackProvider";
import PageStackView from "./PageStackView";

const PageStackRouter = memo(function PageStackRouter(props) {
  return (
    <PageStackProvider {...props}>
      <PageStackView />
    </PageStackProvider>
  );
});

export default PageStackRouter;
