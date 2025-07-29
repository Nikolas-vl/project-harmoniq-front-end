import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useSyncQueryParams = queryParams => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    let needUpdate = false;
    const newSearchParams = new URLSearchParams(searchParams.toString());

    Object.entries(queryParams).forEach(([key, value]) => {
      if (value === undefined || value === null) {
        if (newSearchParams.has(key)) {
          newSearchParams.delete(key);
          needUpdate = true;
        }
      } else if (newSearchParams.get(key) !== String(value)) {
        newSearchParams.set(key, String(value));
        needUpdate = true;
      }
    });

    if (needUpdate) {
      setSearchParams(newSearchParams);
    }
  }, [queryParams, searchParams, setSearchParams]);
};
