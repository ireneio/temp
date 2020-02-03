// import
import { useRef, useEffect, useState, LegacyRef } from 'react';
import { getElementPosition } from 'fbjs';

// definition
export default (): {
  rootRef: LegacyRef<HTMLDivElement>;
  height: number;
} => {
  const rootRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const resize = (): void => {
      const dom = rootRef.current;

      if (dom) setHeight(getElementPosition(dom).width);
    };

    resize();
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [rootRef]);

  return {
    rootRef,
    height,
  };
};
