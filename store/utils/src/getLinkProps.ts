// typescript import
import { Key } from 'path-to-regexp';

// import
import pathToRegexp from 'path-to-regexp';

// definition
const routes = [
  {
    pattern: '/pages/:path',
    page: 'pages',
  },
  {
    pattern: '/product/:pId',
    page: 'product',
  },
  {
    pattern: '/checkout/thank-you-page/:orderId',
    page: 'thankYouPage',
  },
  {
    pattern: '/order/:orderId',
    page: 'order',
  },
  {
    pattern: '/myorders/:orderId',
    page: 'order',
  },
  {
    pattern: '/orderApplyList/:orderId',
    page: 'orderApplyList',
  },
  {
    pattern: '/orderRefund/:orderId',
    page: 'orderRefund',
  },
  {
    pattern: '/orderExchange/:orderId',
    page: 'orderExchange',
  },
  {
    pattern: '/payNotify/:orderId',
    page: 'orderPayNotify',
  },
  {
    pattern: '/orderQA/:orderId',
    page: 'orderQA',
  },
  {
    pattern: '/forgotPassword/:token',
    page: 'forgotPassword',
  },
  {
    pattern: '/ezpay/cvcode/:orderId',
    page: 'ezpay',
  },
].map(({ pattern, page }) => {
  const keys: Key[] = [];
  const regexp = pathToRegexp(pattern, keys);

  return {
    regexp,
    keys,
    page,
  };
});

export default (
  href: string,
): {
  href: string;
  as?: string;
} => {
  const hrefPath: false | string = routes.reduce(
    (result, { regexp, keys, page }) => {
      if (result) return result;

      const isMatched = regexp.exec(href);

      if (!isMatched) return result;

      const values = isMatched.slice(1).map(val => decodeURIComponent(val));

      return keys.reduce(
        (prevHrefPath, key, index) =>
          `${prevHrefPath}${key.name}=${values[index]}`,
        `/${page}?`,
      );
    },
    false,
  );

  if (!hrefPath)
    return {
      href,
    };

  return {
    href: hrefPath,
    as: href,
  };
};
