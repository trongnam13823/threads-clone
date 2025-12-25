import { useMatch } from "react-router";
import Link from "./Link";

export default function NavLink({ children, to, end = true, ...props }) {
  const isActive = !!useMatch({ path: to, end });

  return (
    <Link to={to} {...props}>
      {typeof children === "function" ? children({ isActive }) : children}
    </Link>
  );
}
