import { useState, useCallback } from 'react';
import { useDebounce } from './useDebounce';

export function useLocalStorageState(key, defaultValue, delay = 1500) {
  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved !== null ? JSON.parse(saved) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  const saveToLocalStorage = useCallback(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.log(error);
    }
  }, [key, state]);

  useDebounce(saveToLocalStorage, delay);

  return [state, setState];
}
