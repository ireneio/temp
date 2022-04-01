// import
import React, { useState, useEffect, useMemo } from 'react';

import styles from './styles/sensor.less';

// typescript definition
interface SensorType {
  isMobile: boolean;
}

// definition
const SensorContext = React.createContext<SensorType>({
  isMobile: false,
});

export const SensorProvider = React.memo(({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const value = useMemo(() => ({ isMobile }), [isMobile]);

  useEffect(() => {
    const resize = (): void => {
      setIsMobile(
        window.matchMedia(`(max-width: ${styles.screenSmMax})`).matches,
      );
    };

    resize();
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <SensorContext.Provider value={value}>{children}</SensorContext.Provider>
  );
});

export default SensorContext;
