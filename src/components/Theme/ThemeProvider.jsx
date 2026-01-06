import { useEffect } from 'react';
import { useSelector } from 'react-redux';

/**
 * Component để áp dụng theme vào DOM
 * Nên được đặt ở root level của app
 */
export function ThemeProvider({ children }) {
  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    const root = window.document.documentElement;

    // Xóa các class theme cũ
    root.classList.remove('light', 'dark');

    let themeToApply = theme;

    if (theme === 'system') {
      // Lấy theme từ system preference
      themeToApply = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    // Áp dụng theme: thêm class 'light' hoặc 'dark'
    if (themeToApply === 'light') {
      root.classList.add('light');
    } else if (themeToApply === 'dark') {
      root.classList.add('dark');
    }
  }, [theme]);

  // Lắng nghe thay đổi system theme khi theme là "system"
  useEffect(() => {
    if (theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');
      // Thêm class 'light' hoặc 'dark' dựa trên system preference
      if (e.matches) {
        root.classList.add('dark');
      } else {
        root.classList.add('light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  return <>{children}</>;
}
