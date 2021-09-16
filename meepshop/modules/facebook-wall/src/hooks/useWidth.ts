// import
import React, { useState, useRef, useEffect } from 'react';
import { emptyFunction } from 'fbjs';

// definition
export default (facebookWallRef: React.RefObject<HTMLDivElement>): number => {
  const [width, setWidth] = useState(500);
  const resizeTimeoutRef = useRef<ReturnType<typeof setTimeout>>(
    setTimeout(emptyFunction, 0),
  );
  const isMountedRef = useRef(false);

  useEffect(() => {
    const resize = (): void => {
      clearTimeout(resizeTimeoutRef.current);
      resizeTimeoutRef.current = setTimeout(() => {
        if (!facebookWallRef.current) return;

        const { offsetWidth } = facebookWallRef.current;

        if (width === offsetWidth) return;

        setWidth(offsetWidth);
      }, 100);
    };

    if (!isMountedRef.current) resize();

    window.addEventListener('resize', resize);
    isMountedRef.current = true;

    return () => {
      clearTimeout(resizeTimeoutRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [width, facebookWallRef]);

  return width;
};
