import { Link as LinkRouter } from "react-router";
import { useHistory } from "@/contexts/history";

const Link = ({ to, children, replace, ...props }) => {
  const { isNavBlocked } = useHistory();
  const { pushPath, replacePath, currentPath } = useHistory();

  const handleClick = (e) => {
    if (isNavBlocked) {
      e.preventDefault();
    }

    if (currentPath === to) return;

    replace ? replacePath(to) : pushPath(to);
  };

  return (
    <LinkRouter to={to} onClick={handleClick} replace={replace} {...props}>
      {children}
    </LinkRouter>
  );
};

export default Link;
