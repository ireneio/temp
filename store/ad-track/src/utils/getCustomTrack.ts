// definition
export default (
  action: string,
  name: string,
  category: string | null,
): void => {
  if (window.fbq) window.fbq('track', name);

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
};
