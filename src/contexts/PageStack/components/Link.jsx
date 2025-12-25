import usePageStack from "../hooks/usePageStack";

export default function Link({ children, to, replace }) {
  const { pushPage, replacePage } = usePageStack();

  const handleClick = () => {
    if (replace) {
      replacePage(to);
      return;
    }

    pushPage(to);
  };

  return (
    <div className="cursor-pointer text-pink-400" onClick={handleClick}>
      {children}
    </div>
  );
}
