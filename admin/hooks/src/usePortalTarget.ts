// import
import { useRef, useEffect } from 'react';
import { emptyFunction } from 'fbjs';

// definition
export default (): HTMLDivElement | null => {
  const rootRef = useRef(
    typeof window === 'undefined' ? null : document.createElement('div'),
  );

  useEffect(() => {
    const dom = document.getElementById('meepshop');
    const rootDom = rootRef.current;

    if (!rootDom) return emptyFunction;

    if (dom) dom.appendChild(rootDom);

    return () => {
      rootDom.remove();
    };
  }, [rootRef]);

  return rootRef.current;
};
