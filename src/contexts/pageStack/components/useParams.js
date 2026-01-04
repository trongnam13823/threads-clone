import { useMemo } from 'react';
import { matchRoutes } from 'react-router';
import usePageStack from '../hooks/usePageStack';
import routes from '@/configs/routes';

/**
 * Hook để lấy params từ URL path hiện tại
 * Tương tự như useParams từ react-router nhưng hoạt động với pageStack context
 *
 * @returns {Object} Object chứa các params từ URL (ví dụ: { postId: '123', username: 'user' })
 */
const useParams = () => {
  const { history } = usePageStack();
  const currentPath = history?.at(-1) || '';

  const params = useMemo(() => {
    if (!currentPath) return {};

    const matches = matchRoutes(routes, currentPath);
    if (!matches || matches.length === 0) return {};

    // Lấy params từ match cuối cùng (match sâu nhất trong route tree)
    const lastMatch = matches[matches.length - 1];
    return lastMatch.params || {};
  }, [currentPath]);

  return params;
};

export default useParams;
