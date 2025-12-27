import { useRef, useState } from 'react';
import PageStackContext from '../context/PageStackContext';
import RouteRenderer from './RouteRenderer';

const PageStackProvider = ({
  children,
  path,
  neverUnmount = [],
  autoUpdateUrl = true,
  flag = true,
}) => {
  const maxId = useRef(1);
  const [history, setHistory] = useState([path]);
  const [pages, setPages] = useState([{ id: 1, path: path }]);

  const updateUrl = (path) => {
    if (autoUpdateUrl) {
      window.history.replaceState({}, '', path);
    }
  };

  const pushPath = (path) => {
    if (history.at(-1) === path) return;

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

    updateUrl(path);
  };

  const popPath = () => {
    if (history.length === 1) return;

    const currentPath = history.at(-1);
    const newHistory = history.slice(0, -1);

    setHistory(newHistory);

    setPages((prev) => {
      const isNeverUnmount = neverUnmount.includes(currentPath);

      if (isNeverUnmount) return [...prev];
      else return prev.slice(0, -1);
    });

    updateUrl(newHistory.at(-1));
  };

  const replacePath = (path) => {
    setHistory([path]);

    setPages((prev) => {
      const isNeverUnmount = neverUnmount.includes(path);
      let neverUnmountPages = prev.filter((p) => neverUnmount.includes(p.path));

      if (isNeverUnmount) {
        // đã có không thêm vào nữa
        if (neverUnmountPages.find((p) => p.path === path)) return neverUnmountPages;
      }

      return [...neverUnmountPages, { id: ++maxId.current, path }];
    });

    updateUrl(path);
  };

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
      {pages.map(({ id, path }) => {
        return (
          <RouteRenderer
            flag={flag}
            key={id}
            path={path}
            className={history.at(-1) !== path ? 'hidden' : ''}
          />
        );
      })}

      {children}
    </PageStackContext.Provider>
  );
};

export default PageStackProvider;
