import Link from "./Link";
import usePageStack from "../hooks/usePageStack";
import isActivePath from "@/utils/isActivePath";

export default function NavLink({ children, to, end, className, ...props }) {
  const { history } = usePageStack();
  const isActive = isActivePath(history.at(-1), to, end);

  const resolvedClassName = typeof className === "function" ? className({ isActive }) : className;

  return (
    <Link to={to} {...props} className={resolvedClassName}>
      {typeof children === "function" ? children({ isActive }) : children}
    </Link>
  );
}
