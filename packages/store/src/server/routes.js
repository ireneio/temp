const routes = require('next-routes')();

module.exports = routes
  // index page
  .add('index', '/', 'index')
  // pages page
  .add('pages', '/pages/:path', 'pages')
  // product page
  .add('product', '/product/:pId', 'product')
  // products page
  .add('products', '/products', 'products')
  // login page
  .add('login', '/login', 'login')
  // payment page
  .add('checkout', '/checkout', 'checkout')
  // EC thank-you page
  // !!Note!! Do not change the route because 綠界金流formData
  // 後端redirect url 固定用/checkout/thank-you-page/:orderId
  .add('thankYouPage', '/checkout/thank-you-page/:orderId', 'thankYouPage')

  // member only
  // 訂單管理
  .add('orders', '/orders', 'orders')
  // 訂單詳細資料
  .add('order', '/order/:orderId', 'order')
  .add('myorders', '/myorders/:orderId', 'order') // For email link created by backend
  // 訂單管理 - 退換貨查詢
  .add('orderApplyList', '/orderApplyList/:orderId', 'orderApplyList')
  // 訂單管理 - 退貨申請
  .add('orderRefund', '/orderRefund/:orderId', 'orderRefund')
  // 訂單管理 - 換貨申請
  .add('orderExchange', '/orderExchange/:orderId', 'orderExchange')
  // 訂單管理 - 匯款通知
  .add('payNotify', '/payNotify/:orderId', 'orderPayNotify')
  // 訂單管理 - 訂單問答
  .add('orderQA', '/orderQA/:orderId', 'orderQA')

  // 會員資料
  .add('settings', '/settings', 'settings')
  // 通訊錄
  .add('recipients', '/recipients', 'recipients')
  // 更改密碼
  .add('passwordChange', '/passwordChange', 'passwordChange')
  // 我的收藏
  .add('wishlist', '/wishlist', 'wishlist')
  // 購物金
  .add('rewardPoints', '/rewardPoints', 'rewardPoints')
  // 忘記密碼
  .add('forgotPassword', '/forgotPassword/:token', 'forgotPassword')

  // unsubscribe email
  .add('unsubscribe', '/unsubscribe/:userId', '/unsubscribe/[userId]')

  // sitemaps(products): for crawler
  .add('sitemaps/v1', '/sitemaps/v1', 'sitemaps/v1')

  // TODO: admin only, remove
  .add(
    'admin/[pageId]/[token]',
    '/admin/:pageId/:token',
    'admin/[pageId]/[token]',
  );
