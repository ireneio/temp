// typescript import
import ReactPlayer from 'react-player';

// import
import { useRef, useState, useEffect } from 'react';
import { emptyFunction } from 'fbjs';

// graphql typescript
import { videoFragment } from '../gqls/__generated__/videoFragment';

// definition
const RATIO_TO_VALUE = {
  Ratio16to9: 9 / 16,
  Ratio4to3: 3 / 4,
  Ratio16to10: 10 / 16,
};

export default (
  ratio: videoFragment['ratio'],
): {
  height: number;
  videoRef: React.RefObject<ReactPlayer>;
} => {
  const [height, setHeight] = useState(0);
  const videoRef = useRef<ReactPlayer>(null);
  const resizeTimeoutRef = useRef<ReturnType<typeof setTimeout>>(
    setTimeout(emptyFunction, 0),
  );
  const isMountedRef = useRef(false);

  useEffect((): (() => void) => {
    const resize = (): void => {
      clearTimeout(resizeTimeoutRef.current);
      resizeTimeoutRef.current = setTimeout(() => {
        if (!videoRef.current) return;

        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore FIXME: react player type error
        setHeight(videoRef.current.wrapper.offsetWidth * RATIO_TO_VALUE[ratio]);
      }, 100);
    };

    if (!isMountedRef.current) resize();

    window.addEventListener('resize', resize);
    isMountedRef.current = true;

    return () => {
      clearTimeout(resizeTimeoutRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [ratio]);

  return {
    height,
    videoRef,
  };
};
