import InfiniteScrollProvider from '../components/InfiniteScrollProvider';

const withInfiniteScroll = (WrappedComponent) => {
  const WithInfiniteScroll = (props) => {
    return (
      <InfiniteScrollProvider>
        <WrappedComponent {...props} />
      </InfiniteScrollProvider>
    );
  };

  WithInfiniteScroll.displayName = `withInfiniteScroll(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;

  return WithInfiniteScroll;
};

export default withInfiniteScroll;
