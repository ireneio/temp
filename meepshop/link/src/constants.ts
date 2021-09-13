// definition
export const ROUTES = [
  {
    pattern: '/pages/:path',
    page: '/pages/[path]',
  },
  {
    pattern: '/product/:pId',
    page: '/products/[pId]',
  },
  {
    pattern: '/checkout/thank-you-page/:orderId',
    page: '/checkout/thank-you-page/[orderId]',
  },
  {
    pattern: '/order/:orderId',
    page: '/orders/[orderId]',
  },
  {
    pattern: '/orderApplyList/:orderId',
    page: '/orders/[orderId]/applications',
  },
  {
    pattern: '/orderRefund/:orderId',
    page: '/orders/[orderId]/refund',
  },
  {
    pattern: '/orderExchange/:orderId',
    page: '/orders/[orderId]/exchange',
  },
  {
    pattern: '/payNotify/:orderId',
    page: '/orders/[orderId]/pay-notify',
  },
  {
    pattern: '/forgotPassword/:token',
    page: '/forgot-password/[token]',
  },
];
