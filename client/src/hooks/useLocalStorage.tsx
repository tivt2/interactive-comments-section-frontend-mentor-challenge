import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, init?: T) {
  const [storage, setStorage] = useState(init);

  useEffect(() => {
    const val = localStorage.getItem(key);
    if (val) setStorage(JSON.parse(val));
  }, [key]);

  const setLocalStorage = (newStorage: T) => {
    localStorage.setItem(key, JSON.stringify(newStorage));
    setStorage(newStorage);
  };

  return {
    storage,
    setLocalStorage,
  };
}
