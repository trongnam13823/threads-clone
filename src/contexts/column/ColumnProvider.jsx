import ColumnContext from "./ColumnContext";

const ColumnProvider = ({ children, value }) => {
  return <ColumnContext.Provider value={value}>{children}</ColumnContext.Provider>;
};

export default ColumnProvider;
