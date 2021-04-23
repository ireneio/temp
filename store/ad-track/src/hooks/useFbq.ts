// import
import { useCallback, useContext } from 'react';
import uuid from 'uuid/v4';

import CookiesContext from '@meepshop/cookies';

// graphql typescript
import { useFbqFragment } from '@meepshop/types/gqls/store';

// definition
export default (store: useFbqFragment | null): typeof window.fbq => {
  const { cookies } = useContext(CookiesContext);

  return useCallback(
    (eventType, eventName, options) => {
      if (!store) return;

      const {
        adTracks: { facebookPixelId, facebookConversionsAccessToken },
      } = store;

      if (!window.fbq || !facebookPixelId) return;

      const eventId = uuid();

      window.fbq(eventType, eventName, options, {
        eventID: eventId,
        externalID: cookies.identity,
      });

      if (facebookConversionsAccessToken)
        fetch('/fbq ', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'same-origin',
          body: JSON.stringify({
            ...options,
            /* eslint-disable @typescript-eslint/camelcase */
            event_id: eventId,
            event_name: eventName,
            event_source_url: window.location.href,
            store_id: store.id,
            external_id: cookies.identity,
            /* eslint-enable @typescript-eslint/camelcase */
          }),
        });
    },
    [store, cookies],
  );
};
