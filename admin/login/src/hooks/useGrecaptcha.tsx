// import
import React, { useEffect, useRef, useContext, useState } from 'react';

import { Events as EventsContext } from '@meepshop/context';

// definition
export default (): {
  grecaptcha: typeof window['grecaptcha'] | null;
  grecaptchaRef: React.Ref<HTMLDivElement>;
  grecaptchaScript: React.ReactNode;
} => {
  const grecaptchaRef = useRef<HTMLDivElement>(null);
  const events = useContext(EventsContext);
  const [grecaptcha, setGrecaptcha] = useState<
    typeof window['grecaptcha'] | null
  >(null);

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
      events.removeEventListener('recaptcha-loaded', render);
      setGrecaptcha(window.grecaptcha);
    };

    render();
    events.addEventListener('recaptcha-loaded', render);

    return () => {
      events.removeEventListener('recaptcha-loaded', render);
    };
  }, [events]);

  return {
    grecaptcha,
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
