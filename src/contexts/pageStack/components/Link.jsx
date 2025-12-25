import usePageStack from "../hooks/usePageStack";

export default function Link({ children, to, replace }) {
  const { pushPath, replacePath } = usePageStack();

  const handleClick = () => {
    if (replace) {
      replacePath(to);
      return;
    }

    pushPath(to);
  };

  return (
    <div className="cursor-pointer text-pink-400" onClick={handleClick}>
      {children}
    </div>
  );
}
