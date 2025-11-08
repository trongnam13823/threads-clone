import { useEffect } from "react";
import { useLocation } from "react-router";

export const usePreserveScroll = () => {
  const location = useLocation();

  useEffect(() => {
    // Retrieve the saved scroll position for the current pathname from sessionStorage
    const saved = sessionStorage.getItem(`scroll-${location.pathname}`);
    if (saved) window.scrollTo(0, parseInt(saved)); // Scroll to saved position

    // Handler to save the current scroll position in sessionStorage
    const handleScroll = () => {
      sessionStorage.setItem(`scroll-${location.pathname}`, window.scrollY.toString());
    };

    // Listen for scroll events
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when component unmounts or pathname changes
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]); // Re-run effect when the route changes
};
