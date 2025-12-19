import { matchPath } from "react-router";
import Link from "./Link";
import { useHistory } from "@/contexts/history";
import paths from "@/configs/paths";

const NavLink = ({ to, end = false, children, ...props }) => {
  const { currentPath } = useHistory();

  const isActive =
    to === paths.home
      ? currentPath === paths.home
      : !!matchPath({ path: to, end }, currentPath);

  const content =
    typeof children === "function"
      ? children({ isActive, currentPath })
      : children;

  return (
    <Link to={to} {...props}>
      {content}
    </Link>
  );
};

export default NavLink;
