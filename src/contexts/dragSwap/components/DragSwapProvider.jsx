import DragSwapContext from "../context/DragSwapContext";

const DragSwapProvider = ({ children, getHandleProps, isDragging, draggingId, data }) => {
  return (
    <DragSwapContext.Provider value={{ getHandleProps, isDragging, draggingId, data, isDraggable: true }}>
      {children}
    </DragSwapContext.Provider>
  );
};

export default DragSwapProvider;
