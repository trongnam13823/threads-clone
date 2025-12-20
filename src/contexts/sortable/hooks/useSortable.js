import { useContext } from "react";
import SortableContext from "../SortableContext";

const useSortable = () => {
  return useContext(SortableContext);
};

export default useSortable;
