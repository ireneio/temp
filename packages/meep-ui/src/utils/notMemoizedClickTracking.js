import { emptyFunction } from 'fbjs';

export default customTracking => {
  const { status, eventLabel, eventCategory } = customTracking || {};

  if (!status) return emptyFunction;

  return () => {
    if (window.fbq) window.fbq('track', eventLabel);
    if (window.gtag)
      window.gtag('event', 'meepShop_click', {
        event_category:
          (eventCategory?.status && eventCategory?.value) || eventLabel,
        event_label: eventLabel,
      });
  };
};
