import usePageStack from "../hooks/usePageStack";

export default function Back({ children, ...props }) {
  const { history, popPath } = usePageStack();

  const handleClick = () => {
    popPath();
  };

  return history && history.length > 0 ? (
    <div className="cursor-pointer" {...props} onClick={handleClick}>
      {children}
    </div>
  ) : null;
}
