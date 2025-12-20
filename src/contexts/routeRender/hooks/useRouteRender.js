import { useContext } from "react";
import RenderPathContext from "../RouteRenderContext";

const useRenderPath = () => {
  return useContext(RenderPathContext);
};

export default useRenderPath;
