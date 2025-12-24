import { useLayoutEffect, useRef, useCallback } from "react";

export default function usePreserveScroll(deps = []) {
  const elRef = useRef(null);
  const scrollPos = useRef({ left: 0, top: 0 });

  // callback ref (React sẽ tự gán DOM)
  const ref = useCallback((node) => {
    if (!node) return;
    elRef.current = node;
  }, []);

  // Lưu vị trí scroll
  useLayoutEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const save = () => {
      scrollPos.current.left = el.scrollLeft;
      scrollPos.current.top = el.scrollTop;
    };

    el.addEventListener("scroll", save, { passive: true });
    return () => el.removeEventListener("scroll", save);
  }, []);

  // Khôi phục scroll khi deps thay đổi
  useLayoutEffect(() => {
    const el = elRef.current;
    if (!el) return;

    el.scrollLeft = scrollPos.current.left;
    el.scrollTop = scrollPos.current.top;
  }, deps);

  return ref;
}
