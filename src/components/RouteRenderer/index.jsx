import routes from "@/configs/routes";
import { RouteRenderProvider } from "@/contexts/routeRender";
import { findMatchingRoute } from "./helper/findMatchingRoute";
import { buildComponentTree } from "./helper/buildComponentTree";

const RouteRenderer = (props) => {
  const { path, start = 1, ...contextValue } = props;

  const matchResult = findMatchingRoute(path, routes);
  if (!matchResult) return null;

  const { layouts, Page } = matchResult;
  const effectiveLayouts = layouts.slice(start).reverse();
  const tree = buildComponentTree(Page, effectiveLayouts);

  return <RouteRenderProvider value={{ path, ...contextValue }}>{tree}</RouteRenderProvider>;
};

export default RouteRenderer;
