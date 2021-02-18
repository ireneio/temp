// import
import { useCallback } from 'react';

// typescript definition
export type ReturnType = (
  action: string,
  name: string,
  category: string | null,
) => void;

// definition
export default (): ReturnType =>
  useCallback((action: string, name: string, category: string | null) => {
    if (window.fbq) window.fbq('track', name);

    if (window.gtag) {
      // eslint-disable-next-line @typescript-eslint/camelcase
      window.gtag('config', 'UA-41718901-5');

      window.gtag('event', action, {
        ...(!category
          ? {}
          : {
              // eslint-disable-next-line @typescript-eslint/camelcase
              event_category: category,
            }),
        // eslint-disable-next-line @typescript-eslint/camelcase
        event_label: name,
        // eslint-disable-next-line @typescript-eslint/camelcase
        non_interaction: true,
      });
    }
  }, []);
