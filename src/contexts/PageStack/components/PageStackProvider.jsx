import { useState, useRef, useMemo, useEffect } from "react";
import PageStackContext from "../context/PageStackContext";

const PageStackProvider = ({ children, layout, neverUnmount = [], isPreventDefault = false, data }) => {
  const maxId = useRef(1);

  const [history, setHistory] = useState([]);
  const [pages, setPages] = useState([]);

  const pushPath = (path) => {
    if (history.length > 0 && path === history.at(-1)) return;

    if (!isPreventDefault) {
      window.history.pushState({}, "", path);
    }

    setHistory((prev) => [...prev, path]);

    setPages((prev) => {
      const isNeverUnmount = neverUnmount.includes(path);
      const isNewPath = prev.every((p) => p.path !== path);

      if (isNeverUnmount && isNewPath) {
        return [{ id: ++maxId.current, path }, ...prev];
      }

      if (!isNeverUnmount) {
        return [...prev, { id: ++maxId.current, path }];
      }

      return [...prev];
    });
  };

  const popPath = (callback) => {
    if (history.length === 0) {
      return;
    }

    const currentPath = history.at(-1);

    const newHistory = history.slice(0, -1);
    const nextPath = newHistory.at(-1);

    setHistory(newHistory);

    setPages((prev) => {
      const isNeverUnmount = neverUnmount.includes(currentPath);

      if (isNeverUnmount) return [...prev];
      else return prev.slice(0, -1);
    });

    callback?.(nextPath);
  };

  const replacePath = (path) => {
    setHistory([path]);

    setPages((prev) => {
      const isNeverUnmount = neverUnmount.includes(path);
      let neverUnmountPages = prev.filter((p) => neverUnmount.includes(p.path));

      if (isNeverUnmount && neverUnmountPages.find((p) => p.path === path)) {
        return neverUnmountPages;
      }

      return [...neverUnmountPages, { id: ++maxId.current, path }];
    });
  };

  useEffect(() => {
    const handle = () => popPath();
    window.addEventListener("popstate", handle);
    return () => window.removeEventListener("popstate", handle);
  }, [history]);

  useEffect(() => {
    return () => {
      console.log(123);
      setHistory([]);
      setPages([]);
    };
  }, []);

  const currentPath = useMemo(() => history.at(-1), [history]);

  const currentPage = useMemo(
    () => (neverUnmount.includes(currentPath) ? pages.find((p) => p.path === currentPath) : pages.at(-1)),
    [pages, currentPath, neverUnmount]
  );

  return (
    <PageStackContext.Provider
      value={{
        pages,
        history,
        currentPage,
        currentPath,
        pushPath,
        popPath,
        replacePath,
        layout,
        data,
        isPreventDefault,
      }}
    >
      {children}
    </PageStackContext.Provider>
  );
};

export default PageStackProvider;
