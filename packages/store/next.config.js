const basicConfig = require('../../next.config');

const FONT_FAMILY =
  '"PingFang TC", "Microsoft JhengHei", "Helvetica Neue", "Helvetica", "source-han-sans-traditional", "Arial", "sans-serif"';

// set default env in dev mode
if (process.env.NODE_ENV !== 'production') {
  if (!process.env.STORE_DOMAIN)
    process.env.STORE_DOMAIN = 'bellatest.stage.meepcloud.com';
}

module.exports = basicConfig({
  useFileSystemPublicRoutes: false,
  publicRuntimeConfig: {
    EXTERNAL_API_HOST:
      process.env.EXTERNAL_API_HOST || 'https://api.stage.meepcloud.com',
    STORE_DOMAIN: process.env.STORE_DOMAIN,
    ROUTES: [
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
    ],
  },
  lessLoaderOptions: {
    modifyVars: {
      'font-family': FONT_FAMILY,
      'font-family-no-number': FONT_FAMILY,
    },
  },
});
