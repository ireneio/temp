const { publicRuntimeConfig } = require('../../../next.config');

const { PRODUCTION, API_HOST, DOMAIN } = publicRuntimeConfig;

async function paymentOfAllpay(req, res) {
  const XMeepshopDomain = PRODUCTION ? req.headers.host : DOMAIN;
  const PaymentReturnOrder = {
    orderId: req.query.orderId,
    template: 'allpay',
    returnData: req.body,
  };
  const variables = {
    keys: '$paymentReturnOrderList: [PaymentReturnOrder]',
    type: 'mutation Mutation',
    values: { paymentReturnOrderList: [PaymentReturnOrder] },
  };
  const query = `
    paymentReturnOrderList (paymentReturnOrderList: $paymentReturnOrderList) {
      id
    }
  `;
  const response = await fetch(`${API_HOST}/graphql`, {
    method: 'post',
    headers: {
      'content-type': 'application/json',
      'x-meepshop-domain': XMeepshopDomain,
    },
    credentials: 'include',
    body: JSON.stringify({
      query: `${variables.type}(${variables.keys}) {
        ${query}
      }`,
      variables: variables.values,
    }),
  });
  res.status(response.status);

  try {
    const returnJson = await response.json();
    res.send(returnJson);
  } catch (error) {
    console.log(
      `Error: ${error.message}, Stack: ${JSON.stringify(error.stack)}`,
    );
    res.json({ error: error.message });
  }
}

module.exports = paymentOfAllpay;
