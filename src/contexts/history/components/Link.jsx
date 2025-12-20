import { Link as LinkRouter } from "react-router";
import { useHistory } from "@/contexts/history";
import { useColumn } from "@/contexts/column";

const Link = ({ to, children, replace, ...props }) => {
  const columnData = useColumn();
  const { pushPath, replacePath, currentPath } = useHistory();

  const handleClick = (e) => {
    if (columnData) {
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
