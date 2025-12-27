import { cloneElement, isValidElement } from 'react';
import usePageStack from '../hooks/usePageStack';

export default function Back({ children }) {
  const { history, popPath } = usePageStack();

  if (!history || history.length <= 1) return null;

  if (!isValidElement(children)) {
    console.warn('<Back /> chỉ nhận 1 React element làm children');
    return null;
  }

  const handleClick = (e) => {
    children.props.onClick?.(e); // giữ onClick cũ nếu có
    popPath();
  };

  return cloneElement(children, {
    onClick: handleClick,
    style: { cursor: 'pointer', ...children.props.style },
  });
}
