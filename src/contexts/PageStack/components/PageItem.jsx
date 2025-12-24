import { memo } from "react";
import RouteRenderer from "./RouteRenderer";

const PageItem = memo(function PageItem({ path, isActive, routes, layout }) {
  return (
    <div className={`absolute inset-0 overflow-auto ${isActive ? "block" : "hidden"}`}>
      <RouteRenderer routes={routes} layout={layout} path={path} />
    </div>
  );
});

export default PageItem;
