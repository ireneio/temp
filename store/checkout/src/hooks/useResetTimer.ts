// import
import { useCallback, useRef } from 'react';
import { emptyFunction } from 'fbjs';
import { addHours, getUnixTime } from 'date-fns';

// definition
export default (): (() => void) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(
    setTimeout(emptyFunction, 0),
  );

  return useCallback(() => {
    if (typeof window !== 'undefined') {
      clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        window.sessionStorage.clear();
      }, 7200000);

      window.sessionStorage.setItem(
        'expiresAt',
        getUnixTime(addHours(new Date(), 2)).toString(),
      );
    }
  }, []);
};
