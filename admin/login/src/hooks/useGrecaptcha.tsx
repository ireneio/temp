// import
import React, { useEffect, useRef, useContext } from 'react';

import { events as eventsContext } from '@meepshop/context';

// definition
export default (): {
  grecaptchaRef: React.Ref<HTMLDivElement>;
  grecaptchaScript: React.ReactNode;
} => {
  const grecaptchaRef = useRef<HTMLDivElement>(null);
  const events = useContext(eventsContext);

  useEffect(() => {
    const render = (): void => {
      if (
        !grecaptchaRef.current ||
        grecaptchaRef.current.innerHTML !== '' ||
        !window.grecaptcha?.render
      )
        return;

      window.grecaptcha.render(grecaptchaRef.current, {
        sitekey: '6Lf4iDsUAAAAADGIX1WYcChAZrQNEE36rAu3MkOa',
      });
    };

    render();
    events.addEventListener('recaptcha-loaded', render);
  }, [events]);

  return {
    grecaptchaRef,
    grecaptchaScript: (
      <>
        <script
          dangerouslySetInnerHTML={{
            __html: `function recaptchaLoaded() { window.events.dispatchEvent(new Event('recaptcha-loaded')); }`,
          }}
        />

        <script
          src="https://www.google.com/recaptcha/api.js?onload=recaptchaLoaded"
          async
          defer
        />
      </>
    ),
  };
};
