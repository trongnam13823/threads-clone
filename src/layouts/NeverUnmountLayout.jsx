import { useLocation, Outlet } from "react-router";
import { useState, useMemo } from "react";
import paths from "@/configs/paths";
import HomeColsLayout from "./HomeColsLayout";

const NeverUnmountLayout = () => {
  const location = useLocation();
  const isHome = location.pathname === paths.home;

  // Use state instead of ref for render-dependent values
  const [isHomeMount, setIsHomeMount] = useState(false);

  // Memoize the home element to prevent recreation
  const homeElement = useMemo(() => <HomeColsLayout />, []);

  // Mount HOME exactly once when first visited
  if (isHome && !isHomeMount) {
    setIsHomeMount(true);
  }

  return (
    <>
      {/* HOME always exists after first mount */}
      {isHomeMount && <div style={{ display: isHome ? "block" : "none" }}>{homeElement}</div>}

      {/* Other routes render normally */}
      {!isHome && <Outlet />}
    </>
  );
};

export default NeverUnmountLayout;
