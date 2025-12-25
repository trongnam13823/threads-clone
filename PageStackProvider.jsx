import { useState, useRef, useMemo } from "react";
import { useLocation } from "react-router";
import PageStackContext from "../context/PageStackContext";

const PageStackProvider = ({
  children,
  routes,
  layout,
  pathname,
  neverUnmount = [],
  isPreventDefault = false,
  data,
}) => {
  if (!Array.isArray(routes) || routes.length === 0) {
    throw new Error("PageStackProvider: `routes` prop must be a non-empty array!");
  }

  const maxId = useRef(1);

  const { pathname: url } = useLocation();
  const initialPath = isPreventDefault && pathname ? pathname : url;

  const [history, setHistory] = useState([initialPath]);
  const [pages, setPages] = useState([{ id: 1, path: initialPath }]);

  const pushPath = (path) => {
    if (path === history.at(-1)) return;

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
    if (history.length === 1) {
      callback?.(history[0]);
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
        routes,
        data,
        isPreventDefault,
      }}
    >
      <div className="relative size-full">{children}</div>
    </PageStackContext.Provider>
  );
};

export default PageStackProvider;
