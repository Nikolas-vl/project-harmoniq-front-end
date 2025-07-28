import { useEffect, useRef } from 'react';

export const useDebounce = (callback, delay) => {
  const handler = useRef(null);

  useEffect(() => {
    if (handler.current) clearTimeout(handler.current);
    handler.current = setTimeout(() => {
      callback();
    }, delay);

    return () => clearTimeout(handler.current);
  }, [callback, delay]);
};
