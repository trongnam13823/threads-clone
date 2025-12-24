import { useContext } from "react";
import PageStackContext from "../context/PageStackContext";

const usePageStack = () => {
  return useContext(PageStackContext);
};

export default usePageStack;
