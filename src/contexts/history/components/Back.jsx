import { cloneElement, isValidElement } from "react";
import { useColumn } from "@/contexts/column";
import { useHistory } from "@/contexts/history";
import { useNavigate } from "react-router";

const Back = ({ children, asChild = false }) => {
  const { popPath, history } = useHistory();
  const { columnData } = useColumn();
  const navigate = useNavigate();

  const handleBack = (e) => {
    e?.preventDefault?.();

    popPath((nextPath) => {
      // Multi-column → chỉ pop history, không navigate
      if (columnData) return;

      navigate(nextPath ?? "/");
    });
  };

  // Không có gì để back
  if (history.length <= 1) return null;

  // asChild: children PHẢI là React element
  if (asChild && isValidElement(children)) {
    return cloneElement(children, {
      onClick: (e) => {
        children.props?.onClick?.(e);
        handleBack(e);
      },
    });
  }

  // Default render
  return (
    <button type="button" onClick={handleBack}>
      {children}
    </button>
  );
};

export default Back;
