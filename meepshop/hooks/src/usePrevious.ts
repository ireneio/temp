// import
import { useRef, useEffect } from 'react';

// definition
export default <T>(state: T): T => {
  const prevRef = useRef<T>(state);

  useEffect(() => {
    prevRef.current = state;
  }, [state]);

  return prevRef.current;
};
