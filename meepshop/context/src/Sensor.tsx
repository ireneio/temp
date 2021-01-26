// import
import React, { useState, useEffect } from 'react';

import styles from '@meepshop/utils/styles/variables.less';

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
    <SensorContext.Provider value={{ isMobile }}>
      {children}
    </SensorContext.Provider>
  );
});

export default SensorContext;
