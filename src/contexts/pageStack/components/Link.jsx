import { cn } from '@/lib/utils';
import usePageStack from '../hooks/usePageStack';

export default function Link({ children, to, replace, className, onClick, ...props }) {
  const { pushPath, replacePath } = usePageStack();

  const handleClick = (e) => {
    if (replace) {
      replacePath(to);
    } else {
      pushPath(to);
    }

    // Call custom onClick handler if provided
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <a className={cn('cursor-pointer', className)} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
