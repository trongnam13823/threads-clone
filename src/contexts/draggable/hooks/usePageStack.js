import { useContext } from "react";
import DraggableContext from "../context/DraggableContext";

export const useDraggable = () => {
  const context = useContext(DraggableContext);

  return context ?? {};
};
