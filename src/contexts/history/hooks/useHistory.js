import { useContext } from "react";
import HistoryContext from "../HistoryContext";

const useHistory = () => {
  return useContext(HistoryContext);
};

export default useHistory;
