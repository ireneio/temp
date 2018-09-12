const { publicRuntimeConfig } = require('../../../next.config');

const { API_HOST } = publicRuntimeConfig;

module.exports = async ctx => {
  const orderId = ctx.query.id;
  await fetch(`${API_HOST}/external/hitrust/payment_return/${orderId}`, {
    method: 'post',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(ctx.request.body),
  });
  ctx.status = 200;
  ctx.body = 'R01=00';
};
