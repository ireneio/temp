import { Router } from 'server/routes';

/**
 * @name goTo
 * @description Go to the location by the given pathname
 */
export default ({ pathname, params = {}, back = false }) => {
  if (!back) {
    if (params.hash) {
      if (pathname) {
        const queryString = Object.keys(params.search || {})
          .map(
            (key, index) =>
              `${index === 0 ? '?' : ''}${key}=${encodeURIComponent(
                params.search[key],
              )}`,
          )
          .join('&');

        Router.pushRoute(`${pathname}${queryString}${params.hash}`);
      } else
        Router.pushRoute(
          `${window.location.pathname}${window.location.search}${params.hash}`,
        );
    } else {
      if (pathname == null) throw new Error('pathname is required in goTo');

      const queryString = Object.keys(params.search || {})
        .map(
          (key, index) =>
            `${index === 0 ? '?' : ''}${key}=${encodeURIComponent(
              params.search[key],
            )}`,
        )
        .join('&');

      if (
        window.navigator.userAgent.match(/Instagram/gm) &&
        (pathname === '/' ||
          pathname.includes('/pages') ||
          pathname.includes('/product'))
      )
        /* Hack for fixing Instagram copy url */
        window.open(`${window.location.origin}${pathname}${queryString}`);
      else
        Router.pushRoute(`${pathname}${queryString}`).then(() => {
          window.scrollTo(0, 0);
        });
    }
  } else {
    // for go back from /checkout page
    // if no previous page, go to homepage
    const previousPage = window.storePreviousPageUrl || '/';

    if (
      window.navigator.userAgent.match(/Instagram/gm) &&
      (pathname === '/' ||
        pathname.includes('/pages') ||
        pathname.includes('/product'))
    ) {
      /* Hack for fixing Instagram copy url */
      window.open(`${window.location.origin}${previousPage}`);
    } else {
      Router.pushRoute(previousPage);
    }
  }
};
