import { useLocation } from 'react-router';
import PageStackProvider from './PageStackProvider';

export default function MaybePageStack({ enabled, path, autoUpdateUrl, neverUnmount, children }) {
  const { pathname } = useLocation();

  if (!enabled) return children;

  return (
    <PageStackProvider
      path={path ?? pathname}
      neverUnmount={neverUnmount}
      autoUpdateUrl={autoUpdateUrl}
    >
      {children}
    </PageStackProvider>
  );
}
