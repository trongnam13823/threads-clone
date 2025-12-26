import { cn } from "@/lib/utils";
import usePageStack from "../hooks/usePageStack";

export default function Link({ children, to, replace, className, ...props }) {
  const { pushPath, replacePath } = usePageStack();

  const handleClick = () => {
    if (replace) {
      replacePath(to);
      return;
    }

    pushPath(to);
  };

  return (
    <a className={cn("cursor-pointer", className)} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
