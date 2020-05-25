// import
import { useRef, useState, useEffect } from 'react';
import { emptyFunction } from 'fbjs';

// graphql typescript
import { googleMapFragment } from '../__generated__/googleMapFragment';

// definition
export default ({
  width,
  height,
}: Pick<googleMapFragment, 'width' | 'height'>): {
  currentHeight: number;
  iframeRef: React.Ref<HTMLIFrameElement>;
} => {
  const [currentHeight, setCurrentHeight] = useState(height);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const resizeTimeoutRef = useRef<ReturnType<typeof setTimeout>>(
    setTimeout(emptyFunction, 0),
  );
  const isMountedRef = useRef(false);

  useEffect((): (() => void) => {
    const resize = (): void => {
      clearTimeout(resizeTimeoutRef.current);
      resizeTimeoutRef.current = setTimeout(() => {
        if (!iframeRef.current) return;

        const { offsetWidth, offsetHeight } = iframeRef.current;

        if (width === offsetWidth && height === offsetHeight) return;

        setCurrentHeight((height * offsetWidth) / width);
      }, 100);
    };

    if (!isMountedRef.current) resize();

    window.addEventListener('resize', resize);
    isMountedRef.current = true;

    return () => {
      clearTimeout(resizeTimeoutRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [width, height, currentHeight]);

  return {
    currentHeight,
    iframeRef,
  };
};
