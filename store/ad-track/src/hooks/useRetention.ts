// import
import { useEffect, useRef } from 'react';

import { useRouter } from '@meepshop/link';

// graphql typescript
import { useRetentionFragment as useRetentionFragmentType } from '@meepshop/types/gqls/store';

// definition
export default (store: useRetentionFragmentType | null): void => {
  const router = useRouter();
  const prevAsPathRef = useRef('');

  useEffect(() => {
    if (!store || prevAsPathRef.current === router.asPath) return;

    const { adRetentionMilliseconds, adRetentionMillisecondsEnabled } =
      store.setting || {};
    const { facebookPixelId, googleAnalyticsId } = store.adTracks;

    if (adRetentionMillisecondsEnabled)
      setTimeout(() => {
        if (window.fbq && facebookPixelId)
          window.fbq('track', 'meepShop_retention');

        if (window.gtag && googleAnalyticsId)
          window.gtag('event', 'meepShop_retention', {
            // eslint-disable-next-line @typescript-eslint/camelcase
            event_category: 'meepShop_retention',
            // eslint-disable-next-line @typescript-eslint/camelcase
            event_label: 'meepShop_retention',
            // eslint-disable-next-line @typescript-eslint/camelcase
            non_interaction: true,
          });
      }, adRetentionMilliseconds || 0);

    prevAsPathRef.current = router.asPath;
  }, [store, router.asPath]);
};
