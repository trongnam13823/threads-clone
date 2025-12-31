import { useContext } from 'react';
import InfiniteScrollContext from '../context/InfiniteScrollContext';

const useInfiniteScroll = () => {
  return useContext(InfiniteScrollContext);
};

export default useInfiniteScroll;
