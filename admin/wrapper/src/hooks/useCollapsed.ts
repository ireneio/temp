// import
import { useContext, useEffect, useState, useCallback } from 'react';

import CookiesContext from '@meepshop/cookies';

// definition
export default (): {
  isDone: boolean;
  collapsed: boolean;
  onBreakpoint: (breakpoint: boolean) => void;
  setCollapsed: (collapsed: boolean) => void;
} => {
  const { cookies, setCookie } = useContext(CookiesContext);
  const [isDone, setIsDone] = useState(false);
  const [isOnBreakpoint, setIsOnBreakpoint] = useState<null | boolean>(null);
  const [collapsed, setCollapsed] = useState(cookies.menuCollapsed === 'true');

  useEffect(() => {
    if (typeof window !== 'undefined' && isOnBreakpoint !== null)
      setIsDone(true);
  }, [cookies, isOnBreakpoint]);

  return {
    isDone,
    collapsed: Boolean(collapsed || isOnBreakpoint),
    onBreakpoint: setIsOnBreakpoint,
    setCollapsed: useCallback(
      (newCollapsed: boolean) => {
        if (isOnBreakpoint) return;

        setCollapsed(newCollapsed);
        setCookie('menuCollapsed', newCollapsed.toString());
      },
      [isOnBreakpoint, setCookie],
    ),
  };
};
