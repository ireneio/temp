const { publicRuntimeConfig } = require('../../../next.config');

const { API_HOST } = publicRuntimeConfig;

async function paymentOfHitrust(req, res) {
  const orderId = req.query.id;
  console.log('req.body => ', req.body);
  await fetch(`${API_HOST}/external/hitrust/payment_return/${orderId}`, {
    method: 'post',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(req.body),
  });
  res.send('R01=00');
}

module.exports = paymentOfHitrust;
