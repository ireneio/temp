const routes = require('next-routes')();

/**
 * add(package name, route pattern, relative path in pages)
 */
module.exports = routes
  // root
  .add('index', '/', '/')
  .add('@store/unsubscribe-email', '/unsubscribe', '/unsubscribe')
  .add('login', '/login', 'login')

  // pages
  .add('pages', '/pages/:path', '/pages/[path]')

  // products
  .add('product', '/product/:pId', '/products/[pId]')
  .add('products', '/products', '/products')

  // checkout
  .add('checkout', '/checkout', '/checkout')
  /**
   * Do not change this route!
   * 後端綠界金流固定 redirect url
   */
  .add(
    '@store/thank-you-page',
    '/checkout/thank-you-page/:orderId',
    '/checkout/thank-you-page/[orderId]',
  )

  // ecpay
  .add('@store/ecpay', '/ecpay/:token', '/ecpay/[token]')

  // forgot-password
  .add(
    '@store/forgot-password',
    '/forgotPassword/:token',
    '/forgot-password/[token]',
  )

  // orders
  .add('@store/orders', '/orders', '/orders')
  .add('@store/order', '/order/:orderId', '/order/[orderId]')
  .add(
    '@store/member-order-applications',
    '/orderApplyList/:orderId',
    '/orderApplyList/[orderId]',
  )
  .add(
    '@store/member-order-apply-refund',
    '/orderRefund/:orderId',
    '/orderRefund/[orderId]',
  )
  .add(
    '@store/member-order-apply-exchange',
    '/orderExchange/:orderId',
    '/orderExchange/[orderId]',
  )
  .add(
    '@store/member-order-pay-notify',
    '/payNotify/:orderId',
    '/payNotify/[orderId]',
  )

  // members
  .add('@store/member-settings', '/settings', '/members/settings')
  .add('@store/member-recipients', '/recipients', '/members/recipients')
  .add(
    '@store/member-password-change',
    '/passwordChange',
    '/members/password-change',
  )
  .add('@store/member-wish-list', '/wishlist', '/members/wish-list')
  .add('@store/member-reward-points', '/rewardPoints', '/members/reward-points')

  // fb login in app browser
  .add('fbAuthForLine', '/fbAuthForLine', 'fbAuthForLine')
  .add('fb-login', '/fb-login', 'fb-login')

  // TODO: remove
  .add('sitemaps', '/sitemaps/v1', '/sitemaps/v1')
  .add(
    'admin-pages-previewer',
    '/admin/:pageId/:token',
    '/admin/[pageId]/[token]',
  );
