// import
import React, { useEffect, useRef } from 'react';

// definition
export default (): {
  grecaptchaRef: React.Ref<HTMLDivElement>;
  grecaptchaScript: React.ReactNode;
} => {
  const grecaptchaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!grecaptchaRef.current || grecaptchaRef.current.innerHTML !== '')
      return;

    const render = (count: number): void => {
      if (
        window.grecaptcha &&
        window.grecaptcha.render &&
        grecaptchaRef.current
      )
        window.grecaptcha.render(grecaptchaRef.current, {
          sitekey: '6Lf4iDsUAAAAADGIX1WYcChAZrQNEE36rAu3MkOa',
        });
      else if (count < 50) setTimeout(render, 100, count + 1);
    };

    render(0);
  }, []);

  return {
    grecaptchaRef,
    grecaptchaScript: (
      <script src="https://www.google.com/recaptcha/api.js" async defer />
    ),
  };
};
