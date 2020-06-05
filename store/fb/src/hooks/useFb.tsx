// import
import React, { useState, useEffect, useContext } from 'react';

import eventsContext from '@meepshop/events';

// definition
export default (
  fbAppId: string | null,
): {
  fb: typeof window['FB'] | null;
  fbScript: React.ReactNode;
} => {
  const [fb, setFb] = useState<typeof window['FB'] | null>(null);
  const events = useContext(eventsContext);

  useEffect(() => {
    const isLoaded = (): void => {
      if (!window.FB) return;

      setFb(window.FB);
    };

    isLoaded();
    events.addEventListener('fb-loaded', isLoaded);
  }, [events]);

  return {
    fb,
    fbScript: !fbAppId ? null : (
      <>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.fbAsyncInit = function() {
                window.FB.init({
                  appId: ${fbAppId},
                  cookie: true,
                  xfbml: true,
                  version: 'v5.0',
                });
                window.FB.AppEvents.logPageView();
                window.events.dispatchEvent(new Event('fb-loaded'));
              };
            `,
          }}
        />

        <script src="https://connect.facebook.net/en_US/sdk.js" async defer />
      </>
    ),
  };
};
