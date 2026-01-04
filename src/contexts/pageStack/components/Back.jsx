import { cloneElement, isValidElement } from 'react';
import usePageStack from '../hooks/usePageStack';
import useNavigate from '../hooks/useNavigate';
import paths from '@/configs/paths';

export default function Back({ children, showBack = false }) {
  const { history, popPath } = usePageStack();
  const navigate = useNavigate();

  if ((!history || history.length <= 1) && !showBack) return null;

  if (!isValidElement(children)) {
    console.warn('<Back /> chỉ nhận 1 React element làm children');
    return null;
  }

  const handleClick = (e) => {
    children.props.onClick?.(e);

    if (showBack && history.length <= 1) {
      navigate(paths.home, { replace: true });
      return;
    }

    popPath();
  };

  return cloneElement(children, {
    onClick: handleClick,
    style: { cursor: 'pointer', ...children.props.style },
  });
}
