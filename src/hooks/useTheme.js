import { useSelector, useDispatch } from 'react-redux';
import { setTheme } from '@/features/theme/themeSlice';

/**
 * Hook để sử dụng theme từ Redux store
 * @returns {Object} { theme, setTheme }
 */
export function useTheme() {
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  const handleSetTheme = (newTheme) => {
    dispatch(setTheme(newTheme));
  };

  return {
    theme,
    setTheme: handleSetTheme,
  };
}

