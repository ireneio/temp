// typescript import
import { AdTrackType } from '@meepshop/context';

// import
import { useCallback } from 'react';

// definition
export default (fbq: typeof window.fbq): AdTrackType['custom'] =>
  useCallback(
    (action: string, name: string, category: string | null) => {
      fbq('track', name);

      if (window.gtag)
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
    },
    [fbq],
  );
