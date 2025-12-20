import RouteRenderContext from "./RouteRenderContext";

const RouteRenderProvider = ({ children, value }) => {
  return <RouteRenderContext.Provider value={value}>{children}</RouteRenderContext.Provider>;
};

export default RouteRenderProvider;
