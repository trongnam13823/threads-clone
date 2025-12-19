import { useContext } from "react";
import ColumnContext from "../ColumnContext";

const useColumn = () => {
  return useContext(ColumnContext);
};

export default useColumn;
