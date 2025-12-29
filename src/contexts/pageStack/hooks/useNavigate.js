import { useCallback } from 'react';
import usePageStack from './usePageStack';

const useNavigate = () => {
  const { pushPath, popPath, replacePath } = usePageStack();

  const navigate = useCallback(
    (to, options = {}) => {
      // Handle numeric navigation (e.g., -1 for back)
      if (typeof to === 'number') {
        if (to === -1) {
          popPath();
        }
        // Could extend to support multiple back steps if needed
        return;
      }

      // Handle path navigation
      if (options.replace) {
        replacePath(to);
      } else {
        pushPath(to);
      }
    },
    [pushPath, popPath, replacePath]
  );

  return navigate;
};

export default useNavigate;
