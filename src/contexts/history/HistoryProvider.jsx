import { useState, useMemo } from "react";
import HistoryContext from "./HistoryContext";

const HistoryProvider = ({ children, isNavBlocked = false }) => {
  const [history, setHistory] = useState([window.location.pathname]);

  const replacePath = (path) => {
    setHistory([path]);
  };

  const pushPath = (path) => {
    setHistory((prev) => [...prev, path]);
  };

  const popPath = (callback) => {
    setHistory((prev) => {
      if (prev.length === 0) return prev;
      const newHistory = prev.slice(0, prev.length - 1);
      const nextPath = newHistory[newHistory.length - 1] || null;
      if (callback) callback(nextPath);
      return newHistory;
    });
  };

  const currentPath = useMemo(() => {
    return history.length > 0 ? history[history.length - 1] : null;
  }, [history]);

  return (
    <HistoryContext.Provider value={{ history, currentPath, isNavBlocked, pushPath, popPath, replacePath }}>
      {children}
    </HistoryContext.Provider>
  );
};

export default HistoryProvider;
