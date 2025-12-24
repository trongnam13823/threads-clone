import usePageStack from "../hooks/usePageStack";
import { useNavigate } from "react-router";

export default function Back({ children, ...props }) {
  const { popPath, history, isPreventDefault } = usePageStack();
  const navigate = useNavigate();

  const handleClick = () => {
    popPath((next) => {
      if (!isPreventDefault) {
        navigate(next);
      }
    });
  };

  return history.length > 1 ? (
    <div {...props} onClick={handleClick}>
      {children}
    </div>
  ) : null;
}
