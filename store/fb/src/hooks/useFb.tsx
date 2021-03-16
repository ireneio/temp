// import
import React, { useState, useEffect, useContext } from 'react';

import { Events as EventsContext } from '@meepshop/context';

// definition
export default (
  appId: string | null,
  version: string,
): {
  fb: typeof window['FB'] | null;
  fbScript: React.ReactNode;
} => {
  const [fb, setFb] = useState<typeof window['FB'] | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const events = useContext(EventsContext);

  useEffect(() => {
    const fbLoaded = (): void => {
      if (!window.FB) return;

      setFb(window.FB);
    };

    fbLoaded();
    events.addEventListener('fb-loaded', fbLoaded);
  }, [events]);

  useEffect(() => {
    const load = (): void => {
      setIsLoaded(true);
      window.removeEventListener('load', load);
    };

    window.addEventListener('load', load);
  }, []);

  return {
    fb,
    fbScript:
      !appId || !isLoaded ? null : (
        <>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.fbAsyncInit = function() {
                  window.FB.init({
                    appId: '${appId}',
                    cookie: true,
                    xfbml: true,
                    version: '${version}',
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
