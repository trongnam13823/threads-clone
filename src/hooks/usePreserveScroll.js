import { useLayoutEffect, useRef } from "react";

export function usePreserveScroll(deps) {
  const ref = useRef(null);
  const scrollPos = useRef({ top: 0, left: 0 });

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    // restore scroll
    el.scrollTop = scrollPos.current.top;
    el.scrollLeft = scrollPos.current.left;

    return () => {
      // save scroll on unmount
      scrollPos.current = {
        top: el.scrollTop,
        left: el.scrollLeft,
      };
    };
  }, deps);

  return ref;
}
