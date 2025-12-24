import usePageStack from "../hooks/usePageStack";
import { Link as LinkRouter } from "react-router";

export default function Link({ children, to, replace, ...props }) {
  const { pushPath, replacePath, isPreventDefault } = usePageStack();

  const handleClick = (e) => {
    if (isPreventDefault) e.preventDefault();

    if (replace) {
      replacePath(to);
      return;
    }

    pushPath(to);
  };

  return (
    <LinkRouter to={to} {...props} onClick={handleClick} replace>
      {children}
    </LinkRouter>
  );
}
