const { publicRuntimeConfig } = require('../../../next.config');

const { PRODUCTION, API_HOST, DOMAIN } = publicRuntimeConfig;

module.exports = async ctx => {
  const XMeepshopDomain = PRODUCTION ? ctx.host : DOMAIN;
  const PaymentReturnOrder = {
    orderId: ctx.query.orderId,
    template: 'allpay',
    returnData: ctx.request.body,
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
  ctx.status = response.status;

  try {
    const returnJson = await response.json();
    ctx.body = JSON.stringify(returnJson);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    ctx.body = { error: error.message };
  }
};
