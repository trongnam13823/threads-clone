import usePageStack from "../hooks/usePageStack";

export default function Back({ children, ...props }) {
  const { pages, popPage } = usePageStack();

  const handleClick = () => {
    popPage();
  };

  return pages && pages.length > 0 ? (
    <div className="cursor-pointer" {...props} onClick={handleClick}>
      {children}
    </div>
  ) : null;
}
