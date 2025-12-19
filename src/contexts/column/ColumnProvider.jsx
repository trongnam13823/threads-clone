import ColumnContext from "./ColumnContext";

const ColumnProvider = ({ children, columnData }) => {
  return (
    <ColumnContext.Provider value={{ columnData }}>
      {children}
    </ColumnContext.Provider>
  );
};

export default ColumnProvider;
