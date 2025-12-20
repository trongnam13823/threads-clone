import SortableContext from "./SortableContext";

const SortableProvider = ({ children, value }) => {
  return <SortableContext.Provider value={value}>{children}</SortableContext.Provider>;
};

export default SortableProvider;
