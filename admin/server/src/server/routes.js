const routes = require('next-routes')();

module.exports = routes
  .add('home', '/', 'dashboard')
  .add('dashboard')
  .add('orders/ecfit')
  .add('setting/notification');
