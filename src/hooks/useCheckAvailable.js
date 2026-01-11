import { useEffect, useRef, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { useDebounce } from 'use-debounce';

export function useCheckAvailable({ name, control, trigger, mutation, delay = 500 }) {
  const value = useWatch({ control, name });
  const [debouncedValue] = useDebounce(value, delay);

  const [isIdle, setIsIdle] = useState(true);
  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState(null);

  // request id để tránh race-condition
  const requestIdRef = useRef(0);

  /* ===== reset UI khi value đổi ===== */
  useEffect(() => {
    if (!value) {
      setIsIdle(true);
      setIsChecking(false);
      setIsAvailable(null);
    } else {
      setIsIdle(true);
      setIsAvailable(null);
    }
  }, [value]);

  /* ===== debounce → validate → api ===== */
  useEffect(() => {
    if (!debouncedValue) return;

    const currentRequestId = ++requestIdRef.current;
    let active = true;

    const run = async () => {
      const isValid = await trigger(name);
      if (!isValid || !active) return;

      setIsIdle(false);
      setIsChecking(true);
      setIsAvailable(null);

      try {
        const res = await mutation(debouncedValue).unwrap();

        // chỉ request cuối được setState
        if (!active || currentRequestId !== requestIdRef.current) return;

        setIsAvailable(res?.data?.available);
      } catch {
        if (!active || currentRequestId !== requestIdRef.current) return;
        setIsAvailable(null);
        setIsIdle(true);
      } finally {
        if (active && currentRequestId === requestIdRef.current) {
          setIsChecking(false);
        }
      }
    };

    run();

    return () => {
      active = false;
    };
  }, [debouncedValue, name, trigger, mutation]);

  return {
    isIdle,
    isChecking,
    isAvailable,
  };
}
