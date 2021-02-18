// import
import { useCallback } from 'react';

// typescript definition
export type ReturnType = () => void;

// definition
export default (): ReturnType =>
  useCallback(() => {
    if (window.fbq) window.fbq('track', 'PageView');

    if (window.gtag) window.gtag('config', 'AW-986719315');
  }, []);
