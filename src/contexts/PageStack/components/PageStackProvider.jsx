import { useEffect, useState } from "react";
import PageStackContext from "../context/PageStackContext";
import RouteRenderer from "./RouteRenderer";

const PageStackProvider = ({ children, page }) => {
  const [pages, setPages] = useState([]);

  const pushPage = (to) => {
    if (pages.length > 0 && to === pages.at(-1)) return;
    setPages((prev) => [...prev, to]);
  };

  const popPage = () => {
    if (pages.length === 0) return;
    setPages((prev) => prev.slice(0, -1));
  };

  const replacePage = (to) => {
    setPages([to]);
  };

  useEffect(() => {
    window.history.replaceState({}, "", pages.at(-1) ?? page);
  }, [pages]);

  return (
    <PageStackContext.Provider
      value={{
        pages,
        pushPage,
        popPage,
        replacePage,
      }}
    >
      {children}

      {pages.map((page, index) => (
        <RouteRenderer key={index} path={page} />
      ))}
    </PageStackContext.Provider>
  );
};

export default PageStackProvider;
