"use client";

import { useSyncExternalStore, useCallback, useRef } from "react";

export function useLocalStorage(key, defaultValue) {
  const cacheRef = useRef(null);

  const subscribe = useCallback(
    (onStoreChange) => {
      const handler = () => {
        cacheRef.current = null;
        onStoreChange();
      };
      window.addEventListener("storage", handler);
      return () => window.removeEventListener("storage", handler);
    },
    []
  );

  const getSnapshot = useCallback(() => {
    if (cacheRef.current !== null) {
      return cacheRef.current;
    }
    if (typeof window === "undefined") {
      return defaultValue;
    }
    const item = window.localStorage.getItem(key);
    cacheRef.current = item ? JSON.parse(item) : defaultValue;
    return cacheRef.current;
  }, [key, defaultValue]);

  const getServerSnapshot = useCallback(() => defaultValue, [defaultValue]);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
