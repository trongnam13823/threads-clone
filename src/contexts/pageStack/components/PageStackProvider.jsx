import { useEffect, useRef, useState } from "react";
import PageStackContext from "../context/PageStackContext";
import RouteRenderer from "./RouteRenderer";
import { cn } from "@/lib/utils";

const PageStackProvider = ({ children, url, neverUnmount = [], autoUpdateUrl = true }) => {
  const maxId = useRef(1);
  const [history, setHistory] = useState([]);
  const [pages, setPages] = useState([]);

  const pushPath = (path) => {
    if (history.length > 0 && path === history.at(-1)) return;
    if (!history.length && path === url) return;

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

  const popPath = () => {
    if (history.length === 0) return;

    const currentPath = history.at(-1);
    const newHistory = history.slice(0, -1);

    setHistory(newHistory);

    setPages((prev) => {
      const isNeverUnmount = neverUnmount.includes(currentPath);

      if (isNeverUnmount) return [...prev];
      else return prev.slice(0, -1);
    });
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
    if (autoUpdateUrl) window.history.replaceState({}, "", history.at(-1) ?? url);
  }, [history]);

  return (
    <PageStackContext.Provider
      value={{
        history,
        pages,
        pushPath,
        popPath,
        replacePath,
      }}
    >
      <div className={cn("size-full", history.length > 0 ? "hidden opacity-0" : "")}>{children}</div>

      {pages.map(({ id, path }) => (
        <RouteRenderer
          key={id}
          path={path}
          className={cn("size-full", history.at(-1) !== path ? "hidden opacity-0" : "")}
        />
      ))}
    </PageStackContext.Provider>
  );
};

export default PageStackProvider;
