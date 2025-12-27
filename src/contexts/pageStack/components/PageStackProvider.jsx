import { useRef, useState } from 'react';
import PageStackContext from '../context/PageStackContext';
import RouteRenderer from './RouteRenderer';

const PageStackProvider = ({ children, path, neverUnmount = [], autoUpdateUrl = true }) => {
  neverUnmount = [path, ...neverUnmount];

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
        const [rootPage, ...rest] = prev;
        return [rootPage, { id: ++maxId.current, path }, ...rest];
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
      <div
        className={
          (history.length === 1 && history[0] !== pages[0].path) ||
          (history.length > 1 && history.at(-1) !== pages[0].path)
            ? 'hidden'
            : ''
        }
      >
        {children}
      </div>

      {pages.map(({ id, path }, index) => {
        if (index === 0) return; // page url

        return (
          <RouteRenderer key={id} path={path} className={history.at(-1) !== path ? 'hidden' : ''} />
        );
      })}
    </PageStackContext.Provider>
  );
};

export default PageStackProvider;
