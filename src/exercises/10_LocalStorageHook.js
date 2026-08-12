import { useState, useEffect, useDebugValue } from "react";


export function useLocalStorage(key, initialValue) {
  useDebugValue(`localStorage: "${key}"`);

  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error(`Gagal simpan ke localStorage (${key}):`, err);
    }
  }, [key, value]);

  useDebugValue(
    typeof value === "object" ? JSON.stringify(value) : String(value),
    (val) => `[${key}] → ${val}`
  );

  return [value, setValue];
}