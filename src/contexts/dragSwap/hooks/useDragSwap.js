import { useContext } from "react";
import DragSwapContext from "../context/DragSwapContext";

const useDragSwap = () => {
  return useContext(DragSwapContext);
};

export default useDragSwap;
