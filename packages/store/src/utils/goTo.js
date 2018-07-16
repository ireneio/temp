import { Router } from 'server/routes';

/**
 * @name goTo
 * @description Go to the location by the given pathname
 */
export default ({ pathname, params = {}, back = false }) => {
  document.querySelector('body').style.overflow = 'initial';
  if (!back) {
    console.log('goTo:', pathname, params);
    if (params.hash) {
      Router.pushRoute(
        window.location.pathname + window.location.search + params.hash,
      );
    } else {
      if (pathname == null) throw new Error('pathname is required in goTo');
      let queryString = '';
      if (params) {
        const { search } = params;
        if (search) {
          queryString = Object.keys(search).reduce((_queryString, key) => {
            if (_queryString.length === 0) {
              return `?${key}=${encodeURIComponent(search[key])}`;
            }
            return `${_queryString}&${key}=${encodeURIComponent(search[key])}`;
          }, '');
        }
      }

      if (
        window.navigator.userAgent.match(/Instagram/gm) &&
        (pathname === '/' ||
          pathname.includes('/pages') ||
          pathname.includes('/product'))
      ) {
        /* Hack for fixing Instagram copy url */
        window.open(`${window.location.origin}${pathname + queryString}`);
      } else {
        Router.pushRoute(pathname + queryString, {
          shallow: window.location.pathname === pathname,
        });
      }
    }
  } else {
    // for go back from /checkout page
    // if no previous page, go to homepage
    const previousPage = window.storePreviousPageUrl || '/';
    console.log('goTo:', previousPage);

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
