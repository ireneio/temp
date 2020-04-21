// import
import { useState, useRef, useEffect, useCallback } from 'react';

// definition
export default (
  collapsed: boolean,
): [boolean, (e: React.TransitionEvent<HTMLDivElement>) => void] => {
  const [transitionLoading, setTransitionLoading] = useState(false);
  const isMountedRef = useRef(false);

  useEffect(() => {
    if (isMountedRef.current) setTransitionLoading(true);

    isMountedRef.current = true;
  }, [collapsed]);

  return [
    transitionLoading,
    useCallback(
      (
        e: React.TransitionEvent<HTMLDivElement> & {
          target: { offsetWidth: number };
        },
      ) => {
        if (![240, 64].includes(e.target.offsetWidth)) return;

        setTransitionLoading(false);
      },
      [setTransitionLoading],
    ),
  ];
};
