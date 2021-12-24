// import
import React, { useCallback, useRef, useState } from 'react';

// definition
export default (): {
  grecaptcha: typeof window['grecaptcha'] | null;
  grecaptchaRef: React.Ref<HTMLDivElement>;
  onLoad: () => void;
} => {
  const grecaptchaRef = useRef<HTMLDivElement>(null);
  const [grecaptcha, setGrecaptcha] = useState<
    typeof window['grecaptcha'] | null
  >(null);

  return {
    grecaptcha,
    grecaptchaRef,
    onLoad: useCallback(() => {
      const grecaptchaFunc = window.grecaptcha;

      if (!grecaptchaFunc) return;

      grecaptchaFunc.ready(() => {
        if (!grecaptchaRef.current) return;

        grecaptchaFunc.render(grecaptchaRef.current, {
          sitekey: '6Lf4iDsUAAAAADGIX1WYcChAZrQNEE36rAu3MkOa',
        });

        setGrecaptcha(grecaptchaFunc);
      });
    }, []),
  };
};
