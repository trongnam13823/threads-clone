import PageStackProvider from './PageStackProvider';

export default function MaybePageStack({ enabled, url, autoUpdateUrl, neverUnmount, children }) {
  if (!enabled) return children;

  return (
    <PageStackProvider url={url} neverUnmount={neverUnmount} autoUpdateUrl={autoUpdateUrl}>
      {children}
    </PageStackProvider>
  );
}
