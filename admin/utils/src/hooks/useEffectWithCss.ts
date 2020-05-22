// import
import { useEffect } from 'react';

// definition
export default (callback: () => void): void => {
  useEffect((): (() => void) => {
    const completeCallback = (e: Event & { target: Document }): void => {
      if (e.target.readyState === 'complete') callback();
    };

    callback();
    document.addEventListener('readystatechange', completeCallback);

    return () => {
      document.removeEventListener('readystatechange', completeCallback);
    };
  }, [callback]);
};
