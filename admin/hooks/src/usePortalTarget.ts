// import
import { useRef, useEffect } from 'react';

// definition
export default (): HTMLDivElement => {
  const rootRef = useRef(document.createElement('div'));

  useEffect(() => {
    const dom = document.getElementById('meepshop');
    const rootDom = rootRef.current;

    if (dom) dom.appendChild(rootRef.current);

    return () => {
      rootDom.remove();
    };
  }, [rootRef]);

  return rootRef.current;
};
