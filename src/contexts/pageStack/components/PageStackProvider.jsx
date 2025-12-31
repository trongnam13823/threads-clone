import { useRef, useState, useCallback, useMemo, memo } from 'react';
import PageStackContext from '../context/PageStackContext';
import RouteRenderer from './RouteRenderer';

export default memo(({ children, path, neverUnmount = [], autoUpdateUrl = true, flag = true }) => {
  const maxId = useRef(1);
  const [history, setHistory] = useState([path]);
  const [pages, setPages] = useState([{ id: 1, path: path }]);

  // Memoize updateUrl để tránh tạo lại callbacks
  const updateUrl = useCallback(
    (path) => {
      if (autoUpdateUrl) {
        window.history.replaceState({}, '', path);
      }
    },
    [autoUpdateUrl]
  );

  const pushPath = useCallback(
    (path) => {
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
    },
    [history, neverUnmount, updateUrl]
  );

  const popPath = useCallback(() => {
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
  }, [history, neverUnmount, updateUrl]);

  const replacePath = useCallback(
    (path) => {
      if (history.at(-1) === path) return;

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
    },
    [neverUnmount, updateUrl, history]
  );

  // Memoize context value để tránh re-render tất cả consumers
  const contextValue = useMemo(
    () => ({
      history,
      pages,
      pushPath,
      popPath,
      replacePath,
    }),
    [history, pages, pushPath, popPath, replacePath]
  );

  return (
    <PageStackContext.Provider value={contextValue}>
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
});
