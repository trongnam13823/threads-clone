import usePageStack from "../hooks/usePageStack";

export default function Link({ children, to, replace, ...props }) {
  const { pushPath, replacePath } = usePageStack();

  const handleClick = () => {
    if (replace) {
      replacePath(to);
      return;
    }

    pushPath(to);
  };

  return (
    <div to={to} {...props} onClick={handleClick}>
      {children}
    </div>
  );
}
